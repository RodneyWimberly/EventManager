namespace EventManager.Shared.DataAccess.Interfaces
{
    public interface IAuditableDbContext
    {
        string CurrentUserId { get; set; }
    }
}
