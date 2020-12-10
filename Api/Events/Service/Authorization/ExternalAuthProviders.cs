using System.Collections.Generic;

namespace EventManager.Events.Service.Authorization
{
    public class ExternalAuthProviders
    {
        public const string Google = "Google";
        public const string Microsoft = "Microsoft";
        public const string Facebook = "Facebook";
        public const string Twitter = "Twitter";
        public const string GitHub = "GitHub";

        public static ICollection<string> All
        {
            get
            {
                return new string[] { ExternalAuthProviders.Google };
            }
        }
    }
}
