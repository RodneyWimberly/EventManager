using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Models
{
    public class Demerit : ApplicationEntityBase
    {
        [Required]
        public string GuestId { get; set; }
        public virtual Guest Guest { get; set; }

        [Required]
        public string EventOccuranceId { get; set; }
        public virtual EventOccurance EventOccurance { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        [MaxLength(28)]
        public DateTime DateTime { get; set; }

        [Required]
        [MaxLength(250)]
        public string Description { get; set; }
    }
}