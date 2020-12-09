using IdentityServer4.Models;

namespace EventManager.DataAccess.Core.Constants
{
    public static class ApplicationValues
    {
        public static string Company = "PHC";
        public static string Title = "Event Manager";
        public static string Secret = "eventmanagersecret".Sha256();
        public static string RootNamespace = "urn:em";
        public static string ApiNamespace = $"{RootNamespace}:api";
        public static string ClientNamespace = $"{RootNamespace}:client";
    }
}
