using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;                
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                .Include(x => x.Attendees).ThenInclude(a => a.AppUser)
                .SingleOrDefaultAsync(x => x.Id == request.Id);

                if(activities == null) return null;

                var user = await _context.Users
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if(user == null) return null;

                var hostUserName = activities.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;
                var attendance = activities.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if(attendance != null && hostUserName == user.UserName)
                {
                    activities.IsCancelled = !activities.IsCancelled;
                }

                if(attendance != null && hostUserName != user.UserName)
                {
                    activities.Attendees.Remove(attendance);
                }

                if(attendance == null)
                {
                    attendance = new Domain.ActivityAttendee{
                        AppUser = user,
                        IsHost = false,
                        Activity = activities
                    };
                    activities.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating Attendance") ;
            }
        }
    }
}