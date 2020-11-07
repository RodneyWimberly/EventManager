using EventManager.DataAccess.Core.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Events.Models
{
    public class Service : EntityBase
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(250)]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "INTEGER")]
        public ServiceTypes ServiceType { get; set; }

        public virtual ICollection<EventService> EventServices { get; set; }
    }
}