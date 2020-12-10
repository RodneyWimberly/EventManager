namespace EventManager.Shared.DataAccess.Interfaces
{
    public interface IPrimaryKeyEntity<TId>
    {
        TId Id { get; set; }
    }
}
