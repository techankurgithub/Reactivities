using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController] // this is basically API - URL 
[Route("[controller]")] //localhost:5000/WeatherForecast -> it will come to class name - the word 'Controller'
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    // DP providing the logger as an dependency which will used for logging
    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    // this is we called as ENDPOINT
    [HttpGet(Name = "GetWeatherForecast")] // this is the method which will be called, and define like GET(), POST(), DELETE(), PATCH() etc
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    } // and will return the response.
}
