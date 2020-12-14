using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventManager.Identity.Service.Controllers
{
    [Route("version"), Authorize(Policy = "Default"), ApiController]
    public class VersionController
    {
        [HttpGet]
        public string Get() => "light";
    }
}
