using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    // now since we derived from base controller so it already has the [ApiController] attribute
    // we just need to define the end point
    public class ActivitiesController : BaseApiController
    {        
        // private readonly IMediator _mediator;
        // public ActivitiesController(IMediator mediator)
        // {
        //     _mediator = mediator;                    
        // }

        [HttpGet] // url = api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            //return await _context.Activities.ToListAsync();
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] // url = api/activities/id
        public async Task<ActionResult<Activity>> GetActivitiy(Guid id)
        {
            //return await _context.Activities.FindAsync(id);
            return await Mediator.Send(new Details.Query{Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command {Activity = activity})) ;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ModifyActivity(Guid id,Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Modify.Command {Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}