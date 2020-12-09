using Microsoft.AspNetCore.Builder;


namespace EventManager.Logging.ServiceClient.Extensions
{
    public static class IApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseLoggingScopeStateProvider(this IApplicationBuilder app)
        {
            return app.UseMiddleware<LoggingScopeStateProviderMiddleware>();
        }

    }
}
