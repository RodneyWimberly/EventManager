using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace EventManager.Web.Controllers
{
    namespace v1_0
    {
        [ApiVersion("1.0")]
        [ApiExplorerSettings(IgnoreApi = false, GroupName = "API Information v1.0")]
        [Route("api/v{version:apiVersion}/[controller]")]
        [ApiController]
        public class ApiInfoController : ControllerBase
        {

            private IConfiguration Configuration { get; }
            private IApiDescriptionGroupCollectionProvider ApiExplorer { get; }
            public ApiInfoController(IConfiguration configuration, IApiDescriptionGroupCollectionProvider apiExplorer)
            {
                Configuration = configuration;
                ApiExplorer = apiExplorer;
            }

            [AllowAnonymous]
            [HttpGet]
            [Produces("application/html")]
            public IActionResult ApiInfo()
            {
                IEnumerable<KeyValuePair<string, string>> items = Configuration.AsEnumerable();
                string migration = Configuration["ConnectionStrings:UseMigrationService"];
                string seed = Configuration["ConnectionStrings:UseSeedService"];
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
}
