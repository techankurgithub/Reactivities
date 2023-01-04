using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUserName = null;
            CreateMap<Activity, Activity>();
            
            CreateMap<Activity, ActivityDto>()            
            .ForMember(x => x.HostUserName, o => o.MapFrom(a => a.Attendees
            .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            
            CreateMap<ActivityAttendee, AttendeeDto>()
            .ForMember(x => x.DisplayName, o => o.MapFrom(a => a.AppUser.DisplayName))
            .ForMember(x => x.UserName, o => o.MapFrom(a => a.AppUser.UserName))
            .ForMember(x => x.Bio, o => o.MapFrom(a => a.AppUser.Bio))
            .ForMember(x => x.Image, o => o.MapFrom(a => a.AppUser.Photos.FirstOrDefault(i => i.IsMain).Url))
            .ForMember(d => d.FollowersCount, o => o.MapFrom( a => a.AppUser.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom( a => a.AppUser.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(a => 
            a.AppUser.Followers.Any(x => x.Observer.UserName == currentUserName)));

            CreateMap<AppUser, Profiles.Profile>()
            .ForMember(d => d.Image, o => o.MapFrom( a => a.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(d => d.FollowersCount, o => o.MapFrom( a => a.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom( a => a.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(a => 
            a.Followers.Any(x => x.Observer.UserName == currentUserName)));

            CreateMap<Comment, CommentsDto>()
            .ForMember(x => x.DisplayName, o => o.MapFrom(a => a.Author.DisplayName))
            .ForMember(x => x.UserName, o => o.MapFrom(a => a.Author.UserName))            
            .ForMember(x => x.Image, o => o.MapFrom(a => a.Author.Photos.FirstOrDefault(i => i.IsMain).Url));
        }
    }
}