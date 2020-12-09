using EventManager.DataAccess.Core.Constants;
using EventManager.DataAccess.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess
{
    public static partial class Permissions
    {
        public static string UsersNamespace = $"{ApplicationValues.RootNamespace}:users";
        public static Permission ViewUsers = new Permission("View Users", $"{UsersNamespace}:{PermissionType.View}", UsersNamespace, "Permission to view other users account details");
        public static Permission ManageUsers = new Permission("Manage Users", $"{UsersNamespace}:{PermissionType.Manage}", UsersNamespace, "Permission to create, delete and modify other users account details");
        public static List<Permission> UsersPermissions = new List<Permission> { ViewUsers, ManageUsers };
    }

    namespace Identity.Models
    {
        public class User : IdentityUser, IPrimaryKeyEntity<string>, IAuditableEntity,
            IConcurrencyTrackingEntity, IPermissionEntity
        {
            public User()
            {

            }

            [NotMapped]
            public virtual string FriendlyName
            {
                get
                {
                    string friendlyName = string.IsNullOrWhiteSpace(FullName) ? UserName : FullName;

                    if (!string.IsNullOrWhiteSpace(JobTitle))
                    {
                        friendlyName = $"{JobTitle} {friendlyName}";
                    }

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
            public bool IsEnabled { get; set; }

            [NotMapped]
            public bool IsLockedOut => LockoutEnabled && LockoutEnd >= DateTimeOffset.UtcNow;

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
                permissions.Add(Permissions.ViewUsers);
                permissions.Add(Permissions.ManageUsers);
                return permissions;
            }

            public List<Permission> GetAdminPermissions(List<Permission> permissions)
            {
                permissions.Add(Permissions.ManageUsers);
                return permissions;
            }
            #endregion

            /// <summary>
            /// Navigation property for the roles this user belongs to.
            /// </summary>
            public virtual ICollection<UserRole> Roles { get; set; }

            /// <summary>
            /// Navigation property for the claims this user possesses.
            /// </summary>
            public virtual ICollection<UserClaim> Claims { get; set; }

        }
    }
}