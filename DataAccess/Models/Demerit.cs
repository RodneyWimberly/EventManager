using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Models
{
    public class Demerit : ApplicationEntityBase
    {
        [Required(ErrorMessage = "{0} is required")]
        [Display(Name = "GuestId", GroupName = "Demerit")]
        public int GuestId { get; set; }

        [Display(Name = "Guest", GroupName = "Demerit")]
        public virtual Guest Guest { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Display(Name = "EventOccurrenceId", GroupName = "Demerit")]
        public int EventOccurrenceId { get; set; }

        [Display(Name = "EventOccurrence", GroupName = "Demerit")]
        public virtual EventOccurrence EventOccurrence { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.DateTime)]
        [Display(Name = "DateTime", GroupName = "Demerit")]
        public DateTime DateTime { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Description", GroupName = "Demerit")]
        public string Description { get; set; }
    }
}