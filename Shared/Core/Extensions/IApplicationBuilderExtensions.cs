﻿using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace EventManager.Shared.Core.Extensions
{
    public static class IApplicationBuilderExtensions
    {
        public static void UseStoragePath(this IApplicationBuilder app, string path)
        {
            StoragePath.Initialize(path);
        }

        public static void UseServiceLocator(this IApplicationBuilder app)
        {
            using (IServiceScope serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                ServiceLocator.Provider = serviceScope.ServiceProvider;
            }
        }
    }
}
