
using System.ComponentModel.DataAnnotations;

namespace EventManager.Events.DataAccess.Models
{
    public class GuestEventOccurance : EntityBase
    {
        [Required]
        public string GuestId { get; set; }
        public virtual Guest Guest { get; set; }

        [Required]
        public string EventOccuranceId { get; set; }
        public virtual EventOccurance EventOccurance { get; set; }
    }
}