using Arch.EntityFrameworkCore.UnitOfWork;
using EventManager.DataAccess.Core.Constants;
using EventManager.DataAccess.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace EventManager.DataAccess
{
    public class HttpUnitOfWork<T> : UnitOfWork<T> where T : DbContext, IHttpDbContext
    {
        public HttpUnitOfWork(T context, IHttpContextAccessor httpAccessor) : base(context)
        {
            DbContext.CurrentUserId = httpAccessor.HttpContext.User.FindFirst(Claims.Subject)?.Value?.Trim();
            //DbContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            //DbContext.ChangeTracker.LazyLoadingEnabled = false;
        }
    }
}
