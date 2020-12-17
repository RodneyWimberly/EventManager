using EventManager.Identity.STS.Identity.Configuration;
using System.ComponentModel.DataAnnotations;
using EventManager.Identity.Shared.Configuration.Identity;

namespace EventManager.Identity.STS.Identity.ViewModels.Account
{
    public class ForgotPasswordViewModel
    {
        [Required]
        public LoginResolutionPolicy? Policy { get; set; }
        //[Required]
        [EmailAddress]
        public string Email { get; set; }

        public string Username { get; set; }
    }
}






