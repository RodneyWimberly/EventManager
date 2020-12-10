using System.ComponentModel.DataAnnotations;



namespace EventManager.Events.DataAccess
{
    namespace Models
    {
        public class EventService : EntityBase
        {
            [Required]
            public string EventId { get; set; }
            public virtual Event Event { get; set; }

            [Required]
            public string ServiceId { get; set; }
            public virtual Service Service { get; set; }
        }
    }
}

