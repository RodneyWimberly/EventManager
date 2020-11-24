using IdentityServer4.Models;
using System.Collections.Generic;
using System.Linq;

namespace EventManager.DataAccess.Core.Constants
{
    public enum AuthClientTypes
    {
        Api,
        ApiDocumentation,
        NgInternalAuthentication,
        NgExternalAuthentication,
        Service,
        Web,

    }

    public struct AuthClient
    {
        public AuthClientTypes Type { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public ICollection<Secret> Secrets { get; set; }
    }

    public static class IdentityServerValues
    {
        public static AuthClient GetClient(AuthClientTypes clientType) => Clients.Where((c) => c.Type == clientType).FirstOrDefault();
        public static List<AuthClient> Clients
        {
            get => new List<AuthClient>()
            {
                new AuthClient
                {
                    Type = AuthClientTypes.Api,
                    Id = $"{AppId}api:gateway",
                    Name = $"{AppName} API Gateway",
                    Secrets =  new List<Secret> { new Secret(AppSecret.Sha256()) }
                },
                 new AuthClient
                {
                    Type = AuthClientTypes.ApiDocumentation,
                    Id =  $"{AppId}client:apidoc",
                    Name = $"{AppName} API Documentation",
                    Secrets =  new List<Secret> { new Secret(AppSecret.Sha256()) }
                },
                new AuthClient
                {
                    Type = AuthClientTypes.Service,
                    Id = $"{AppId}client:service",
                    Name = $"{AppName} Service Client",
                    Secrets =  new List<Secret> { new Secret(AppSecret.Sha256()) }
                },
                new AuthClient
                {
                    Type = AuthClientTypes.Web,
                    Id = $"{AppId}client:web:mvc",
                    Name = $"{AppName} MVC Web Client",
                    Secrets =  new List<Secret> { new Secret(AppSecret.Sha256()) }
                },
                new AuthClient
                {
                    Type = AuthClientTypes.NgInternalAuthentication,
                    Id = $"{AppId}client:js:resourceowner",
                    Name = $"{AppName} JS Resource Owner Password Client",
                    Secrets =  new List<Secret> { new Secret(AppSecret.Sha256()) }
                },
                new AuthClient
                {
                    Type = AuthClientTypes.NgExternalAuthentication,
                    Id = $"{AppId}client:js:implicit",
                    Name = $"{AppName} JS Implicit Flow Client",
                    Secrets =  new List<Secret> { new Secret(AppSecret.Sha256()) }
                }
            };
        }

        public const string AppId = "urn:eventmanager:";
        public const string AppName = "Event Manager";
        public const string AppSecret = "eventmanagersecret";
    }
}
