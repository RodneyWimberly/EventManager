using EventManager.Identity.DataAccess;
using EventManager.Identity.DataAccess.Extensions;
using EventManager.Identity.DataAccess.Fido;
using EventManager.Identity.DataAccess.Models;
using EventManager.Identity.Service.Filters;
using EventManager.Identity.Service.Resources;
using EventManager.Shared.Core.Email;
using EventManager.Shared.Service.Certificate;
using Fido2NetLib;
using IdentityServer4;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Serilog;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace EventManager.Identity.Service
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            Environment = env;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
                options.OnAppendCookie = cookieContext =>
                    CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
                options.OnDeleteCookie = cookieContext =>
                    CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
            });

            (X509Certificate2 ActiveCertificate, X509Certificate2 SecondaryCertificate) x509Certificate2 = GetCertificates(Environment, Configuration).GetAwaiter().GetResult();
            AddLocalizationConfigurations(services);

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder
                            .AllowCredentials()
                            .WithOrigins(
                                "http://localhost:5000",
                                "https://localhost:6000",
                                "http://em-web.azurewebsites.net",
                                "https://em-web.azurewebsites.net")
                            .SetIsOriginAllowedToAllowWildcardSubdomains()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            services.ConfigIdentityDbContext(Configuration);

            services.Configure<IdentityConfig>(Configuration.GetSection("IdentityConfig"));
            services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));

            services.AddSingleton<LocService>();
            services.AddLocalization(options => options.ResourcesPath = "Resources");

            services.AddIdentity<User, Role>()
                .AddEntityFrameworkStores<IdentityDbContext>()
                .AddErrorDescriber<IdentityServiceErrorDescriber>()
                .AddDefaultTokenProviders()
                .AddTokenProvider<Fifo2UserTwoFactorTokenProvider>("FIDO2");


            services.AddTransient<IEmailSender, EmailSender>();

            services.AddAntiforgery(options =>
            {
                options.SuppressXFrameOptionsHeader = true;
                options.Cookie.SameSite = SameSiteMode.Strict;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });

            services.AddOidcStateDataFormatterCache(GoogleDefaults.AuthenticationScheme);
            IConfigurationSection authenticationOptions = Configuration.GetSection("Authentication");

            services.AddAuthentication()
                .AddGoogle(options =>
                {
                    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                    options.ClientId = authenticationOptions.GetValue<string>("GoogleClientId");
                    options.ClientSecret = authenticationOptions.GetValue<string>("GoogleClientSecret");
                    options.Scope.Add("email");
                });

            services.AddAuthorization();

            services.AddControllersWithViews(options =>
                {
                    options.Filters.Add(new SecurityHeadersAttribute());
                })
                .AddViewLocalization()
                .AddDataAnnotationsLocalization(options =>
                {
                    options.DataAnnotationLocalizerProvider = (type, factory) =>
                    {
                        var assemblyName = new AssemblyName(typeof(SharedResource).GetTypeInfo().Assembly.FullName);
                        return factory.Create("SharedResource", assemblyName.Name);
                    };
                })
                .AddNewtonsoftJson();

            services.AddIdentityServer()
                .AddSigningCredential(x509Certificate2.ActiveCertificate)
                .AddAspNetIdentity<User>()
                .AddProfileService<ProfileService>();

            services.Configure<Fido2Configuration>(Configuration.GetSection("fido2"));
            services.AddScoped<Fido2Storage>();
            // Adds a default in-memory implementation of IDistributedCache.
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(2);
                options.Cookie.HttpOnly = true;
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCookiePolicy();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts(hsts => hsts.MaxAge(365).IncludeSubdomains());
            }

            app.UseCors("AllowAllOrigins");

            app.UseHsts(hsts => hsts.MaxAge(365).IncludeSubdomains());
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opts => opts.NoReferrer());
            app.UseXXssProtection(options => options.EnabledWithBlockMode());

            string allowedAncestors = Configuration.GetSection("IdentityConfig")["AllowedAncestors"];

            app.UseCsp(opts =>
            {
                opts
                 .BlockAllMixedContent()
                 .StyleSources(s => s.Self())
                 .StyleSources(s => s.UnsafeInline())
                 .FontSources(s => s.Self())
                 .FrameAncestors(s => s.Self())
                 .ImageSources(imageSrc => imageSrc.Self())
                 .ImageSources(imageSrc => imageSrc.CustomSources("data:"))
                 .ScriptSources(s => s.Self())
                 .ScriptSources(s => s.UnsafeInline());
                if (!string.IsNullOrEmpty(allowedAncestors))
                    opts.FrameAncestors(s => s.CustomSources(allowedAncestors.Split(';', StringSplitOptions.RemoveEmptyEntries)));
            });

            IOptions<RequestLocalizationOptions> locOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(locOptions.Value);

            // https://nblumhardt.com/2019/10/serilog-in-aspnetcore-3/
            // https://nblumhardt.com/2019/10/serilog-mvc-logging/
            app.UseSerilogRequestLogging();

            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = context =>
                {
                    if (context.Context.Response.Headers["feature-policy"].Count == 0)
                    {
                        var featurePolicy = "accelerometer 'none'; camera 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; payment 'none'; usb 'none'";

                        context.Context.Response.Headers["feature-policy"] = featurePolicy;
                    }

                    if (context.Context.Response.Headers["X-Content-Security-Policy"].Count == 0)
                    {
                        var csp = "script-src 'self';style-src 'self';img-src 'self' data:;font-src 'self';form-action 'self';frame-ancestors 'self';block-all-mixed-content";
                        // IE
                        context.Context.Response.Headers["X-Content-Security-Policy"] = csp;
                    }
                }
            });

            app.UseRouting();

            app.UseIdentityServer();
            app.UseAuthorization();

            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }

        private static async Task<(X509Certificate2 ActiveCertificate, X509Certificate2 SecondaryCertificate)> GetCertificates(IWebHostEnvironment environment, IConfiguration configuration)
        {
            CertificateConfiguration certificateConfiguration = new CertificateConfiguration
            {
                // Use an Azure key vault
                CertificateNameKeyVault = configuration["CertificateNameKeyVault"], //"IdentityCert",
                KeyVaultEndpoint = configuration["AzureKeyVaultEndpoint"], // "https://damienbod.vault.azure.net"

                // Use a local store with thumbprint
                UseLocalCertStore = Convert.ToBoolean(configuration["UseLocalCertStore"]),
                CertificateThumbprint = configuration["CertificateThumbprint"],

                // development certificate
                DevelopmentCertificatePfx = Path.Combine(environment.ContentRootPath, "identity_dev_cert.pfx"),
                DevelopmentCertificatePassword = "1234" //configuration["DevelopmentCertificatePassword"] //"1234",
            };

            (X509Certificate2 ActiveCertificate, X509Certificate2 SecondaryCertificate) certs = await CertificateService.GetCertificates(
                certificateConfiguration).ConfigureAwait(false);

            return certs;
        }

        private static void AddLocalizationConfigurations(IServiceCollection services)
        {
            services.AddSingleton<LocService>();
            services.AddLocalization(options => options.ResourcesPath = "Resources");

            services.Configure<RequestLocalizationOptions>(
                options =>
                {
                    List<CultureInfo> supportedCultures = new List<CultureInfo>
                        {
                            new CultureInfo("en-US"),
                            new CultureInfo("de-CH"),
                            new CultureInfo("it-IT"),
                            new CultureInfo("gsw-CH"),
                            new CultureInfo("fr-FR"),
                            new CultureInfo("zh-Hans")
                        };

                    options.DefaultRequestCulture = new RequestCulture(culture: "de-CH", uiCulture: "de-CH");
                    options.SupportedCultures = supportedCultures;
                    options.SupportedUICultures = supportedCultures;

                    LocalizationQueryProvider providerQuery = new LocalizationQueryProvider
                    {
                        QueryParameterName = "ui_locales"
                    };

                    options.RequestCultureProviders.Insert(0, providerQuery);
                });
        }

        private static void CheckSameSite(HttpContext httpContext, CookieOptions options)
        {
            if (options.SameSite == SameSiteMode.None)
            {
                string userAgent = httpContext.Request.Headers["User-Agent"].ToString();
                if (DisallowsSameSiteNone(userAgent))
                {
                    // For .NET Core < 3.1 set SameSite = (SameSiteMode)(-1)
                    options.SameSite = SameSiteMode.Unspecified;
                }
            }
        }

        private static bool DisallowsSameSiteNone(string userAgent)
        {
            // Cover all iOS based browsers here. This includes:
            // - Safari on iOS 12 for iPhone, iPod Touch, iPad
            // - WkWebview on iOS 12 for iPhone, iPod Touch, iPad
            // - Chrome on iOS 12 for iPhone, iPod Touch, iPad
            // All of which are broken by SameSite=None, because they use the iOS networking stack
            if (userAgent.Contains("CPU iPhone OS 12") || userAgent.Contains("iPad; CPU OS 12"))
            {
                return true;
            }

            // Cover Mac OS X based browsers that use the Mac OS networking stack. This includes:
            // - Safari on Mac OS X.
            // This does not include:
            // - Chrome on Mac OS X
            // Because they do not use the Mac OS networking stack.
            if (userAgent.Contains("Macintosh; Intel Mac OS X 10_14") &&
                userAgent.Contains("Version/") && userAgent.Contains("Safari"))
            {
                return true;
            }

            // Cover Chrome 50-69, because some versions are broken by SameSite=None, 
            // and none in this range require it.
            // Note: this covers some pre-Chromium Edge versions, 
            // but pre-Chromium Edge does not require SameSite=None.
            if (userAgent.Contains("Chrome/5") || userAgent.Contains("Chrome/6"))
            {
                return true;
            }

            return false;
        }
    }
}
