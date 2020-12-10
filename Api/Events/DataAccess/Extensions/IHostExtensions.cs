using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;

namespace EventManager.Events.DataAccess.Extensions
{
    public static class IHostExtensions
    {
        public static async Task RunEventDbUpdatesAsync(this IHost app)
        {
            using (IServiceScope serviceScope = app.Services.GetService<IServiceScopeFactory>().CreateScope())
            {
                IConfigurationSection dbOptions = serviceScope.ServiceProvider.GetService<IConfiguration>().GetSection("DatabaseOptions");
                EventDbSeeder dbSeeder = serviceScope.ServiceProvider.GetService<EventDbSeeder>();
                if (dbOptions == null || dbSeeder == null)
                    return;
                if (dbOptions.GetValue<bool>("UseMigrationService"))
                    await dbSeeder.MigrateDbAsync();

                if (dbOptions.GetValue<bool>("UseSeedService"))
                    await dbSeeder.SeedDbAsync();
            }
        }
    }
}
