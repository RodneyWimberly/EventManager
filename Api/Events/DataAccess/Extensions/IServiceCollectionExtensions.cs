using Arch.EntityFrameworkCore.UnitOfWork;
using EventManager.Shared.DataAccess;
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


namespace EventManager.Events.DataAccess.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureHttpUnitOfWork(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryFactory, HttpUnitOfWork<EventDbContext>>();
            services.AddScoped<IUnitOfWork, HttpUnitOfWork<EventDbContext>>();
            services.AddScoped<IUnitOfWork<EventDbContext>, HttpUnitOfWork<EventDbContext>>();
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

    }
}
