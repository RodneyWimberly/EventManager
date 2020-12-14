using Arch.EntityFrameworkCore.UnitOfWork;
using EventManager.Identity.DataAccess.Fido;
using EventManager.Shared.DataAccess;
using Fido2NetLib;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Storage;
using IdentityServer4.EntityFramework.Stores;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;


namespace EventManager.Identity.DataAccess.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureHttpUnitOfWork(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork<IdentityDbContext>, HttpUnitOfWork<IdentityDbContext>>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            return services;
        }

        public static IServiceCollection ConfigureFidoStorage(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<Fido2Configuration>(configuration.GetSection("fido2"));
            services.AddScoped<Fido2Storage>();
            return services;
        }

        public static IServiceCollection ConfigIdentityDbContext(this IServiceCollection services,
            IConfiguration configuration, string migrationsAssembly, bool enableSensitiveDataLogging = false, bool useLazyLoadingProxies = false)
        {
            // Setup DB connections and migrations
            string identityDbConnection = configuration.GetConnectionString("IdentityDb");

            services.TryAddScoped<IClientStore, ClientStore>();
            services.TryAddScoped<IPersistedGrantStore, PersistedGrantStore>();
            services.TryAddScoped<IResourceStore, ResourceStore>();
            services.TryAddScoped<IIdentityManager, IdentityManager>();
            services.TryAddTransient<IProfileService, ProfileService>();

            // EF Identity DB for users and roles
            services.AddDbContext<IdentityDbContext>(c =>
            {
                c.UseSqlServer(identityDbConnection, providerOptions =>
                {
                    providerOptions.CommandTimeout(60);
                    providerOptions.MigrationsAssembly(migrationsAssembly);
                });
                c.EnableSensitiveDataLogging(enableSensitiveDataLogging);
                c.UseLazyLoadingProxies(useLazyLoadingProxies);
            });


            // EF IdentityServer Configuration DB
            services.AddConfigurationDbContext<ConfigurationDbContext>(cso =>
            {
                cso.ConfigureDbContext = c =>
                {
                    c.UseSqlServer(identityDbConnection, providerOptions =>
                    {
                        providerOptions.CommandTimeout(60);
                        providerOptions.MigrationsAssembly(migrationsAssembly);
                    });
                    c.EnableSensitiveDataLogging(enableSensitiveDataLogging);
                    c.UseLazyLoadingProxies(useLazyLoadingProxies);
                };
            });

            // EF IdentityServer Persisted Grants DB
            services.AddOperationalDbContext<PersistedGrantDbContext>(oso =>
            {
                oso.EnableTokenCleanup = true;
                oso.TokenCleanupInterval = 3600;
                oso.ConfigureDbContext = c =>
                {
                    c.UseSqlServer(identityDbConnection, providerOptions =>
                    {
                        providerOptions.CommandTimeout(60);
                        providerOptions.MigrationsAssembly(migrationsAssembly);
                    });
                    c.EnableSensitiveDataLogging(enableSensitiveDataLogging);
                    c.UseLazyLoadingProxies(useLazyLoadingProxies);
                };
            });

            services.TryAddScoped<IdentityDbSeeder>();
            return services;
        }
    }
}
