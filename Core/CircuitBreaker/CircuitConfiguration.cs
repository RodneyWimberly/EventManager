namespace EventManager.Core.CircuitBreaker
{
    public class CircuitConfiguration
    {
        public int FailureCount { get; set; }
        public int FailureThreshold { get; set; } = 3;
        public int SuccessCount { get; set; }
        public int SuccessThreshold { get; set; } = 3;
        public int FailureTimeout { get; set; } = 1000;
    }
}
