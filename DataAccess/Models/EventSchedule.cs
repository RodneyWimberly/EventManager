using EventManager.Core;
using EventManager.DataAccess.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Models
{
    public class EventSchedule : ApplicationEntityBase
    {
        [Required]
        public int EventId { get; set; }
        public virtual Event Event { get; set; }

        [Required]
        public int EventLocationId { get; set; }
        public virtual EventLocation Location { get; set; }

        public virtual ICollection<EventOccurance> Occurances { get; set; }

        [Required]
        [Column(TypeName = "INTEGER")]
        public Days DaysOfTheWeek { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        [MaxLength(28)]
        public DateTime StartDate { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        [MaxLength(28)]
        public DateTime EndDate { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        [MaxLength(8)]
        public TimeOfDay StartTime { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        [MaxLength(8)]
        public TimeOfDay EndTime { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        [MaxLength(8)]
        public TimeOfDay CheckInStartTime { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        [MaxLength(8)]
        public TimeOfDay CheckInEndTime { get; set; }
    }
}