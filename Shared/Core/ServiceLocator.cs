using Microsoft.Extensions.DependencyInjection;
using System;

namespace EventManager.Shared.Core
{
    public static class ServiceLocator
    {
        public static IServiceCollection Services { get; set; }
        public static IServiceProvider Provider { get; set; }
    }
}
