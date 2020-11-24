using AutoMapper;
using EventManager.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace EventManager.Web.Controllers
{
    namespace v1_0
    {
        [ApiVersion("1.0")]
        [Route("api/[controller]")]
        [Route("api/v{version:apiVersion}/[controller]")]
        [ApiController]
        public class ApiInfoController : ControllerBase
        {

            public IConfiguration Configuration { get; }
            public ApiInfoController(IConfiguration configuration)
            {
                Configuration = configuration;
            }

            [AllowAnonymous]
            [HttpGet]
            [Produces("application/json")]
            public IActionResult ApiInfo()
            {
                IEnumerable<KeyValuePair<string, string>> items = Configuration.AsEnumerable();
                string migration = Configuration["ConnectionStrings:UseMigrationService"];
                string seed = Configuration["ConnectionStrings:UseSeedService"];
                string memorydb = Configuration["ConnectionStrings:UseInMemoryDatabase"];
                string eventsConnection = Configuration["ConnectionStrings:EventDb"];
                string identityConnection = Configuration["ConnectionStrings:IdentityDb"];
                string authentication = Configuration["Authentication:UseIdentityServer4"];
                string is4ip = Configuration["Authentication:IdentityServer4IP"];

                string controlers = MvcHelper.GetControllerMethodsNames();
                return Content("<html><head><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css' integrity='sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb' crossorigin='anonymous'><link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.3.1/css/all.css' integrity='sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU' crossorigin='anonymous'></head><body>" +

                    "<div class='jumbotron'>" +
                    "<h1><i class='fab fa-centercode' fa-2x></i>  EventManager Api v.1</h1>" +
                    "<h4>v.1.0</h4>" +
                     "NET Api REST service started!<br>" +
                     "appsettings.json configuration:<br>" +
                     "<ul><li>Net: 5.0</li>" +
                     "<li>Use Migration Service: " + migration + "</li>" +
                     "<li>Use Seed Service: " + seed + "</li>" +
                     "<li>Use InMemory Database: " + memorydb + "</li>" +
                      "<li>Authentication Type: " + (authentication == "True" ? "IdentityServer4" : "JWT") + "</li>" +
                      (authentication == "True" ? "<li>IdentityServer4IP: " + is4ip + "</li>" : "") +
                     "<li>Events Connection String: " + eventsConnection + "</li></ul>" +
                      "<li>Identity Connection String: " + identityConnection + "</li></ul>" +
                    "</div>" +

                    "<div class='row'>" +

                    "<div class='col-md-3'>" +
                    "<h3>API controlers and methods</h3>" +
                    "<ul>" + controlers + "</ul>" +
                    "<p></p>" +
                    "</div>" +
                    "<div class='col-md-3'>" +
                    "<h3>API services and patterns</h3>" +
                    "<p><ul><li>Dependency Injection (Net Core feature) </li><li>Repository and Unit of Work Patterns</li><li>Generic services</li><li>Automapper</li><li>Sync and Async calls</li><li>Generic exception handler</li><li>Serilog logging with Console and File sinks</li><li>Seed from json objects</li><li>JWT authorization and authentication</li></ul>" +
                    "</div>" +
                    "<div class='col-md-3'>" +
                    "<h3>API projects</h3>" +
                    "<ul><li>Api</li><li>Domain</li><li>Entity</li></ul>" +
                    "</div>" +

                    "</div>" +
                    "</body></html>"
                   , "text/html");

            }

        }

        public class MvcHelper
        {
            private static List<Type> GetSubClasses<T>()
            {
                return Assembly.GetCallingAssembly().GetTypes().Where(
                    type => type.IsSubclassOf(typeof(T))).ToList();
            }

            public static string GetControllerMethodsNames()
            {
                List<Type> cmdtypes = GetSubClasses<ControllerBase>();
                string controlersInfo = "";
                foreach (Type ctrl in cmdtypes)
                {
                    string methodsInfo = "";
                    const BindingFlags flags = BindingFlags.Public | BindingFlags.Instance;
                    MemberInfo[] methodName = ctrl.GetMethods(flags);
                    foreach (MemberInfo method in methodName)
                    {
                        if (method.DeclaringType.ToString() == ctrl.UnderlyingSystemType.ToString())
                        {
                            methodsInfo += "<li><i>" + method.Name.ToString() + "</i></li>";
                        }
                    }
                    controlersInfo += "<li>" + ctrl.Name.Replace("Controller", "") + "<ul>" + methodsInfo + "</ul></li>";
                }
                return controlersInfo;
            }
        }
    }

    namespace v1_1
    {
        [ApiVersion("1.1")]
        [Route("api/[controller]")]
        [Route("api/v{version:apiVersion}/[controller]")]
        [ApiController]
        public class ApiInfoController : ControllerBase
        {
            protected readonly IConfiguration _configuration;
            protected readonly IMapper _mapper;
            protected readonly IAuthorizationService _authorizationService;
            public ApiInfoController(IMapper mapper, IAuthorizationService authorizationService,
             IConfiguration configuration)
            {
                _mapper = mapper;
                _authorizationService = authorizationService;
                _configuration = configuration;
            }

            [AllowAnonymous]
            [HttpGet("/ping")]
            [Produces("application/json")]
            [ProducesResponseType(StatusCodes.Status200OK)]
            public IActionResult Ping()
            {
                return Ok();
            }

            [AllowAnonymous]
            [HttpGet("/info")]
            [Produces("application/json")]
            [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiInfoViewModel))]
            [ProducesResponseType(StatusCodes.Status404NotFound)]
            public IActionResult ApiInfo()
            {
                ApiInfoViewModel apiInfo = new ApiInfoViewModel
                {
                    Configuration = _configuration.AsEnumerable(),
                    Controllers = GetType().Assembly.GetTypes()
                        .Where(type => type.IsSubclassOf(typeof(ControllerBase)))
                            .Select(ct => new ControllerInfoViewModel
                            {
                                Name = ct.Name.Replace("Controller", ""),
                                Actions = ct.GetMethods(BindingFlags.Public | BindingFlags.Instance)
                                    .Where(m => m.DeclaringType.ToString() == ct.UnderlyingSystemType.ToString())
                                    .Select(m => m.Name.ToString())
                            }
                        )
                };

                return Ok(JsonConvert.SerializeObject(apiInfo));
            }

        }
    }
}
