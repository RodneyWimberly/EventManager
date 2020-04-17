using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Models
{
    public class Notification : ApplicationEntityBase
    {
        public Notification() { }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Header", GroupName = "Notification")]
        public string Header { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(250, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Body", GroupName = "Notification")]
        public string Body { get; set; }

        [Column(TypeName = "INTEGER")]
        [Display(Name = "IsRead", GroupName = "Notification")]
        public bool IsRead { get; set; }

        [Column(TypeName = "INTEGER")]
        [Display(Name = "IsPinned", GroupName = "Notification")]
        public bool IsPinned { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.Date)]
        [Display(Name = "Date", GroupName = "Notification")]
        public DateTime Date { get; set; }
    }
}
