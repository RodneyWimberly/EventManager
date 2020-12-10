using EventManager.Shared.DataAccess;
using EventManager.Shared.DataAccess.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EventManager.Identity.DataAccess
{


    namespace Models
    {
        public class Role : IdentityRole, IPrimaryKeyEntity<string>, IAuditableEntity,
            IConcurrencyTrackingEntity, IPermissionEntity
        {
            /// <summary>
            /// Initializes a new instance of <see cref="Role"/>.
            /// </summary>
            /// <remarks>
            /// The Id property is initialized to from a new GUID string value.
            /// </remarks>
            public Role() { }

            /// <summary>
            /// Initializes a new instance of <see cref="Role"/>.
            /// </summary>
            /// <param name="roleName">The role name.</param>
            /// <remarks>
            /// The Id property is initialized to from a new GUID string value.
            /// </remarks>
            public Role(string roleName) : base(roleName) { }

            /// <summary>
            /// Initializes a new instance of <see cref="Role"/>.
            /// </summary>
            /// <param name="roleName">The role name.</param>
            /// <param name="description">Description of the role.</param>
            /// <remarks>
            /// The Id property is initialized to from a new GUID string value.
            /// </remarks>
            public Role(string roleName, string description) : base(roleName)
            {
                Description = description;
            }

            /// <summary>
            /// Gets or sets the description for this role.
            /// </summary>
            [MaxLength(250)]
            public string Description { get; set; }

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

            #region IPermissionEntity
            public List<Permission> GetPermissions(List<Permission> permissions)
            {
                permissions.Add(Permissions.ViewRoles);
                permissions.Add(Permissions.ManageRoles);
                permissions.Add(Permissions.AssignRoles);
                return permissions;
            }

            public List<Permission> GetAdminPermissions(List<Permission> permissions)
            {
                permissions.Add(Permissions.ManageRoles);
                permissions.Add(Permissions.AssignRoles);
                return permissions;
            }
            #endregion

            /// <summary>
            /// Navigation property for the users in this role.
            /// </summary>
            public virtual ICollection<UserRole> Users { get; set; }

            /// <summary>
            /// Navigation property for claims in this role.
            /// </summary>
            public virtual ICollection<RoleClaim> Claims { get; set; }



        }
    }
}