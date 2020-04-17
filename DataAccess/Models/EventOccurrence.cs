using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Models
{
    public class EventOccurrence : ApplicationEntityBase
    {
        [Required(ErrorMessage = "{0} is required")]
        [Display(Name = "EventId", GroupName = "EventOccurrence")]
        public int EventId { get; set; }

        [Display(Name = "Event", GroupName = "EventOccurrence")]
        public virtual Event Event { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Display(Name = "EventLocationId", GroupName = "EventOccurrence")]
        public int EventLocationId { get; set; }

        [Display(Name = "Location", GroupName = "EventOccurrence")]
        public virtual EventLocation Location { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Display(Name = "EventScheduleId", GroupName = "EventOccurrence")]
        public int EventScheduleId { get; set; }

        [Display(Name = "Schedule", GroupName = "EventOccurrence")]
        public virtual EventSchedule Schedule { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.Date)]
        [Display(Name = "Date", GroupName = "EventOccurrence")]
        public DateTime Date { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(200, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Lead", GroupName = "EventLocation")]
        public string Lead { get; set; }

        [Display(Name = "Demerits", GroupName = "EventOccurrence")]
        public virtual ICollection<Demerit> Demerits { get; set; }
    }
}