using EventManager.Shared.Core;
using EventManager.Shared.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.Events.DataAccess.Models
{
    public class EventSchedule : EntityBase
    {
        [Required]
        public string EventId { get; set; }
        public virtual Event Event { get; set; }

        [Required]
        public string EventLocationId { get; set; }
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