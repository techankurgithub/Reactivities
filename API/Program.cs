using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Activities;
using Application.Core;
using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);
// it will HOST the app on the "Kestral server"
// and it will the configuration from the config file which we will pass to it.
// the files will be 1. "appsettings.json" 2. "appsettings.Development.json"

// Add services to the container.
// we will be using the DI to inject the services into our classes
// any services we use will go in here

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle


var app = builder.Build();

// Configure the HTTP request pipeline.
// this is often refered to as MIDDLEWARE
// so any middleware we are going to use will go in here

app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// for time being we dont have httpsRedirection so we are commenting it out.
// app.UseHttpsRedirection();

// cors policy should be inserted before the authorization as it will go into pipeline
app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

// create the DB, access the DBContext service
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{    
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during Migration");
}


app.Run();
