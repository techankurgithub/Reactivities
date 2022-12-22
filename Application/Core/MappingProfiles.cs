using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()            
            .ForMember(x => x.HostUserName, o => o.MapFrom(a => a.Attendees
            .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, Profiles.Profile>()
            .ForMember(x => x.DisplayName, o => o.MapFrom(a => a.AppUser.DisplayName))
            .ForMember(x => x.UserName, o => o.MapFrom(a => a.AppUser.UserName))
            .ForMember(x => x.Bio, o => o.MapFrom(a => a.AppUser.Bio));
        }
    }
}