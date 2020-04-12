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
        [Required]
        public int Id { get; set; }

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

        [Timestamp]
        //[Required]
        [Column(TypeName = "BLOB")]
        public byte[] RowVersion { get; set; }
    }
}
