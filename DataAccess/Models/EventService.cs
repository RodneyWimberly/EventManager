using System.ComponentModel.DataAnnotations;

namespace EventManager.DataAccess.Models
{

    public class EventService : ApplicationEntityBase
    {
        [Required]
        public string EventId { get; set; }
        public virtual Event Event { get; set; }

        [Required]
        public string ServiceId { get; set; }
        public virtual Service Service { get; set; }
    }
}