namespace EventManager.DataAccess.Core.Interfaces
{
    public interface IHttpDbContext
    {
        string CurrentUserId { get; set; }
    }
}
