using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EventManager.DataAccess.Models
{
    public class EventLocation : ApplicationEntityBase
    {
        [Required(ErrorMessage = "{0} is required")]
        [Display(Name = "EventId", GroupName = "EventLocation")]
        public int EventId { get; set; }

        [Display(Name = "Event", GroupName = "EventLocation")]
        public virtual Event Event { get; set; }

        [Display(Name = "Schedules", GroupName = "EventLocation")]
        public virtual ICollection<EventSchedule> Schedules { get; set; }

        [Display(Name = "Occurrences", GroupName = "EventLocation")]
        public virtual ICollection<EventOccurrence> Occurrences { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Name", GroupName = "EventLocation")]
        public string Name { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(250, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Address1", GroupName = "EventLocation")]
        public string Address1 { get; set; }

        [StringLength(250, MinimumLength = 1, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Address2", GroupName = "EventLocation")]
        public string Address2 { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "City", GroupName = "EventLocation")]
        public string City { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(2, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "State", GroupName = "EventLocation")]
        public string State { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(10, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "ZipCode", GroupName = "EventLocation")]
        public string ZipCode { get; set; }
    }
}