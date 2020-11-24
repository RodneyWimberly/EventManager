using Arch.EntityFrameworkCore.UnitOfWork;
using EventManager.Core;
using EventManager.DataAccess.Core.Interfaces;
using EventManager.DataAccess.Events;
using EventManager.DataAccess.Events.Models;
using EventManager.DataAccess.Identity;
using EventManager.DataAccess.Identity.Models;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Storage;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Azure.Cosmos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Linq.Dynamic.Core;
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

        public static EntityTypeBuilder<TEntity> SetupPrimaryKeyEntityProperty<TEntity>(this EntityTypeBuilder<TEntity> entityTypeBuilder) where TEntity : class, IPrimaryKeyEntity<string>
        {
            entityTypeBuilder.HasIndex(e => e.Id).IsUnique();
            return entityTypeBuilder;
        }

        public static EntityTypeBuilder<TEntity> SetupEntityTable<TEntity>(this EntityTypeBuilder<TEntity> entityTypeBuilder, string tableName) where TEntity : class, IPrimaryKeyEntity<string>, IAuditableEntity, IConcurrencyTrackingEntity
        {
            entityTypeBuilder.SetupPrimaryKeyEntityProperty();
            entityTypeBuilder.ToTable(tableName);
            return entityTypeBuilder;
        }

        public static EntityTypeBuilder<TEntity> SetupEntityContainer<TEntity>(this EntityTypeBuilder<TEntity> entityTypeBuilder, string containerName) where TEntity : class, IPrimaryKeyEntity<string>, IAuditableEntity
        {
            entityTypeBuilder.SetupPrimaryKeyEntityProperty();
            entityTypeBuilder.SetupAuditableEntityProperties();
            entityTypeBuilder.UseETagConcurrency();
            entityTypeBuilder.ToContainer(containerName);
            return entityTypeBuilder;
        }

        public static EntityTypeBuilder<TEntity> SetupAuditableEntityProperties<TEntity>(this EntityTypeBuilder<TEntity> entityTypeBuilder) where TEntity : class, IAuditableEntity
        {
            entityTypeBuilder.Property(e => e.CreatedDate).SetupDateTimeEntityProperty();
            entityTypeBuilder.Property(e => e.UpdatedDate).SetupDateTimeEntityProperty();
            return entityTypeBuilder;
        }

        public static IServiceCollection AddHttpUnitOfWork(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryFactory, HttpUnitOfWork<EventDbContext>>();
            services.AddScoped<IUnitOfWork, HttpUnitOfWork<EventDbContext>>();
            services.AddScoped<IUnitOfWork<EventDbContext>, HttpUnitOfWork<EventDbContext>>();
            services.AddScoped<IUnitOfWork<IdentityDbContext>, HttpUnitOfWork<IdentityDbContext>>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            return services;
        }

        public static IServiceCollection AddEventDbContext(this IServiceCollection services,
            IConfiguration configuration, bool enableSensitiveDataLogging = false, bool useLazyLoadingProxies = false)

        {
            // EF Events DB
            services.AddDbContext<EventDbContext>(c =>
            {
                c.UseCosmos(configuration["ConnectionStrings:EventDb"],
                                    databaseName: "EventDB",
                                    options =>
                                    {
                                        options.ConnectionMode(ConnectionMode.Gateway);
                                        options.Region(Regions.WestUS2);
                                        //options.ExecutionStrategy(ExecutionStrategy.CallOnWrappedException()
                                    });
                c.EnableSensitiveDataLogging(enableSensitiveDataLogging);
                c.UseLazyLoadingProxies(useLazyLoadingProxies);
            });

            services.AddScoped<DatabaseInitializer>();
            return services;
        }

        public static IServiceCollection AddIdentityDbContext(this IServiceCollection services,
            IConfiguration configuration, bool enableSensitiveDataLogging = false, bool useLazyLoadingProxies = false)

        {
            // Add identity system for users and roles
            IdentityModelEventSource.ShowPII = enableSensitiveDataLogging;
            services.AddIdentity<Identity.Models.User, Role>(a => a = configuration.GetSection("IdentityOptions").Get<IdentityOptions>())
                .AddEntityFrameworkStores<IdentityDbContext>()
                .AddDefaultTokenProviders();

            // Adds IdentityServer
            IIdentityServerBuilder identityServerBuilder = services.AddIdentityServer()
                .AddAspNetIdentity<Identity.Models.User>()
                .AddProfileService<ProfileService>()
                .AddDeveloperSigningCredential();

            
            if (configuration["ConnectionStrings:UseInMemoryDatabase"] == "True")
            {
                // Setup InMemory DB
                identityServerBuilder.UseIdentityServerInMemoryStore();
                services.AddDbContext<IdentityDbContext>(opt => opt.UseInMemoryDatabase("IdentityDb-" + Guid.NewGuid().ToString()));
            }
            else
            {
                // Setup DB connections and migrations
                string migrationsAssembly = typeof(DatabaseExtensions).Assembly.FullName,
                    identityDbConnection = configuration["ConnectionStrings:IdentityDb"];

                // EF Identity DB for users and roles
                services.AddDbContext<IdentityDbContext>(c =>
                {
                    c.UseSqlServer(identityDbConnection, providerOptions =>
                    {
                        providerOptions.CommandTimeout(60);
                        providerOptions.MigrationsAssembly(migrationsAssembly);
                    });
                    c.EnableSensitiveDataLogging(enableSensitiveDataLogging);
                    c.UseLazyLoadingProxies(useLazyLoadingProxies);
                });

                // EF IdentityServer Configuration DB
                services.AddConfigurationDbContext<ConfigurationDbContext>(cso =>
                {
                    cso.ConfigureDbContext = c =>
                    {
                        c.UseSqlServer(identityDbConnection, providerOptions =>
                        {
                            providerOptions.CommandTimeout(60);
                            providerOptions.MigrationsAssembly(migrationsAssembly);
                        });
                        c.EnableSensitiveDataLogging(enableSensitiveDataLogging);
                        c.UseLazyLoadingProxies(useLazyLoadingProxies);
                    };
                });

                // EF IdentityServer Persisted Grants DB
                services.AddOperationalDbContext<PersistedGrantDbContext>(oso =>
                {
                    oso.EnableTokenCleanup = true;
                    oso.TokenCleanupInterval = 3600;
                    oso.ConfigureDbContext = c =>
                    {
                        c.UseSqlServer(identityDbConnection, providerOptions =>
                        {
                            providerOptions.CommandTimeout(60);
                            providerOptions.MigrationsAssembly(migrationsAssembly);
                        });
                        c.EnableSensitiveDataLogging(enableSensitiveDataLogging);
                        c.UseLazyLoadingProxies(useLazyLoadingProxies);
                    };
                });

                identityServerBuilder.UseIdentityServerPermentStore();
            }

            services.AddScoped<IIdentityManager, IdentityManager>();

            return services;
        }

        public static bool AllMigrationsApplied(this DbContext context)
        {
            IEnumerable<string> applied = context.GetService<IHistoryRepository>()
                .GetAppliedMigrations()
                .Select(m => m.MigrationId);


            IEnumerable<string> total = context.GetService<IMigrationsAssembly>()
                .Migrations
                .Select(m => m.Key);

            return !total.Except(applied).Any();
        }

        public static async Task SeedEventDbEntityAsync<T>(this EventDbContext context, IQueryable<EntityBase> entities, ILogger logger = null) where T : EntityBase
        {
            string seedFile = Path.Combine(AppContext.BaseDirectory, "Seed", "EventDB", $"{typeof(T).Name}.json");
            if (File.Exists(seedFile) && !(await entities.ToListAsync()).Any())
            {
                string name = $"{context.GetType().Name}::{typeof(T).Name}";
                logger?.LogInformation($"Seeding {name} with {seedFile}");
                List<T> seedEntities = JsonConvert.DeserializeObject<List<T>>(await File.ReadAllTextAsync(seedFile));
                await context.AddRangeAsync(seedEntities);
                await context.SaveChangesAsync();
                logger?.LogInformation($"Seeding of {name} has completed!");
            }
        }

        public static async Task<IApplicationBuilder> InitializeDatabaseAsync(this IApplicationBuilder app, IConfiguration configuration)
        {
            using (IServiceScope serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                DatabaseInitializer databaseInitializer = serviceScope.ServiceProvider.GetService<DatabaseInitializer>();
                if (configuration["ConnectionStrings:UseInMemoryDatabase"] == "False" &&
                    configuration["ConnectionStrings:UseMigrationService"] == "True")
                {
                    await databaseInitializer.MigrateIdentityDbAsync();
                    await databaseInitializer.MigrateEventDBAsync();
                }

                if (configuration["ConnectionStrings:UseSeedService"] == "True")
                {
                    await databaseInitializer.EnsureIdentityDbSeededAsync();
                    await databaseInitializer.EnsureEventDbSeededAsync();
                }
            }
            return app;
        }

        public static IIdentityServerBuilder UseIdentityServerInMemoryStore(this IIdentityServerBuilder builder)
        {
            builder.AddInMemoryPersistedGrants()
                .AddInMemoryIdentityResources(DatabaseInitializer.GetIdentityResources())
                .AddInMemoryApiResources(DatabaseInitializer.GetApiResources())
                .AddInMemoryApiScopes(DatabaseInitializer.GetApiScopes())
                .AddInMemoryClients(DatabaseInitializer.GetClients());
            return builder;
        }
        public static IIdentityServerBuilder UseIdentityServerPermentStore(this IIdentityServerBuilder builder)
        {
            builder.AddConfigurationStore<ConfigurationDbContext>()
                .AddOperationalStore<PersistedGrantDbContext>();

            return builder;
        }

        public static void UpdateAuditableEntities<T>(this T dbContext) where T : DbContext, IAuditableDbContext
        {
            IEnumerable<EntityEntry> modifiedEntries = dbContext.ChangeTracker.Entries()
                .Where(x => x.Entity is IAuditableEntity &&
                       (x.State == EntityState.Added ||
                       x.State == EntityState.Modified));

            DateTime now = DateTime.UtcNow;
            foreach (EntityEntry entry in modifiedEntries)
            {
                IAuditableEntity entity = (IAuditableEntity)entry.Entity;

                if (entry.State == EntityState.Added)
                {
                    entity.CreatedDate = now;
                    entity.CreatedBy = dbContext.CurrentUserId;
                }
                else
                {
                    dbContext.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                    dbContext.Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                }

                entity.UpdatedDate = now;
                entity.UpdatedBy = dbContext.CurrentUserId;
            }
        }


    }
}
