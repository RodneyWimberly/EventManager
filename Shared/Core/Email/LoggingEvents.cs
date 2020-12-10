using Microsoft.Extensions.Logging;

namespace EventManager.Shared.Core.Email
{
    public static class LoggingEvents
    {
        public static readonly EventId SendEmail = new EventId(201, "Error whilst sending email");
    }
}
