using EventManager.DataAccess.Core.Constants;
using EventManager.DataAccess.Core.Enums;
using EventManager.DataAccess.Core.Interfaces;
using EventManager.DataAccess.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Logging;
using Microsoft.Win32.TaskScheduler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ZNetCS.AspNetCore.Logging.EntityFrameworkCore;

namespace EventManager.DataAccess
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser,
                                                          ApplicationRole,
                                                          string,
                                                          ApplicationUserClaim,
                                                          ApplicationUserRole,
                                                          ApplicationUserLogin,
                                                          ApplicationRoleClaim,
                                                          ApplicationUserToken>
    {
        private string _currentUserId;
        public string CurrentUserId
        {
            get => string.IsNullOrEmpty(_currentUserId) ? Ids.SystemUserId : _currentUserId;
            set => _currentUserId = value;
        }

        public DbSet<ExtendedLog> Logs { get; set; }
        public DbSet<Demerit> Demerits { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventOccurrence> EventOccurrences { get; set; }
        public DbSet<EventLocation> EventLocations { get; set; }
        public DbSet<EventSchedule> EventSchedules { get; set; }
        public DbSet<EventService> EventServices { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Guest> Guests { get; set; }
        public DbSet<GuestEventOccurrence> GuestEventOccurrences { get; set; }
        public DbSet<Service> Services { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
          => options.UseSqlite("Data Source=./EventManager.db")
            .ConfigureWarnings(b => b.Ignore(new EventId[] { RelationalEventId.AmbientTransactionWarning }));

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // RoleClaims
            builder.Entity<ApplicationRoleClaim>().SetupAuditableEntityProperties();
            builder.Entity<ApplicationRoleClaim>().ToTable("RoleClaims");

            // UserClaims 
            builder.Entity<ApplicationUserClaim>().SetupAuditableEntityProperties();
            builder.Entity<ApplicationUserClaim>().ToTable("UserClaims");

            // UserLogins
            builder.Entity<ApplicationUserLogin>().SetupAuditableEntityProperties();
            builder.Entity<ApplicationUserLogin>().ToTable("UserLogins");

            // UserRoles
            builder.Entity<ApplicationUserRole>().SetupAuditableEntityProperties();
            builder.Entity<ApplicationUserRole>().ToTable("UserRoles");

            // UserTokens
            builder.Entity<ApplicationUserToken>().SetupAuditableEntityProperties();
            builder.Entity<ApplicationUserToken>().ToTable("UserTokens");

            // Users
            builder.Entity<ApplicationUser>().HasKey(u => u.Id);
            builder.Entity<ApplicationUser>().HasIndex(u => u.NormalizedEmail);
            builder.Entity<ApplicationUser>().HasIndex(u => u.NormalizedUserName).IsUnique();
            builder.Entity<ApplicationUser>().SetupAuditableEntityProperties();
            builder.Entity<ApplicationUser>().ToTable("Users");
            builder.Entity<ApplicationUser>().HasMany(u => u.Claims)
                .WithOne()
                .HasForeignKey(c => c.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationUser>().HasMany(u => u.Roles)
                .WithOne()
                .HasForeignKey(r => r.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            // Roles
            builder.Entity<ApplicationRole>().HasKey(r => r.Id);
            builder.Entity<ApplicationRole>().HasIndex(r => r.NormalizedName).IsUnique();
            builder.Entity<ApplicationRole>().SetupAuditableEntityProperties();
            builder.Entity<ApplicationRole>().ToTable("Roles");
            builder.Entity<ApplicationRole>()
                .HasMany(r => r.Claims)
                .WithOne()
                .HasForeignKey(c => c.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationRole>()
                .HasMany(r => r.Users)
                .WithOne()
                .HasForeignKey(r => r.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            // Logs
            LogModelBuilderHelper.Build(builder.Entity<ExtendedLog>());
            builder.Entity<ExtendedLog>().SetupEntityTable("Logs");
            builder.Entity<ExtendedLog>().HasIndex(r => r.TimeStamp);
            builder.Entity<ExtendedLog>().HasIndex(r => r.EventId);
            builder.Entity<ExtendedLog>().HasIndex(r => r.Level);

            // Demerits
            builder.Entity<Demerit>().SetupEntityTable("Demerits");
            builder.Entity<Demerit>().HasIndex(d => d.GuestId);
            builder.Entity<Demerit>().HasIndex(d => d.EventOccurrenceId);
            builder.Entity<Demerit>().Property(d => d.DateTime).SetupDateTimeEntityProperty();
            builder.Entity<Demerit>().HasOne(d => d.Guest)
                .WithMany(g => g.Demerits)
                .HasPrincipalKey(g => g.Id)
                .HasForeignKey(d => d.GuestId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Demerit>().HasOne(d => d.EventOccurrence)
               .WithMany(o => o.Demerits)
               .HasPrincipalKey(o => o.Id)
               .HasForeignKey(d => d.EventOccurrenceId)
               .IsRequired()
               .OnDelete(DeleteBehavior.NoAction);

            // Events
            builder.Entity<Event>().SetupEntityTable("Events");
            builder.Entity<Event>().HasMany(e => e.Locations)
               .WithOne(l => l.Event)
               .HasPrincipalKey(e => e.Id)
               .HasForeignKey(e => e.EventId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Event>().HasMany(e => e.Schedules)
                .WithOne(s => s.Event)
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.EventId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Event>().HasMany(e => e.Occurrences)
               .WithOne(o => o.Event)
               .HasPrincipalKey(e => e.Id)
               .HasForeignKey(e => e.EventId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Event>().HasMany(e => e.Services)
               .WithOne(s => s.Event)
               .HasPrincipalKey(e => e.Id)
               .HasForeignKey(e => e.EventId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

            // EventLocations
            builder.Entity<EventLocation>().SetupEntityTable("EventLocations");
            builder.Entity<EventLocation>().HasIndex(l => l.EventId);
            builder.Entity<EventLocation>().HasMany(l => l.Schedules)
              .WithOne(s => s.Location)
              .HasPrincipalKey(l => l.Id)
              .HasForeignKey(s => s.EventLocationId)
              .IsRequired()
              .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<EventLocation>().HasMany(l => l.Occurrences)
             .WithOne(o => o.Location)
             .HasPrincipalKey(l => l.Id)
             .HasForeignKey(o => o.EventLocationId)
             .IsRequired()
             .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<EventLocation>().HasOne(l => l.Event)
             .WithMany(e => e.Locations)
             .HasPrincipalKey(e => e.Id)
             .HasForeignKey(l => l.EventId)
             .IsRequired()
             .OnDelete(DeleteBehavior.NoAction);

            // EventSchedules
            builder.Entity<EventSchedule>().SetupEntityTable("EventSchedules");
            builder.Entity<EventSchedule>().HasIndex(s => s.EventId);
            builder.Entity<EventSchedule>().HasIndex(s => s.EventLocationId);
            builder.Entity<EventSchedule>().Property(s => s.DaysOfTheWeek).HasConversion(new EnumToNumberConverter<DaysOfTheWeek, int>());
            builder.Entity<EventSchedule>().Property(s => s.StartDate).SetupDateTimeEntityProperty();
            builder.Entity<EventSchedule>().Property(s => s.EndDate).SetupDateTimeEntityProperty();
            builder.Entity<EventSchedule>().Property(s => s.StartTime).SetupTimeOfDayEntityProperty();
            builder.Entity<EventSchedule>().Property(s => s.EndTime).SetupTimeOfDayEntityProperty();
            builder.Entity<EventSchedule>().Property(s => s.CheckInStartTime).SetupTimeOfDayEntityProperty();
            builder.Entity<EventSchedule>().Property(s => s.CheckInEndTime).SetupTimeOfDayEntityProperty();
            builder.Entity<EventSchedule>().HasMany(s => s.Occurrences)
              .WithOne(o => o.Schedule)
              .HasPrincipalKey(s => s.Id)
              .HasForeignKey(o => o.EventScheduleId)
              .IsRequired()
              .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<EventSchedule>().HasOne(s => s.Location)
             .WithMany(l => l.Schedules)
             .HasPrincipalKey(l => l.Id)
             .HasForeignKey(s => s.EventLocationId)
             .IsRequired()
             .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<EventSchedule>().HasOne(s => s.Event)
              .WithMany(e => e.Schedules)
              .HasPrincipalKey(e => e.Id)
              .HasForeignKey(s => s.EventId)
              .IsRequired()
              .OnDelete(DeleteBehavior.NoAction);

            // EventOccurrences
            builder.Entity<EventOccurrence>().SetupEntityTable("EventOccurrences");
            builder.Entity<EventOccurrence>().HasIndex(o => o.EventId);
            builder.Entity<EventOccurrence>().HasIndex(o => o.EventScheduleId);
            builder.Entity<EventOccurrence>().HasIndex(o => o.EventLocationId);
            builder.Entity<EventOccurrence>().Property(o => o.Date).SetupDateTimeEntityProperty();
            builder.Entity<EventOccurrence>().HasMany(o => o.Demerits)
              .WithOne(d => d.EventOccurrence)
              .HasPrincipalKey(o => o.Id)
              .HasForeignKey(d => d.EventOccurrenceId)
              .IsRequired()
              .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<EventOccurrence>().HasOne(o => o.Event)
               .WithMany(e => e.Occurrences)
               .HasPrincipalKey(e => e.Id)
               .HasForeignKey(o => o.EventId)
               .IsRequired()
               .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<EventOccurrence>().HasOne(o => o.Schedule)
               .WithMany(s => s.Occurrences)
               .HasPrincipalKey(s => s.Id)
               .HasForeignKey(o => o.EventScheduleId)
               .IsRequired()
               .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<EventOccurrence>().HasOne(o => o.Location)
               .WithMany(l => l.Occurrences)
               .HasPrincipalKey(l => l.Id)
               .HasForeignKey(o => o.EventLocationId)
               .IsRequired()
               .OnDelete(DeleteBehavior.NoAction);

            // EventServices
            builder.Entity<EventService>().SetupEntityTable("EventServices");
            builder.Entity<EventService>().HasIndex(es => es.EventId);
            builder.Entity<EventService>().HasIndex(es => es.ServiceId);
            builder.Entity<EventService>().HasOne(es => es.Service)
              .WithMany(s => s.EventServices)
              .HasPrincipalKey(s => s.Id)
              .HasForeignKey(e => e.ServiceId)
              .IsRequired()
              .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<EventService>().HasOne(es => es.Event)
              .WithMany(e => e.Services)
              .HasPrincipalKey(e => e.Id)
              .HasForeignKey(s => s.EventId)
              .IsRequired()
              .OnDelete(DeleteBehavior.NoAction);

            // Services
            builder.Entity<Service>().SetupEntityTable("Services");
            builder.Entity<Service>().Property(s => s.ServiceType).HasConversion(new EnumToNumberConverter<ServiceTypes, int>());
            builder.Entity<Service>().HasMany(s => s.EventServices)
              .WithOne(e => e.Service)
              .HasPrincipalKey(s => s.Id)
              .HasForeignKey(e => e.ServiceId)
              .IsRequired()
              .OnDelete(DeleteBehavior.Cascade);

            // Guests
            builder.Entity<Guest>().SetupEntityTable("Guests");
            builder.Entity<Guest>().Property(g => g.BirthDate).SetupDateTimeEntityProperty();
            builder.Entity<Guest>().Property(g => g.Sex).HasConversion(new EnumToNumberConverter<Sex, int>());
            builder.Entity<Guest>().HasMany(g => g.Demerits)
              .WithOne(d => d.Guest)
              .HasPrincipalKey(g => g.Id)
              .HasForeignKey(d => d.GuestId)
              .IsRequired()
              .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Guest>().HasMany(g => g.EventOccurrences)
             .WithOne(o => o.Guest)
             .HasPrincipalKey(g => g.Id)
             .HasForeignKey(o => o.GuestId)
             .IsRequired()
             .OnDelete(DeleteBehavior.Cascade);

            // GuestEventOccurrences
            builder.Entity<GuestEventOccurrence>().SetupEntityTable("GuestEventOccurrences");
            builder.Entity<GuestEventOccurrence>().HasIndex(geo => geo.EventOccurrenceId);
            builder.Entity<GuestEventOccurrence>().HasIndex(geo => geo.GuestId);
            builder.Entity<GuestEventOccurrence>().HasOne(geo => geo.Guest)
              .WithMany(g => g.EventOccurrences)
              .HasPrincipalKey(g => g.Id)
              .HasForeignKey(geo => geo.GuestId)
              .IsRequired()
              .OnDelete(DeleteBehavior.SetNull);

            // Notifications
            builder.Entity<Notification>().SetupEntityTable("Notifications");
            builder.Entity<Notification>().Property(n => n.Date).SetupDateTimeEntityProperty();
        }

        public override int SaveChanges()
        {
            UpdateAuditableEntities();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            UpdateAuditableEntities();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateAuditableEntities();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            UpdateAuditableEntities();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void UpdateAuditableEntities()
        {
            IEnumerable<EntityEntry> modifiedEntries = ChangeTracker.Entries()
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
                    entity.CreatedBy = CurrentUserId;
                }
                else
                {
                    base.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                    base.Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                }

                entity.UpdatedDate = now;
                entity.UpdatedBy = CurrentUserId;
            }
        }
    }
}
