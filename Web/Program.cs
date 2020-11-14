using EventManager.DataAccess.Events;
using EventManager.DataAccess.Events.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using ZNetCS.AspNetCore.Logging.EntityFrameworkCore;

namespace EventManager.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.ConfigureLogging((hostingContext, logging) =>
                {
                    logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                    if (hostingContext.Configuration["EnabledLoggers:AzureDiagnostics"] == "True")
                        logging.AddAzureWebAppDiagnostics();
                    if (hostingContext.Configuration["EnabledLoggers:EntityFramework"] == "True")
                        logging.AddEntityFramework<EventDbContext,
                            ExtendedLog,
                            EntityFrameworkLogger<EventDbContext, ExtendedLog, string>,
                            string>();
                    if (hostingContext.Configuration["EnabledLoggers:EventLog"] == "True")
                        logging.AddEventLog(configure =>
                        {
                            configure.LogName = "EventManager";
                            configure.SourceName = "EventManager";
                            configure.Filter = (string category, LogLevel level) =>
                            {
                                if (category.Contains("EventManager") ||
                                    category.Contains("Controller") ||
                                    category.Contains("Repository"))
                                    return true;
                                if (level > LogLevel.Information)
                                    return true;
                                else
                                    return false;
                            };
                        });
                    if (hostingContext.Configuration["EnabledLoggers:EventSource"] == "True")
                        logging.AddEventSourceLogger();
                    if (hostingContext.Configuration["EnabledLoggers:TraceSource"] == "True")
                        logging.AddTraceSource(
                            new SourceSwitch("EventManager", "EventManager Event Trace Log")
                            {
                                Level = SourceLevels.All
                            },
                            new XmlWriterTraceListener("EventTraceLog.xml"));
                });
                webBuilder.UseStartup<Startup>();
                webBuilder.UseUrls("http://*:5000/", "https://*:5001/");
            });
    }
}
