using EventManager.Identity.Shared.Configuration.Identity;
using EventManager.Identity.STS.Identity.Configuration.Interfaces;

namespace EventManager.Identity.STS.Identity.Configuration
{
    public class RootConfiguration : IRootConfiguration
    {      
        public AdminConfiguration AdminConfiguration { get; } = new AdminConfiguration();
        public RegisterConfiguration RegisterConfiguration { get; } = new RegisterConfiguration();
    }
}





