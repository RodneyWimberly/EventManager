using EventManager.DataAccess.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace EventManager.DataAccess.Identity.Models
{
    public class UserClaim : IdentityUserClaim<string>, IAuditableEntity, IConcurrencyTrackingEntity
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
