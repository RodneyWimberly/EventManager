using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;

namespace EventManager.Web.ViewModels
{
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public abstract class ApplicationViewModelBase
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [MaxLength(36)]
        [Required]
        public string CreatedBy { get; set; }

        [MaxLength(36)]
        [Required]
        public string UpdatedBy { get; set; }

        [Required]
        public DateTime UpdatedDate { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        public byte[] RowVersion { get; set; }
    }
}
