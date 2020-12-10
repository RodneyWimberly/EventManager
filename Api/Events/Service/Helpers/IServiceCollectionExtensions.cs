using AutoMapper;
using EventManager.Events.DataAccess.Models;
using EventManager.Events.Service.Authorization;
using EventManager.Events.Service.ViewModels;
using EventManager.Events.Service.ViewModels.Mappers;
using EventManager.Shared.Core.Constants;
using EventManager.Shared.DataAccess;
using EventManager.Shared.DataAccess.Constants;
using FluentValidation;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Reflection;

namespace EventManager.Events.Service.Helpers
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureLogging(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddLogging(builder =>
            {
                builder.AddConfiguration(configuration.GetSection("Logging"));
                //builder.AddConsole();
                //builder.AddAzureWebAppDiagnostics();

                //builder.AddServiceClient(configure =>
                //    configure.Url = configuration["ConnectionStrings:ServiceClientLoggerUrl"]);

                /*builder.AddEventLog(configure =>
                {
                    configure.LogName = "EventManager";
                    configure.SourceName = "EventManager";
                    configure.Filter = (string category, LogLevel level) =>
                    {
                        if (category.Contains("EventManager") ||
                            category.Contains("Controller") ||
                            category.Contains("Repository"))
                        {
                            return true;
                        }

                        if (level > LogLevel.Information)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    };
                });*/

                // builder.AddEventSourceLogger();

                /*builder.AddTraceSource(
                    new SourceSwitch("EventManager", "EventManager Event Trace Log")
                    {
                        Level = SourceLevels.All
                    },
                    new XmlWriterTraceListener("EventTraceLog.xml"));*/
            });
            return services;
        }

        public static IServiceCollection ConfigureAuthentication(this IServiceCollection services,
        IConfiguration configuration, bool requireHttpsMetadata = false)
        {
            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme, options =>
                {
                    options.Authority = configuration["Authentication:Authority"].TrimEnd('/');
                    options.SupportedTokens = SupportedTokens.Jwt;
                    options.RequireHttpsMetadata = requireHttpsMetadata;
                    options.ApiName = ApplicationValues.ApiNamespace;
                    options.ApiSecret = ApplicationValues.Secret;
                });
            //services.AddLocalApiAuthentication(principal =>
            //{
            //    principal.Identities.First().AddClaim(new Claim("additional_claim", "additional_value"));
            //    return Task.FromResult(principal);
            //});
            return services;
        }

        public static IServiceCollection ConfigureAuthorization(this IServiceCollection services,
            IConfiguration configuration)
        {
            // Set authorization policies
            services.AddAuthorizationCore(options =>
            {
                options.AddPolicy(Policies.ViewLogsPolicy, policy => policy.RequireClaim(Claims.Permission, Permissions.ViewLogs));
                options.AddPolicy(Policies.ManageLogsPolicy, policy => policy.RequireClaim(Claims.Permission, Permissions.ManageLogs));

                options.AddPolicy(Policies.ViewEventsPolicy, policy => policy.RequireClaim(Claims.Permission, Permissions.ViewEvents));
                options.AddPolicy(Policies.ManageEventsPolicy, policy => policy.RequireClaim(Claims.Permission, Permissions.ManageEvents));
                options.AddPolicy(Policies.ExecuteEventsPolicy, policy => policy.RequireClaim(Claims.Permission, Permissions.ExecuteEvents));

                options.AddPolicy(Policies.ViewAllUsersPolicy, policy => policy.RequireClaim(Claims.Permission, Permissions.ViewUsers));
                options.AddPolicy(Policies.ManageAllUsersPolicy, policy => policy.RequireClaim(Claims.Permission, Permissions.ManageUsers));

                options.AddPolicy(Policies.ViewAllRolesPolicy, policy => policy.RequireClaim(Claims.Permission, Permissions.ViewRoles));
                options.AddPolicy(Policies.ViewRoleByRoleNamePolicy, policy => policy.Requirements.Add(new ViewRoleAuthorizationRequirement()));
                options.AddPolicy(Policies.ManageAllRolesPolicy, policy => policy.RequireClaim(Claims.Permission, Permissions.ManageRoles));

                options.AddPolicy(Policies.AssignAllowedRolesPolicy, policy => policy.Requirements.Add(new AssignRolesAuthorizationRequirement()));
            });

            // Authorization Handlers
            services.AddSingleton<IAuthorizationHandler, ViewUserAuthorizationHandler>();
            services.AddSingleton<IAuthorizationHandler, ManageUserAuthorizationHandler>();
            services.AddSingleton<IAuthorizationHandler, ViewRoleAuthorizationHandler>();
            services.AddSingleton<IAuthorizationHandler, AssignRolesAuthorizationHandler>();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy-public", builder => builder
                    .AllowAnyOrigin()   //WithOrigins and define a specific origin to be allowed (e.g. https://mydomain.com)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    //.AllowCredentials()
                    .Build());
            });
            return services;
        }

        public static IServiceCollection ConfigureApiVersioning(this IServiceCollection services)
        {
            services.AddApiVersioning(options =>
            {
                //o.Conventions.Controller<UserController>().HasApiVersion(1, 0);
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.ReportApiVersions = true;
                options.DefaultApiVersion = new ApiVersion(1, 0);
                options.ApiVersionReader = new UrlSegmentApiVersionReader();
            });

            // format code as "'v'major[.minor][-status]"
            services.AddVersionedApiExplorer(options =>
            {
                //options.SubstitutionFormat = "'v'VVV";
                //options.GroupNameFormat = "'v'VVV";
                options.SubstituteApiVersionInUrl = true;
            });
            return services;
        }

        public static IServiceCollection ConfigureAutoMapper(this IServiceCollection services,
            Assembly migrationAssembly)
        {
            services.AddScoped<ITypeConverter<NotificationViewModel, Notification>, NotificationMapper>();
            services.AddAutoMapper(migrationAssembly);

            return services;
        }

        public static IServiceCollection ConfigureMvcAsWebApi(this IServiceCollection services,
            Assembly mapperAssembly)
        {
            // Configure JSON serializer to not complain when returning entities plus reference and navigational properties
            services.AddMvc(option => option.EnableEndpointRouting = true)
                .AddControllersAsServices()
                .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            services.AddControllersWithViews();
            services.AddHealthChecks();
            services.AddValidatorsFromAssembly(mapperAssembly);
            services.AddApplicationInsightsTelemetry();

            return services;
        }
    }
}
