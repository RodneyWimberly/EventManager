using Arch.EntityFrameworkCore.UnitOfWork;
using EventManager.Core;
using EventManager.DataAccess.Core;
using EventManager.DataAccess.Core.Interfaces;
using EventManager.DataAccess.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Logging;
using System;
using System.Globalization;
using System.Threading.Tasks;

namespace EventManager.DataAccess
{
    public static class DatabaseExtensions
    {
        /// <summary>
        /// Converts DateTime to string and back preserving the timezone information. 
        /// SQLite doesn't have good DateTime data type so strings are used for persistence.
        /// </summary>
        /// <param name="propertyBuilder"></param>
        /// <returns></returns>
        public static PropertyBuilder<DateTime> SetupDateTimeEntityProperty(this PropertyBuilder<DateTime> propertyBuilder)
        {
            return propertyBuilder.HasConversion(v => v.ToUniversalTime().ToString("o", CultureInfo.CurrentCulture), v => DateTime.Parse(v, null, DateTimeStyles.AssumeUniversal));
        }

        /// <summary>
        /// Converts TimeOfDay to string and back
        /// SQLite doesn't have good TimeOfDay data type so strings are used for persistence.     /// </summary>
        /// <param name="propertyBuilder"></param>
        /// <returns></returns>
        public static PropertyBuilder<TimeOfDay> SetupTimeOfDayEntityProperty(this PropertyBuilder<TimeOfDay> propertyBuilder)
        {
            return propertyBuilder.HasConversion(v => v.ToString(), v => TimeOfDay.Parse(v));
        }

        public static EntityTypeBuilder<TEntity> SetupPrimaryKeyEntityProperty<TEntity>(this EntityTypeBuilder<TEntity> entityTypeBuilder) where TEntity : class, IPrimaryKeyEntity<int>
        {
            entityTypeBuilder.HasIndex(e => e.Id).IsUnique();
            return entityTypeBuilder;
        }

        public static EntityTypeBuilder<TEntity> SetupEntityTable<TEntity>(this EntityTypeBuilder<TEntity> entityTypeBuilder, string tableName) where TEntity : class, IPrimaryKeyEntity<int>, IAuditableEntity, IConcurrencyTrackingEntity
        {
            entityTypeBuilder.SetupPrimaryKeyEntityProperty();
            entityTypeBuilder.SetupAuditableEntityProperties();
            //entityTypeBuilder.SetupConcurrencyTrackingEntityProperties();
            entityTypeBuilder.ToTable(tableName);
            return entityTypeBuilder;
        }

        public static EntityTypeBuilder<TEntity> SetupAuditableEntityProperties<TEntity>(this EntityTypeBuilder<TEntity> entityTypeBuilder) where TEntity : class, IAuditableEntity
        {
            entityTypeBuilder.Property(e => e.CreatedDate).SetupDateTimeEntityProperty();
            entityTypeBuilder.Property(e => e.UpdatedDate).SetupDateTimeEntityProperty();
            return entityTypeBuilder;
        }

        public static EntityTypeBuilder<TEntity> SetupConcurrencyTrackingEntityProperties<TEntity>(this EntityTypeBuilder<TEntity> entityTypeBuilder) where TEntity : class, IConcurrencyTrackingEntity
        {
            entityTypeBuilder.Property(e => e.RowVersion).IsRowVersion();
            return entityTypeBuilder;
        }

        public static void AddRowVersionTriggers(this MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER EventsOnUpdate
                AFTER UPDATE ON Events
                BEGIN
                    UPDATE Events
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER EventsOnInsert
                AFTER INSERT ON Events
                BEGIN
                    UPDATE Events
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER GuestsOnUpdate
                AFTER UPDATE ON Guests
                BEGIN
                    UPDATE Guests
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER GuestsOnInsert
                AFTER INSERT ON Guests
                BEGIN
                    UPDATE Guests
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER LogsOnUpdate
                AFTER UPDATE ON Logs
                BEGIN
                    UPDATE Logs
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER LogsOnInsert
                AFTER INSERT ON Logs
                BEGIN
                    UPDATE Logs
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER NotificationsOnUpdate
                AFTER UPDATE ON Notifications
                BEGIN
                    UPDATE Notifications
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER NotificationsOnInsert
                AFTER INSERT ON Notifications
                BEGIN
                    UPDATE Notifications
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER RolesOnUpdate
                AFTER UPDATE ON Roles
                BEGIN
                    UPDATE Roles
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER RolesOnInsert
                AFTER INSERT ON Roles
                BEGIN
                    UPDATE Roles
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER ServicesOnUpdate
                AFTER UPDATE ON Services
                BEGIN
                    UPDATE Services
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER ServicesOnInsert
                AFTER INSERT ON Services
                BEGIN
                    UPDATE Services
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER UsersOnUpdate
                AFTER UPDATE ON Users
                BEGIN
                    UPDATE Users
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER UsersOnInsert
                AFTER INSERT ON Users
                BEGIN
                    UPDATE Users
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER EventLocationsOnUpdate
                AFTER UPDATE ON EventLocations
                BEGIN
                    UPDATE EventLocations
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER EventLocationsOnInsert
                AFTER INSERT ON EventLocations
                BEGIN
                    UPDATE EventLocations
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER RoleClaimsOnUpdate
                AFTER UPDATE ON RoleClaims
                BEGIN
                    UPDATE RoleClaims
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER RoleClaimsOnInsert
                AFTER INSERT ON RoleClaims
                BEGIN
                    UPDATE RoleClaims
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER EventServicesOnUpdate
                AFTER UPDATE ON EventServices
                BEGIN
                    UPDATE EventServices
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER EventServicesOnInsert
                AFTER INSERT ON EventServices
                BEGIN
                    UPDATE EventServices
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER UserClaimsOnUpdate
                AFTER UPDATE ON UserClaims
                BEGIN
                    UPDATE UserClaims
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER UserClaimsOnInsert
                AFTER INSERT ON UserClaims
                BEGIN
                    UPDATE UserClaims
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER UserLoginsOnUpdate
                AFTER UPDATE ON UserLogins
                BEGIN
                    UPDATE UserLogins
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER UserLoginsOnInsert
                AFTER INSERT ON UserLogins
                BEGIN
                    UPDATE UserLogins
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER UserRolesOnUpdate
                AFTER UPDATE ON UserRoles
                BEGIN
                    UPDATE UserRoles
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER UserRolesOnInsert
                AFTER INSERT ON UserRoles
                BEGIN
                    UPDATE UserRoles
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER UserTokensOnUpdate
                AFTER UPDATE ON UserTokens
                BEGIN
                    UPDATE UserTokens
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER UserTokensOnInsert
                AFTER INSERT ON UserTokens
                BEGIN
                    UPDATE UserTokens
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER EventSchedulesOnUpdate
                AFTER UPDATE ON EventSchedules
                BEGIN
                    UPDATE EventSchedules
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER EventSchedulesOnInsert
                AFTER INSERT ON EventSchedules
                BEGIN
                    UPDATE EventSchedules
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER EventOccurancesOnUpdate
                AFTER UPDATE ON EventOccurances
                BEGIN
                    UPDATE EventOccurances
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER EventOccurancesOnInsert
                AFTER INSERT ON EventOccurances
                BEGIN
                    UPDATE EventOccurances
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER DemeritsOnUpdate
                AFTER UPDATE ON Demerits
                BEGIN
                    UPDATE Demerits
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER DemeritsOnInsert
                AFTER INSERT ON Demerits
                BEGIN
                    UPDATE Demerits
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER GuestEventOccurancesOnUpdate
                AFTER UPDATE ON GuestEventOccurances
                BEGIN
                    UPDATE GuestEventOccurances
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
            migrationBuilder.Sql(
                @"
                CREATE TRIGGER GuestEventOccurancesOnInsert
                AFTER INSERT ON GuestEventOccurances
                BEGIN
                    UPDATE GuestEventOccurances
                    SET RowVersion = randomblob(8)
                    WHERE rowid = NEW.rowid;
                END
            ");
        }

        public static IServiceCollection AddHttpUnitOfWork(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryFactory, HttpUnitOfWork>();
            services.AddScoped<IUnitOfWork, HttpUnitOfWork>();
            services.AddScoped<IUnitOfWork<ApplicationDbContext>, HttpUnitOfWork>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            return services;
        }

        public static IServiceCollection AddApplicationDbContext(this IServiceCollection services, IConfigurationSection identityOptionsConfig,
            string connectString, bool enableSensitiveDataLogging = false, bool useLazyLoadingProxies = false)

        {
            string migrationsAssembly = typeof(DatabaseExtensions).Assembly.FullName;

            // EF
            services.AddDbContext<ApplicationDbContext>(dbOptions =>
            {
                dbOptions.UseSqlite(connectString, sqliteOptions => sqliteOptions.MigrationsAssembly(migrationsAssembly));
                dbOptions.EnableSensitiveDataLogging(enableSensitiveDataLogging);
                dbOptions.UseLazyLoadingProxies(useLazyLoadingProxies);
            });

            // add identity system for users and roles
            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Configure IdentityOptions
            IdentityModelEventSource.ShowPII = enableSensitiveDataLogging;
            services.Configure<IdentityOptions>(io => io = identityOptionsConfig.Get<IdentityOptions>());

            // Adds IdentityServer.
            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddConfigurationStore(options =>
                {
                    options.ConfigureDbContext = builder =>
                    builder.UseSqlite(connectString, sql => sql.MigrationsAssembly(migrationsAssembly));

                })
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = builder =>
                    builder.UseSqlite(connectString, sql => sql.MigrationsAssembly(migrationsAssembly));
                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 300;
                })
                .AddAspNetIdentity<ApplicationUser>()
                .AddProfileService<ProfileService>();

            services.AddScoped<IAccountManager, AccountManager>();
            services.AddScoped<DatabaseInitializer>();
            return services;
        }

        public static IApplicationBuilder InitializeDatabase(this IApplicationBuilder app)
        {
            return app.InitializeDatabaseAsync().Result;
        }

        public static async Task<IApplicationBuilder> InitializeDatabaseAsync(this IApplicationBuilder app)
        {
            using (IServiceScope serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                DatabaseInitializer databaseInitializer = serviceScope.ServiceProvider.GetService<DatabaseInitializer>();

                await databaseInitializer.InitializeApplicationDatabaseAsync();
                await databaseInitializer.InitializeIdentityServerDatabaseAsync();
            }
            return app;
        }

        public static IIdentityServerBuilder UseInMemoryStore(this IIdentityServerBuilder builder)
        {
            builder.AddInMemoryPersistedGrants()
                .AddInMemoryIdentityResources(DatabaseInitializer.GetIdentityResources())
                .AddInMemoryApiResources(DatabaseInitializer.GetApiResources())
                .AddInMemoryClients(DatabaseInitializer.GetClients());
            return builder;
        }
    }
}
