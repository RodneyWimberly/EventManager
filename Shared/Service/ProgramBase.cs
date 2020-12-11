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
using System.Threading.Tasks;


namespace EventManager.Shared.Service
{
    public class ProgramBase<TStartup>
     where TStartup : class
    {
        public static string title = ApplicationValues.Title;
        public static int Main(string[] args)
        {
            ConsoleLoadingAnimation.Show(title);
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
                webBuilder.UseStartup<TStartup>()
                    .UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration
                            .ReadFrom.Configuration(hostingContext.Configuration)
                            .Enrich.FromLogContext()
                            .WriteTo.Console(theme: AnsiConsoleTheme.Code));
            })
            .Build();

            CommandLineApplication cmdLineApp = new CommandLineApplication();
            cmdLineApp.FullName = title;
            cmdLineApp.HelpOption("--help");
            cmdLineApp.OnExecute(async () =>
            {
                try
                {
                    Log.Information($"Starting {title}");
                    await host.StartAsync();
                    Log.Information($"{title} started");
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
                    Console.WriteLine($"{title} terminated unexpectedly.");
                    Console.WriteLine("Press enter to exit...");
                    Console.ReadLine();
                    return 1;
                }
                finally
                {
                    Log.CloseAndFlush();
                }
            });

            return cmdLineApp.Execute(args);
        }
    }
    public class ProgramBase<TStartup, TDbSeeder>
        where TStartup : class
        where TDbSeeder : IDbSeeder
    {
        public static string title = ApplicationValues.Title;
        public static async Task<int> Main(string[] args)
        {
            ConsoleLoadingAnimation.Show(title);
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
                webBuilder.UseStartup<TStartup>()
                    .UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration
                            .ReadFrom.Configuration(hostingContext.Configuration)
                            .Enrich.FromLogContext()
                            .WriteTo.Console(theme: AnsiConsoleTheme.Code));
            })
            .Build();
            Log.Information($"Starting {title}");
            await host.StartAsync();
            using IServiceScope scope = host.Services.CreateScope();

            CommandLineApplication cmdLineApp = new CommandLineApplication();
            cmdLineApp.FullName = title;
            cmdLineApp.HelpOption("--help");
            cmdLineApp.OnExecute(async () =>
            {
                try
                {

                    IDbSeeder dbSeeder = scope.ServiceProvider.GetService<TDbSeeder>();
                    await dbSeeder.SeedDbAsync();
                    await dbSeeder.MigrateDbAsync();
                    Log.Information($"{title} started");
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
                    Console.WriteLine($"{title} terminated unexpectedly.");
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
                    IDbSeeder dbSeeder = scope.ServiceProvider.GetService<TDbSeeder>();
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
                    IDbSeeder dbSeeder = scope.ServiceProvider.GetService<TDbSeeder>();
                    await dbSeeder.MigrateDbAsync();
                    return 0;
                });
            });
            return cmdLineApp.Execute(args);
        }
    }
}
