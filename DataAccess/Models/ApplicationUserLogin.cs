using EventManager.DataAccess.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Models
{
    public class ApplicationUserLogin : IdentityUserLogin<string>, IAuditableEntity, IConcurrencyTrackingEntity
    {

        #region IAuditableEntity
        [Required(ErrorMessage = "{0} is required")]
        [StringLength(36, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Created By", GroupName = "ApplicationUserLogin")]
        public string CreatedBy { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(36, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Updated By", GroupName = "ApplicationUserLogin")]
        public string UpdatedBy { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.DateTime)]
        [Display(Name = "Updated Date", GroupName = "ApplicationUserLogin")]
        public DateTime UpdatedDate { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.DateTime)]
        [Display(Name = "Created Date", GroupName = "ApplicationUserLogin")]
        public DateTime CreatedDate { get; set; }
        #endregion

        #region IConcurrencyTrackingEntity
        [Timestamp]
        [Column(TypeName = "BLOB")]
        [Display(Name = "Row Version", GroupName = "ApplicationUserLogin")]
        public byte[] RowVersion { get; set; }
        #endregion

    }
}
