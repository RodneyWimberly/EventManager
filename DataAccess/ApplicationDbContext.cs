using EventManager.DataAccess.Core.Enums;
using EventManager.DataAccess.Core.Interfaces;
using EventManager.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ZNetCS.AspNetCore.Logging.EntityFrameworkCore;

namespace EventManager.DataAccess
{
    public class ApplicationDbContext : DbContext
    {
        private const string systemUserId = "11111111-1111-1111-1111-111111111111";
        private string _currentUserId;
        public string CurrentUserId
        {
            get => string.IsNullOrEmpty(_currentUserId) ? systemUserId : _currentUserId;
            set => _currentUserId = value;
        }

        public DbSet<ExtendedLog> Logs { get; set; }
        public DbSet<Demerit> Demerits { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventOccurance> EventOccurances { get; set; }
        public DbSet<EventLocation> EventLocations { get; set; }
        public DbSet<EventSchedule> EventSchedules { get; set; }
        public DbSet<EventService> EventServices { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Guest> Guests { get; set; }
        public DbSet<GuestEventOccurance> GuestEventOccurances { get; set; }
        public DbSet<Service> Services { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Logs
            LogModelBuilderHelper.Build<ExtendedLog, string>(builder.Entity<ExtendedLog>());
            builder.Entity<ExtendedLog>().SetupEntityContainer("Logs");
            builder.Entity<ExtendedLog>().HasIndex(r => r.TimeStamp);
            builder.Entity<ExtendedLog>().HasIndex(r => r.EventId);
            builder.Entity<ExtendedLog>().HasIndex(r => r.Level);
            builder.Entity<ExtendedLog>().Property(r => r.Id).ValueGeneratedOnAdd();

            // Demerits
            builder.Entity<Demerit>().SetupEntityContainer("Demerits");
            builder.Entity<Demerit>().HasIndex(d => d.GuestId);
            builder.Entity<Demerit>().HasIndex(d => d.EventOccuranceId);
            builder.Entity<Demerit>().Property(d => d.DateTime).SetupDateTimeEntityProperty();
            builder.Entity<Demerit>().HasOne(d => d.Guest)
                .WithMany(g => g.Demerits)
                .HasPrincipalKey(g => g.Id)
                .HasForeignKey(d => d.GuestId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Demerit>().HasOne(d => d.EventOccurance)
               .WithMany(o => o.Demerits)
               .HasPrincipalKey(o => o.Id)
               .HasForeignKey(d => d.EventOccuranceId)
               .IsRequired()
               .OnDelete(DeleteBehavior.NoAction);

            // Events
            builder.Entity<Event>().SetupEntityContainer("Events");
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
            builder.Entity<Event>().HasMany(e => e.Occurances)
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
            builder.Entity<EventLocation>().SetupEntityContainer("EventLocations");
            builder.Entity<EventLocation>().HasIndex(l => l.EventId);
            builder.Entity<EventLocation>().HasMany(l => l.Schedules)
              .WithOne(s => s.Location)
              .HasPrincipalKey(l => l.Id)
              .HasForeignKey(s => s.EventLocationId)
              .IsRequired()
              .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<EventLocation>().HasMany(l => l.Occurances)
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
            builder.Entity<EventSchedule>().SetupEntityContainer("EventSchedules");
            builder.Entity<EventSchedule>().HasIndex(s => s.EventId);
            builder.Entity<EventSchedule>().HasIndex(s => s.EventLocationId);
            builder.Entity<EventSchedule>().Property(s => s.DaysOfTheWeek).HasConversion(d => (int)d, e => (Days)e);
            builder.Entity<EventSchedule>().Property(s => s.StartDate).SetupDateTimeEntityProperty();
            builder.Entity<EventSchedule>().Property(s => s.EndDate).SetupDateTimeEntityProperty();
            builder.Entity<EventSchedule>().Property(s => s.StartTime).SetupTimeOfDayEntityProperty();
            builder.Entity<EventSchedule>().Property(s => s.EndTime).SetupTimeOfDayEntityProperty();
            builder.Entity<EventSchedule>().Property(s => s.CheckInStartTime).SetupTimeOfDayEntityProperty();
            builder.Entity<EventSchedule>().Property(s => s.CheckInEndTime).SetupTimeOfDayEntityProperty();
            builder.Entity<EventSchedule>().HasMany(s => s.Occurances)
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

            // EventOccurances
            builder.Entity<EventOccurance>().SetupEntityContainer("EventOccurances");
            builder.Entity<EventOccurance>().HasIndex(o => o.EventId);
            builder.Entity<EventOccurance>().HasIndex(o => o.EventScheduleId);
            builder.Entity<EventOccurance>().HasIndex(o => o.EventLocationId);
            builder.Entity<EventOccurance>().Property(o => o.Date).SetupDateTimeEntityProperty();
            builder.Entity<EventOccurance>().HasMany(o => o.Demerits)
              .WithOne(d => d.EventOccurance)
              .HasPrincipalKey(o => o.Id)
              .HasForeignKey(d => d.EventOccuranceId)
              .IsRequired()
              .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<EventOccurance>().HasOne(o => o.Event)
               .WithMany(e => e.Occurances)
               .HasPrincipalKey(e => e.Id)
               .HasForeignKey(o => o.EventId)
               .IsRequired()
               .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<EventOccurance>().HasOne(o => o.Schedule)
               .WithMany(s => s.Occurances)
               .HasPrincipalKey(s => s.Id)
               .HasForeignKey(o => o.EventScheduleId)
               .IsRequired()
               .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<EventOccurance>().HasOne(o => o.Location)
               .WithMany(l => l.Occurances)
               .HasPrincipalKey(l => l.Id)
               .HasForeignKey(o => o.EventLocationId)
               .IsRequired()
               .OnDelete(DeleteBehavior.NoAction);

            // EventServices
            builder.Entity<EventService>().SetupEntityContainer("EventServices");
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
            builder.Entity<Service>().SetupEntityContainer("Services");
            builder.Entity<Service>().Property(s => s.ServiceType).HasConversion(s => (int)s, e => (ServiceTypes)e);
            builder.Entity<Service>().HasMany(s => s.EventServices)
              .WithOne(e => e.Service)
              .HasPrincipalKey(s => s.Id)
              .HasForeignKey(e => e.ServiceId)
              .IsRequired()
              .OnDelete(DeleteBehavior.Cascade);

            // Guests
            builder.Entity<Guest>().SetupEntityContainer("Guests");
            builder.Entity<Guest>().Property(g => g.BirthDate).SetupDateTimeEntityProperty();
            builder.Entity<Guest>().Property(g => g.Sex).HasConversion(s => (int)s, e => (Sexes)e);
            builder.Entity<Guest>().HasMany(g => g.Demerits)
              .WithOne(d => d.Guest)
              .HasPrincipalKey(g => g.Id)
              .HasForeignKey(d => d.GuestId)
              .IsRequired()
              .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Guest>().HasMany(g => g.EventOccurances)
             .WithOne(o => o.Guest)
             .HasPrincipalKey(g => g.Id)
             .HasForeignKey(o => o.GuestId)
             .IsRequired()
             .OnDelete(DeleteBehavior.Cascade);

            // GuestEventOccurances
            builder.Entity<GuestEventOccurance>().SetupEntityContainer("GuestEventOccurances");
            builder.Entity<GuestEventOccurance>().HasIndex(geo => geo.EventOccuranceId);
            builder.Entity<GuestEventOccurance>().HasIndex(geo => geo.GuestId);
            builder.Entity<GuestEventOccurance>().HasOne(geo => geo.Guest)
              .WithMany(g => g.EventOccurances)
              .HasPrincipalKey(g => g.Id)
              .HasForeignKey(geo => geo.GuestId)
              .IsRequired()
              .OnDelete(DeleteBehavior.SetNull);

            // Notifications
            builder.Entity<Notification>().SetupEntityContainer("Notifications");
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
