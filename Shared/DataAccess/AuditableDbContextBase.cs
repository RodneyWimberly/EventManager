using EventManager.Shared.DataAccess.Constants;
using EventManager.Shared.DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EventManager.Shared.DataAccess
{
    public class AuditableDbContextBase : DbContext, IAuditableDbContext
    {
        private string _currentUserId;
        public string CurrentUserId
        {
            get => string.IsNullOrEmpty(_currentUserId) ? Ids.SystemUserId : _currentUserId;
            set => _currentUserId = value;
        }

        public override int SaveChanges()
        {
            this.UpdateAuditableEntities();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            this.UpdateAuditableEntities();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            this.UpdateAuditableEntities();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            this.UpdateAuditableEntities();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
    }
}
