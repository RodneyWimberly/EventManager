using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EventManager.DataAccess.Events.Models
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
    }
}