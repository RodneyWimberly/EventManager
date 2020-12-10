using EventManager.Identity.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace EventManager.Identity.DataAccess.Fido
{
    public class Fifo2UserTwoFactorTokenProvider : IUserTwoFactorTokenProvider<User>
    {
        public Task<bool> CanGenerateTwoFactorTokenAsync(UserManager<User> manager, User user)
        {
            return Task.FromResult(true);
        }

        public Task<string> GenerateAsync(string purpose, UserManager<User> manager, User user)
        {
            return Task.FromResult("fido2");
        }

        public Task<bool> ValidateAsync(string purpose, string token, UserManager<User> manager, User user)
        {
            return Task.FromResult(true);
        }
    }
}
