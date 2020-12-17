using EventManager.Shared.Service.Consul;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EventManager.Shared.Service.Extensions
{
    public static class IApplicationBuilderExtensions
    {
        public static void UseStoragePath(this IApplicationBuilder app, string path)
        {
            StoragePath.Initialize(path);
        }

        public static void UseConsul(this IApplicationBuilder app)
        {
            IDisco disco = app.ApplicationServices.GetRequiredService<IDisco>();
            IHostApplicationLifetime appLife = app.ApplicationServices.GetRequiredService<IHostApplicationLifetime>();
            IOptions<ServiceDisvoveryOptions> serviceOptions = (IOptions<ServiceDisvoveryOptions>)app.ApplicationServices.GetService(typeof(IOptions<ServiceDisvoveryOptions>));
            FeatureCollection features = app.Properties["server.Features"] as FeatureCollection;
            IEnumerable<Uri> addresses = features.Get<IServerAddressesFeature>()
                .Addresses
                .Select(p => new Uri(p));

            foreach (Uri address in addresses)
            {
                string serviceId = $"{serviceOptions.Value.ServiceName}_{address.Host}:{address.Port}";
                disco.RegisterServiceEndpointWithHealthCheckAsync(serviceId, serviceOptions.Value.ServiceName,
                    address).GetAwaiter().GetResult();

                appLife.ApplicationStopping.Register(() =>
                    disco.DeregisterServiceEndpointAsync(serviceId).GetAwaiter().GetResult());
            }

        }
    }
}
