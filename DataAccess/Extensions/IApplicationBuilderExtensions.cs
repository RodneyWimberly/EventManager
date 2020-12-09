using EventManager.DataAccess.Events;
using EventManager.DataAccess.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EventManager.DataAccess.Extensions
{
    public static class IApplicationBuilderExtensions
    {
        public static void UseIdentityDbSeeder(this IApplicationBuilder app)
        {
            using (IServiceScope serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                IConfigurationSection dbOptions = serviceScope.ServiceProvider.GetService<IConfiguration>().GetSection("DatabaseOptions");
                IdentityDbSeeder dbSeeder = serviceScope.ServiceProvider.GetService<IdentityDbSeeder>();
                if (dbOptions.GetValue<bool>("UseMigrationService"))
                    dbSeeder.MigrateIdentityDbAsync().Wait();

                if (dbOptions.GetValue<bool>("UseSeedService"))
                    dbSeeder.EnsureIdentityDbSeededAsync().Wait();
            }
        }

        public static void UseEventDbSeeder(this IApplicationBuilder app)
        {
            using (IServiceScope serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                IConfigurationSection dbOptions = serviceScope.ServiceProvider.GetService<IConfiguration>().GetSection("DatabaseOptions");
                EventDbSeeder dbSeeder = serviceScope.ServiceProvider.GetService<EventDbSeeder>();
                if (dbOptions.GetValue<bool>("UseMigrationService"))
                    dbSeeder.MigrateEventDBAsync().Wait();

                if (dbOptions.GetValue<bool>("UseSeedService"))
                    dbSeeder.EnsureEventDbSeededAsync().Wait();
            }
        }
    }
}
