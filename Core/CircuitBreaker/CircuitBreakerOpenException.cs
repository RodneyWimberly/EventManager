using System;

namespace EventManager.Core.CircuitBreaker
{
    [Serializable]
    public class CircuitBreakerOpenException : Exception
    {
        public const string ExceptionMessage = "The circuit breaker for this action is currently in the open state due to an underlying failure.This action can be retried after a short timeout period has occurred. Please try again later.";
        public CircuitBreakerOpenException() : base(ExceptionMessage) { }
        public CircuitBreakerOpenException(string message) : base(message) { }
        public CircuitBreakerOpenException(Exception inner) : base(ExceptionMessage, inner) { }
        public CircuitBreakerOpenException(string message, Exception inner) : base(message, inner) { }

        protected CircuitBreakerOpenException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
