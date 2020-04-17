
using System.ComponentModel.DataAnnotations;

namespace EventManager.DataAccess.Models
{
    public class GuestEventOccurrence : ApplicationEntityBase
    {
        [Required(ErrorMessage = "{0} is required")]
        [Display(Name = "GuestId", GroupName = "GuestEventOccurrence")]
        public int GuestId { get; set; }

        [Display(Name = "Guest", GroupName = "GuestEventOccurrence")]
        public virtual Guest Guest { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Display(Name = "EventOccurrenceId", GroupName = "GuestEventOccurrence")]
        public int EventOccurrenceId { get; set; }

        [Display(Name = "EventOccurrence", GroupName = "GuestEventOccurrence")]
        public virtual EventOccurrence EventOccurrence { get; set; }
    }
}