using EventManager.Identity.DataAccess.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EventManager.Identity.DataAccess
{
    public interface IIdentityManager
    {
        Task<bool> CheckPasswordAsync(User user, string password);
        Task<(bool Succeeded, string[] Errors)> CreateRoleAsync(Role role, IEnumerable<string> claims);
        Task<(bool Succeeded, string[] Errors)> CreateUserAsync(User user, IEnumerable<string> roles, string password);
        Task<(bool Succeeded, string[] Errors)> DeleteRoleAsync(Role role);
        Task<(bool Succeeded, string[] Errors)> DeleteRoleAsync(string roleName);
        Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(User user);
        Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(string userId);
        Task<Role> GetRoleByIdAsync(string roleId);
        Task<Role> GetRoleByNameAsync(string roleName);
        Task<Role> GetRoleLoadRelatedAsync(string roleName);
        Task<List<Role>> GetRolesLoadRelatedAsync(int page, int pageSize);
        Task<(User User, string[] Roles)?> GetUserAndRolesAsync(string userId);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByIdAsync(string userId);
        Task<User> GetUserByUserNameAsync(string userName);
        Task<IList<string>> GetUserRolesAsync(User user);
        Task<List<(User user, string[] roles)>> GetUsersAndRolesAsync(int page, int pageSize);
        Task<(bool Succeeded, string[] Errors)> ResetPasswordAsync(User user, string newPassword);
        Task<bool> TestCanDeleteRoleAsync(string roleId);
        Task<bool> TestCanDeleteUserAsync(string userId);
        Task<(bool Succeeded, string[] Errors)> UpdatePasswordAsync(User user, string currentPassword, string newPassword);
        Task<(bool Succeeded, string[] Errors)> UpdateRoleAsync(Role role, IEnumerable<string> claims);
        Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(User user);
        Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(User user, IEnumerable<string> roles);
    }
}
