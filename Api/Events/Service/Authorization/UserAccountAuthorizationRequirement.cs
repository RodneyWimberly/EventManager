using Microsoft.AspNetCore.Authorization;

namespace EventManager.Events.Service.Authorization
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