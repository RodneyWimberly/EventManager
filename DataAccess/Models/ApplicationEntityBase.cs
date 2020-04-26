using EventManager.DataAccess.Core.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Models
{
    public abstract class ApplicationEntityBase : IPrimaryKeyEntity<int>, IAuditableEntity, IConcurrencyTrackingEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required(ErrorMessage = "{0} is required")]
        [Display(Name = "Id", GroupName = "ApplicationEntityBase")]
        public int Id { get; set; }

        //[Required(ErrorMessage = "{0} is required")]
        [StringLength(36, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Created By", GroupName = "ApplicationEntityBase")]
        public string CreatedBy { get; set; }

        //[Required(ErrorMessage = "{0} is required")]
        [StringLength(36, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Updated By", GroupName = "ApplicationEntityBase")]
        public string UpdatedBy { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [Display(Name = "Updated Date", GroupName = "ApplicationEntityBase")]
        public DateTime UpdatedDate { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [Display(Name = "Created Date", GroupName = "ApplicationEntityBase")]
        public DateTime CreatedDate { get; set; }

        [Timestamp]
        [Column(TypeName = "BLOB")]
        [Display(Name = "Row Version", GroupName = "ApplicationEntityBase")]
        public byte[] RowVersion { get; set; }
    }
}
