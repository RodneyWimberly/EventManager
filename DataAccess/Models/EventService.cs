using System.ComponentModel.DataAnnotations;

namespace EventManager.DataAccess.Models
{

    public class EventService : ApplicationEntityBase
    {
        [Required(ErrorMessage = "{0} is required")]
        [Display(Name = "EventId", GroupName = "EventService")]
        public int EventId { get; set; }

        [Display(Name = "Event", GroupName = "EventService")]
        public virtual Event Event { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Display(Name = "ServiceId", GroupName = "EventService")]
        public int ServiceId { get; set; }

        [Display(Name = "Service", GroupName = "EventService")]
        public virtual Service Service { get; set; }
    }
}