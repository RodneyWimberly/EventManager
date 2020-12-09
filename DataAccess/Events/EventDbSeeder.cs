using EventManager.DataAccess.Events.Models;
using EventManager.DataAccess.Extensions;
using EventManager.DataAccess.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace EventManager.DataAccess.Events
{
    public class EventDbSeeder
    {
        private readonly ILogger _logger;
        private readonly EventDbContext _eventContext;

        public EventDbSeeder(ILogger<IdentityDbSeeder> logger, EventDbContext eventsContext)
        {
            _logger = logger;
            _eventContext = eventsContext;
        }


        public async Task EnsureEventDbSeededAsync()
        {
            _logger.LogInformation("Ensuring EM-EventDB is populated with seed data.");
            try
            {
                await _eventContext.SeedEventDbEntityAsync<Notification>(_eventContext.Notifications, _logger);
                await _eventContext.SeedEventDbEntityAsync<Service>(_eventContext.Services, _logger);
                await _eventContext.SeedEventDbEntityAsync<Event>(_eventContext.Events, _logger);
                await _eventContext.SeedEventDbEntityAsync<EventLocation>(_eventContext.EventLocations, _logger);
                await _eventContext.SeedEventDbEntityAsync<EventSchedule>(_eventContext.EventSchedules, _logger);
                await _eventContext.SeedEventDbEntityAsync<EventService>(_eventContext.EventServices, _logger);
                await _eventContext.SeedEventDbEntityAsync<Guest>(_eventContext.Guests, _logger);
                await _eventContext.SeedEventDbEntityAsync<EventOccurance>(_eventContext.EventOccurances, _logger);
                await _eventContext.SeedEventDbEntityAsync<GuestEventOccurance>(_eventContext.GuestEventOccurances, _logger);
                await _eventContext.SeedEventDbEntityAsync<Demerit>(_eventContext.Demerits, _logger);
            }
            catch (Exception ex)
            {
                string message = LoggingEvents.SeedingDatabase.Name + " em-eventdb";
                _logger.LogCritical(LoggingEvents.SeedingDatabase, ex, message);
                throw new Exception(message, ex);
            }
        }

        public async Task MigrateEventDBAsync()
        {
            try
            {
                _logger.LogInformation("Running EventDbContext Migration");
                await _eventContext.Database.EnsureCreatedAsync();
            }
            catch (Exception ex)
            {
                string message = LoggingEvents.MigratingDatabase.Name + " em-eventdb";
                _logger.LogCritical(LoggingEvents.MigratingDatabase, ex, message);
                throw new Exception(message, ex);
            }
        }
    }
}
