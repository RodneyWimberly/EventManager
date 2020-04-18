using Arch.EntityFrameworkCore.UnitOfWork;
using Arch.EntityFrameworkCore.UnitOfWork.Collections;
using AutoMapper;
using EventManager.DataAccess;
using EventManager.DataAccess.Core.Constants;
using EventManager.DataAccess.Core.Interfaces;
using EventManager.DataAccess.Models;
using EventManager.Web.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace EventManager.Web.Controllers
{
    public class EntityController<TEntity> : ControllerBase
      where TEntity : class, IPrimaryKeyEntity<int>, IAuditableEntity, IConcurrencyTrackingEntity, new()
    {
        protected readonly IMapper _mapper;
        protected readonly IUnitOfWork<ApplicationDbContext> _unitOfWork;
        protected readonly ILogger _logger;
        protected readonly HttpContext _httpContext;
        protected readonly IAccountManager _accountManager;

        public EntityController(IAccountManager accountManager, IHttpContextAccessor httpAccessor, IMapper mapper, IUnitOfWork<ApplicationDbContext> unitOfWork, ILogger logger)
        {
            _accountManager = accountManager;
            _httpContext = httpAccessor.HttpContext;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public event EventHandler<GetIncludeEventArgs<TEntity>> GetIncludeEvent;

        protected virtual IIncludableQueryable<TEntity, object> GetInclude(IQueryable<TEntity> entityQuery)
        {
            EventHandler<GetIncludeEventArgs<TEntity>> eventHandler = GetIncludeEvent;
            GetIncludeEventArgs<TEntity> args = new GetIncludeEventArgs<TEntity>(entityQuery);
            eventHandler?.Invoke(this, args);
            return args.Include;
        }

        public async Task<IActionResult> GetAll()
        {
            return await GetAllPaged(0, int.MaxValue); ;
        }

        public async Task<IActionResult> GetAllPaged(int pageNumber, int pageSize)
        {
            IPagedList<TEntity> pagedList;
            if (GetIncludeEvent == null)
                pagedList = await _unitOfWork.GetRepository<TEntity>().GetPagedListAsync(pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<TEntity>().GetPagedListAsync(pageIndex: pageNumber, pageSize: pageSize, include: e => GetInclude(e));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        public async Task<IActionResult> Get(int id)
        {
            TEntity entity;
            if (GetIncludeEvent == null)
                entity = await _unitOfWork.GetRepository<TEntity>().GetFirstOrDefaultAsync(predicate: e => e.Id == id);
            else
                entity = await _unitOfWork.GetRepository<TEntity>().GetFirstOrDefaultAsync(predicate: e => e.Id == id, include: e => GetInclude(e));

            if (entity == null)
                return NotFound(id);
            else
                return Ok(entity);
        }

        public async Task<IActionResult> Delete(int id)
        {
            IRepository<TEntity> repository = _unitOfWork.GetRepository<TEntity>();
            TEntity entity;
            if (GetIncludeEvent == null)
                entity = await repository.GetFirstOrDefaultAsync(predicate: e => e.Id == id, disableTracking: false);
            else
                entity = await repository.GetFirstOrDefaultAsync(predicate: e => e.Id == id, include: e => GetInclude(e), disableTracking: false);

            if (entity == null)
                return NotFound(id);
            else
            {
                repository.Delete(entity);
                await _unitOfWork.SaveChangesAsync();
                return Ok();
            }
        }

        public async Task<IActionResult> Post([FromBody]TEntity entity)
        {
            if (ModelState.IsValid)
            {
                if (entity == null)
                    return BadRequest($"{nameof(entity)} cannot be null");
                EntityEntry<TEntity> addedEntity = await _unitOfWork.GetRepository<TEntity>().InsertAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                return CreatedAtAction("GetEvent", new { id = addedEntity.Entity.Id });
            }
            else
                return BadRequest(ModelState);
        }

        public async Task<IActionResult> Put(int id, [FromBody]TEntity entity)
        {
            if (ModelState.IsValid)
            {
                if (entity == null)
                    return BadRequest($"{nameof(entity)} cannot be null");

                if (id != entity.Id)
                    return BadRequest($"Conflicting {nameof(entity)} Id in parameter and model data");

                try
                {
                    _unitOfWork.GetRepository<TEntity>().Update(entity);
                    await _unitOfWork.SaveChangesAsync();
                    return NoContent();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    return await HandleDbUpdateConcurrencyException(ex);
                }
            }
            else
                return BadRequest(ModelState);
        }

        public async Task<IActionResult> Patch(int id, [FromBody]JsonPatchDocument<TEntity> patch)
        {
            if (ModelState.IsValid)
            {
                if (patch == null)
                    return BadRequest($"{nameof(patch)} cannot be null");

                IRepository<TEntity> repository = _unitOfWork.GetRepository<TEntity>();
                TEntity entityToUpdate = await repository.GetFirstOrDefaultAsync(predicate: e => e.Id == id, disableTracking: false);

                patch.ApplyTo(entityToUpdate, e => ModelState.AddModelError("", e.ErrorMessage));
                if (ModelState.IsValid)
                {
                    try
                    {
                        await _unitOfWork.SaveChangesAsync();
                        return NoContent();
                    }
                    catch (DbUpdateConcurrencyException ex)
                    {
                        return await HandleDbUpdateConcurrencyException(ex);
                    }
                }
            }

            return BadRequest(ModelState);
        }

        protected async Task<IActionResult> HandleDbUpdateConcurrencyException(DbUpdateConcurrencyException ex)
        {
            EntityEntry exceptionEntry = ex.Entries.Single();
            TEntity clientValues = (TEntity)exceptionEntry.Entity;
            PropertyValues databaseEntry = exceptionEntry.GetDatabaseValues();
            if (databaseEntry == null)
                ModelState.AddModelError(string.Empty, "Unable to save changes. The event was deleted by another user.");
            else
            {
                TEntity databaseValues = (TEntity)databaseEntry.ToObject();
                PropertyInfo[] databaseProperties = databaseValues.GetType().GetProperties(),
                    clientProperties = clientValues.GetType().GetProperties();
                foreach (PropertyInfo databaseProperty in databaseProperties)
                {
                    // Don't report changes to the following fields
                    if (databaseProperty.Name == "RowVersion" ||
                        databaseProperty.Name == "UpdatedBy" ||
                        databaseProperty.Name == "UpdatedDate")
                        continue;

                    PropertyInfo clientProperty = clientProperties.Where(d =>
                        d.Name == databaseProperty.Name &&
                        d.PropertyType == databaseProperty.PropertyType)
                        .FirstOrDefault();
                    if (clientProperty != null)
                    {
                        object databaseValue = databaseProperty.GetValue(databaseValues),
                            clientValue = clientProperty.GetValue(clientValues);
                        if (databaseValue != null &&
                            clientValue != null &&
                            !databaseValue.Equals(clientValue))
                            ModelState.AddModelError(databaseProperty.Name, $"Database value: {databaseValue} / New value: {clientValue}");
                    }
                }
                string userName;
                try
                {
                    if (databaseValues.UpdatedBy == Ids.SystemUserId)
                        userName = "System User";
                    else
                    {
                        ApplicationUser user = await _accountManager.GetUserByIdAsync(databaseValues.UpdatedBy);
                        userName = user.FullName;
                    }
                }
                catch
                {
                    userName = "Unknown";
                }

                ModelState.AddModelError(string.Empty, "The record you attempted to edit was modified " +
                $"by another user ({userName}) after you got the original value. The edit operation was canceled " +
                "and the current values in the database and the requested new values have been provided.");
            }
            return BadRequest(ModelState);
        }
    }
}
