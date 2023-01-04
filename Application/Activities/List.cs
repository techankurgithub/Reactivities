using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>> {}

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context,IMapper mapper,IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;                
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // this is called eagerly loading
                // loading all the fields althought we dont even using it.
                // var result = await _context.Activities
                // .Include(x => x.Attendees)
                // .ThenInclude(a => a.AppUser)
                // .ToListAsync();

                var result = await _context.Activities
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new {currentUserName = _userAccessor.GetUserName()})
                .ToListAsync(cancellationToken);

                //var activitiesToReturn = _mapper.Map<List<ActivityDto>>(result);

                return Result<List<ActivityDto>>.Success(result);
            }
        }
    }
}