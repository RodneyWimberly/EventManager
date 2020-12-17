using EventManager.Shared.Service.Consul;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.ReverseProxy.Abstractions;
using System;

namespace EventManager.Gateway.Service.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureReverseProxy(this IServiceCollection services)
        {
            IServiceProvider serviceProvider = services.BuildServiceProvider();
            IDisco disco = serviceProvider.GetRequiredService<IDisco>();
            string identityEndPoint = disco.GetServiceEndpointAsync("identity").GetAwaiter().GetResult(),
                eventsEndPoint = disco.GetServiceEndpointAsync("events").GetAwaiter().GetResult(),
                spaEndPoint = disco.GetServiceEndpointAsync("spa").GetAwaiter().GetResult();

            ProxyRoute[] routes = new[]
            {
                new ProxyRoute()
                {
                    RouteId = "route-web",
                    ClusterId = "cluster-web",
                    Match =
                    {
                        Path = "/{**catch-all}"
                    }
                },
                new ProxyRoute()
                {
                    RouteId = "route-connect",
                    ClusterId = "cluster-connect",
                    Match =
                    {
                        Path = "/connect/{**catch-all}"
                    }
                },
                new ProxyRoute()
                {
                    RouteId = "route-wellknown",
                    ClusterId = "cluster-wellknown",
                    Match =
                    {
                        Path = "/.well-known/{**catch-all}"
                    }
                },
                new ProxyRoute()
                {
                    RouteId = "route-notifications",
                    ClusterId = "cluster-notifications",
                    Match =
                    {
                        Path = "/notifications/{**catch-all}"
                    }
                },
                new ProxyRoute()
                {
                    RouteId = "route-events",
                    ClusterId = "cluster-events",
                    Match =
                    {
                        Path = "events/{**catch-all}"
                    }
                },
                new ProxyRoute()
                {
                    RouteId = "route-accounts",
                    ClusterId = "cluster-accounts",
                    Match =
                    {
                        Path = "accounts/{**catch-all}"
                    }
                }
            };
            Cluster[] clusters = new[]
            {
                new Cluster()
                {
                    Id = "cluster-web",
                    Destinations =
                    {
                        { "cluster-web/destination1", new Destination() { Address = $"https://{spaEndPoint}/" } }
                    }
                },
                new Cluster()
                {
                    Id = "cluster-connect",
                    Destinations =
                    {
                        { "cluster-connect/destination1", new Destination() { Address = $"https://{identityEndPoint}/" } }
                    }
                },
                new Cluster()
                {
                    Id = "cluster-wellknown",
                    Destinations =
                    {
                        { "cluster-wellknown/destination1", new Destination() { Address = $"https://{identityEndPoint}/" } }
                    }
                },
                new Cluster()
                {
                    Id = "cluster-notifications",
                    Destinations =
                    {
                        { "cluster-notifications/destination1", new Destination() { Address = $"https://{eventsEndPoint}/api/" } }
                    }
                },
                new Cluster()
                {
                    Id = "cluster-events",
                    Destinations =
                    {
                        { "cluster-events/destination1", new Destination() { Address =  $"https://{eventsEndPoint}/api/"} }
                    }
                },
                new Cluster()
                {
                    Id = "cluster-accounts",
                    Destinations =
                    {
                        { "cluster-accounts/destination1", new Destination() { Address =  $"https://{eventsEndPoint}/api/" } }
                    }
                }
            };

            services.AddReverseProxy().LoadFromMemory(routes, clusters);
            //services.AddReverseProxy().LoadFromConfig(Configuration.GetSection("ReverseProxy"));
            return services;
        }
    }
}
