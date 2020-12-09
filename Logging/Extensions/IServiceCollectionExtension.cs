using EventManager.Logging.ServiceClient.Logger;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using System;

namespace EventManager.Logging.ServiceClient.Extensions
{
    public static class IServiceCollectionExtension
    {
        public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddServiceClientLogger(this Microsoft.Extensions.DependencyInjection.IServiceCollection services)
        {
            services.AddLogging();
            services.TryAddEnumerable(ServiceDescriptor.Singleton<ILoggerProvider, ServiceClientLoggerProvider<ServiceClientLogger>>());
            return services;
        }

        public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddServiceClientLogger(this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<ServiceClientLoggerOptions> configure)
        {
            services.AddServiceClientLogger();
            services.Configure(configure);
            return services;
        }
    }
}
