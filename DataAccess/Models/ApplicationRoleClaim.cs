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
        [Column(TypeName = "BLOB")]
        public byte[] RowVersion { get; set; }
        #endregion
    }
}
