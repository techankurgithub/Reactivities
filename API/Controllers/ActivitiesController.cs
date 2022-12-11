using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    // now since we derived from base controller so it already has the [ApiController] attribute
    // we just need to define the end point
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;            
        }

        [HttpGet] // url = api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] // url = api/activities/id
        public async Task<ActionResult<Activity>> GetActivitiy(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}