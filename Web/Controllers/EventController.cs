using Arch.EntityFrameworkCore.UnitOfWork;
using AutoMapper;
using EventManager.DataAccess;
using EventManager.DataAccess.Core.Interfaces;
using EventManager.DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EventManager.Web.Controllers
{
    //[Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        protected readonly EntityController<Event> _eventController;

        public EventController(IAccountManager accountManager, IHttpContextAccessor httpAccessor, IMapper mapper, IUnitOfWork<ApplicationDbContext> unitOfWork, ILogger<EventController> logger)
        {
            _eventController = new EntityController<Event>(accountManager, httpAccessor, mapper, unitOfWork, logger);
            _eventController.GetIncludeEvent += eventController_GetIncludeEvent;
        }

        private void eventController_GetIncludeEvent(object sender, GetIncludeEventArgs<Event> e)
        {
            e.Include = e.EntityQuery
                .Include(e => e.Locations)
                .Include(e => e.Schedules)
                .Include(e => e.Occurrences)
                .Include(e => e.Services);
        }

        [HttpGet()]
        // [Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Event>))]
        public async Task<IActionResult> GetAllEvents()
        {
            return await _eventController.GetAll();
        }

        [HttpGet("{pageNumber:int}/{pageSize:int}")]
        //[Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Event>))]
        public async Task<IActionResult> GetAllEventsPaged(int pageNumber, int pageSize)
        {
            return await _eventController.GetAllPaged(pageNumber, pageSize);
        }

        [HttpGet("{id:int}")]
        //[Authorize(Authorization.Policies.ViewEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetEvent(int id)
        {
            return await _eventController.Get(id);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            return await _eventController.Delete(id);
        }

        [HttpPost]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostEvent([FromBody]Event entity)
        {
            return await _eventController.Post(entity);
        }

        [HttpPut("{id:int}")]
        //[Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutEvent(int id, [FromBody]Event entity)
        {
            return await _eventController.Put(id, entity);
        }

        [HttpPatch("{id:int}")]
        [Authorize(Authorization.Policies.ManageEventsPolicy)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Patch(int id, [FromBody]JsonPatchDocument<Event> patch)
        {
            return await _eventController.Patch(id, patch);
        }
    }
}