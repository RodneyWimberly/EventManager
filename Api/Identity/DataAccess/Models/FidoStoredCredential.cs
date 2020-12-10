using EventManager.Shared.DataAccess;
using EventManager.Shared.DataAccess.Interfaces;
using Fido2NetLib.Objects;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.Identity.DataAccess.Models
{
    public class FidoStoredCredential : IPrimaryKeyEntity<int>, IAuditableEntity,
            IConcurrencyTrackingEntity, IPermissionEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] UserId { get; set; }
        public byte[] PublicKey { get; set; }
        public byte[] UserHandle { get; set; }
        public uint SignatureCounter { get; set; }
        public string CredType { get; set; }
        public DateTime RegDate { get; set; }
        public Guid AaGuid { get; set; }

        [NotMapped]
        public PublicKeyCredentialDescriptor Descriptor
        {
            get { return string.IsNullOrWhiteSpace(DescriptorJson) ? null : JsonConvert.DeserializeObject<PublicKeyCredentialDescriptor>(DescriptorJson); }
            set { DescriptorJson = JsonConvert.SerializeObject(value); }
        }
        public string DescriptorJson { get; set; }

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
            return permissions;
        }

        public List<Permission> GetAdminPermissions(List<Permission> permissions)
        {
            return permissions;
        }
        #endregion
    }
}
