using EventManager.Events.DataAccess;
using EventManager.Shared.Core.Constants;
using EventManager.Shared.Service;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;

namespace EventManager.Events.Service
{
    public class Program : ProgramBase<Startup, EventDbSeeder>
    {
        public static new async Task<int> Main(string[] args)
        {
            title = $"{ApplicationValues.Title} Events Service";
            return await ProgramBase<Startup, EventDbSeeder>.Main(args);
        }

        public static new IHostBuilder CreateHostBuilder(string[] args) =>
            ProgramBase<Startup, EventDbSeeder>.CreateHostBuilder(args);
    }
}
