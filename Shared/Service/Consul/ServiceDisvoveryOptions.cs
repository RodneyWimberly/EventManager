namespace EventManager.Shared.Service.Consul
{
    public class ServiceDisvoveryOptions
    {
        public string ServiceName { get; set; }

        public ConsulOptions Consul { get; set; }
    }
}
