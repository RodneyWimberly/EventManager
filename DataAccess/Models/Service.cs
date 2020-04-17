using EventManager.DataAccess.Core.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Models
{

    public class Service : ApplicationEntityBase
    {
        [Required(ErrorMessage = "{0} is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Name", GroupName = "Service")]
        public string Name { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(250, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Description", GroupName = "Service")]
        public string Description { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "INTEGER")]
        [Display(Name = "Service Type", GroupName = "Service")]
        public ServiceTypes ServiceType { get; set; }

        [Display(Name = "Event Services", GroupName = "Service")]
        public virtual ICollection<EventService> EventServices { get; set; }
    }
}