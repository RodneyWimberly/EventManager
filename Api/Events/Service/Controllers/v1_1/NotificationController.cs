﻿using Arch.EntityFrameworkCore.UnitOfWork;
using AutoMapper;
using EventManager.Events.DataAccess;
using EventManager.Events.DataAccess.Models;
using EventManager.Shared.Service;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EventManager.Events.Service.Controllers
{
    namespace v1_1
    {
        [ApiVersion("1.1")]
        [ApiExplorerSettings(IgnoreApi = false, GroupName = "Notification v1.1")]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
        [Route("api/[controller]")]
        [Route("api/v{version:apiVersion}/[controller]")]
        [ApiController]
        public class NotificationController : ControllerBase
        {
            protected readonly EntityControllerHelper<Notification> _notificationHelper;

            public NotificationController(IHttpContextAccessor httpAccessor, IMapper mapper, IUnitOfWork<EventDbContext> unitOfWork, ILogger<NotificationController> logger)
            {
                _notificationHelper = new EntityControllerHelper<Notification>(httpAccessor, mapper, unitOfWork, logger);
                _notificationHelper.GetIncludeEvent += NotificationController_GetIncludeEvent;
            }

            private void NotificationController_GetIncludeEvent(object sender, GetIncludeEventArgs<Notification> e)
            {
                e.Include = null;
            }

            [HttpGet()]
            [Authorize(Authorization.Policies.ViewLogsPolicy)]
            [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Notification>))]
            public async Task<IActionResult> GetAllNotifications()
            {
                return await _notificationHelper.GetAll();
            }

            [HttpGet("{pageNumber:int}/{pageSize:int}")]
            [Authorize(Authorization.Policies.ViewLogsPolicy)]
            [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Notification>))]
            public async Task<IActionResult> GetAllNotificationsPaged(int pageNumber, int pageSize)
            {
                return await _notificationHelper.GetAllPaged(pageNumber, pageSize);
            }

            [HttpGet("{id:int}")]
            [Authorize(Authorization.Policies.ViewLogsPolicy)]
            [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Notification))]
            [ProducesResponseType(StatusCodes.Status404NotFound)]
            public async Task<IActionResult> GetNotification(string id)
            {
                return await _notificationHelper.Get(id);
            }

            [HttpDelete("{id:int}")]
            [Authorize(Authorization.Policies.ManageLogsPolicy)]
            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status404NotFound)]
            public async Task<IActionResult> DeleteNotification(string id)
            {
                return await _notificationHelper.Delete(id);
            }

            [HttpPost]
            [Authorize(Authorization.Policies.ManageLogsPolicy)]
            [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Notification))]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            public async Task<IActionResult> PostNotification([FromBody] Notification entity)
            {
                return await _notificationHelper.Add(entity);
            }

            [HttpPut("{id:int}")]
            [Authorize(Authorization.Policies.ManageLogsPolicy)]
            [ProducesResponseType(StatusCodes.Status204NoContent)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            public async Task<IActionResult> PutNotification(string id, [FromBody] Notification entity)
            {
                return await _notificationHelper.Update(id, string.Empty, entity);
            }

            [HttpPatch("{id:int}")]
            [Authorize(Authorization.Policies.ManageLogsPolicy)]
            [ProducesResponseType(StatusCodes.Status204NoContent)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            public async Task<IActionResult> PatchNotification(string id, [FromBody] JsonPatchDocument<Notification> patch)
            {
                return await _notificationHelper.Patch(id, string.Empty, patch);
            }
        }
    }
}