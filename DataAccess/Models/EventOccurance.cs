using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Models
{
    public class EventOccurance : ApplicationEntityBase
    {
        [Required]
        public int EventId { get; set; }
        public virtual Event Event { get; set; }

        [Required]
        public int EventLocationId { get; set; }
        public virtual EventLocation Location { get; set; }

        [Required]
        public int EventScheduleId { get; set; }
        public virtual EventSchedule Schedule { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        [MaxLength(28)]
        public DateTime Date { get; set; }

        [Required]
        [MaxLength(200)]
        public string Lead { get; set; }

        public virtual ICollection<Demerit> Demerits { get; set; }
    }
}