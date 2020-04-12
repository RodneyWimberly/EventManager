using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventManager.Core.Logging
{
    public static class LoggerExtension
    {
        public static IDisposable BeginScope(this ILogger logger)
        {
            LoggerState state = new LoggerState(null);
            return logger.BeginScope(state);
        }
    }
}
