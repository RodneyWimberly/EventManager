using EventManager.DataAccess.Events;
using EventManager.DataAccess.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;

namespace EventManager.DataAccess.Extensions
{
    public static class IHostExtensions
    {
        public static void RunIdentityDbUpdates(this IHost app)
        {
            using (IServiceScope serviceScope = app.Services.GetService<IServiceScopeFactory>().CreateScope())
            {
                IConfigurationSection dbOptions = serviceScope.ServiceProvider.GetService<IConfiguration>().GetSection("DatabaseOptions");
                IdentityDbSeeder dbSeeder = serviceScope.ServiceProvider.GetService<IdentityDbSeeder>();
                if (dbOptions == null || dbSeeder == null)
                    return;
                if (dbOptions.GetValue<bool>("UseMigrationService"))
                    dbSeeder.MigrateIdentityDbAsync().Wait();

                if (dbOptions.GetValue<bool>("UseSeedService"))
                    dbSeeder.EnsureIdentityDbSeededAsync().Wait();
            }
        }

        public static async Task RunEventDbUpdatesAsync(this IHost app)
        {
            using (IServiceScope serviceScope = app.Services.GetService<IServiceScopeFactory>().CreateScope())
            {
                IConfigurationSection dbOptions = serviceScope.ServiceProvider.GetService<IConfiguration>().GetSection("DatabaseOptions");
                EventDbSeeder dbSeeder = serviceScope.ServiceProvider.GetService<EventDbSeeder>();
                if (dbOptions == null || dbSeeder == null)
                    return;
                if (dbOptions.GetValue<bool>("UseMigrationService"))
                    await dbSeeder.MigrateEventDBAsync();

                if (dbOptions.GetValue<bool>("UseSeedService"))
                    await dbSeeder.EnsureEventDbSeededAsync();
            }
        }
    }
}
