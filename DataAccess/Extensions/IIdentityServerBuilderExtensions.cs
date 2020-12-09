using EventManager.DataAccess.Identity;
using IdentityServer4.EntityFramework.DbContexts;
using Microsoft.Extensions.DependencyInjection;

namespace EventManager.DataAccess.Extensions
{
    public static class IIdentityServerBuilderExtensions
    {
        public static IIdentityServerBuilder UseIdentityServerInMemoryStore(this IIdentityServerBuilder builder)
        {
            builder.AddInMemoryPersistedGrants()
                .AddInMemoryIdentityResources(IdentityDbSeeder.GetIdentityResources())
                .AddInMemoryApiResources(IdentityDbSeeder.GetApiResources())
                .AddInMemoryApiScopes(IdentityDbSeeder.GetApiScopes())
                .AddInMemoryClients(IdentityDbSeeder.GetClients());
            return builder;
        }
        public static IIdentityServerBuilder UseIdentityServerPermentStore(this IIdentityServerBuilder builder)
        {
            builder.AddConfigurationStore<ConfigurationDbContext>()
                .AddOperationalStore<PersistedGrantDbContext>();

            return builder;
        }

    }
}
