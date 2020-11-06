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

        [MaxLength(100)]
        public string JobTitle { get; set; }

        [MaxLength(250)]
        public string FullName { get; set; }

        [MaxLength(250)]
        public string Configuration { get; set; }

        [Required]
        [Column(TypeName = "INTEGER")]
        public bool IsEnabled { get; set; }

        [NotMapped]
        public bool IsLockedOut => this.LockoutEnabled && this.LockoutEnd >= DateTimeOffset.UtcNow;

        #region IAuditableEntity
        [Required]
        [MaxLength(36)]
        public string CreatedBy { get; set; }

        [Required]
        [MaxLength(36)]
        public string UpdatedBy { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        [MaxLength(28)]
        public DateTime UpdatedDate { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        [MaxLength(28)]
        public DateTime CreatedDate { get; set; }
        #endregion

        #region IConcurrencyTrackingEntity
        [Timestamp]
        //[Required]
        // [Column(TypeName = "BLOB")]
        public byte[] RowVersion { get; set; }
        #endregion

        /// <summary>
        /// Navigation property for the roles this user belongs to.
        /// </summary>
        public virtual ICollection<ApplicationUserRole> Roles { get; set; }

        /// <summary>
        /// Navigation property for the claims this user possesses.
        /// </summary>
        public virtual ICollection<ApplicationUserClaim> Claims { get; set; }

    }
}
