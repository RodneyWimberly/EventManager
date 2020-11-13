using Arch.EntityFrameworkCore.UnitOfWork;
using Arch.EntityFrameworkCore.UnitOfWork.Collections;
using AutoMapper;
using EventManager.DataAccess.Identity;
using EventManager.DataAccess.Events;
using EventManager.DataAccess.Events.Models;
using EventManager.Web.Helpers;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventManager.Web.Controllers
{
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        protected readonly IMapper _mapper;
        protected readonly IUnitOfWork<EventDbContext> _unitOfWork;
        protected readonly ILogger _logger;
        protected readonly HttpContext _httpContext;
        protected readonly IIdentityManager _accountManager;

        protected readonly EntityControllerHelper<Event> _eventHelper;
        protected readonly EntityControllerHelper<EventLocation> _locationHelper;
        protected readonly EntityControllerHelper<EventSchedule> _scheduleHelper;
        protected readonly EntityControllerHelper<EventOccurance> _occurrenceHelper;
        protected readonly EntityControllerHelper<EventService> _serviceHelper;

        public EventController(IIdentityManager accountManager, IHttpContextAccessor httpAccessor, IMapper mapper, IUnitOfWork<EventDbContext> unitOfWork, ILogger<EventController> logger)
        {
            _accountManager = accountManager;
            _httpContext = httpAccessor.HttpContext;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;

            _eventHelper = new EntityControllerHelper<Event>(accountManager, httpAccessor, mapper, unitOfWork, logger);
            _eventHelper.GetIncludeEvent += EventController_GetIncludeEvent;

            _locationHelper = new EntityControllerHelper<EventLocation>(accountManager, httpAccessor, mapper, unitOfWork, logger);
            _locationHelper.GetIncludeEvent += LocationHelper_GetIncludeEvent;

            _scheduleHelper = new EntityControllerHelper<EventSchedule>(accountManager, httpAccessor, mapper, unitOfWork, logger);
            _scheduleHelper.GetIncludeEvent += ScheduleHelper_GetIncludeEvent;

            _occurrenceHelper = new EntityControllerHelper<EventOccurance>(accountManager, httpAccessor, mapper, unitOfWork, logger);
            _occurrenceHelper.GetIncludeEvent += OccurrenceHelper_GetIncludeEvent;

            _serviceHelper = new EntityControllerHelper<EventService>(accountManager, httpAccessor, mapper, unitOfWork, logger);
            _serviceHelper.GetIncludeEvent += ServiceHelper_GetIncludeEvent;
        }


        #region Events
        private void EventController_GetIncludeEvent(object sender, GetIncludeEventArgs<Event> e)
        {
            List<string> propertyPaths = e.PropertyPaths.ToLower().Split(";", StringSplitOptions.RemoveEmptyEntries).ToList();
            propertyPaths.ForEach(p => p = p.Trim());
            IQueryable<Event> root = e.EntityQuery;
            if (propertyPaths.Contains("locations.schedules"))
                root = e.Include = root.Include(e => e.Locations).ThenInclude(l => l.Schedules);
            else if (propertyPaths.Contains("locations"))
                root = e.Include = root.Include(e => e.Locations);

            if (propertyPaths.Contains("schedules.location"))
                root = e.Include = root.Include(e => e.Schedules).ThenInclude(s => s.Location);
            else if (propertyPaths.Contains("schedules"))
                root = e.Include = root.Include(e => e.Schedules);

            if (propertyPaths.Contains("occurrences"))
                root = e.Include = root.Include(e => e.Occurances);
            if (propertyPaths.Contains("services"))
                root = e.Include = root.Include(e => e.Services);
        }

        [HttpGet("{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Event>))]
        public async Task<IActionResult> GetAllEvents(string includePropertyPaths = "")
        {
            return await _eventHelper.GetAll(includePropertyPaths);
        }

        [HttpGet("{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Event>))]
        public async Task<IActionResult> GetAllEventsPaged(int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            return await _eventHelper.GetAllPaged(pageNumber, pageSize, includePropertyPaths);
        }

        [HttpGet("{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetEvent(string id, string includePropertyPaths = "")
        {
            return await _eventHelper.Get(id, includePropertyPaths);
        }

        [HttpDelete("{id}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEvent(string id)
        {
            return await _eventHelper.Delete(id);
        }

        [HttpPost]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostEvent([FromBody] Event entity)
        {
            return await _eventHelper.Add(entity);
        }

        [HttpPut("{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutEvent(string id, string includePropertyPaths = "", [FromBody] Event entity = null)
        {
            return await _eventHelper.Update(id, includePropertyPaths, entity);
        }

        [HttpPatch("{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PatchEvent(string id, string includePropertyPaths = "", [FromBody] JsonPatchDocument<Event> patch = null)
        {
            return await _eventHelper.Patch(id, includePropertyPaths, patch);
        }
        #endregion

        #region EventLocation
        private void LocationHelper_GetIncludeEvent(object sender, GetIncludeEventArgs<EventLocation> e)
        {
            List<string> propertyPaths = e.PropertyPaths.ToLower().Split(";", StringSplitOptions.RemoveEmptyEntries).ToList();
            propertyPaths.ForEach(p => p = p.Trim());
            IQueryable<EventLocation> root = e.EntityQuery;
            if (propertyPaths.Contains("schedules"))
                root = e.Include = root.Include(e => e.Schedules);

            if (propertyPaths.Contains("event"))
                root = e.Include = root.Include(e => e.Event);
        }

        [HttpGet("Location/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventLocation>))]
        public async Task<IActionResult> GetAllEventLocations(string includePropertyPaths = "")
        {
            return await _locationHelper.GetAll(includePropertyPaths);
        }

        [HttpGet("Location/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventLocation>))]
        public async Task<IActionResult> GetAllEventLocationsPaged(int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            return await _locationHelper.GetAllPaged(pageNumber, pageSize, includePropertyPaths);
        }

        [HttpGet("{eventId}/Location/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventLocation>))]
        public async Task<IActionResult> GetAllEventLocationsByEvent(string eventId, string includePropertyPaths = "")
        {
            return await GetAllEventLocationsByEventPaged(eventId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("{eventId}/Location/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventLocation>))]
        public async Task<IActionResult> GetAllEventLocationsByEventPaged(string eventId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventLocation> pagedList;
            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventLocation>().GetPagedListAsync(predicate: l => l.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventLocation>().GetPagedListAsync(predicate: l => l.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize, include: e => _locationHelper.GetInclude(e, includePropertyPaths));
            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        [HttpGet("Location/Schedule/{eventScheduleId}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventLocation>))]
        public async Task<IActionResult> GetAllEventLocationsByEventSchedule(string eventScheduleId, string includePropertyPaths = "")
        {
            return await GetAllEventLocationsByEventSchedulePaged(eventScheduleId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("Location/Schedule/{eventScheduleId}/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventLocation>))]
        public async Task<IActionResult> GetAllEventLocationsByEventSchedulePaged(string eventScheduleId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventLocation> pagedList;
            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventLocation>().GetPagedListAsync(predicate: l => l.Schedules.Any(s => s.Id == eventScheduleId), pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventLocation>().GetPagedListAsync(predicate: l => l.Schedules.Any(s => s.Id == eventScheduleId), pageIndex: pageNumber, pageSize: pageSize, include: e => _locationHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        [HttpGet("Location/{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventLocation))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetEventLocation(string id, string includePropertyPaths = "")
        {
            return await _locationHelper.Get(id, includePropertyPaths);
        }

        [HttpDelete("Location/{id}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEventLocation(string id)
        {
            return await _locationHelper.Delete(id);
        }

        [HttpPost("Location")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(EventLocation))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostEventLocation([FromBody] EventLocation entity)
        {
            return await _locationHelper.Add(entity);
        }

        [HttpPut("Location/{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventLocation))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutEventLocation(string id, string includePropertyPaths = "", [FromBody] EventLocation entity = null)
        {
            return await _locationHelper.Update(id, includePropertyPaths, entity);
        }

        [HttpPatch("Location/{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventLocation))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PatchEventLocation(string id, string includePropertyPaths = "", [FromBody] JsonPatchDocument<EventLocation> patch = null)
        {
            return await _locationHelper.Patch(id, includePropertyPaths, patch);
        }
        #endregion

        #region EventSchedule
        private void ScheduleHelper_GetIncludeEvent(object sender, GetIncludeEventArgs<EventSchedule> e)
        {
            List<string> propertyPaths = e.PropertyPaths.ToLower().Split(";", StringSplitOptions.RemoveEmptyEntries).ToList();
            propertyPaths.ForEach(p => p = p.Trim());
            IQueryable<EventSchedule> root = e.EntityQuery;
            if (propertyPaths.Contains("location"))
                root = e.Include = root.Include(e => e.Location);
        }


        [HttpGet("Schedule/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventSchedules(string includePropertyPaths = "")
        {
            return await _scheduleHelper.GetAll(includePropertyPaths);
        }

        [HttpGet("Schedule/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventSchedulesPaged(int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            return await _scheduleHelper.GetAllPaged(pageNumber, pageSize, includePropertyPaths);
        }

        [HttpGet("{eventId}/Schedule/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventSchedulesByEvent(string eventId, string includePropertyPaths = "")
        {
            return await GetAllEventSchedulesByEventPaged(eventId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("{eventId}/Schedule/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventSchedulesByEventPaged(string eventId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventSchedule> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventSchedule>().GetPagedListAsync(predicate: s => s.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventSchedule>().GetPagedListAsync(predicate: s => s.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize, include: e => _scheduleHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        [HttpGet("Schedule/Location/{eventLocationId}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventSchedulesByEventLocation(string eventLocationId, string includePropertyPaths = "")
        {
            return await GetAllEventSchedulesByEventLocationPaged(eventLocationId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("Schedule/Location/{eventLocationId}/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventSchedulesByEventLocationPaged(string eventLocationId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventSchedule> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventSchedule>().GetPagedListAsync(predicate: s => s.EventLocationId == eventLocationId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventSchedule>().GetPagedListAsync(predicate: s => s.EventLocationId == eventLocationId, pageIndex: pageNumber, pageSize: pageSize, include: e => _scheduleHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        [HttpGet("Schedule/{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventSchedule))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetEventSchedule(string id, string includePropertyPaths = "")
        {
            return await _scheduleHelper.Get(id, includePropertyPaths);
        }

        [HttpDelete("Schedule/{id}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEventSchedule(string id)
        {
            return await _scheduleHelper.Delete(id);
        }

        [HttpPost("Schedule")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(EventSchedule))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostEventSchedule([FromBody] EventSchedule entity)
        {
            return await _scheduleHelper.Add(entity);
        }

        [HttpPut("Schedule/{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventSchedule))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutEventSchedule(string id, string includePropertyPaths = "", [FromBody] EventSchedule entity = null)
        {
            return await _scheduleHelper.Update(id, includePropertyPaths, entity);
        }

        [HttpPatch("Schedule/{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventSchedule))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PatchEventSchedule(string id, string includePropertyPaths = "", [FromBody] JsonPatchDocument<EventSchedule> patch = null)
        {
            return await _scheduleHelper.Patch(id, includePropertyPaths, patch);
        }
        #endregion

        #region EventOccurrence
        private void OccurrenceHelper_GetIncludeEvent(object sender, GetIncludeEventArgs<EventOccurance> e)
        {
            List<string> propertyPaths = e.PropertyPaths.ToLower().Split(";", StringSplitOptions.RemoveEmptyEntries).ToList();
            propertyPaths.ForEach(p => p = p.Trim());
            IQueryable<EventOccurance> root = e.EntityQuery;
        }

        [HttpGet("Occurrence/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventOccurance>))]
        public async Task<IActionResult> GetAllEventOccurrences(string includePropertyPaths = "")
        {
            return await _occurrenceHelper.GetAll(includePropertyPaths);
        }

        [HttpGet("Occurrence/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventOccurance>))]
        public async Task<IActionResult> GetAllEventOccurrencesPaged(int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            return await _occurrenceHelper.GetAllPaged(pageNumber, pageSize, includePropertyPaths);
        }

        [HttpGet("{eventId}/Occurrence/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventOccurance>))]
        public async Task<IActionResult> GetAllEventOccurrencesByEvent(string eventId, string includePropertyPaths = "")
        {
            return await GetAllEventOccurrencesByEventPaged(eventId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("{eventId}/Occurrence/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventOccurance>))]
        public async Task<IActionResult> GetAllEventOccurrencesByEventPaged(string eventId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventOccurance> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventOccurance>().GetPagedListAsync(predicate: o => o.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventOccurance>().GetPagedListAsync(predicate: o => o.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize, include: e => _occurrenceHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }


        [HttpGet("Occurrence/Location/{eventLocationid}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventOccurance>))]
        public async Task<IActionResult> GetAllEventOccurrencesByEventLocation(string eventLocationId, string includePropertyPaths = "")
        {
            return await GetAllEventOccurrencesByEventLocationPaged(eventLocationId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("Occurrence/Location/{eventLocationid}/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventOccurrencesByEventLocationPaged(string eventLocationId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventOccurance> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventOccurance>().GetPagedListAsync(predicate: o => o.EventLocationId == eventLocationId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventOccurance>().GetPagedListAsync(predicate: o => o.EventLocationId == eventLocationId, pageIndex: pageNumber, pageSize: pageSize, include: e => _occurrenceHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        [HttpGet("Occurrence/Schedule/{eventScheduleid}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventOccurance>))]
        public async Task<IActionResult> GetAllEventOccurrencesByEventSchedule(string eventScheduleId, string includePropertyPaths = "")
        {
            return await GetAllEventOccurrencesByEventSchedulePaged(eventScheduleId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("Occurrence/Schedule/{eventScheduleid}/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventOccurrencesByEventSchedulePaged(string eventScheduleid, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventOccurance> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventOccurance>().GetPagedListAsync(predicate: o => o.EventScheduleId == eventScheduleid, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventOccurance>().GetPagedListAsync(predicate: o => o.EventScheduleId == eventScheduleid, pageIndex: pageNumber, pageSize: pageSize, include: e => _occurrenceHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }


        [HttpGet("Occurrence/{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventOccurance))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetEventOccurrence(string id, string includePropertyPaths = "")
        {
            return await _occurrenceHelper.Get(id, includePropertyPaths);
        }

        [HttpDelete("Occurrence/{id}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEventOccurrence(string id)
        {
            return await _occurrenceHelper.Delete(id);
        }

        [HttpPost("Occurrence")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(EventOccurance))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostEventOccurrence([FromBody] EventOccurance entity)
        {
            return await _occurrenceHelper.Add(entity);
        }

        [HttpPut("Occurrence/{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventOccurance))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutEventOccurrence(string id, string includePropertyPaths = "", [FromBody] EventOccurance entity = null)
        {
            return await _occurrenceHelper.Update(id, includePropertyPaths, entity);
        }

        [HttpPatch("Occurrence/{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventOccurance))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PatchEventOccurrence(string id, string includePropertyPaths = "", [FromBody] JsonPatchDocument<EventOccurance> patch = null)
        {
            return await _occurrenceHelper.Patch(id, includePropertyPaths, patch);
        }
        #endregion

        #region EventService
        private void ServiceHelper_GetIncludeEvent(object sender, GetIncludeEventArgs<EventService> e)
        {
            List<string> propertyPaths = e.PropertyPaths.ToLower().Split(";", StringSplitOptions.RemoveEmptyEntries).ToList();
            propertyPaths.ForEach(p => p = p.Trim());
            IQueryable<EventService> root = e.EntityQuery;
        }

        [HttpGet("Service/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventService>))]
        public async Task<IActionResult> GetAllEventServices(string includePropertyPaths = "")
        {
            return await _serviceHelper.GetAll(includePropertyPaths);
        }

        [HttpGet("Service/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventService>))]
        public async Task<IActionResult> GetAllEventServicesPaged(int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            return await _serviceHelper.GetAllPaged(pageNumber, pageSize, includePropertyPaths);
        }

        [HttpGet("{eventId}/Service/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventService>))]
        public async Task<IActionResult> GetAllEventServicesByEvent(string eventId, string includePropertyPaths = "")
        {
            return await GetAllEventServicesByEventPaged(eventId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("{eventId}/Service/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventService>))]
        public async Task<IActionResult> GetAllEventServicesByEventPaged(string eventId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventService> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventService>().GetPagedListAsync(predicate: s => s.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventService>().GetPagedListAsync(predicate: s => s.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize, include: e => _serviceHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        [HttpGet("Service/Service/{serviceId}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventService>))]
        public async Task<IActionResult> GetAllEventServicesByService(string serviceId, string includePropertyPaths = "")
        {
            return await GetAllEventServicesByServicePaged(serviceId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("Service/Service/{serviceId}/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventService>))]
        public async Task<IActionResult> GetAllEventServicesByServicePaged(string serviceId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventService> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventService>().GetPagedListAsync(predicate: s => s.ServiceId == serviceId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventService>().GetPagedListAsync(predicate: s => s.ServiceId == serviceId, pageIndex: pageNumber, pageSize: pageSize, include: e => _serviceHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }


        [HttpGet("Service/{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventService))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetEventService(string id, string includePropertyPaths = "")
        {
            return await _serviceHelper.Get(id, includePropertyPaths);
        }

        [HttpDelete("Service/{id}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEventService(string id)
        {
            return await _serviceHelper.Delete(id);
        }

        [HttpPost("Service")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(EventService))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostEventService([FromBody] EventService entity)
        {
            return await _serviceHelper.Add(entity);
        }

        [HttpPut("Service/{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventService))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutEventService(string id, string includePropertyPaths = "", [FromBody] EventService entity = null)
        {
            return await _serviceHelper.Update(id, includePropertyPaths, entity);
        }

        [HttpPatch("Service/{id}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventService))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PatchEventService(string id, string includePropertyPaths = "", [FromBody] JsonPatchDocument<EventService> patch = null)
        {
            return await _serviceHelper.Patch(id, includePropertyPaths, patch);
        }

        #endregion

    }
}