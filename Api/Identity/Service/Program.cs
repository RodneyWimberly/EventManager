using EventManager.Identity.DataAccess;
using EventManager.Shared.Core.Constants;
using EventManager.Shared.Service;
using System.Threading.Tasks;

namespace EventManager.Identity.Service
{
    public class Program : ProgramBase<Startup, IdentityDbSeeder>
    {
        public static new async Task<int> Main(string[] args)
        {
            title = $"{ApplicationValues.Title} Identity Service";
            return await ProgramBase<Startup, IdentityDbSeeder>.Main(args);
        }
    }
}
