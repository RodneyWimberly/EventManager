using Consul;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace EventManager.Shared.Service.Consul
{
    public interface IDisco
    {
        Task<WriteResult> DeregisterServiceEndpointAsync(string serviceId);
        Task<QueryResult<CatalogService[]>> GetCatalogServices(string serviceName, CancellationToken cancellationToken = default);
        Task<string> GetServiceEndpointAsync(string serviceName);
        Task<QueryResult<ServiceEntry[]>> GetServiceEntries(string serviceName, string tag = null, bool passingOnly = true, CancellationToken cancellationToken = default);
        Task<WriteResult> RegisterServiceEndpointAsync(string serviceId, string serviceName, string address = "127.0.0.1", int port = 5200, params AgentServiceCheck[] serviceChecks);
        Task<WriteResult> RegisterServiceEndpointAsync(string serviceId, string serviceName, Uri address, params AgentServiceCheck[] serviceChecks);
        Task<WriteResult> RegisterServiceEndpointWithHealthCheckAsync(string serviceId, string serviceName, string address = "127.0.0.1", int port = 5200);
        Task<WriteResult> RegisterServiceEndpointWithHealthCheckAsync(string serviceId, string serviceName, Uri address);
    }
}