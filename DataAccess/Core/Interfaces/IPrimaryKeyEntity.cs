namespace EventManager.DataAccess.Core.Interfaces
{
    public interface IPrimaryKeyEntity<TId>
    {
        TId Id { get; set; }
    }
}
