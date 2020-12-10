using EventManager.Shared.DataAccess;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EventManager.Events.DataAccess.Models
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