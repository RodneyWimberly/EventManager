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
    public class EntityControllerHelper<TEntity> : ControllerBase
      where TEntity : class, IPrimaryKeyEntity<int>, IAuditableEntity, IConcurrencyTrackingEntity, new()
    {
        protected readonly IMapper _mapper;
        protected readonly IUnitOfWork<ApplicationDbContext> _unitOfWork;
        protected readonly ILogger _logger;
        protected readonly HttpContext _httpContext;
        protected readonly IAccountManager _accountManager;

        public EntityControllerHelper(IAccountManager accountManager, IHttpContextAccessor httpAccessor, IMapper mapper, IUnitOfWork<ApplicationDbContext> unitOfWork, ILogger logger)
        {
            _accountManager = accountManager;
            _httpContext = httpAccessor.HttpContext;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public event EventHandler<GetIncludeEventArgs<TEntity>> GetIncludeEvent;

        public virtual IIncludableQueryable<TEntity, object> GetInclude(IQueryable<TEntity> entityQuery, string includePropertyPaths)
        {
            EventHandler<GetIncludeEventArgs<TEntity>> eventHandler = GetIncludeEvent;
            GetIncludeEventArgs<TEntity> args = new GetIncludeEventArgs<TEntity>(entityQuery, includePropertyPaths);
            eventHandler?.Invoke(this, args);
            return args.Include;
        }

        public async Task<IActionResult> GetAll(string includePropertyPaths = "")
        {
            return await GetAllPaged(0, int.MaxValue, includePropertyPaths); ;
        }

        public async Task<IActionResult> GetAllPaged(int pageNumber, int pageSize, string includePropertyPaths = "")
        {
            IPagedList<TEntity> pagedList;
            if (string.IsNullOrEmpty(includePropertyPaths))
                pagedList = await _unitOfWork.GetRepository<TEntity>().GetPagedListAsync(pageIndex: pageNumber, pageSize: pageSize);
            else
                pagedList = await _unitOfWork.GetRepository<TEntity>().GetPagedListAsync(pageIndex: pageNumber, pageSize: pageSize, include: e => GetInclude(e, includePropertyPaths));

            _httpContext.Response.AddPagination(pagedList.PageIndex, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Ok(pagedList.Items);
        }

        public async Task<IActionResult> Get(int id, string includePropertyPaths = "")
        {
            TEntity entity;
            if (string.IsNullOrEmpty(includePropertyPaths))
                entity = await _unitOfWork.GetRepository<TEntity>().GetFirstOrDefaultAsync(predicate: e => e.Id == id);
            else
                entity = await _unitOfWork.GetRepository<TEntity>().GetFirstOrDefaultAsync(predicate: e => e.Id == id, include: e => GetInclude(e, includePropertyPaths));

            if (entity == null)
                return NotFound(id);
            else
                return Ok(entity);
        }

        public async Task<IActionResult> Delete(int id)
        {
            IRepository<TEntity> repository = _unitOfWork.GetRepository<TEntity>();
            TEntity entity = await repository.GetFirstOrDefaultAsync(predicate: e => e.Id == id, disableTracking: false);

            if (entity == null)
                return NotFound(id);
            else
            {
                repository.Delete(entity);
                await _unitOfWork.SaveChangesAsync();
                return Ok();
            }
        }

        public async Task<IActionResult> Add(TEntity entity)
        {
            if (ModelState.IsValid)
            {
                if (entity == null)
                    return BadRequest($"{nameof(entity)} cannot be null");
                EntityEntry<TEntity> addedEntity = await _unitOfWork.GetRepository<TEntity>().InsertAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                return CreatedAtAction($"Get{typeof(TEntity).Name}", new { id = addedEntity.Entity.Id }, addedEntity.Entity);
            }
            else
                return BadRequest(ModelState);
        }

        public async Task<IActionResult> Update(int id, string includePropertyPaths = "", TEntity entity = null)
        {
            if (ModelState.IsValid)
            {
                if (entity == null)
                    return BadRequest($"{nameof(entity)} cannot be null");

                if (id != entity.Id)
                    return BadRequest($"Conflicting {nameof(entity)} Id in parameter and model data");

                try
                {
                    IRepository<TEntity> repository = _unitOfWork.GetRepository<TEntity>();
                    repository.Update(entity);
                    await _unitOfWork.SaveChangesAsync();
                    if (string.IsNullOrEmpty(includePropertyPaths))
                        entity = await repository.GetFirstOrDefaultAsync(predicate: e => e.Id == id);
                    else
                        entity = await repository.GetFirstOrDefaultAsync(predicate: e => e.Id == id, include: e => GetInclude(e, includePropertyPaths));

                    return Ok(entity);
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    return await HandleDbUpdateConcurrencyException(ex);
                }
            }
            else
                return BadRequest(ModelState);
        }

        public async Task<IActionResult> Patch(int id, string includePropertyPaths = "", JsonPatchDocument<TEntity> patch = null)
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
                        if (string.IsNullOrEmpty(includePropertyPaths))
                            entityToUpdate = await repository.GetFirstOrDefaultAsync(predicate: e => e.Id == id);
                        else
                            entityToUpdate = await repository.GetFirstOrDefaultAsync(predicate: e => e.Id == id, include: e => GetInclude(e, includePropertyPaths));

                        return Ok(entityToUpdate);
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
            object clientValues = exceptionEntry.Entity;
            PropertyValues databaseEntry = exceptionEntry.GetDatabaseValues();
            if (databaseEntry == null)
                ModelState.AddModelError(string.Empty, $"Unable to update the table with the requested changes. The {typeof(TEntity).Name} was deleted by another user.");
            else
            {
                object databaseValues = databaseEntry.ToObject();
                string entityName = databaseValues.GetType().Name;
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
                            ModelState.AddModelError($"{entityName}.{databaseProperty.Name}", $"New table value: {databaseValue} / Your conflicting value: {clientValue}");
                    }
                }
                string userName, updatedBy, updatedDate;
                try
                {
                    updatedBy = databaseProperties.First(p => p.Name == "UpdatedBy").GetValue(databaseValues).ToString();
                    updatedDate = databaseProperties.First(p => p.Name == "UpdatedDate").GetValue(databaseValues).ToString();
                    if (updatedBy == Ids.SystemUserId)
                        userName = "System User";
                    else
                    {
                        ApplicationUser user = await _accountManager.GetUserByIdAsync(updatedBy);
                        userName = user.FullName;
                    }
                }
                catch
                {
                    userName = "Unknown";
                    updatedDate = "01/01/1900 00:00:00";
                }

                ModelState.AddModelError(string.Empty, "The record you attempted to update was modified " +
                $"by {userName} at {updatedDate} after you queried the " +
                "original values. The update operation was canceled and both the new values in the database " +
                "and the conflicting values you supplied have been provided.");
            }
            string message = $"A DbUpdateConcurrencyException occurred when attempting to update {typeof(TEntity).Name}\r\nThe following message was returned:\r\n" + string.Join(" | ", ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage));
            _logger.LogDebug(message);

            return BadRequest(ModelState);
        }
    }
}
