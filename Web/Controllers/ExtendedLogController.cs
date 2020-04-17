using Arch.EntityFrameworkCore.UnitOfWork;
using AutoMapper;
using EventManager.DataAccess;
using EventManager.DataAccess.Core.Interfaces;
using EventManager.DataAccess.Models;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EventManager.Web.Controllers
{
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class ExtendedLogController : ControllerBase
    {
        protected readonly EntityController<ExtendedLog> _extendedLogController;

        public ExtendedLogController(IAccountManager accountManager, IHttpContextAccessor httpAccessor, IMapper mapper, IUnitOfWork<ApplicationDbContext> unitOfWork, ILogger<ExtendedLogController> logger)
        {
            _extendedLogController = new EntityController<ExtendedLog>(accountManager, httpAccessor, mapper, unitOfWork, logger);
            _extendedLogController.GetIncludeEvent += ExtendedLogController_GetIncludeEvent;
        }

        private void ExtendedLogController_GetIncludeEvent(object sender, GetIncludeEventArgs<ExtendedLog> e)
        {
            e.Include = null;
        }

        [HttpGet()]
        [Authorize(Authorization.Policies.ViewLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Event>))]
        public async Task<IActionResult> GetAllExtendedLogs()
        {
            return await _extendedLogController.GetAll();
        }

        [HttpGet("{pageNumber:int}/{pageSize:int}")]
        [Authorize(Authorization.Policies.ViewLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Event>))]
        public async Task<IActionResult> GetAllExtendedLogsPaged(int pageNumber, int pageSize)
        {
            return await _extendedLogController.GetAllPaged(pageNumber, pageSize);
        }

        [HttpGet("{id:int}")]
        [Authorize(Authorization.Policies.ManageLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetEvent(int id)
        {
            return await _extendedLogController.Get(id);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Authorization.Policies.ManageLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            return await _extendedLogController.Delete(id);
        }

        [HttpPost]
        [Authorize(Authorization.Policies.ManageLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ExtendedLog))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostEvent([FromBody]ExtendedLog entity)
        {
            return await _extendedLogController.Post(entity);
        }

        [HttpPut("{id:int}")]
        [Authorize(Authorization.Policies.ManageLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutEvent(int id, [FromBody]ExtendedLog entity)
        {
            return await _extendedLogController.Put(id, entity);
        }

        [HttpPatch("{id:int}")]
        [Authorize(Authorization.Policies.ManageLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Patch(int id, [FromBody]JsonPatchDocument<ExtendedLog> patch)
        {
            return await _extendedLogController.Patch(id, patch);
        }
    }
}