﻿using EventManager.Identity.DataAccess;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;

namespace EventManager.Identity.DataAccess.Extensions
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
                    dbSeeder.MigrateDbAsync().Wait();

                if (dbOptions.GetValue<bool>("UseSeedService"))
                    dbSeeder.SeedDbAsync().Wait();
            }
        }

    }
}
