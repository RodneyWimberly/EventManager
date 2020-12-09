using Microsoft.AspNetCore.Builder;

namespace EventManager.Core.Extensions
{
    public static class IApplicationBuilderExtensions
    {
        public static void UseStoragePath(this IApplicationBuilder app, string path)
        {
            StoragePath.Initialize(path);
        }
    }
}
