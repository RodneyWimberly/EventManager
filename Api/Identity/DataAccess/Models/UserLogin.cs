using EventManager.Shared.DataAccess.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace EventManager.Identity.DataAccess.Models
{
    public class UserLogin : IdentityUserLogin<string>, IAuditableEntity, IConcurrencyTrackingEntity
    {
        #region IAuditableEntity
        [Required]
        [MaxLength(36)]
        public string CreatedBy { get; set; }

        [Required]
        [MaxLength(36)]
        public string UpdatedBy { get; set; }

        [Required]
        public DateTime UpdatedDate { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }
        #endregion

        #region IConcurrencyTrackingEntity
        [Timestamp]
        public byte[] RowVersion { get; set; }
        #endregion
    }
}
