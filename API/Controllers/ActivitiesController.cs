using Application.Activities;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<IActionResult> GetActivities([FromQuery]ActivityParams param)
        {
            //return await _context.Activities.ToListAsync();
            return HandlePagedResult(await Mediator.Send(new List.Query{ Params = param}));
        }
        
        [HttpGet("{id}")] // url = api/activities/id
        public async Task<IActionResult> GetActivitiy(Guid id)
        {
            //return await _context.Activities.FindAsync(id);
            var result = await Mediator.Send(new Details.Query{Id = id });
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Activity = activity})) ;
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> ModifyActivity(Guid id,Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Modify.Command {Activity = activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> UpdateAttendance(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{ Id = id}));
        }
    }
}