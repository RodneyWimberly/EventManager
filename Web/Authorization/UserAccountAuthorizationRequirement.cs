using Microsoft.AspNetCore.Authorization;

namespace EventManager.Web.Authorization
{
    public class UserAccountAuthorizationRequirement : IAuthorizationRequirement
    {
        public UserAccountAuthorizationRequirement(string operationName)
        {
            OperationName = operationName;
        }


        public string OperationName { get; private set; }
    }
}