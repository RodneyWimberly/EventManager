using EventManager.Events.DataAccess;
using EventManager.Events.DataAccess.Extensions;
using EventManager.Shared.Core;
using EventManager.Shared.Core.Constants;
using EventManager.Shared.DataAccess.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Extensions.CommandLineUtils;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;
using System;
using System.Diagnostics;

namespace EventManager.Events.Service
{
    public class Program
    {
        private static string title = $"{ApplicationValues.Title} API Gateway";
        public static int Main(string[] args)
        {
            ConsoleLoadingAnimation.Show(title);
            Console.Title = title;
            Activity.DefaultIdFormat = ActivityIdFormat.W3C;
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();

            IHost host =
            Host
            .CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((context, config) =>
            {
                IConfigurationRoot builder = config.Build();
                string keyVaultEndpoint = builder["AzureKeyVaultEndpoint"];
                if (!string.IsNullOrEmpty(keyVaultEndpoint))
                {
                    AzureServiceTokenProvider azureServiceTokenProvider = new AzureServiceTokenProvider();
                    KeyVaultClient keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(azureServiceTokenProvider.KeyVaultTokenCallback));

                    config.AddAzureKeyVault(keyVaultEndpoint);
                }
                else
                {
                    config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                        .AddJsonFile($"appsettings.{context.HostingEnvironment.EnvironmentName}.json", optional: true, reloadOnChange: true)
                        .AddEnvironmentVariables()
                        .AddUserSecrets("eventmanagersecret");
                }
            })
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>()
                    .UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration
                            .ReadFrom.Configuration(hostingContext.Configuration)
                            .Enrich.FromLogContext()
                            .WriteTo.Console(theme: AnsiConsoleTheme.Code));
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
                    Log.Information("Starting web host");
                    await host.StartAsync();
                    await host.RunEventDbUpdatesAsync();
                    Log.Information("Host started");
                    ConsoleLoadingAnimation.Hide();
                    await host.WaitForShutdownAsync();
                    return 0;
                }
                catch (Exception ex)
                {
                    Log.Fatal(ex, "Host terminated unexpectedly");
                    Console.WriteLine("Fatal Exception!");
                    Console.WriteLine("--------------------------------------------------------");
                    Console.WriteLine(ex);
                    Console.WriteLine("Application terminated unexpectedly.");
                    Console.WriteLine("Press enter to exit...");
                    Console.ReadLine();
                    return 1;
                }
                finally
                {
                    Log.CloseAndFlush();
                }
            });
            cmdLineApp.Command("seeddb", cmd =>
            {
                cmd.Description = "Seed DB";
                cmd.HelpOption("--help");

                cmd.OnExecute(async () =>
                {
                    IDbSeeder dbSeeder = scope.ServiceProvider.GetService<EventDbSeeder>();
                    await dbSeeder.SeedDbAsync();
                    return 0;
                });
            });
            cmdLineApp.Command("migratedb", cmd =>
            {
                cmd.Description = "Migrate DB";
                cmd.HelpOption("--help");

                cmd.OnExecute(async () =>
                {
                    IDbSeeder dbSeeder = scope.ServiceProvider.GetService<EventDbSeeder>();
                    await dbSeeder.MigrateDbAsync();
                    return 0;
                });
            });
            return cmdLineApp.Execute(args);
        }
    }
}
