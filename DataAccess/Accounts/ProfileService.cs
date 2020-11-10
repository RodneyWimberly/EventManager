using EventManager.DataAccess.Accounts.Models;
using EventManager.DataAccess.Core.Constants;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EventManager.DataAccess.Accounts
{
    public class ProfileService : IProfileService
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserClaimsPrincipalFactory<User> _claimsFactory;

        public ProfileService(UserManager<User> userManager, IUserClaimsPrincipalFactory<User> claimsFactory)
        {
            _userManager = userManager;
            _claimsFactory = claimsFactory;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            string sub = context.Subject.GetSubjectId();
            User user = await _userManager.FindByIdAsync(sub);
            ClaimsPrincipal principal = await _claimsFactory.CreateAsync(user);
            List<Claim> claims = principal.Claims.ToList();
            claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();

            if (user.JobTitle != null)
                claims.Add(new Claim(Properties.JobTitle, user.JobTitle));

            if (user.FriendlyName != null)
                claims.Add(new Claim(Properties.FullName, user.FriendlyName));

            if (user.Configuration != null)
                claims.Add(new Claim(Properties.Configuration, user.Configuration));

            context.IssuedClaims = claims;
        }


        public async Task IsActiveAsync(IsActiveContext context)
        {
            string sub = context.Subject.GetSubjectId();
            User user = await _userManager.FindByIdAsync(sub);

            context.IsActive = (user != null) && user.IsEnabled;
        }
    }
}