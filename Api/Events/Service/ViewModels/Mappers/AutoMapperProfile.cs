﻿using AutoMapper;
using EventManager.Events.DataAccess.Models;
using EventManager.Identity.DataAccess.Models;
using EventManager.Shared.DataAccess;

namespace EventManager.Events.Service.ViewModels.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserViewModel>()
                   .ForMember(d => d.Roles, map => map.Ignore());
            CreateMap<UserViewModel, User>()
                .ForMember(d => d.Roles, map => map.Ignore())
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            CreateMap<User, UserEditViewModel>()
                .ForMember(d => d.Roles, map => map.Ignore());
            CreateMap<UserEditViewModel, User>()
                .ForMember(d => d.Roles, map => map.Ignore())
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            CreateMap<User, UserPatchViewModel>()
                .ReverseMap();

            CreateMap<Role, RoleViewModel>()
                .ForMember(d => d.Permissions, map => map.MapFrom(s => s.Claims))
                .ForMember(d => d.UsersCount, map => map.MapFrom(s => s.Users != null ? s.Users.Count : 0))
                .ReverseMap();
            CreateMap<RoleViewModel, Role>()
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            CreateMap<RoleClaim, ClaimViewModel>()
                .ForMember(d => d.Type, map => map.MapFrom(s => s.ClaimType))
                .ForMember(d => d.Value, map => map.MapFrom(s => s.ClaimValue))
                .ReverseMap();

            CreateMap<Permission, PermissionViewModel>()
                .ReverseMap();

            CreateMap<RoleClaim, PermissionViewModel>()
                .ConvertUsing(s => (PermissionViewModel)EventManager.Shared.DataAccess.Permissions.GetPermissionByValue(s.ClaimValue));

            CreateMap<ExtendedLog, ExtendedLogViewModel>();
            CreateMap<ExtendedLogViewModel, ExtendedLog>()
                .ForMember(e => e.Browser, map => map.Ignore())
                .ForMember(e => e.Host, map => map.Ignore())
                .ForMember(e => e.Path, map => map.Ignore())
                .ForMember(e => e.User, map => map.Ignore());

            CreateMap<Notification, NotificationViewModel>();
            CreateMap<NotificationViewModel, Notification>()
                .ConvertUsing<NotificationMapper>();
        }
    }
}
