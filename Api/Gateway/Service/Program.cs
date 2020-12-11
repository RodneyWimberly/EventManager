using EventManager.Shared.Core.Constants;
using EventManager.Shared.Service;

namespace Service
{
    public class Program : ProgramBase<Startup>
    {
        public static new int Main(string[] args)
        {
            title = $"{ApplicationValues.Title} API Gateway Service";
            return ProgramBase<Startup>.Main(args);
        }
    }
}
