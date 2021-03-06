using EventManager.Events.DataAccess.Extensions;
using EventManager.Events.Service.Helpers;
using EventManager.Identity.DataAccess;
using EventManager.Identity.DataAccess.Models;
using EventManager.Shared.Core.Constants;
using EventManager.Shared.Core.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NSwag.AspNetCore;
using System.Reflection;

namespace EventManager.Events.Service
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

        // Use this method to add services to the DI container.
        public void ConfigureServices(IServiceCollection services)
        {
            Assembly thisAssembly = GetType().Assembly;
            bool isDevelopment = WebHostEnvironment.IsDevelopment();

            services.ConfigureLogging(Configuration);
            services.ConfigureEventDbContext(Configuration, isDevelopment);


            services.AddDbContext<IdentityDbContext>(c =>
            {
                c.UseSqlServer(Configuration["ConnectionStrings:IdentityDb"], providerOptions =>
                {
                    providerOptions.CommandTimeout(60);
                    providerOptions.MigrationsAssembly(this.GetType().Assembly.FullName);
                });
                c.EnableSensitiveDataLogging(isDevelopment);
                c.UseLazyLoadingProxies(false);
            });
            services.AddScoped<IIdentityManager, IdentityManager>();
            services.AddIdentity<User, Role>(a => a = Configuration.GetSection("IdentityOptions").Get<IdentityOptions>())
                .AddEntityFrameworkStores<IdentityDbContext>()
                .AddDefaultTokenProviders();



            services.ConfigureApiVersioning();
            services.ConfigureMvcAsWebApi(thisAssembly);
            services.ConfigureAuthentication(Configuration, !isDevelopment);
            services.ConfigureAuthorization(Configuration);
            services.ConfigureAutoMapper(thisAssembly);
            services.ConfigureEmailService(Configuration);
            services.ConfigureHttpUnitOfWork();
        }

        // Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory, ILogger<Startup> logger)
        {
            logger.LogInformation("Configuring the HTTP request pipeline");
            app.UseForwardedHeaders(new ForwardedHeadersOptions { ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto });
            app.UseCertificateForwarding();
            app.UseCookiePolicy();

            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
            {
                //app.UseMiddleware<ExceptionHandlerMiddleware>();
                app.UseExceptionHandler("/Error");
                app.UseHsts();
                app.UseStaticFiles();
            }
            //app.UseLoggingScopeStateProvider();
            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy-public");
            app.UseCookiePolicy();
            app.UseRouting();
            //app.UseIdentityServer();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(builder =>
            {
                builder.MapControllerRoute("default", "api/{controller}/{action=Index}/{id?}");
                builder.MapControllerRoute("v1.0", "api/v1.0/{controller}/{action=Index}/{id?}");
                builder.MapHealthChecks("api/{controller}/health");
            });

            app.UseSwaggerUi3(settings =>
            {
                settings.OAuth2Client = new OAuth2ClientSettings { ClientId = ApplicationValues.ClientNamespace, ClientSecret = ApplicationValues.Secret };
                settings.Path = "/docs";
                settings.DocumentPath = "/docs/api-specification.json";
            });
        }
    }
}
