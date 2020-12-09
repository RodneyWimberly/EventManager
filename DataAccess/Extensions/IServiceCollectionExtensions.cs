using Arch.EntityFrameworkCore.UnitOfWork;
using EventManager.DataAccess.Events;
using EventManager.DataAccess.Identity;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Storage;
using IdentityServer4.EntityFramework.Stores;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Cosmos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;


namespace EventManager.DataAccess.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureHttpUnitOfWork(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryFactory, HttpUnitOfWork<EventDbContext>>();
            services.AddScoped<IUnitOfWork, HttpUnitOfWork<EventDbContext>>();
            services.AddScoped<IUnitOfWork<EventDbContext>, HttpUnitOfWork<EventDbContext>>();
            services.AddScoped<IUnitOfWork<IdentityDbContext>, HttpUnitOfWork<IdentityDbContext>>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            return services;
        }

        public static IServiceCollection ConfigureEventDbContext(this IServiceCollection services,
            IConfiguration configuration, bool enableSensitiveDataLogging = false, bool useLazyLoadingProxies = false)

        {
            // EF Events DB
            services.AddDbContext<EventDbContext>(c =>
            {
                c.UseCosmos(configuration["ConnectionStrings:EventDb"],
                                    databaseName: "EventDB",
                                    options =>
                                    {
                                        options.ConnectionMode(ConnectionMode.Gateway);
                                        options.Region(Regions.WestUS2);
                                        //options.ExecutionStrategy(ExecutionStrategy.CallOnWrappedException()
                                    });
                c.EnableSensitiveDataLogging(enableSensitiveDataLogging);
                c.UseLazyLoadingProxies(useLazyLoadingProxies);
            });

            services.TryAddScoped<EventDbSeeder>();
            return services;
        }

        public static IServiceCollection ConfigIdentityDbContext(this IServiceCollection services,
            IConfiguration configuration, bool enableSensitiveDataLogging = false, bool useLazyLoadingProxies = false)
        {
            // Setup DB connections and migrations
            string migrationsAssembly = typeof(IServiceCollectionExtensions).Assembly.FullName,
                identityDbConnection = configuration["ConnectionStrings:IdentityDb"];

            services.TryAddScoped<IClientStore, ClientStore>();
            services.TryAddScoped<IPersistedGrantStore, PersistedGrantStore>();
            services.TryAddScoped<IResourceStore, ResourceStore>();
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
