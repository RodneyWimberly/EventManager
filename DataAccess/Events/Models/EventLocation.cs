using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EventManager.DataAccess.Events.Models
{
    public class EventLocation : EntityBase
    {
        [Required]
        public string EventId { get; set; }
        public virtual Event Event { get; set; }

        public virtual ICollection<EventSchedule> Schedules { get; set; }

        public virtual ICollection<EventOccurance> Occurances { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(250)]
        public string Address1 { get; set; }

        [MaxLength(250)]
        public string Address2 { get; set; }

        [Required]
        [MaxLength(100)]
        public string City { get; set; }

        [Required]
        [MaxLength(2)]
        public string State { get; set; }

        [Required]
        [MaxLength(10)]
        public string ZipCode { get; set; }
    }
}