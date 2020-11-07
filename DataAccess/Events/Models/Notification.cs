using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Events.Models
{
    public class Notification : EntityBase
    {
        [Required]
        [MaxLength(100)]
        public string Header { get; set; }

        [Required]
        [MaxLength(250)]
        public string Body { get; set; }

        [Column(TypeName = "INTEGER")]
        public bool IsRead { get; set; }

        [Column(TypeName = "INTEGER")]
        public bool IsPinned { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        [MaxLength(28)]
        public DateTime Date { get; set; }

        public Notification()
        {

        }

        public Notification(string id, string header, string body, bool isRead, bool isPinned, DateTime date)
        {
            Id = id;
            Header = header;
            Body = body;
            IsRead = isRead;
            IsPinned = isPinned;
            Date = date;
        }
    }
}
