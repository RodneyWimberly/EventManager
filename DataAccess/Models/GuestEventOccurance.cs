
using System.ComponentModel.DataAnnotations;

namespace EventManager.DataAccess.Models
{
    public class GuestEventOccurance : ApplicationEntityBase
    {
        [Required]
        public int GuestId { get; set; }
        public virtual Guest Guest { get; set; }

        [Required]
        public int EventOccuranceId { get; set; }
        public virtual EventOccurance EventOccurance { get; set; }
    }
}