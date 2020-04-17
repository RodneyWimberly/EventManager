using EventManager.DataAccess.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Models
{
    public class ApplicationUser : IdentityUser, IPrimaryKeyEntity<string>, IAuditableEntity, IConcurrencyTrackingEntity
    {
        public ApplicationUser()
        {

        }

        [NotMapped]
        [Display(Name = "Friendly Name", GroupName = "ApplicationUser")]
        public virtual string FriendlyName
        {
            get
            {
                string friendlyName = string.IsNullOrWhiteSpace(FullName) ? UserName : FullName;

                if (!string.IsNullOrWhiteSpace(JobTitle))
                    friendlyName = $"{JobTitle} {friendlyName}";

                return friendlyName;
            }
        }

        [StringLength(100, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Job Title", GroupName = "ApplicationUser")]
        public string JobTitle { get; set; }

        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Full Name", GroupName = "ApplicationUser")]
        public string FullName { get; set; }

        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Configuration", GroupName = "ApplicationUser")]
        public string Configuration { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "INTEGER")]
        [Display(Name = "IsEnabled", GroupName = "ApplicationUser")]
        public bool IsEnabled { get; set; }

        [NotMapped]
        [Display(Name = "IsLockedOut", GroupName = "ApplicationUser")]
        public bool IsLockedOut => this.LockoutEnabled && this.LockoutEnd >= DateTimeOffset.UtcNow;


        #region IAuditableEntity
        [Required(ErrorMessage = "{0} is required")]
        [StringLength(36, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Created By", GroupName = "ApplicationUser")]
        public string CreatedBy { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(36, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Updated By", GroupName = "ApplicationUser")]
        public string UpdatedBy { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.DateTime)]
        [Display(Name = "Updated Date", GroupName = "ApplicationUser")]
        public DateTime UpdatedDate { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.DateTime)]
        [Display(Name = "Created Date", GroupName = "ApplicationUser")]
        public DateTime CreatedDate { get; set; }
        #endregion

        #region IConcurrencyTrackingEntity
        [Timestamp]
        [Column(TypeName = "BLOB")]
        [Display(Name = "Row Version", GroupName = "ApplicationUser")]
        public byte[] RowVersion { get; set; }
        #endregion


        /// <summary>
        /// Navigation property for the roles this user belongs to.
        /// </summary>
        [Display(Name = "Roles", GroupName = "ApplicationUser")]
        public virtual ICollection<ApplicationUserRole> Roles { get; set; }

        /// <summary>
        /// Navigation property for the claims this user possesses.
        /// </summary>
        [Display(Name = "Claims", GroupName = "ApplicationUser")]
        public virtual ICollection<ApplicationUserClaim> Claims { get; set; }

    }
}
