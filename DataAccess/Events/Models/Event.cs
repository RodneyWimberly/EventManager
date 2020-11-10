using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EventManager.DataAccess
{
    public static partial class Permissions
    {
        public const string EventsPermissionGroupName = "Event Permissions";
        public static Permission ViewEvents = new Permission("View Events", "events.view", EventsPermissionGroupName, "Permission to view event details");
        public static Permission ManageEvents = new Permission("Manage Events", "events.manage", EventsPermissionGroupName, "Permission to create, delete and modify event details");
        public static Permission ExecuteEvents = new Permission("Execute Events", "events.execute", EventsPermissionGroupName, "Permission to execute events");
    }

    namespace Events.Models
    {
        public class Event : EntityBase
        {
            [Required]
            [MaxLength(100)]
            public string Name { get; set; }

            [MaxLength(250)]
            public string Description { get; set; }

            public virtual ICollection<EventLocation> Locations { get; set; }

            public virtual ICollection<EventSchedule> Schedules { get; set; }

            public virtual ICollection<EventOccurance> Occurances { get; set; }

            public virtual ICollection<EventService> Services { get; set; }

            public override List<Permission> GetPermissions(List<Permission> permissions)
            {
                permissions = base.GetPermissions(permissions);
                permissions.Add(Permissions.ViewEvents);
                permissions.Add(Permissions.ManageEvents);
                permissions.Add(Permissions.ExecuteEvents);
                return permissions;
            }

            public override List<Permission> GetAdminPermissions(List<Permission> permissions)
            {
                permissions = base.GetAdminPermissions(permissions);
                permissions.Add(Permissions.ManageEvents);
                return permissions;
            }
        }
    }
}