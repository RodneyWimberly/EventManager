using Arch.EntityFrameworkCore.UnitOfWork;
using Arch.EntityFrameworkCore.UnitOfWork.Collections;
using AutoMapper;
using EventManager.DataAccess;
using EventManager.DataAccess.Core.Interfaces;
using EventManager.DataAccess.Models;
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
        protected readonly IUnitOfWork<ApplicationDbContext> _unitOfWork;
        protected readonly ILogger _logger;
        protected readonly HttpContext _httpContext;
        protected readonly IAccountManager _accountManager;

        protected readonly EntityControllerHelper<Event> _eventHelper;
        protected readonly EntityControllerHelper<EventLocation> _locationHelper;
        protected readonly EntityControllerHelper<EventSchedule> _scheduleHelper;
        protected readonly EntityControllerHelper<EventOccurrence> _occurrenceHelper;
        protected readonly EntityControllerHelper<EventService> _serviceHelper;

        public EventController(IAccountManager accountManager, IHttpContextAccessor httpAccessor, IMapper mapper, IUnitOfWork<ApplicationDbContext> unitOfWork, ILogger<EventController> logger)
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

            _occurrenceHelper = new EntityControllerHelper<EventOccurrence>(accountManager, httpAccessor, mapper, unitOfWork, logger);
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
                root = e.Include = root.Include(e => e.Occurrences);
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

        [HttpGet("{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetEvent(int id, string includePropertyPaths = "")
        {
            return await _eventHelper.Get(id, includePropertyPaths);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            return await _eventHelper.Delete(id);
        }

        [HttpPost]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostEvent([FromBody]Event entity)
        {
            return await _eventHelper.Add(entity);
        }

        [HttpPut("{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutEvent(int id, string includePropertyPaths = "", [FromBody]Event entity = null)
        {
            return await _eventHelper.Update(id, includePropertyPaths, entity);
        }

        [HttpPatch("{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PatchEvent(int id, string includePropertyPaths = "", [FromBody]JsonPatchDocument<Event> patch = null)
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

        [HttpGet("{eventId:int}/Location/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventLocation>))]
        public async Task<IActionResult> GetAllEventLocationsByEvent(int eventId, string includePropertyPaths = "")
        {
            return await GetAllEventLocationsByEventPaged(eventId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("{eventId:int}/Location/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventLocation>))]
        public async Task<IActionResult> GetAllEventLocationsByEventPaged(int eventId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventLocation> pagedList;
            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventLocation>().GetPagedListAsync(predicate: l => l.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventLocation>().GetPagedListAsync(predicate: l => l.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize, include: e => _locationHelper.GetInclude(e, includePropertyPaths));
            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        [HttpGet("Location/Schedule/{eventScheduleId:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventLocation>))]
        public async Task<IActionResult> GetAllEventLocationsByEventSchedule(int eventScheduleId, string includePropertyPaths = "")
        {
            return await GetAllEventLocationsByEventSchedulePaged(eventScheduleId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("Location/Schedule/{eventScheduleId:int}/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventLocation>))]
        public async Task<IActionResult> GetAllEventLocationsByEventSchedulePaged(int eventScheduleId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventLocation> pagedList;
            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventLocation>().GetPagedListAsync(predicate: l => l.Schedules.Any(s => s.Id == eventScheduleId), pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventLocation>().GetPagedListAsync(predicate: l => l.Schedules.Any(s => s.Id == eventScheduleId), pageIndex: pageNumber, pageSize: pageSize, include: e => _locationHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        [HttpGet("Location/{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventLocation))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetEventLocation(int id, string includePropertyPaths = "")
        {
            return await _locationHelper.Get(id, includePropertyPaths);
        }

        [HttpDelete("Location/{id:int}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEventLocation(int id)
        {
            return await _locationHelper.Delete(id);
        }

        [HttpPost("Location")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(EventLocation))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostEventLocation([FromBody]EventLocation entity)
        {
            return await _locationHelper.Add(entity);
        }

        [HttpPut("Location/{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventLocation))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutEventLocation(int id, string includePropertyPaths = "", [FromBody]EventLocation entity = null)
        {
            return await _locationHelper.Update(id, includePropertyPaths, entity);
        }

        [HttpPatch("Location/{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventLocation))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PatchEventLocation(int id, string includePropertyPaths = "", [FromBody]JsonPatchDocument<EventLocation> patch = null)
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

        [HttpGet("{eventId:int}/Schedule/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventSchedulesByEvent(int eventId, string includePropertyPaths = "")
        {
            return await GetAllEventSchedulesByEventPaged(eventId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("{eventId:int}/Schedule/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventSchedulesByEventPaged(int eventId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventSchedule> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventSchedule>().GetPagedListAsync(predicate: s => s.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventSchedule>().GetPagedListAsync(predicate: s => s.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize, include: e => _scheduleHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        [HttpGet("Schedule/Location/{eventLocationId:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventSchedulesByEventLocation(int eventLocationId, string includePropertyPaths = "")
        {
            return await GetAllEventSchedulesByEventLocationPaged(eventLocationId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("Schedule/Location/{eventLocationId:int}/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventSchedulesByEventLocationPaged(int eventLocationId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventSchedule> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventSchedule>().GetPagedListAsync(predicate: s => s.EventLocationId == eventLocationId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventSchedule>().GetPagedListAsync(predicate: s => s.EventLocationId == eventLocationId, pageIndex: pageNumber, pageSize: pageSize, include: e => _scheduleHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        [HttpGet("Schedule/{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventSchedule))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetEventSchedule(int id, string includePropertyPaths = "")
        {
            return await _scheduleHelper.Get(id, includePropertyPaths);
        }

        [HttpDelete("Schedule/{id:int}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEventSchedule(int id)
        {
            return await _scheduleHelper.Delete(id);
        }

        [HttpPost("Schedule")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(EventSchedule))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostEventSchedule([FromBody]EventSchedule entity)
        {
            return await _scheduleHelper.Add(entity);
        }

        [HttpPut("Schedule/{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventSchedule))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutEventSchedule(int id, string includePropertyPaths = "", [FromBody]EventSchedule entity = null)
        {
            return await _scheduleHelper.Update(id, includePropertyPaths, entity);
        }

        [HttpPatch("Schedule/{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventSchedule))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PatchEventSchedule(int id, string includePropertyPaths = "", [FromBody]JsonPatchDocument<EventSchedule> patch = null)
        {
            return await _scheduleHelper.Patch(id, includePropertyPaths, patch);
        }
        #endregion

        #region EventOccurrence
        private void OccurrenceHelper_GetIncludeEvent(object sender, GetIncludeEventArgs<EventOccurrence> e)
        {
            List<string> propertyPaths = e.PropertyPaths.ToLower().Split(";", StringSplitOptions.RemoveEmptyEntries).ToList();
            propertyPaths.ForEach(p => p = p.Trim());
            IQueryable<EventOccurrence> root = e.EntityQuery;
        }

        [HttpGet("Occurrence/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventOccurrence>))]
        public async Task<IActionResult> GetAllEventOccurrences(string includePropertyPaths = "")
        {
            return await _occurrenceHelper.GetAll(includePropertyPaths);
        }

        [HttpGet("Occurrence/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventOccurrence>))]
        public async Task<IActionResult> GetAllEventOccurrencesPaged(int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            return await _occurrenceHelper.GetAllPaged(pageNumber, pageSize, includePropertyPaths);
        }

        [HttpGet("{eventId:int}/Occurrence/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventOccurrence>))]
        public async Task<IActionResult> GetAllEventOccurrencesByEvent(int eventId, string includePropertyPaths = "")
        {
            return await GetAllEventOccurrencesByEventPaged(eventId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("{eventId:int}/Occurrence/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventOccurrence>))]
        public async Task<IActionResult> GetAllEventOccurrencesByEventPaged(int eventId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventOccurrence> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventOccurrence>().GetPagedListAsync(predicate: o => o.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventOccurrence>().GetPagedListAsync(predicate: o => o.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize, include: e => _occurrenceHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }


        [HttpGet("Occurrence/Location/{eventLocationid:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventOccurrence>))]
        public async Task<IActionResult> GetAllEventOccurrencesByEventLocation(int eventLocationId, string includePropertyPaths = "")
        {
            return await GetAllEventOccurrencesByEventLocationPaged(eventLocationId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("Occurrence/Location/{eventLocationid:int}/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventOccurrencesByEventLocationPaged(int eventLocationId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventOccurrence> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventOccurrence>().GetPagedListAsync(predicate: o => o.EventLocationId == eventLocationId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventOccurrence>().GetPagedListAsync(predicate: o => o.EventLocationId == eventLocationId, pageIndex: pageNumber, pageSize: pageSize, include: e => _occurrenceHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        [HttpGet("Occurrence/Schedule/{eventScheduleid:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventOccurrence>))]
        public async Task<IActionResult> GetAllEventOccurrencesByEventSchedule(int eventScheduleId, string includePropertyPaths = "")
        {
            return await GetAllEventOccurrencesByEventSchedulePaged(eventScheduleId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("Occurrence/Schedule/{eventScheduleid:int}/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventSchedule>))]
        public async Task<IActionResult> GetAllEventOccurrencesByEventSchedulePaged(int eventScheduleid, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventOccurrence> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventOccurrence>().GetPagedListAsync(predicate: o => o.EventScheduleId == eventScheduleid, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventOccurrence>().GetPagedListAsync(predicate: o => o.EventScheduleId == eventScheduleid, pageIndex: pageNumber, pageSize: pageSize, include: e => _occurrenceHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }


        [HttpGet("Occurrence/{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventOccurrence))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetEventOccurrence(int id, string includePropertyPaths = "")
        {
            return await _occurrenceHelper.Get(id, includePropertyPaths);
        }

        [HttpDelete("Occurrence/{id:int}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEventOccurrence(int id)
        {
            return await _occurrenceHelper.Delete(id);
        }

        [HttpPost("Occurrence")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(EventOccurrence))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostEventOccurrence([FromBody]EventOccurrence entity)
        {
            return await _occurrenceHelper.Add(entity);
        }

        [HttpPut("Occurrence/{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventOccurrence))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutEventOccurrence(int id, string includePropertyPaths = "", [FromBody]EventOccurrence entity = null)
        {
            return await _occurrenceHelper.Update(id, includePropertyPaths, entity);
        }

        [HttpPatch("Occurrence/{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventOccurrence))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PatchEventOccurrence(int id, string includePropertyPaths = "", [FromBody]JsonPatchDocument<EventOccurrence> patch = null)
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

        [HttpGet("{eventId:int}/Service/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventService>))]
        public async Task<IActionResult> GetAllEventServicesByEvent(int eventId, string includePropertyPaths = "")
        {
            return await GetAllEventServicesByEventPaged(eventId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("{eventId:int}/Service/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventService>))]
        public async Task<IActionResult> GetAllEventServicesByEventPaged(int eventId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventService> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventService>().GetPagedListAsync(predicate: s => s.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventService>().GetPagedListAsync(predicate: s => s.EventId == eventId, pageIndex: pageNumber, pageSize: pageSize, include: e => _serviceHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        [HttpGet("Service/Service/{serviceId:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventService>))]
        public async Task<IActionResult> GetAllEventServicesByService(int serviceId, string includePropertyPaths = "")
        {
            return await GetAllEventServicesByServicePaged(serviceId, 0, int.MaxValue, includePropertyPaths);
        }

        [HttpGet("Service/Service/{serviceId:int}/{pageNumber:int}/{pageSize:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventService>))]
        public async Task<IActionResult> GetAllEventServicesByServicePaged(int serviceId, int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<EventService> pagedList;

            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<EventService>().GetPagedListAsync(predicate: s => s.ServiceId == serviceId, pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<EventService>().GetPagedListAsync(predicate: s => s.ServiceId == serviceId, pageIndex: pageNumber, pageSize: pageSize, include: e => _serviceHelper.GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }


        [HttpGet("Service/{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventService))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetEventService(int id, string includePropertyPaths = "")
        {
            return await _serviceHelper.Get(id, includePropertyPaths);
        }

        [HttpDelete("Service/{id:int}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEventService(int id)
        {
            return await _serviceHelper.Delete(id);
        }

        [HttpPost("Service")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(EventService))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostEventService([FromBody]EventService entity)
        {
            return await _serviceHelper.Add(entity);
        }

        [HttpPut("Service/{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventService))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutEventService(int id, string includePropertyPaths = "", [FromBody]EventService entity = null)
        {
            return await _serviceHelper.Update(id, includePropertyPaths, entity);
        }

        [HttpPatch("Service/{id:int}/{includePropertyPaths?}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EventService))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PatchEventService(int id, string includePropertyPaths = "", [FromBody]JsonPatchDocument<EventService> patch = null)
        {
            return await _serviceHelper.Patch(id, includePropertyPaths, patch);
        }

        #endregion

    }
}