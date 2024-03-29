﻿using AutoMapper;
using EventManager.Events.Service.Authorization;
using EventManager.Events.Service.ViewModels;
using EventManager.Identity.DataAccess;
using EventManager.Identity.DataAccess.Models;
using EventManager.Shared.DataAccess;
using EventManager.Web.Helpers;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventManager.Events.Service.Controllers.v1_0
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(IgnoreApi = false, GroupName = "Account v1.0")]
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    //[Route("api/[controller]")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase

    {
        private readonly IIdentityManager _identityManager;
        protected readonly IConfiguration _configuration;
        protected readonly IMapper _mapper;
        protected readonly IAuthorizationService _authorizationService;
        protected readonly ILogger _logger;
        private const string GetUserByIdActionName = "GetUserById";
        private const string GetRoleByIdActionName = "GetRoleById";

        public AccountController(IMapper mapper,
            IAuthorizationService authorizationService,
            ILogger<AccountController> logger,
            IConfiguration configuration,
            IIdentityManager identityManager)
        {
            _mapper = mapper;
            _authorizationService = authorizationService;
            _logger = logger;
            _configuration = configuration;
            _identityManager = identityManager;
        }

        [AllowAnonymous]
        [HttpGet("health")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Health()
        {
            return Ok();
        }

        [HttpGet("users/me")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserViewModel))]
        public async Task<IActionResult> GetCurrentUser()
        {
            return await GetUserById(ClaimsPrincipalExtensions.GetUserId(User));
        }

        [HttpGet("users/{id}", Name = GetUserByIdActionName)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserViewModel))]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUserById(string id)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, id, AccountManagementOperations.Read)).Succeeded)
            {
                return new ChallengeResult();
            }

            UserViewModel userVM = await GetUserViewModelHelper(id);

            if (userVM != null)
            {
                return Ok(userVM);
            }
            else
            {
                return NotFound(id);
            }
        }

        [HttpGet("users/username/{userName}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserViewModel))]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUserByUserName(string userName)
        {
            User appUser = await _identityManager.GetUserByUserNameAsync(userName);

            if (!(await _authorizationService.AuthorizeAsync(User, appUser?.Id ?? "", AccountManagementOperations.Read)).Succeeded)
            {
                return new ChallengeResult();
            }

            if (appUser == null)
            {
                return NotFound(userName);
            }

            return await GetUserById(appUser.Id);
        }

        [HttpGet("users")]
        [Authorize(Authorization.Policies.ViewAllUsersPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<UserViewModel>))]
        public async Task<IActionResult> GetUsers()
        {
            return await GetUsers(-1, -1);
        }

        [HttpGet("users/{pageNumber:int}/{pageSize:int}")]
        [Authorize(Authorization.Policies.ViewAllUsersPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<UserViewModel>))]
        public async Task<IActionResult> GetUsers(int pageNumber, int pageSize)
        {
            List<(User User, string[] Roles)> usersAndRoles = await _identityManager.GetUsersAndRolesAsync(pageNumber, pageSize);

            List<UserViewModel> usersVM = new List<UserViewModel>();

            foreach ((User User, string[] Roles) item in usersAndRoles)
            {
                UserViewModel userVM = _mapper.Map<UserViewModel>(item.User);
                userVM.Roles = item.Roles;

                usersVM.Add(userVM);
            }

            return Ok(usersVM);
        }

        [HttpPut("users/me")]
        [ProducesResponseType(204)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> UpdateCurrentUser([FromBody] UserEditViewModel user)
        {
            return await UpdateUser(ClaimsPrincipalExtensions.GetUserId(User), user);
        }

        [HttpPut("users/{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UserEditViewModel user)
        {
            User appUser = await _identityManager.GetUserByIdAsync(id);
            string[] currentRoles = appUser != null ? (await _identityManager.GetUserRolesAsync(appUser)).ToArray() : null;

            Task<AuthorizationResult> manageUsersPolicy = _authorizationService.AuthorizeAsync(User, id, AccountManagementOperations.Update);
            Task<AuthorizationResult> assignRolePolicy = _authorizationService.AuthorizeAsync(User, (user.Roles, currentRoles), Authorization.Policies.AssignAllowedRolesPolicy);


            if ((await Task.WhenAll(manageUsersPolicy, assignRolePolicy)).Any(r => !r.Succeeded))
            {
                return new ChallengeResult();
            }

            if (ModelState.IsValid)
            {
                if (user == null)
                {
                    return BadRequest($"{nameof(user)} cannot be null");
                }

                if (!string.IsNullOrWhiteSpace(user.Id) && id != user.Id)
                {
                    return BadRequest("Conflicting user id in parameter and model data");
                }

                if (appUser == null)
                {
                    return NotFound(id);
                }

                bool isPasswordChanged = !string.IsNullOrWhiteSpace(user.NewPassword);
                bool isUserNameChanged = !appUser.UserName.Equals(user.UserName, StringComparison.OrdinalIgnoreCase);

                if (ClaimsPrincipalExtensions.GetUserId(User) == id)
                {
                    if (string.IsNullOrWhiteSpace(user.CurrentPassword))
                    {
                        if (isPasswordChanged)
                        {
                            AddError("Current password is required when changing your own password", "Password");
                        }

                        if (isUserNameChanged)
                        {
                            AddError("Current password is required when changing your own username", "Username");
                        }
                    }
                    else if (isPasswordChanged || isUserNameChanged)
                    {
                        if (!await _identityManager.CheckPasswordAsync(appUser, user.CurrentPassword))
                        {
                            AddError("The username/password couple is invalid.");
                        }
                    }
                }

                if (ModelState.IsValid)
                {
                    _mapper.Map<UserEditViewModel, User>(user, appUser);

                    (bool Succeeded, string[] Errors) result = await _identityManager.UpdateUserAsync(appUser, user.Roles);
                    if (result.Succeeded)
                    {
                        if (isPasswordChanged)
                        {
                            if (!string.IsNullOrWhiteSpace(user.CurrentPassword))
                            {
                                result = await _identityManager.UpdatePasswordAsync(appUser, user.CurrentPassword, user.NewPassword);
                            }
                            else
                            {
                                result = await _identityManager.ResetPasswordAsync(appUser, user.NewPassword);
                            }
                        }

                        if (result.Succeeded)
                        {
                            return NoContent();
                        }
                    }

                    AddError(result.Errors);
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPatch("users/me")]
        [ProducesResponseType(204)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateCurrentUser([FromBody] JsonPatchDocument<UserPatchViewModel> patch)
        {
            return await UpdateUser(ClaimsPrincipalExtensions.GetUserId(User), patch);
        }

        [HttpPatch("users/{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] JsonPatchDocument<UserPatchViewModel> patch)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, id, AccountManagementOperations.Update)).Succeeded)
            {
                return new ChallengeResult();
            }

            if (ModelState.IsValid)
            {
                if (patch == null)
                {
                    return BadRequest($"{nameof(patch)} cannot be null");
                }

                User appUser = await _identityManager.GetUserByIdAsync(id);

                if (appUser == null)
                {
                    return NotFound(id);
                }

                UserPatchViewModel userPVM = _mapper.Map<UserPatchViewModel>(appUser);
                patch.ApplyTo(userPVM, (e) => AddError(e.ErrorMessage));

                if (ModelState.IsValid)
                {
                    _mapper.Map<UserPatchViewModel, User>(userPVM, appUser);

                    (bool Succeeded, string[] Errors) result = await _identityManager.UpdateUserAsync(appUser);
                    if (result.Succeeded)
                    {
                        return NoContent();
                    }

                    AddError(result.Errors);
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPost("users")]
        [Authorize(Authorization.Policies.ManageAllUsersPolicy)]
        [ProducesResponseType(201, Type = typeof(UserViewModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> Register([FromBody] UserEditViewModel user)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, (user.Roles, new string[] { }), Authorization.Policies.AssignAllowedRolesPolicy)).Succeeded)
            {
                return new ChallengeResult();
            }

            if (ModelState.IsValid)
            {
                if (user == null)
                {
                    return BadRequest($"{nameof(user)} cannot be null");
                }

                User appUser = _mapper.Map<User>(user);

                (bool Succeeded, string[] Errors) result = await _identityManager.CreateUserAsync(appUser, user.Roles, user.NewPassword);
                if (result.Succeeded)
                {
                    UserViewModel userVM = await GetUserViewModelHelper(appUser.Id);
                    return CreatedAtAction(GetUserByIdActionName, new { id = userVM.Id }, userVM);
                }

                AddError(result.Errors);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("users/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserViewModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, id, AccountManagementOperations.Delete)).Succeeded)
            {
                return new ChallengeResult();
            }

            User appUser = await _identityManager.GetUserByIdAsync(id);

            if (appUser == null)
            {
                return NotFound(id);
            }

            if (!await _identityManager.TestCanDeleteUserAsync(id))
            {
                return BadRequest("User cannot be deleted. Delete all orders associated with this user and try again");
            }

            UserViewModel userVM = await GetUserViewModelHelper(appUser.Id);

            (bool Succeeded, string[] Errors) result = await _identityManager.DeleteUserAsync(appUser);
            if (!result.Succeeded)
            {
                throw new Exception("The following errors occurred whilst deleting user: " + string.Join(", ", result.Errors));
            }

            return Ok(userVM);
        }

        [HttpPut("users/unblock/{id}")]
        [Authorize(Authorization.Policies.ManageAllUsersPolicy)]
        [ProducesResponseType(204)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UnblockUser(string id)
        {
            User appUser = await _identityManager.GetUserByIdAsync(id);

            if (appUser == null)
            {
                return NotFound(id);
            }

            appUser.LockoutEnd = null;
            (bool Succeeded, string[] Errors) result = await _identityManager.UpdateUserAsync(appUser);
            if (!result.Succeeded)
            {
                throw new Exception("The following errors occurred whilst unblocking user: " + string.Join(", ", result.Errors));
            }

            return NoContent();
        }

        [HttpGet("users/me/preferences")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        public async Task<IActionResult> UserPreferences()
        {
            string userId = ClaimsPrincipalExtensions.GetUserId(User);
            User appUser = await _identityManager.GetUserByIdAsync(userId);

            return Ok(appUser.Configuration);
        }

        [HttpPut("users/me/preferences")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> UserPreferences([FromBody] string data)
        {
            string userId = ClaimsPrincipalExtensions.GetUserId(User);
            User appUser = await _identityManager.GetUserByIdAsync(userId);

            appUser.Configuration = data;

            (bool Succeeded, string[] Errors) result = await _identityManager.UpdateUserAsync(appUser);
            if (!result.Succeeded)
            {
                throw new Exception("The following errors occurred whilst updating User Configurations: " + string.Join(", ", result.Errors));
            }

            return NoContent();
        }

        [HttpGet("roles/{id}", Name = GetRoleByIdActionName)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RoleViewModel))]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetRoleById(string id)
        {
            Role appRole = await _identityManager.GetRoleByIdAsync(id);

            if (!(await _authorizationService.AuthorizeAsync(User, appRole?.Name ?? "", Authorization.Policies.ViewRoleByRoleNamePolicy)).Succeeded)
            {
                return new ChallengeResult();
            }

            if (appRole == null)
            {
                return NotFound(id);
            }

            return await GetRoleByName(appRole.Name);
        }

        [HttpGet("roles/name/{name}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RoleViewModel))]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetRoleByName(string name)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, name, Authorization.Policies.ViewRoleByRoleNamePolicy)).Succeeded)
            {
                return new ChallengeResult();
            }

            RoleViewModel roleVM = await GetRoleViewModelHelper(name);

            if (roleVM == null)
            {
                return NotFound(name);
            }

            return Ok(roleVM);
        }

        [HttpGet("roles")]
        [Authorize(Authorization.Policies.ViewAllRolesPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<RoleViewModel>))]
        public async Task<IActionResult> GetRoles()
        {
            return await GetRoles(-1, -1);
        }

        [HttpGet("roles/{pageNumber:int}/{pageSize:int}")]
        [Authorize(Authorization.Policies.ViewAllRolesPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<RoleViewModel>))]
        public async Task<IActionResult> GetRoles(int pageNumber, int pageSize)
        {
            List<Role> roles = await _identityManager.GetRolesLoadRelatedAsync(pageNumber, pageSize);
            return Ok(_mapper.Map<List<RoleViewModel>>(roles));
        }

        [HttpPut("roles/{id}")]
        [Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateRole(string id, [FromBody] RoleViewModel role)
        {
            if (ModelState.IsValid)
            {
                if (role == null)
                {
                    return BadRequest($"{nameof(role)} cannot be null");
                }

                if (!string.IsNullOrWhiteSpace(role.Id) && id != role.Id)
                {
                    return BadRequest("Conflicting role id in parameter and model data");
                }

                Role appRole = await _identityManager.GetRoleByIdAsync(id);

                if (appRole == null)
                {
                    return NotFound(id);
                }

                _mapper.Map<RoleViewModel, Role>(role, appRole);

                (bool Succeeded, string[] Errors) result = await _identityManager.UpdateRoleAsync(appRole, role.Permissions?.Select(p => p.Value).ToArray());
                if (result.Succeeded)
                {
                    return NoContent();
                }

                AddError(result.Errors);

            }

            return BadRequest(ModelState);
        }

        [HttpPost("roles")]
        [Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(RoleViewModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateRole([FromBody] RoleViewModel role)
        {
            if (ModelState.IsValid)
            {
                if (role == null)
                {
                    return BadRequest($"{nameof(role)} cannot be null");
                }

                Role appRole = _mapper.Map<Role>(role);

                (bool Succeeded, string[] Errors) result = await _identityManager.CreateRoleAsync(appRole, role.Permissions?.Select(p => p.Value).ToArray());
                if (result.Succeeded)
                {
                    RoleViewModel roleVM = await GetRoleViewModelHelper(appRole.Name);
                    return CreatedAtAction(GetRoleByIdActionName, new { id = roleVM.Id }, roleVM);
                }

                AddError(result.Errors);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("roles/{id}")]
        [Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RoleViewModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteRole(string id)
        {
            Role appRole = await _identityManager.GetRoleByIdAsync(id);

            if (appRole == null)
            {
                return NotFound(id);
            }

            if (!await _identityManager.TestCanDeleteRoleAsync(id))
            {
                return BadRequest("Role cannot be deleted. Remove all users from this role and try again");
            }

            RoleViewModel roleVM = await GetRoleViewModelHelper(appRole.Name);

            (bool Succeeded, string[] Errors) result = await _identityManager.DeleteRoleAsync(appRole);
            if (!result.Succeeded)
            {
                throw new Exception("The following errors occurred whilst deleting role: " + string.Join(", ", result.Errors));
            }

            return Ok(roleVM);
        }

        [HttpGet("permissions")]
        [Authorize(Authorization.Policies.ViewAllRolesPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<PermissionViewModel>))]
        public IActionResult GetAllPermissions()
        {
            return Ok(_mapper.Map<List<PermissionViewModel>>(Permissions.AllPermissions));
        }

        private async Task<UserViewModel> GetUserViewModelHelper(string userId)
        {
            (User User, string[] Roles)? userAndRoles = await _identityManager.GetUserAndRolesAsync(userId);
            if (userAndRoles == null)
            {
                return null;
            }

            UserViewModel userVM = _mapper.Map<UserViewModel>(userAndRoles.Value.User);
            userVM.Roles = userAndRoles.Value.Roles;

            return userVM;
        }

        private async Task<RoleViewModel> GetRoleViewModelHelper(string roleName)
        {
            Role role = await _identityManager.GetRoleLoadRelatedAsync(roleName);
            if (role != null)
            {
                return _mapper.Map<RoleViewModel>(role);
            }

            return null;
        }

        private void AddError(IEnumerable<string> errors, string key = "")
        {
            foreach (string error in errors)
            {
                AddError(error, key);
            }
        }

        private void AddError(string error, string key = "")
        {
            ModelState.AddModelError(key, error);
        }

    }
}
