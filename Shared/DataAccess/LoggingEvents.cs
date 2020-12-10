using Microsoft.Extensions.Logging;

namespace EventManager.Shared.DataAccess
{
    public static partial class LoggingEvents
    {
        public static readonly EventId MigratingDatabase = new EventId(101, "Error whilst migrating database");
        public static readonly EventId SeedingDatabase = new EventId(102, "Error whilst seeding database");
    }

}
