using EventManager.DataAccess;
using EventManager.DataAccess.Core.Constants;
using EventManager.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EventManager.Web.Authorization
{
    public class ManageUserAuthorizationHandler : AuthorizationHandler<UserAccountAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, UserAccountAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User == null ||
                (requirement.OperationName != AccountManagementOperations.CreateOperationName &&
                 requirement.OperationName != AccountManagementOperations.UpdateOperationName &&
                 requirement.OperationName != AccountManagementOperations.DeleteOperationName))
            {
                return Task.CompletedTask;
            }

            if (context.User.HasClaim(Claims.Permission, Permissions.ManageUsers) || GetIsSameUser(context.User, targetUserId))
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

            return Utilities.GetUserId(user) == targetUserId;
        }
    }
}