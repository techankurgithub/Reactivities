using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _logger = logger;
            _next = next;
            _env = env;
        }

        // method name should be "InvokeAsync" as it is the method like main() in Program.cs which the .net looks to run.
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {                
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "appplication/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                var response = _env.IsDevelopment() ?
                new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) : 
                new AppException(context.Response.StatusCode, "Internal Error");

                var option = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                var json = JsonSerializer.Serialize(response, option);
                await context.Response.WriteAsync(json);
            }
        }
    }
}