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
        [Required(ErrorMessage = "{0} is required")]
        [Display(Name = "EventId", GroupName = "EventSchedule")]
        public int EventId { get; set; }

        [Display(Name = "Event", GroupName = "EventSchedule")]
        public virtual Event Event { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Display(Name = "EventLocationId", GroupName = "EventSchedule")]
        public int EventLocationId { get; set; }

        [Display(Name = "Location", GroupName = "EventSchedule")]
        public virtual EventLocation Location { get; set; }

        [Display(Name = "Occurrences", GroupName = "EventSchedule")]
        public virtual ICollection<EventOccurrence> Occurrences { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "INTEGER")]
        [Display(Name = "DaysOfTheWeek", GroupName = "EventSchedule")]
        public Days DaysOfTheWeek { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.Date)]
        [Display(Name = "StartDate", GroupName = "EventSchedule")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.Date)]
        [Display(Name = "EndDate", GroupName = "EventSchedule")]
        public DateTime EndDate { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.Time)]
        [Display(Name = "StartTime", GroupName = "EventSchedule")]
        public TimeOfDay StartTime { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.Time)]
        [Display(Name = "EndTime", GroupName = "EventSchedule")]
        public TimeOfDay EndTime { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.Time)]
        [Display(Name = "CheckInStartTime", GroupName = "EventSchedule")]
        public TimeOfDay CheckInStartTime { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.Time)]
        [Display(Name = "CheckInEndTime", GroupName = "EventSchedule")]
        public TimeOfDay CheckInEndTime { get; set; }
    }
}