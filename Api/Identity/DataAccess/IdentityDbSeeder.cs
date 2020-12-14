using EventManager.Identity.DataAccess.Models;
using EventManager.Shared.Core.Constants;
using EventManager.Shared.DataAccess;
using EventManager.Shared.DataAccess.Constants;
using EventManager.Shared.DataAccess.Extensions;
using EventManager.Shared.DataAccess.Interfaces;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventManager.Identity.DataAccess
{
    public class IdentityDbSeeder : IDbSeeder
    {
        private readonly ILogger _logger;
        private readonly PersistedGrantDbContext _persistedGrantContext;
        private readonly ConfigurationDbContext _configurationContext;
        private readonly IdentityDbContext _identityContext;
        private readonly IIdentityManager _identityManager;
        private readonly IWebHostEnvironment _environment;

        public IdentityDbSeeder(IWebHostEnvironment environment, ILogger<IdentityDbSeeder> logger, PersistedGrantDbContext persistedGrantContext, ConfigurationDbContext configurationContext, IdentityDbContext accountsContext, IIdentityManager accountManager)
        {
            _logger = logger;
            _persistedGrantContext = persistedGrantContext;
            _configurationContext = configurationContext;
            _identityContext = accountsContext;
            _identityManager = accountManager;
            _environment = environment;
        }

        public async Task SeedDbAsync()
        {
            _logger.LogInformation("Ensuring EM-IdentityDB is populated with seed data.");
            try
            {
                _persistedGrantContext.ChangeTracker.LazyLoadingEnabled = false;
                _configurationContext.ChangeTracker.LazyLoadingEnabled = false;
                _identityContext.ChangeTracker.LazyLoadingEnabled = false;

                // Configuration
                if (!await _configurationContext.Clients.AnyAsync())
                {
                    _logger.LogInformation("Generating Identity Server Clients");
                    await _configurationContext.Clients.AddRangeAsync(GetClients().Select(m => m.ToEntity()));
                    await _configurationContext.SaveChangesAsync();
                }

                if (!await _configurationContext.IdentityResources.AnyAsync())
                {
                    _logger.LogInformation("Generating Identity Server IdentityResources");
                    await _configurationContext.IdentityResources.AddRangeAsync(GetIdentityResources().Select(m => m.ToEntity()));
                    await _configurationContext.SaveChangesAsync();
                }

                if (!await _configurationContext.ApiResources.AnyAsync())
                {
                    _logger.LogInformation("Generating Identity Server ApiResources");
                    await _configurationContext.ApiResources.AddRangeAsync(GetApiResources().Select(m => m.ToEntity()));
                    await _configurationContext.SaveChangesAsync();
                }

                if (!await _configurationContext.ApiScopes.AnyAsync())
                {
                    _logger.LogInformation("Generating Identity Server ApiScopes");
                    await _configurationContext.ApiScopes.AddRangeAsync(GetApiScopes().Select(m => m.ToEntity()));
                    await _configurationContext.SaveChangesAsync();
                }


                // Identity               
                if (!await _identityContext.Users.AnyAsync())
                {
                    _logger.LogInformation("Generating Identity sample accounts");

                    const string adminRoleName = "administrator";
                    const string userRoleName = "user";

                    await EnsureRoleAsync(_identityManager, adminRoleName, "Default administrator", Permissions.GetAllPermissionValues());
                    await EnsureRoleAsync(_identityManager, userRoleName, "Default user", new string[] { });

                    await CreateUserAsync(_identityManager, "Manager", "admin", "P@55w0rd", "Sample Administrator User", "admin@wimberlytech.com", "+1 (123) 555-1212", new string[] { adminRoleName });
                    await CreateUserAsync(_identityManager, "Worker", "user", "P@55w0rd", "Sample Standard User", "user@wimberlytech.com", "+1 (123) 555-1212", new string[] { userRoleName });

                    await _identityContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                string message = LoggingEvents.SeedingDatabase.Name + " em-identitydb";
                _logger.LogCritical(LoggingEvents.SeedingDatabase, ex, message);
                throw new Exception(message, ex);
            }
        }

        public async Task MigrateDbAsync()
        {
            try
            {
                _logger.LogInformation("Ensuring EM-IdentityDB migrations have run.");
                if (!_persistedGrantContext.AllMigrationsApplied())
                {
                    _logger.LogInformation("Running PersistedGrantContext (EM-IdentityDB) Migration");
                    await _persistedGrantContext.Database.MigrateAsync();
                    await _persistedGrantContext.SaveChangesAsync();
                }
                if (!_configurationContext.AllMigrationsApplied())
                {
                    _logger.LogInformation("Running ConfigurationDbContext (EM-IdentityDB) Migration");
                    await _configurationContext.Database.MigrateAsync();
                    await _configurationContext.SaveChangesAsync();
                }
                if (!_identityContext.AllMigrationsApplied())
                {
                    _logger.LogInformation("Running IdentityDbContext (EM-IdentityDB) Migration");
                    await _identityContext.Database.MigrateAsync();
                    await _identityContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                string message = LoggingEvents.MigratingDatabase.Name + " EM-IdentityDB";
                _logger.LogCritical(LoggingEvents.MigratingDatabase, ex, message);
                throw new Exception(message, ex);
            }
        }

        private async Task EnsureRoleAsync(IIdentityManager accountManager, string roleName, string description, string[] claims)
        {
            if ((await accountManager.GetRoleByNameAsync(roleName)) == null)
            {
                Role applicationRole = new Role(roleName, description);

                (bool Succeeded, string[] Errors) = await accountManager.CreateRoleAsync(applicationRole, claims);

                if (!Succeeded)
                {
                    throw new Exception($"Seeding \"{description}\" role failed. Errors: {string.Join(Environment.NewLine, Errors)}");
                }
            }
        }

        private async Task<User> CreateUserAsync(IIdentityManager accountManager, string jobTitle, string userName, string password, string fullName, string email, string phoneNumber, string[] roles)
        {
            User User = new User
            {
                JobTitle = jobTitle,
                UserName = userName,
                FullName = fullName,
                Email = email,
                PhoneNumber = phoneNumber,
                EmailConfirmed = true,
                IsEnabled = true
            };

            (bool Succeeded, string[] Errors) = await accountManager.CreateUserAsync(User, roles, password);

            if (!Succeeded)
            {
                throw new Exception($"Seeding \"{userName}\" user failed. Errors: {string.Join(Environment.NewLine, Errors)}");
            }

            return User;
        }

        #region Domain Helpers
        public IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Phone(),
                new IdentityResources.Email(),
                new IdentityResource(Scopes.Roles, new List<string> { JwtClaimTypes.Role })
            };
        }

        public IEnumerable<ApiScope> GetApiScopes()
        {
            return new List<ApiScope>
            {
                new ApiScope(name: ApplicationValues.ApiNamespace,   displayName: $"{ApplicationValues.Title} API Scope"),
            };
        }

        public IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource(ApplicationValues.ApiNamespace, $"{ApplicationValues.Title} API Resource") {
                    UserClaims = {
                        JwtClaimTypes.Name,
                        JwtClaimTypes.Email,
                        JwtClaimTypes.PhoneNumber,
                        JwtClaimTypes.Role,
                        Claims.Permission
                    },
                    ApiSecrets =  { new Secret(ApplicationValues.Secret) },
                    Scopes = { ApplicationValues.ApiNamespace }
                }
            };
        }

        public IEnumerable<Client> GetClients()
        {
            IList<Client> clients = new List<Client>();
            string url = _environment.IsDevelopment() ? "https://localhost:60000" : "https://em-web.azurewebsites.net";

            Client client = GetClient("idsvr", url);
            client.EnableLocalLogin = true;
            client.IdentityProviderRestrictions = new List<string> { GoogleDefaults.AuthenticationScheme };
            clients.Add(client);

            client = GetClient("google", url);
            client.EnableLocalLogin = false;
            client.IdentityProviderRestrictions = new List<string>();
            client.AllowedGrantTypes = new string[] { GrantType.Implicit };
            clients.Add(client);

            return clients;
        }

        private static Client GetClient(string suffix, string url)
        {
            return new Client
            {
                ClientId = $"{ApplicationValues.ClientNamespace}:{suffix}",
                ClientName = $"{ApplicationValues.Title} {suffix}",
                ClientSecrets = { new Secret(ApplicationValues.Secret) },
                ClientUri = $"{ApplicationValues.ClientNamespace}:{suffix}",
                ClientClaimsPrefix = $"{ApplicationValues.RootNamespace}:",
                AllowAccessTokensViaBrowser = true,
                RequireClientSecret = false,
                AllowOfflineAccess = true,
                RefreshTokenExpiration = TokenExpiration.Sliding,
                RefreshTokenUsage = TokenUsage.OneTimeOnly,
                SlidingRefreshTokenLifetime = 3600,
                PostLogoutRedirectUris = { $"{url}/login" },
                AllowedCorsOrigins = { url },
                RedirectUris = { $"{url}/callback" },
                AllowedGrantTypes = {
                    GrantType.ResourceOwnerPassword ,
                    GrantType.Implicit,
                    GrantType.ClientCredentials,
                    "refresh_token" },
                AllowedScopes = {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.Phone,
                    IdentityServerConstants.StandardScopes.Email,
                    Scopes.Roles,
                    ApplicationValues.ApiNamespace },
            };
        }
        #endregion 
    }
}
