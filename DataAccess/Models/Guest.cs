using EventManager.DataAccess.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventManager.DataAccess.Models
{
    public class Guest : ApplicationEntityBase
    {
        public virtual ICollection<Demerit> Demerits { get; set; }

        public virtual ICollection<GuestEventOccurance> EventOccurances { get; set; }

        [Required]
        [MaxLength(25)]
        public string UniqueId { get; set; }

        [MaxLength(10)]
        public string Prefix { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [MaxLength(100)]
        public string MiddleName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [MaxLength(10)]
        public string Suffix { get; set; }

        [Required]
        [Column(TypeName = "INTEGER")]
        public Sexes Sex { get; set; }

        [Required]
        [Column(TypeName = "TEXT")]
        [MaxLength(28)]
        public DateTime BirthDate { get; set; }

        [Phone]
        [MaxLength(20)]
        public string PhoneNumber { get; set; }

        [EmailAddress]
        [MaxLength(250)]
        public string EmailAddress { get; set; }

        [Required]
        [PasswordPropertyText]
        [MaxLength(100)]
        public string Password { get; set; }

        [MaxLength(250)]
        public string Address1 { get; set; }

        [MaxLength(250)]
        public string Address2 { get; set; }

        [MaxLength(100)]
        public string City { get; set; }

        [MaxLength(2)]
        public string State { get; set; }

        [MaxLength(10)]
        public string ZipCode { get; set; }

        [Required]
        [Column(TypeName = "INTEGER")]
        public bool EstablishedGuest { get; set; }

        [Column(TypeName = "BLOB")]
        public byte[] Image { get; set; }
    }
}