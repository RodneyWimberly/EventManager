using Consul;
using DnsClient;
using EventManager.Shared.Service.Consul;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using System;
using System.Net;

namespace EventManager.Shared.Service.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureDnsClient(this IServiceCollection services)
        {
            IServiceProvider serviceProvider = services.BuildServiceProvider();
            IConfiguration configuration = serviceProvider.GetRequiredService<IConfiguration>();
            services.AddOptions();
            services.Configure<ServiceDisvoveryOptions>(configuration.GetSection("ServiceDiscovery"));
            ServiceDisvoveryOptions serviceConfiguration = serviceProvider.GetRequiredService<IOptions<ServiceDisvoveryOptions>>().Value;
            services.TryAddSingleton<IDnsQuery>(new LookupClient(new IPEndPoint(
                IPAddress.Parse(serviceConfiguration.Consul.DnsEndpoint.Address), serviceConfiguration.Consul.DnsEndpoint.Port)));
            return services;
        }

        public static IServiceCollection ConfigureConsul(this IServiceCollection services)
        {
            services.ConfigureDnsClient();
            IServiceProvider serviceProvider = services.BuildServiceProvider();
            IConfiguration configuration = serviceProvider.GetRequiredService<IConfiguration>();
            services.AddOptions();
            services.Configure<ServiceDisvoveryOptions>(configuration.GetSection("ServiceDiscovery"));
            IConsulClient consulClient = new ConsulClient(cfg =>
            {
                ServiceDisvoveryOptions serviceConfiguration = serviceProvider.GetRequiredService<IOptions<ServiceDisvoveryOptions>>().Value;
                if (!string.IsNullOrEmpty(serviceConfiguration.Consul.HttpEndpoint))
                    cfg.Address = new Uri(serviceConfiguration.Consul.HttpEndpoint);
            });
            services.TryAddSingleton(consulClient);
            services.TryAddSingleton<IDisco>(new Disco(serviceProvider.GetRequiredService<IDnsQuery>(), consulClient));
            return services;
        }
    }
}
