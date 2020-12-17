using EventManager.Gateway.Service.Configurations;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.ReverseProxy.Abstractions;
using Microsoft.ReverseProxy.Service;
using System.Collections.Generic;

namespace EventManager.Gateway.Service.Extensions
{
    public static class IReverseProxyBuilderExtensions
    {
        public static IReverseProxyBuilder LoadFromMemory(this IReverseProxyBuilder builder, IReadOnlyList<ProxyRoute> routes, IReadOnlyList<Cluster> clusters)
        {
            builder.Services.AddSingleton<IProxyConfigProvider>(new InMemoryConfigProvider(routes, clusters));
            return builder;
        }
    }
}
