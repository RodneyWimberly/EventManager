using EventManager.Events.DataAccess.Extensions;
using EventManager.Events.DataAccess.Models;
using EventManager.Shared.DataAccess;
using EventManager.Shared.DataAccess.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace EventManager.Events.DataAccess
{
    public class EventDbSeeder : IDbSeeder
    {
        private readonly ILogger _logger;
        private readonly EventDbContext _eventContext;

        public EventDbSeeder(ILogger<EventDbSeeder> logger, EventDbContext eventsContext)
        {
            _logger = logger;
            _eventContext = eventsContext;
        }


        public async Task SeedDbAsync()
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
                string message = LoggingEvents.SeedingDatabase.Name + " EM-EventDB";
                _logger.LogCritical(LoggingEvents.SeedingDatabase, ex, message);
                throw new Exception(message, ex);
            }
        }

        public async Task MigrateDbAsync()
        {
            try
            {
                _logger.LogInformation("Ensuring EM-EventDB has been created.");
                await _eventContext.Database.EnsureCreatedAsync();
            }
            catch (Exception ex)
            {
                string message = LoggingEvents.MigratingDatabase.Name + " EM-EventDB";
                _logger.LogCritical(LoggingEvents.MigratingDatabase, ex, message);
                throw new Exception(message, ex);
            }
        }
    }
}
