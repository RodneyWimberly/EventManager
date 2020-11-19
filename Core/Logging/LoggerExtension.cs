using Microsoft.Extensions.Logging;
using System;

namespace EventManager.Core.Logging
{
    public static class LoggerExtension
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
