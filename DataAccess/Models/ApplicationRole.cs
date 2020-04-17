using EventManager.DataAccess.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Models
{
    public class ApplicationRole : IdentityRole, IPrimaryKeyEntity<string>, IAuditableEntity, IConcurrencyTrackingEntity
    {
        /// <summary>
        /// Initializes a new instance of <see cref="ApplicationRole"/>.
        /// </summary>
        /// <remarks>
        /// The Id property is initialized to from a new GUID string value.
        /// </remarks>
        public ApplicationRole()
        {

        }

        /// <summary>
        /// Initializes a new instance of <see cref="ApplicationRole"/>.
        /// </summary>
        /// <param name="roleName">The role name.</param>
        /// <remarks>
        /// The Id property is initialized to from a new GUID string value.
        /// </remarks>
        public ApplicationRole(string roleName) : base(roleName)
        {

        }


        /// <summary>
        /// Initializes a new instance of <see cref="ApplicationRole"/>.
        /// </summary>
        /// <param name="roleName">The role name.</param>
        /// <param name="description">Description of the role.</param>
        /// <remarks>
        /// The Id property is initialized to from a new GUID string value.
        /// </remarks>
        public ApplicationRole(string roleName, string description) : base(roleName)
        {
            Description = description;
        }

        /// <summary>
        /// Gets or sets the description for this role.
        /// </summary>
        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Description", GroupName = "ApplicationRole")]
        public string Description { get; set; }

        #region IAuditableEntity
        [Required(ErrorMessage = "{0} is required")]
        [StringLength(36, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Created By", GroupName = "ApplicationRole")]
        public string CreatedBy { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(36, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Updated By", GroupName = "ApplicationRole")]
        public string UpdatedBy { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.DateTime)]
        [Display(Name = "Updated Date", GroupName = "ApplicationRole")]
        public DateTime UpdatedDate { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.DateTime)]
        [Display(Name = "Created Date", GroupName = "ApplicationRole")]
        public DateTime CreatedDate { get; set; }
        #endregion

        #region IConcurrencyTrackingEntity
        [Timestamp]
        [Column(TypeName = "BLOB")]
        [Display(Name = "Row Version", GroupName = "ApplicationRole")]
        public byte[] RowVersion { get; set; }
        #endregion

        /// <summary>
        /// Navigation property for the users in this role.
        /// </summary>
        [Display(Name = "Users", GroupName = "ApplicationRole")]
        public virtual ICollection<ApplicationUserRole> Users { get; set; }

        /// <summary>
        /// Navigation property for claims in this role.
        /// </summary>
        [Display(Name = "Claims", GroupName = "ApplicationRole")]
        public virtual ICollection<ApplicationRoleClaim> Claims { get; set; }
    }
}
