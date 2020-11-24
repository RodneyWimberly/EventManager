using AutoMapper;
using EventManager.Core;
using EventManager.Core.Email;
using EventManager.Core.Logging;
using EventManager.DataAccess;
using EventManager.DataAccess.Core.Constants;
using EventManager.DataAccess.Events.Models;
using EventManager.Web.Authorization;
using EventManager.Web.ViewModels;
using EventManager.Web.ViewModels.Mappers;
using FluentValidation;
using IdentityServer4;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NSwag.AspNetCore;
using System;
using System.Reflection;

namespace EventManager.Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IWebHostEnvironment WebHostEnvironment { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            Configuration = configuration;
            WebHostEnvironment = webHostEnvironment;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Assembly thisAssembly = GetType().Assembly;

            // Logging
            services.AddLogging();

            // API versioning service
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
                options.GroupNameFormat = "'v'VVV";
                options.SubstituteApiVersionInUrl = true;
            });

            // Setup use of EF DbContexts
            services.AddEventDbContext(
                Configuration,
                WebHostEnvironment.IsDevelopment());

            services.AddIdentityDbContext(
               Configuration,
               WebHostEnvironment.IsDevelopment());

            // Configure JSON serializer to not complain when returning entities plus reference and navigational properties
            services.AddMvc(option => option.EnableEndpointRouting = true)
                .AddControllersAsServices()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });


            // Set authentication to use identity server and set identity server authentication options
            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                // JWT tokens
                /*.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                    };
                })*/

                // Reference tokens
                /*.AddOAuth2Introspection(OAuth2IntrospectionDefaults.AuthenticationScheme, options =>
                {
                    options.Authority = "";
                    options.ClientId = "resource1";
                    options.ClientSecret = "secret";
                })*/

                // Google
                //.AddGoogle(GoogleDefaults.AuthenticationScheme, options =>
                //{
     
                //    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                //    options.ClientId = Configuration["Authentication:GoogleClientId"];
                //    options.ClientSecret = Configuration["Authentication:GoogleClientSecret"];
                //    options.AccessType = "offline";
                //})

                // Microsoft Account
                /*.AddMicrosoftAccount(MicrosoftAccountDefaults.AuthenticationScheme, options =>
                {

                })*/

                // OIDC
                /*.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
                {
                    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                    options.SignOutScheme = IdentityServerConstants.SignoutScheme;
                    options.SaveTokens = true;

                    options.Authority = "https://demo.identityserver.io/";
                    options.ClientId = "interactive.confidential";
                    options.ClientSecret = "secret";
                    options.ResponseType = "code";

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        NameClaimType = "name",
                        RoleClaimType = "role"
                    };
                })*/

                // Identity Server
                .AddIdentityServerAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme, options =>
                {
                    options.Authority = Configuration["Authentication:IdentityServer4IP"].TrimEnd('/');
                    options.SupportedTokens = SupportedTokens.Jwt;
                    options.RequireHttpsMetadata = !WebHostEnvironment.IsDevelopment();
                    options.ApiName = IdentityServerValues.GetClient(AuthClientTypes.Api).Id;
                    options.ApiSecret = IdentityServerValues.AppSecret;

                    //options.ForwardDefault = GoogleDefaults.AuthenticationScheme;

                });

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

            // Add CORS
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy-public",
                    builder => builder.AllowAnyOrigin()   //WithOrigins and define a specific origin to be allowed (e.g. https://mydomain.com)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                //.AllowCredentials()
                .Build());
            });

            // Set health checks listener
            services.AddHealthChecks();

            // Add all controllers with view but not pages
            services.AddControllersWithViews();

            // Serve up SinglePageApplication files
            services.AddSpaStaticFiles(configuration => configuration.RootPath = "ClientApp/dist");

            //  Fluent Validators for ViewModelx
            services.AddValidatorsFromAssembly(thisAssembly);

            // AutoMapper type mappers
            services.AddScoped<ITypeConverter<NotificationViewModel, Notification>, NotificationMapper>();
            services.AddAutoMapper(thisAssembly);

            // Reads SMTP Configurations from appsettings.json
            services.Configure<SmtpConfig>(Configuration.GetSection("SmtpConfig"));

            // Business Services
            services.AddScoped<IEmailService, EmailService>();

            // Register Data Access Layer
            services.AddHttpUnitOfWork();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory, ILogger<Startup> logger)
        {
            StoragePath.Initialize(env.ContentRootPath);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //app.UseMiddleware<ExceptionHandlerMiddleware>();
                app.UseExceptionHandler("/Error");
                app.UseHsts();
                app.UseStaticFiles();
                app.UseSpaStaticFiles();
            }
            app.InitializeDatabaseAsync(Configuration).Wait();
            app.UseEntityFrameworkLoggingScopeStateProvider();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("CorsPolicy-public");
            app.UseIdentityServer();
            app.UseCookiePolicy();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseSwaggerUi3(settings =>
            {
                AuthClient client = IdentityServerValues.GetClient(AuthClientTypes.ApiDocumentation);
                settings.OAuth2Client = new OAuth2ClientSettings { ClientId = client.Id, ClientSecret = IdentityServerValues.AppSecret };
                settings.Path = "/docs";
                settings.DocumentPath = "/docs/api-specification.json";
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
                endpoints.MapHealthChecks("/health");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment())
                {
                    if (Configuration["UseProxyToSpaDevelopmentServer"] == "True")
                    {
                        spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                    }
                    else
                    {
                        spa.UseAngularCliServer(npmScript: "serve");
                        spa.Options.StartupTimeout = TimeSpan.FromSeconds(120);
                    }
                }
            });
        }

    }


}
