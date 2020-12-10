using EventManager.Shared.DataAccess;
using EventManager.Shared.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.Events.DataAccess.Models
{
    public abstract class EntityBase : IPrimaryKeyEntity<string>, IAuditableEntity, IPermissionEntity
    {
        #region IPrimaryKeyEntity<string>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public string Id { get; set; }
        #endregion

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


        #region IPermissionEntity
        public virtual List<Permission> GetPermissions(List<Permission> permissions)
        {
            return permissions;
        }

        public virtual List<Permission> GetAdminPermissions(List<Permission> permissions)
        {
            return permissions;
        }


        #endregion
    }
}
