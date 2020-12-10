using EventManager.Identity.DataAccess;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EventManager.Identity.DataAccess.Extensions
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
                    dbSeeder.MigrateDbAsync().Wait();

                if (dbOptions.GetValue<bool>("UseSeedService"))
                    dbSeeder.SeedDbAsync().Wait();
            }
        }

    }
}
