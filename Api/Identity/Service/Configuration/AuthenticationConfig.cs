using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.IdentityModel.Tokens.Jwt;

namespace EventManager.Identity.Service.Configuration
{
    public static class AuthenticationConfig
    {
        public static void ConfigureOAuth2Server(this IServiceCollection services, IConfiguration configuration)
        {
            Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            services.AddAuthentication(o =>
                    {
                        o.DefaultScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
                        o.DefaultAuthenticateScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
                    })
                    .AddIdentityServerAuthentication(options =>
                    {
                        options.Authority = configuration["Authentication:Authority"];
                        options.RequireHttpsMetadata = configuration.GetValue<bool>("Authentication:RequireHttpsMetadata"); ;
                        options.ApiSecret = configuration["Authentication:ApiSecret"];
                        options.ApiName = configuration["Authentication:ApiName"];
                    });
        }
    }
}
