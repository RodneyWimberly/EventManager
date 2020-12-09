using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;

namespace EventManager.Web.Controllers.v1_0
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(IgnoreApi = true)]
    [Route("api/v{version:apiVersion}/[controller]")]
    [Route("api/[controller]")]
    [ApiController]
    public abstract class ApiControllerBase : ControllerBase
    {
        protected readonly IConfiguration _configuration;
        protected readonly IMapper _mapper;
        protected readonly IAuthorizationService _authorizationService;
        protected readonly ILogger _logger;

        public ApiControllerBase(IMapper mapper,
                IAuthorizationService authorizationService,
                ILogger logger,
                IConfiguration configuration)
        {
            _mapper = mapper;
            _authorizationService = authorizationService;
            _logger = logger;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpGet("/health")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DateTime))]
        public IActionResult Health()
        {
            return Ok(DateTime.UtcNow);
        }
    }
}
