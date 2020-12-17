using Consul;
using DnsClient;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Threading;
using System.Threading.Tasks;

namespace EventManager.Shared.Service.Consul
{
    public class Disco : IDisco
    {
        private IDnsQuery _dnsClient;
        private IConsulClient _consulClient;
        public Disco(IDnsQuery dnsClient, IConsulClient consulClient)
        {
            _dnsClient = dnsClient;
            _consulClient = consulClient;
        }

        public async Task<WriteResult> RegisterServiceEndpointWithHealthCheckAsync(string serviceId, string serviceName, string address = "127.0.0.1", int port = 5200)
        {
            return await RegisterServiceEndpointWithHealthCheckAsync(serviceId, serviceName, new Uri($"http://{address}:{port}"));
        }
        public async Task<WriteResult> RegisterServiceEndpointWithHealthCheckAsync(string serviceId, string serviceName, Uri address)
        {
            AgentServiceCheck tcpCheck = new AgentServiceCheck()
            {
                DeregisterCriticalServiceAfter = TimeSpan.FromMinutes(1),
                Interval = TimeSpan.FromSeconds(30),
                TCP = address.ToString()
            };

            AgentServiceCheck httpCheck = new AgentServiceCheck()
            {
                DeregisterCriticalServiceAfter = TimeSpan.FromMinutes(1),
                Interval = TimeSpan.FromSeconds(30),
                HTTP = new Uri(address, "HealthCheck").OriginalString
            };

            return await RegisterServiceEndpointAsync(serviceId, serviceName, address, new[] { tcpCheck, httpCheck });
        }

        public async Task<WriteResult> RegisterServiceEndpointAsync(string serviceId, string serviceName, string address = "127.0.0.1", int port = 5200, params AgentServiceCheck[] serviceChecks)
        {
            return await RegisterServiceEndpointAsync(serviceId, serviceName, new Uri($"{address}:{port}"), serviceChecks);
        }

        public async Task<WriteResult> RegisterServiceEndpointAsync(string serviceId, string serviceName, Uri address, params AgentServiceCheck[] serviceChecks)
        {
            AgentServiceRegistration agentReg = new AgentServiceRegistration()
            {
                Checks = serviceChecks,
                Address = address.Host,
                ID = serviceId,
                Name = serviceName,
                Port = address.Port
            };

            return await _consulClient.Agent.ServiceRegister(agentReg);
        }

        public async Task<WriteResult> DeregisterServiceEndpointAsync(string serviceId)
        {
            return await _consulClient.Agent.ServiceDeregister(serviceId);
        }

        public async Task<string> GetServiceEndpointAsync(string serviceName)
        {
            try
            {
                ServiceHostEntry serviceHostEntry = (await _dnsClient.ResolveServiceAsync("service.consul", serviceName)).FirstOrDefault();
                int index = RandomNumberGenerator.GetInt32(1, serviceHostEntry.AddressList.Count());
                return $"{serviceHostEntry.AddressList[index]}:{serviceHostEntry.Port}";
            }
            catch
            {
                return string.Empty;
            }
        }

        public async Task<QueryResult<CatalogService[]>> GetCatalogServices(string serviceName, CancellationToken cancellationToken = default)
        {
            return await _consulClient.Catalog.Service(serviceName, cancellationToken);
        }

        public async Task<QueryResult<ServiceEntry[]>> GetServiceEntries(string serviceName, string tag = null, bool passingOnly = true, CancellationToken cancellationToken = default)
        {
            return await _consulClient.Health.Service(serviceName, tag, passingOnly, cancellationToken);

        }
    }
}
