using System.Threading.Tasks;

namespace EventManager.Shared.DataAccess.Interfaces
{
    public interface IDbSeeder
    {
        Task MigrateDbAsync();
        Task SeedDbAsync();
    }
}
