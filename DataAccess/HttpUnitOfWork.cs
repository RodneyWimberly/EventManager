using Arch.EntityFrameworkCore.UnitOfWork;
using EventManager.DataAccess.Core.Constants;
using Microsoft.AspNetCore.Http;

namespace EventManager.DataAccess
{
    public class HttpUnitOfWork : UnitOfWork<ApplicationDbContext>
    {
        public HttpUnitOfWork(ApplicationDbContext context, IHttpContextAccessor httpAccessor) : base(context)
        {
            DbContext.CurrentUserId = httpAccessor.HttpContext.User.FindFirst(Claims.Subject)?.Value?.Trim();
            //DbContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            //DbContext.ChangeTracker.LazyLoadingEnabled = false;
        }
    }
}
