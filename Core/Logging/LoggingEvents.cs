using Microsoft.Extensions.Logging;

namespace EventManager.Core.Logging
{
    public static class LoggingEvents
    {
        public static readonly EventId MigratingDatabase = new EventId(101, "Error whilst migrating database");
        public static readonly EventId SeedingDatabase = new EventId(102, "Error whilst seeding database");
        public static readonly EventId SendEmail = new EventId(201, "Error whilst sending email");
    }

}
