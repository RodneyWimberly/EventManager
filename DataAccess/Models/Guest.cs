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
        [Display(Name = "Demerits", GroupName = "Guest")]
        public virtual ICollection<Demerit> Demerits { get; set; }

        [Display(Name = "Event Occurrences", GroupName = "Guest")]
        public virtual ICollection<GuestEventOccurrence> EventOccurrences { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(25, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Unique Id", GroupName = "Guest")]
        public string UniqueId { get; set; }

        [StringLength(10, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Prefix", GroupName = "Guest")]
        public string Prefix { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "First Name", GroupName = "Guest")]
        public string FirstName { get; set; }

        [StringLength(100, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Middle Name", GroupName = "Guest")]
        public string MiddleName { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Last Name", GroupName = "Guest")]
        public string LastName { get; set; }

        [StringLength(10, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Suffix", GroupName = "Guest")]
        public string Suffix { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "INTEGER")]
        [Display(Name = "Sex", GroupName = "Guest")]
        public Sexes Sex { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.Date)]
        [Display(Name = "Birth Date", GroupName = "Guest")]
        public DateTime BirthDate { get; set; }

        [Phone]
        [StringLength(20, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Phone Number", GroupName = "Guest")]
        public string PhoneNumber { get; set; }

        [EmailAddress]
        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Email Address", GroupName = "Guest")]
        public string EmailAddress { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [PasswordPropertyText]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Password", GroupName = "Guest")]
        public string Password { get; set; }

        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Address1", GroupName = "Guest")]
        public string Address1 { get; set; }

        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Address2", GroupName = "Guest")]
        public string Address2 { get; set; }

        [StringLength(100, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "City", GroupName = "Guest")]
        public string City { get; set; }

        [StringLength(2, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "State", GroupName = "Guest")]
        public string State { get; set; }

        [StringLength(10, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Zip Code", GroupName = "Guest")]
        public string ZipCode { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "INTEGER")]
        [Display(Name = "Established Guest", GroupName = "Guest")]
        public bool EstablishedGuest { get; set; }

        [Column(TypeName = "BLOB")]
        [Display(Name = "Image", GroupName = "Guest")]
        public byte[] Image { get; set; }
    }
}