using Microsoft.EntityFrameworkCore;
using Persistence;
using API.Extensions;
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using API.SignalR;

var builder = WebApplication.CreateBuilder(args);
// it will HOST the app on the "Kestral server"
// and it will the configuration from the config file which we will pass to it.
// the files will be 1. "appsettings.json" 2. "appsettings.Development.json"

// Add services to the container.
// we will be using the DI to inject the services into our classes
// any services we use will go in here

builder.Services.AddControllers( opt => 
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityService(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle


var app = builder.Build();

// Configure the HTTP request pipeline.
// this is often refered to as MIDDLEWARE
// so any middleware we are going to use will go in here

app.UseMiddleware<ExceptionMiddleware>();
app.UseXContentTypeOptions(); // add the x-content type header
app.UseReferrerPolicy(opt => opt.NoReferrer()); //enables the no-reffere policy and instruct the browser to not send reffere info
app.UseXXssProtection(opt => opt.EnabledWithBlockMode()); //enable protection with block mode
app.UseXfo(opt => opt.Deny()); // enable the deny directive
app.UseCsp(opt => opt
    .BlockAllMixedContent()
    .StyleSources(o => o.Self().CustomSources("https://fonts.googleapis.com"))
    .FontSources(o => o.Self().CustomSources("https://fonts.gstatic.com", "data:"))
    .FormActions(o => o.Self())
    .FrameAncestors(o => o.Self())
    .ImageSources(o => o.Self().CustomSources("blob:", "http://res.cloudinary.com"))
    .ScriptSources(o => o.Self())
);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.Use(async (context, next) => 
    {
        context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}

// for time being we dont have httpsRedirection so we are commenting it out.
// app.UseHttpsRedirection();

// cors policy should be inserted before the authorization as it will go into pipeline
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapHub<ChatHub>("/chat");
app.MapFallbackToController("Index", "Fallback");

// create the DB, access the DBContext service
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{    
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during Migration");
}


app.Run();
