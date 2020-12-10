using DnsClient;
using EventManager.Shared.Core.Email;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Net;

namespace EventManager.Shared.Core.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureEmailService(this IServiceCollection services,
       IConfiguration configuration)
        {
            services.Configure<SmtpConfig>(configuration.GetSection("SmtpConfig"));
            services.AddScoped<IEmailService, EmailService>();
            return services;
        }

        public static IServiceCollection ConfigureDnsClient(this IServiceCollection services, string ipAddress = "127.0.0.1", int port = 8600)
        {
            IPEndPoint endpoint = new IPEndPoint(IPAddress.Parse(ipAddress), port);
            LookupClient client = new LookupClient(endpoint);
            services.AddSingleton<ILookupClient>(client);
            Disco.Client = client;
            return services;
        }


    }

}
