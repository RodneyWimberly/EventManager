using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EventManager.DataAccess.Models
{
    public class Event : ApplicationEntityBase
    {
        public Event() { }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Name", GroupName = "Event")]
        public string Name { get; set; }

        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Description", GroupName = "Event")]
        public string Description { get; set; }

        [Display(Name = "Locations", GroupName = "Event")]
        public virtual ICollection<EventLocation> Locations { get; set; }

        [Display(Name = "Schedules", GroupName = "Event")]
        public virtual ICollection<EventSchedule> Schedules { get; set; }

        [Display(Name = "Occurrences", GroupName = "Event")]
        public virtual ICollection<EventOccurrence> Occurrences { get; set; }

        [Display(Name = "Services", GroupName = "Event")]
        public virtual ICollection<EventService> Services { get; set; }
    }
}