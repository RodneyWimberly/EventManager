using System;
using System.Collections.Concurrent;
using System.Web.Http.Controllers;

namespace EventManager.Core.CircuitBreaker
{
    public static class CircuitBreakerPanel
    {
        private static readonly object _lock = new object();
        private static readonly ConcurrentDictionary<string, Circuit> _circuits = new ConcurrentDictionary<string, Circuit>();

        public static CircuitConfiguration DefaultConfiguration { get; set; } = new CircuitConfiguration
        {
            FailureThreshold = 3,
            SuccessThreshold = 3,
            FailureTimeout = 1000
        };

        public static Circuit GetCircuit(HttpActionContext action, CircuitConfiguration configuration = null)
        {
            if (action == null)
                throw new ArgumentNullException(nameof(action));

            Circuit circuit = null;
            lock (_lock)
            {
                circuit = _circuits.GetOrAdd(action.ActionDescriptor.ActionName, new Circuit(action, configuration ?? DefaultConfiguration));
            }

            return circuit;
        }
    }
}
