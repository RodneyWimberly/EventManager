using EventManager.Core;
using EventManager.DataAccess.Core.Constants;
using EventManager.DataAccess.Events;
using EventManager.DataAccess.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.CommandLineUtils;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;

namespace EventManager.Web
{
    public class Program
    {
        private static string title = $"{ApplicationValues.Title} API Gateway";
        public static int Main(string[] args)
        {
            ConsoleLoadingAnimation loadingAnimation = new ConsoleLoadingAnimation(title);
            Console.Title = title;
            Activity.DefaultIdFormat = ActivityIdFormat.W3C;

            IHost host =
            Host
            .CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.ConfigureLogging((hostingContext, logging) => logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging")));
                webBuilder.UseStartup<Startup>();
                webBuilder.UseUrls("http://*:5002/", "https://*:6002/");
            })
            .Build();
            using IServiceScope scope = host.Services.CreateScope();

            CommandLineApplication cmdLineApp = new CommandLineApplication();
            cmdLineApp.FullName = title;
            cmdLineApp.HelpOption("--help");
            cmdLineApp.OnExecute(async () =>
            {
                try
                {
                    ILogger logger = scope.ServiceProvider.GetService<ILogger<Program>>();
                    logger.LogInformation("Starting host");

                    await host.StartAsync();
                    await host.RunEventDbUpdatesAsync();
                    logger.LogInformation("Host started");
                    loadingAnimation.ShowAnimation = false;
                    await host.WaitForShutdownAsync();
                    return 0;
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Fatal Exception!");
                    Console.WriteLine("--------------------------------------------------------");
                    Console.WriteLine(ex);
                    Console.WriteLine("Application terminated unexpectedly.");
                    Console.WriteLine("Press enter to exit...");
                    Console.ReadLine();
                    return 1;
                }
            });
            cmdLineApp.Command("seeddb", cmd =>
            {
                cmd.Description = "Seed DB";
                cmd.HelpOption("--help");

                cmd.OnExecute(async () =>
                {
                    EventDbSeeder dbSeeder = scope.ServiceProvider.GetService<EventDbSeeder>();
                    await dbSeeder.EnsureEventDbSeededAsync();
                    return 0;
                });
            });
            cmdLineApp.Command("migratedb", cmd =>
            {
                cmd.Description = "Migrate DB";
                cmd.HelpOption("--help");

                cmd.OnExecute(async () =>
                {
                    EventDbSeeder dbSeeder = scope.ServiceProvider.GetService<EventDbSeeder>();
                    await dbSeeder.MigrateEventDBAsync();
                    return 0;
                });
            });
            return cmdLineApp.Execute(args);
        }
    }
}
