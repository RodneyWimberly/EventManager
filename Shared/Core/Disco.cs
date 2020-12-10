using DnsClient;
using System.Linq;
using System.Threading.Tasks;

namespace EventManager.Shared.Core
{
    public class Disco
    {
        public static ILookupClient Client { get; set; }
        public Disco() { }

        public static async Task<string> GetServiceEndpointAsync(string hostName)
        {
            try
            {
                ServiceHostEntry serviceHostEntry = (await Client.ResolveServiceAsync("service.consul", hostName)).FirstOrDefault();
                return $"{serviceHostEntry.AddressList.FirstOrDefault()}:{serviceHostEntry.Port}";
            }
            catch
            {
                return string.Empty;
            }
        }
    }
}
