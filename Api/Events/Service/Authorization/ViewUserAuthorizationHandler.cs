using EventManager.Shared.DataAccess;
using EventManager.Shared.DataAccess.Constants;
using EventManager.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EventManager.Events.Service.Authorization
{
    public class ViewUserAuthorizationHandler : AuthorizationHandler<UserAccountAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, UserAccountAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User == null || requirement.OperationName != AccountManagementOperations.ReadOperationName)
            {
                return Task.CompletedTask;
            }

            if (context.User.HasClaim(Claims.Permission, Permissions.ViewUsers) || GetIsSameUser(context.User, targetUserId))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }


        private bool GetIsSameUser(ClaimsPrincipal user, string targetUserId)
        {
            if (string.IsNullOrWhiteSpace(targetUserId))
            {
                return false;
            }

            return ClaimsPrincipalExtensions.GetUserId(user) == targetUserId;
        }
    }
}