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
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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

            // Setup use of EF DbContexts
            services.AddApplicationDbContext(
                Configuration["ConnectionStrings:CosmosEndPoint"],
                 Configuration["ConnectionStrings:CosmosKey"],
                WebHostEnvironment.IsDevelopment());

            services.AddAccountManagerDbContext(
               Configuration.GetSection("IdentityOptions"),
               Configuration["ConnectionStrings:SqlConnectString"],
               WebHostEnvironment.IsDevelopment(), false, WebHostEnvironment.IsDevelopment());

            // Configure JSON serializer to not complain when returning entities plus reference and navigational properties
            services.AddMvc()
                .AddControllersAsServices()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });

            // Set authentication to use identity server and set identity server authentication options
            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = Configuration["ApplicationUrl"].TrimEnd('/');
                    options.SupportedTokens = SupportedTokens.Jwt;
                    options.RequireHttpsMetadata = !WebHostEnvironment.IsDevelopment();
                    options.ApiName = IdentityServerValues.ApiId;
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
            services.AddCors();

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

            if (!env.IsDevelopment())
                app.UseHsts();

            app.UseDeveloperExceptionPage();
            //app.UseExceptionHandler("/Error");
            app.InitializeDatabase();
            app.UseEntityFrameworkLoggingScopeStateProvider();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseCors(builder => builder
               .AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod());

            app.UseIdentityServer();
            app.UseAuthorization();

            app.UseSwaggerUi3(settings =>
            {
                settings.OAuth2Client = new OAuth2ClientSettings { ClientId = IdentityServerValues.DocumentationClientId, ClientSecret = IdentityServerValues.DocumentationClientSecret };
                settings.Path = "/docs";
                settings.DocumentPath = "/docs/api-specification.json";
            });

            //app.UseCookiePolicy();
            //app.UseAuthentication();

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
                    if (false)
                    {
                        spa.UseAngularCliServer(npmScript: "serve");
                        spa.Options.StartupTimeout = TimeSpan.FromSeconds(120); // Increase the timeout if angular app is taking longer to startup
                    }
                    else
                        spa.UseProxyToSpaDevelopmentServer("http://localhost:4200"); // Use this instead to use the angular cli server
                }
            });
        }

    }


}
