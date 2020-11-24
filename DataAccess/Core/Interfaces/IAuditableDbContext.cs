namespace EventManager.DataAccess.Core.Interfaces
{
    public interface IAuditableDbContext
    {
        string CurrentUserId { get; set; }
    }
}
