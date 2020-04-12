using Microsoft.AspNetCore.Builder;


namespace EventManager.Core.Logging
{
    public static class EntityFrameworkLoggingAspNetCoreExtensions
    {
        public static IApplicationBuilder UseEntityFrameworkLoggingScopeStateProvider(this IApplicationBuilder app)
        {
            return app.UseMiddleware<EntityFrameworkLoggingScopeStateProviderMiddleware>();
        }

    }
}
