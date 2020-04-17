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
        protected readonly IMapper _mapper;
        protected readonly IUnitOfWork<ApplicationDbContext> _unitOfWork;
        protected readonly ILogger _logger;
        protected readonly HttpContext _httpContext;
        protected readonly IAccountManager _accountManager;
        protected readonly EntityController<ExtendedLog> _extendedLogController;

        public ExtendedLogController(IAccountManager accountManager, IHttpContextAccessor httpAccessor, IMapper mapper, IUnitOfWork<ApplicationDbContext> unitOfWork, ILogger<ExtendedLogController> logger)
        {
            _accountManager = accountManager;
            _httpContext = httpAccessor.HttpContext;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _extendedLogController = new EntityController<ExtendedLog>(accountManager, httpAccessor, mapper, unitOfWork, logger);
            _extendedLogController.GetIncludeEvent += ExtendedLogController_GetIncludeEvent;
        }

        private void ExtendedLogController_GetIncludeEvent(object sender, GetIncludeEventArgs<ExtendedLog> e)
        {
            e.Include = null;
        }

        [HttpGet()]
        [Authorize(Authorization.Policies.ViewLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ExtendedLog>))]
        public async Task<IActionResult> GetAllExtendedLogs()
        {
            return await _extendedLogController.GetAll();
        }

        [HttpGet("{pageNumber:int}/{pageSize:int}")]
        [Authorize(Authorization.Policies.ViewLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ExtendedLog>))]
        public async Task<IActionResult> GetAllExtendedLogsPaged(int pageNumber, int pageSize)
        {
            return await _extendedLogController.GetAllPaged(pageNumber, pageSize);
        }

        [HttpGet("level/{level}")]
        [Authorize(Authorization.Policies.ViewLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ExtendedLog>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetExtendedLogsByLevel(int level)
        {
            return await GetExtendedLogsByLevelPaged(level, 0, 1000);
        }

        [HttpGet("level/{level}/{pageNumber:int}/{pageSize:int}")]
        [Authorize(Authorization.Policies.ViewLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ExtendedLog>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetExtendedLogsByLevelPaged(int level, int pageNumber, int pageSize)
        {
            IPagedList<ExtendedLog> pagedList = await _unitOfWork.GetRepository<ExtendedLog>().GetPagedListAsync(l => l.Level == level, pageIndex: pageNumber, pageSize: pageSize);
            if (pagedList.Items.Count > 0)
            {
                _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
                return Ok(pagedList.Items);
            }
            else
                return NotFound(level);
        }

        [HttpGet("{id:int}")]
        [Authorize(Authorization.Policies.ManageLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ExtendedLog))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetExtendedLog(int id)
        {
            return await _extendedLogController.Get(id);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Authorization.Policies.ManageLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteExtendedLog(int id)
        {
            return await _extendedLogController.Delete(id);
        }

        [HttpDelete]
        [Authorize(Authorization.Policies.ManageLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteAllExtendedLogs()
        {
            _unitOfWork.ExecuteSqlCommand("Delete from Logs");
            await _unitOfWork.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost]
        [Authorize(Authorization.Policies.ManageLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ExtendedLog))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostExtendedLog([FromBody]ExtendedLog entity)
        {
            return await _extendedLogController.Post(entity);
        }

        [HttpPut("{id:int}")]
        [Authorize(Authorization.Policies.ManageLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutExtendedLog(int id, [FromBody]ExtendedLog entity)
        {
            return await _extendedLogController.Put(id, entity);
        }

        [HttpPatch("{id:int}")]
        [Authorize(Authorization.Policies.ManageLogsPolicy)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PatchExtendedLog(int id, [FromBody]JsonPatchDocument<ExtendedLog> patch)
        {
            return await _extendedLogController.Patch(id, patch);
        }
    }
}