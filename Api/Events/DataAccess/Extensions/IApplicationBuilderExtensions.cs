using EventManager.Shared.DataAccess.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EventManager.Events.DataAccess.Extensions
{
    public static class IApplicationBuilderExtensions
    {
        public static void UseEventDbSeeder(this IApplicationBuilder app)
        {
            using (IServiceScope serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                IConfigurationSection dbOptions = serviceScope.ServiceProvider.GetService<IConfiguration>().GetSection("DatabaseOptions");
                IDbSeeder dbSeeder = serviceScope.ServiceProvider.GetService<EventDbSeeder>();
                if (dbOptions.GetValue<bool>("UseMigrationService"))
                    dbSeeder.MigrateDbAsync().Wait();

                if (dbOptions.GetValue<bool>("UseSeedService"))
                    dbSeeder.SeedDbAsync().Wait();
            }
        }
    }
}
