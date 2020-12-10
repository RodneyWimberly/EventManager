using EventManager.Shared.DataAccess;
using EventManager.Shared.DataAccess.Constants;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace EventManager.Events.Service.Authorization
{
    public class ViewRoleAuthorizationHandler : AuthorizationHandler<ViewRoleAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ViewRoleAuthorizationRequirement requirement, string roleName)
        {
            if (context.User == null)
            {
                return Task.CompletedTask;
            }

            if (context.User.HasClaim(Claims.Permission, Permissions.ViewRoles) || context.User.IsInRole(roleName))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
