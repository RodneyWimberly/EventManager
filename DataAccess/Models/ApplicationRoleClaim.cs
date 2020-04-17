using EventManager.DataAccess.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Models
{
    public class ApplicationRoleClaim : IdentityRoleClaim<string>, IAuditableEntity, IConcurrencyTrackingEntity
    {

        #region IAuditableEntity
        [Required(ErrorMessage = "{0} is required")]
        [StringLength(36, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Created By", GroupName = "ApplicationRoleClaim")]
        public string CreatedBy { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(36, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Updated By", GroupName = "ApplicationRoleClaim")]
        public string UpdatedBy { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.DateTime)]
        [Display(Name = "Updated Date", GroupName = "ApplicationRoleClaim")]
        public DateTime UpdatedDate { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.DateTime)]
        [Display(Name = "Created Date", GroupName = "ApplicationRoleClaim")]
        public DateTime CreatedDate { get; set; }
        #endregion

        #region IConcurrencyTrackingEntity
        [Timestamp]
        [Column(TypeName = "BLOB")]
        [Display(Name = "Row Version", GroupName = "ApplicationRoleClaim")]
        public byte[] RowVersion { get; set; }
        #endregion

    }
}
