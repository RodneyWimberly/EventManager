using Arch.EntityFrameworkCore.UnitOfWork;
using EventManager.Shared.DataAccess.Constants;
using EventManager.Shared.DataAccess.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace EventManager.Shared.DataAccess
{
    public class HttpUnitOfWork<T> : UnitOfWork<T> where T : DbContext, IAuditableDbContext
    {
        public HttpUnitOfWork(T context, IHttpContextAccessor httpAccessor) : base(context)
        {
            DbContext.CurrentUserId = httpAccessor.HttpContext.User.FindFirst(Claims.Subject)?.Value?.Trim();
        }
    }
}
