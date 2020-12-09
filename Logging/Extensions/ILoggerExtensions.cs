using Microsoft.Extensions.Logging;
using System;

namespace EventManager.Logging.ServiceClient.Extensions
{
    public static class ILoggerExtensions
    {
        public static IDisposable BeginScope(this ILogger logger)
        {
            if (logger == null)
            {
                throw new ArgumentNullException(nameof(logger));
            }

            LoggerState state = new LoggerState(null);
            return logger.BeginScope(state);
        }
    }
}
