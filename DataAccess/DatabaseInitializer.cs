using EventManager.Core;
using EventManager.Core.Logging;
using EventManager.DataAccess.Accounts;
using EventManager.DataAccess.Accounts.Models;
using EventManager.DataAccess.Core;
using EventManager.DataAccess.Core.Constants;
using EventManager.DataAccess.Core.Enums;
using EventManager.DataAccess.Events;
using EventManager.DataAccess.Events.Models;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventManager.DataAccess
{
    public class DatabaseInitializer
    {
        private readonly ILogger _logger;
        private readonly PersistedGrantDbContext _persistedGrantContext;
        private readonly ConfigurationDbContext _configurationContext;
        private readonly EventsDbContext _eventsContext;
        private readonly AccountsDbContext _accountsContext;
        private readonly IAccountManager _accountManager;

        public DatabaseInitializer(ILogger<DatabaseInitializer> logger, PersistedGrantDbContext persistedGrantContext, ConfigurationDbContext configurationContext, EventsDbContext eventsContext, AccountsDbContext accountsContext, IAccountManager accountManager)
        {
            _logger = logger;
            _persistedGrantContext = persistedGrantContext;
            _configurationContext = configurationContext;
            _eventsContext = eventsContext;
            _accountsContext = accountsContext;
            _accountManager = accountManager;
        }

        public void InitializeAccountManagerDatabase()
        {
            InitializeAccountManagerDatabaseAsync().Wait();
        }

        public async Task InitializeAccountManagerDatabaseAsync()
        {
            try
            {
                // PersistedGrant
                _logger.LogInformation("Running PersistedGrantDbContext Migration");
                await _persistedGrantContext.Database.MigrateAsync();

                // Configuration
                _logger.LogInformation("Running ConfigurationDbContext Migration");
                await _configurationContext.Database.MigrateAsync();

                if (!await _configurationContext.Clients.AnyAsync())
                {
                    _logger.LogInformation("Generating Identity Server Clients");
                    await _configurationContext.Clients.AddRangeAsync(GetClients().Select(m => m.ToEntity()));
                    await _configurationContext.SaveChangesAsync();
                    _logger.LogInformation("Generating Identity Server Clients Completed");
                }

                if (!await _configurationContext.IdentityResources.AnyAsync())
                {
                    _logger.LogInformation("Generating Identity Server IdentityResources");
                    await _configurationContext.IdentityResources.AddRangeAsync(GetIdentityResources().Select(m => m.ToEntity()));
                    await _configurationContext.SaveChangesAsync();
                    _logger.LogInformation("Generating Identity Server IdentityResources Completed");
                }

                if (!await _configurationContext.ApiResources.AnyAsync())
                {
                    _logger.LogInformation("Generating Identity Server ApiResources");
                    await _configurationContext.ApiResources.AddRangeAsync(GetApiResources().Select(m => m.ToEntity()));
                    await _configurationContext.SaveChangesAsync();
                    _logger.LogInformation("Generating Identity Server ApiResources Completed");
                }

                // AccountManager
                _logger.LogInformation("Running AccountManagerDbContext Migration");
                _accountsContext.ChangeTracker.LazyLoadingEnabled = false;
                await _accountsContext.Database.MigrateAsync();

                if (!await _accountsContext.Users.AnyAsync())
                {
                    _logger.LogInformation("Generating Account Manager sample accounts");

                    const string adminRoleName = "administrator";
                    const string userRoleName = "user";

                    await EnsureRoleAsync(_accountManager, adminRoleName, "Default administrator", ApplicationPermissions.GetAllPermissionValues());
                    await EnsureRoleAsync(_accountManager, userRoleName, "Default user", new string[] { });

                    await CreateUserAsync(_accountManager, "Manager", "admin", "P@55w0rd", "Sample Administrator User", "admin@wimberlytech.com", "+1 (123) 555-1212", new string[] { adminRoleName });
                    await CreateUserAsync(_accountManager, "Worker", "user", "P@55w0rd", "Sample Standard User", "user@wimberlytech.com", "+1 (123) 555-1212", new string[] { userRoleName });

                    await _accountsContext.SaveChangesAsync();
                    _logger.LogInformation("Sample account generation completed");
                }
                _logger.LogInformation("AccountManagerDbContext Migration completed");
            }
            catch (Exception ex)
            {
                _logger.LogCritical(LoggingEvents.INIT_DATABASE, ex, LoggingEvents.INIT_DATABASE.Name);
                throw new Exception(LoggingEvents.INIT_DATABASE.Name, ex);
            }
        }

        public void InitializeApplicationDatabase()
        {
            InitializeApplicationDatabaseAsync().Wait();
        }

        public async Task InitializeApplicationDatabaseAsync()
        {
            try
            {
                _eventsContext.ChangeTracker.LazyLoadingEnabled = false;

                // Migration
                _logger.LogInformation("Running AccountManagerDbContext Migration");
                await _eventsContext.Database.EnsureCreatedAsync();

                // Notifications
                if (!_eventsContext.Notifications.ToList().Any())
                {
                    _logger.LogInformation("Generating Notifications");

                    await _eventsContext.Notifications.AddAsync(new Notification
                    {
                        Header = "Action Failure",
                        Body = "The light failed to turn on at the scheduled time",
                        IsPinned = false,
                        IsRead = false,
                        Date = DateTime.UtcNow
                    });

                    await _eventsContext.Notifications.AddAsync(new Notification
                    {
                        Header = "Sensor Read Failure",
                        Body = "Failed to read the air temperature sensor",
                        IsPinned = false,
                        IsRead = false,
                        Date = DateTime.UtcNow
                    });

                    await _eventsContext.Notifications.AddAsync(new Notification
                    {
                        Header = "Sensor Read Failure",
                        Body = "Failed to read the CO2 PPM sensor",
                        IsPinned = false,
                        IsRead = true,
                        Date = DateTime.UtcNow
                    });

                    await _eventsContext.SaveChangesAsync();
                    _logger.LogInformation("Seeding Notifications completed");
                }

                // Guests
                if (!_eventsContext.Guests.ToList().Any())
                {
                    _logger.LogInformation("Generating Guests");

                    await _eventsContext.Guests.AddAsync(new Guest
                    {
                        Id = "1",
                        UniqueId = "C9D42756-3550-48F0-8726-748A0F99D824",
                        Prefix = "Mr.",
                        FirstName = "William",
                        MiddleName = "Rodney",
                        LastName = "Wimberly",
                        Suffix = "Jr.",
                        Sex = Sexes.Male,
                        BirthDate = DateTime.Parse("11/01/1972").Date,
                        PhoneNumber = "971.335.6827",
                        EmailAddress = "williamwimberly@hotmail.com",
                        Password = "P@55w0rd!",
                        Address1 = "166 NE Shannon Street",
                        City = "Hillsboro",
                        State = "OR",
                        ZipCode = "97124",
                        EstablishedGuest = true
                    });

                    await _eventsContext.Guests.AddAsync(new Guest
                    {
                        Id = "2",
                        UniqueId = "F8464D52-688D-4350-BE0F-0613A3B88DD0",
                        Prefix = "Mrs.",
                        FirstName = "Michelle",
                        MiddleName = "Renee",
                        LastName = "Wimberly",
                        Sex = Sexes.Female,
                        BirthDate = DateTime.Parse("01/10/1975").Date,
                        PhoneNumber = "971.294.6340",
                        EmailAddress = "michellewimberly@hotmail.com",
                        Password = "P@55w0rd!",
                        Address1 = "166 NE Shannon Street",
                        City = "Hillsboro",
                        State = "OR",
                        ZipCode = "97124",
                        EstablishedGuest = true
                    });

                    await _eventsContext.Guests.AddAsync(new Guest
                    {
                        Id = "3",
                        UniqueId = "3C77A8CB-A4AF-467E-9655-B0B8289DB5B6",
                        Prefix = "Mr.",
                        FirstName = "Sean",
                        MiddleName = "Paul",
                        LastName = "McAvery",
                        Suffix = "Sr.",
                        Sex = Sexes.Male,
                        BirthDate = DateTime.Parse("12/25/1962").Date,
                        PhoneNumber = "971.123.4567",
                        EmailAddress = "sean_mcavery123@hotmail.com",
                        Password = "P@55w0rd!",
                        Address1 = "166 NE Shannon Street",
                        City = "Hillsboro",
                        State = "OR",
                        ZipCode = "97124",
                        EstablishedGuest = true
                    });

                    await _eventsContext.Guests.AddAsync(new Guest
                    {
                        Id = "4",
                        UniqueId = "B2C9567F-6BF7-42E9-8B5E-90E7C3D04BA8",
                        Prefix = "Ms.",
                        FirstName = "Santa",
                        LastName = "Clause",
                        Sex = Sexes.Female,
                        BirthDate = DateTime.Parse("07/05/1982").Date,
                        PhoneNumber = "503.555.1212",
                        EmailAddress = "santaclause@hotmail.com",
                        Password = "P@55w0rd!",
                        Address1 = "166 NE Shannon Street",
                        City = "Hillsboro",
                        State = "OR",
                        ZipCode = "97124",
                        EstablishedGuest = true
                    });

                    await _eventsContext.SaveChangesAsync();
                    _logger.LogInformation("Guests generation completed");
                }

                // Services
                if (!_eventsContext.Services.ToList().Any())
                {
                    _logger.LogInformation("Generating services");

                    await _eventsContext.Services.AddAsync(new Service
                    {
                        Id = "1",
                        Name = "Shower",
                        Description = "Shower",
                        ServiceType = ServiceTypes.Queue
                    });

                    await _eventsContext.Services.AddAsync(new Service
                    {
                        Id = "2",
                        Name = "Breakfast",
                        Description = "Breakfast",
                        ServiceType = ServiceTypes.Normal
                    });

                    await _eventsContext.Services.AddAsync(new Service
                    {
                        Id = "3",
                        Name = "Lunch",
                        Description = "Lunch",
                        ServiceType = ServiceTypes.Normal
                    });

                    await _eventsContext.Services.AddAsync(new Service
                    {
                        Id = "4",
                        Name = "Dinner",
                        Description = "Dinner",
                        ServiceType = ServiceTypes.Normal
                    });

                    await _eventsContext.Services.AddAsync(new Service
                    {
                        Id = "5",
                        Name = "Sleep",
                        Description = "Sleep",
                        ServiceType = ServiceTypes.Normal
                    });

                    await _eventsContext.Services.AddAsync(new Service
                    {
                        Id = "6",
                        Name = "Counseling",
                        Description = "Counseling",
                        ServiceType = ServiceTypes.Queue
                    });

                    await _eventsContext.Services.AddAsync(new Service
                    {
                        Id = "7",
                        Name = "Bath and Toiletry",
                        Description = "Bath ans Toiletry Items",
                        ServiceType = ServiceTypes.Normal
                    });

                    await _eventsContext.SaveChangesAsync();
                    _logger.LogInformation("Service generation completed");
                }

                // Events
                if (!_eventsContext.Events.ToList().Any())
                {
                    _logger.LogInformation("Generating Events");

                    await _eventsContext.Events.AddAsync(new Event
                    {
                        Id = "1",
                        Name = "Shelter @ Orenco Station",
                        Description = "Overnight homeless shelter"
                    });

                    await _eventsContext.Events.AddAsync(new Event
                    {
                        Id = "2",
                        Name = "Sonrise Day Center",
                        Description = "Daytime homeless shelter"
                    });

                    await _eventsContext.SaveChangesAsync();
                    _logger.LogInformation("Events generation completed");
                }

                // EventServices
                if (!_eventsContext.EventServices.ToList().Any())
                {
                    _logger.LogInformation("Generating EventServices");

                    await _eventsContext.EventServices.AddAsync(new EventService
                    {
                        Id = "1",
                        EventId = "1",
                        ServiceId = "1"
                    });

                    await _eventsContext.EventServices.AddAsync(new EventService
                    {
                        Id = "2",
                        EventId = "1",
                        ServiceId = "2"
                    });

                    await _eventsContext.EventServices.AddAsync(new EventService
                    {
                        Id = "3",
                        EventId = "1",
                        ServiceId = "4"
                    });

                    await _eventsContext.EventServices.AddAsync(new EventService
                    {
                        Id = "4",
                        EventId = "1",
                        ServiceId = "5"
                    });

                    await _eventsContext.EventServices.AddAsync(new EventService
                    {
                        Id = "5",
                        EventId = "1",
                        ServiceId = "7"
                    });

                    await _eventsContext.EventServices.AddAsync(new EventService
                    {
                        Id = "6",
                        EventId = "2",
                        ServiceId = "1"
                    });

                    await _eventsContext.EventServices.AddAsync(new EventService
                    {
                        Id = "7",
                        EventId = "2",
                        ServiceId = "3"
                    });

                    await _eventsContext.EventServices.AddAsync(new EventService
                    {
                        Id = "8",
                        EventId = "2",
                        ServiceId = "5"
                    });

                    await _eventsContext.EventServices.AddAsync(new EventService
                    {
                        Id = "9",
                        EventId = "2",
                        ServiceId = "6"
                    });

                    await _eventsContext.EventServices.AddAsync(new EventService
                    {
                        Id = "10",
                        EventId = "2",
                        ServiceId = "7"
                    });

                    await _eventsContext.SaveChangesAsync();
                    _logger.LogInformation("EventServices generation completed");
                }

                // EventLocations
                if (!_eventsContext.EventLocations.ToList().Any())
                {
                    _logger.LogInformation("Generating EventLocations");

                    await _eventsContext.EventLocations.AddAsync(new EventLocation
                    {
                        Id = "1",
                        EventId = "1",
                        Name = "Sonrise Cafeteria",
                        Address1 = "6701 NE Campus Way Dr",
                        Address2 = "Cafeteria",
                        City = "Hillsboro",
                        State = "OR",
                        ZipCode = "97124"
                    });

                    await _eventsContext.EventLocations.AddAsync(new EventLocation
                    {
                        Id = "2",
                        EventId = "2",
                        Name = "Sonrise Day Center",
                        Address1 = "6701 NE Campus Way Dr",
                        Address2 = "Bron Hall",
                        City = "Hillsboro",
                        State = "OR",
                        ZipCode = "97124"
                    });

                    await _eventsContext.SaveChangesAsync();
                    _logger.LogInformation("EventLocations generation completed");
                }

                // EventSchedules
                if (!_eventsContext.EventSchedules.ToList().Any())
                {
                    _logger.LogInformation("Generating EventSchedules");

                    await _eventsContext.EventSchedules.AddAsync(new EventSchedule
                    {
                        Id = "1",
                        EventId = "1",
                        EventLocationId = "1",
                        DaysOfTheWeek = Days.Monday &
                                        Days.Tuesday &
                                        Days.Wednesday &
                                        Days.Thursday,
                        StartDate = DateTime.Parse("12/01/2020").Date,
                        EndDate = DateTime.Parse("02/28/2021").Date,
                        StartTime = TimeOfDay.Parse("17:30"),
                        EndTime = TimeOfDay.Parse("8:30"),
                        CheckInStartTime = TimeOfDay.Parse("17:30"),
                        CheckInEndTime = TimeOfDay.Parse("18:30")
                    });

                    await _eventsContext.EventSchedules.AddAsync(new EventSchedule
                    {
                        Id = "2",
                        EventId = "1",
                        EventLocationId = "1",
                        DaysOfTheWeek = Days.Friday &
                                        Days.Saturaday &
                                        Days.Sunday,
                        StartDate = DateTime.Parse("12/01/2020").Date,
                        EndDate = DateTime.Parse("02/28/2021").Date,
                        StartTime = TimeOfDay.Parse("17:30"),
                        EndTime = TimeOfDay.Parse("7:30"),
                        CheckInStartTime = TimeOfDay.Parse("17:30"),
                        CheckInEndTime = TimeOfDay.Parse("18:30")
                    });

                    await _eventsContext.EventSchedules.AddAsync(new EventSchedule
                    {
                        Id = "3",
                        EventId = "2",
                        EventLocationId = "2",
                        DaysOfTheWeek = Days.Monday &
                                        Days.Tuesday &
                                        Days.Wednesday &
                                        Days.Thursday,
                        StartDate = DateTime.Parse("01/01/2020").Date,
                        EndDate = DateTime.Parse("12/31/2020").Date,
                        StartTime = TimeOfDay.Parse("9:00"),
                        EndTime = TimeOfDay.Parse("15:00"),
                        CheckInStartTime = TimeOfDay.Parse("9:00"),
                        CheckInEndTime = TimeOfDay.Parse("15:00")
                    });

                    await _eventsContext.SaveChangesAsync();
                    _logger.LogInformation("EventSchedules generation completed");
                }

                // EventOccurances
                if (!_eventsContext.EventOccurances.ToList().Any())
                {
                    _logger.LogInformation("Generating EventOccurances");

                    await _eventsContext.EventOccurances.AddAsync(new EventOccurance
                    {
                        Id = "1",
                        EventId = "1",
                        EventScheduleId = "1",
                        EventLocationId = "1",
                        Date = DateTime.Parse("01/02/2020").Date,
                        Lead = "Jeff"
                    });

                    await _eventsContext.EventOccurances.AddAsync(new EventOccurance
                    {
                        Id = "2",
                        EventId = "2",
                        EventScheduleId = "3",
                        EventLocationId = "2",
                        Date = DateTime.Parse("01/03/2020").Date,
                        Lead = "Tori"
                    });

                    await _eventsContext.EventOccurances.AddAsync(new EventOccurance
                    {
                        Id = "3",
                        EventId = "1",
                        EventScheduleId = "2",
                        EventLocationId = "1",
                        Date = DateTime.Parse("01/03/2020").Date,
                        Lead = "Roxanne"
                    });

                    await _eventsContext.SaveChangesAsync();
                    _logger.LogInformation("EventOccurances generation completed");
                }

                // GuestEventOccurances
                if (!_eventsContext.GuestEventOccurances.ToList().Any())
                {
                    _logger.LogInformation("Generating GuestEventOccurances");

                    await _eventsContext.GuestEventOccurances.AddAsync(new GuestEventOccurance
                    {
                        Id = "1",
                        GuestId = "1",
                        EventOccuranceId = "1"
                    });

                    await _eventsContext.GuestEventOccurances.AddAsync(new GuestEventOccurance
                    {
                        Id = "2",
                        GuestId = "2",
                        EventOccuranceId = "1"
                    });

                    await _eventsContext.GuestEventOccurances.AddAsync(new GuestEventOccurance
                    {
                        Id = "3",
                        GuestId = "3",
                        EventOccuranceId = "1"
                    });

                    await _eventsContext.GuestEventOccurances.AddAsync(new GuestEventOccurance
                    {
                        Id = "4",
                        GuestId = "4",
                        EventOccuranceId = "1"
                    });

                    await _eventsContext.SaveChangesAsync();
                    _logger.LogInformation("GuestEventOccurance generation completed");
                }

                // Demerits
                if (!_eventsContext.Demerits.ToList().Any())
                {
                    _logger.LogInformation("Generating demerits");

                    await _eventsContext.Demerits.AddAsync(new Demerit
                    {
                        Id = "1",
                        GuestId = "1",
                        EventOccuranceId = "1",
                        Description = "Caught smoking pot on premises after verbal warning."
                    });

                    await _eventsContext.SaveChangesAsync();
                    _logger.LogInformation("Demerit generation completed");
                }

            }
            catch (Exception ex)
            {
                _logger.LogCritical(LoggingEvents.INIT_DATABASE, ex, LoggingEvents.INIT_DATABASE.Name);
                throw new Exception(LoggingEvents.INIT_DATABASE.Name, ex);
            }
        }


        public static IEnumerable<IdentityResource> GetIdentityResources()
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

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource(IdentityServerValues.ApiId) {
                    UserClaims = {
                        JwtClaimTypes.Name,
                        JwtClaimTypes.Email,
                        JwtClaimTypes.PhoneNumber,
                        JwtClaimTypes.Role,
                        Claims.Permission
                    }
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            // Clients credentials.
            return new List<Client>
            {
                // http://docs.identityserver.io/en/release/reference/client.html.
                new Client
                {
                    ClientId = IdentityServerValues.ApplicationClientId,
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword, // Resource Owner Password Credential grant.
                    AllowAccessTokensViaBrowser = true,
                    RequireClientSecret = false, // This client does not need a secret to request tokens from the token endpoint.
                    
                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId, // For UserInfo endpoint.
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Phone,
                        IdentityServerConstants.StandardScopes.Email,
                        Scopes.Roles,
                        IdentityServerValues.ApiId
                    },
                    AllowOfflineAccess = true, // For refresh token.
                    RefreshTokenExpiration = TokenExpiration.Sliding,
                    RefreshTokenUsage = TokenUsage.OneTimeOnly,
                    //AccessTokenLifetime = 900, // Lifetime of access token in seconds.
                    //AbsoluteRefreshTokenLifetime = 7200,
                    //SlidingRefreshTokenLifetime = 900,
                },

                new Client
                {
                    ClientId = IdentityServerValues.DocumentationClientId,
                    ClientName = IdentityServerValues.DocumentationClientName,
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    AllowAccessTokensViaBrowser = true,
                    RequireClientSecret = false,

                    AllowedScopes = {
                        IdentityServerValues.ApiId
                    }
                }
            };
        }

        private async Task EnsureRoleAsync(IAccountManager accountManager, string roleName, string description, string[] claims)
        {
            if ((await accountManager.GetRoleByNameAsync(roleName)) == null)
            {
                Role applicationRole = new Role(roleName, description);

                (bool Succeeded, string[] Errors) = await accountManager.CreateRoleAsync(applicationRole, claims);

                if (!Succeeded)
                    throw new Exception($"Seeding \"{description}\" role failed. Errors: {string.Join(Environment.NewLine, Errors)}");
            }
        }

        private async Task<User> CreateUserAsync(IAccountManager accountManager, string jobTitle, string userName, string password, string fullName, string email, string phoneNumber, string[] roles)
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
                throw new Exception($"Seeding \"{userName}\" user failed. Errors: {string.Join(Environment.NewLine, Errors)}");


            return User;
        }

    }
}
