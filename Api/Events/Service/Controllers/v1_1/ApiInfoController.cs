using EventManager.Shared.Core.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EventManager.Events.Service.Controllers
{
    namespace v1_1
    {
        [ApiVersion("1.1")]
        [ApiExplorerSettings(IgnoreApi = false, GroupName = "API Information v1.1")]
        [Route("api/[controller]")]
        [Route("api/v{version:apiVersion}/[controller]")]
        [ApiController]
        public class ApiInfoController : ControllerBase
        {
            protected readonly IConfiguration _configuration;
            protected readonly IApiDescriptionGroupCollectionProvider _apiExplorer;

            public ApiInfoController(IConfiguration configuration, IApiDescriptionGroupCollectionProvider apiExplorer)
            {
                _configuration = configuration;
                _apiExplorer = apiExplorer;
            }


            [AllowAnonymous]
            [HttpGet("health")]
            [Produces("application/json")]
            [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DateTime))]
            public IActionResult Health()
            {
                return Ok(DateTime.UtcNow);
            }

            [AllowAnonymous]
            [HttpGet("description")]
            [Produces("application/json")]
            [ProducesResponseType(StatusCodes.Status200OK)]
            public IActionResult Info()
            {
                StringBuilder json = new StringBuilder();

                json.Append("{");
                json.Append($"Version: '{_apiExplorer.ApiDescriptionGroups.Version}',");
                json.Append("Groups: [");
                foreach (ApiDescriptionGroup group in _apiExplorer.ApiDescriptionGroups.Items)
                {
                    json.Append("{");
                    json.Append($"GroupName: '{group.GroupName}',");
                    json.Append("Apis: [");
                    foreach (ApiDescription api in group.Items)
                    {
                        json.Append("{");
                        json.Append($"HttpMethod: '{api.HttpMethod}',");
                        json.Append($"RelativePath: '{api.RelativePath}',");
                        json.Append("Parameters: [");
                        foreach (ApiParameterDescription parameter in api.ParameterDescriptions)
                        {
                            json.Append("{");
                            json.Append($"Name: '{parameter.Name}',");
                            json.Append($"Id: '{parameter.Source.Id}',");
                            json.Append($"Type: '{parameter.Type?.FullName}',");
                            if (parameter.RouteInfo != null)
                            {
                                json.Append($"Constraints: '{string.Join(",", parameter.RouteInfo.Constraints?.Select(c => c.GetType().Name).ToArray())}',");
                                json.Append($"DefaultValue: '{parameter.RouteInfo.DefaultValue}',");
                                json.Append($"IsOptional: '{parameter.RouteInfo.IsOptional}',");
                            }
                            json.Append("},");
                        }
                        json.Append("],");
                        json.Append("SupportedResponseTypes: [");
                        foreach (ApiResponseType response in api.SupportedResponseTypes)
                        {
                            json.Append("{");
                            json.Append($"StatusCode: '{response.StatusCode}',");
                            json.Append($"ResponseType: '{response.Type?.FullName }',");
                            json.Append("ResponseFormats: [");
                            foreach (ApiResponseFormat responseFormat in response.ApiResponseFormats)
                            {
                                json.Append("{");
                                json.Append($"Formatter: '{responseFormat.Formatter?.GetType().FullName}',");
                                json.Append($"MediaType: '{responseFormat.MediaType}', ");
                                json.Append("},");
                            }
                            json.Append("],");
                            json.Append("},");
                        }
                        json.Append("],");
                        json.Append("},");
                    }
                    json.Append("],");
                    json.Append("},");
                }
                json.Append("],");
                json.Append("}");
                return Ok(json.ToString());
            }

            [AllowAnonymous]
            [HttpGet("configuration")]
            [Produces("application/json")]
            [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<KeyValuePair<string, string>>))]
            public IActionResult Configuration()
            {
                return Ok(JsonConvert.SerializeObject(_configuration.AsEnumerable()));
            }

            private void foo()
            {
                StringBuilder json = new StringBuilder();
                using (json.JsonObject())
                {
                    json.JsonValue("Version", _apiExplorer.ApiDescriptionGroups.Version.ToString());
                    using (json.JsonArray("Groups"))
                    {
                        foreach (ApiDescriptionGroup group in _apiExplorer.ApiDescriptionGroups.Items)
                        {
                            using (json.JsonObject())
                            {
                                json.JsonValue("GroupName", group.GroupName);
                                using (json.JsonArray("Apis"))
                                {
                                    foreach (ApiDescription api in group.Items)
                                    {
                                        using (json.JsonObject())
                                        {
                                            json.JsonValue("HttpMethod", api.HttpMethod);
                                            json.JsonValue("RelativePath", api.RelativePath);
                                            using (json.JsonArray("Parameters"))
                                            {
                                                foreach (ApiParameterDescription parameter in api.ParameterDescriptions)
                                                {
                                                    using (json.JsonObject())
                                                    {
                                                        json.JsonValue("Name", parameter.Name);
                                                        json.JsonValue("Id", parameter.Source.Id);
                                                        json.JsonValue("Type", parameter.Type?.FullName);
                                                        if (parameter.RouteInfo != null)
                                                        {
                                                            json.JsonValue("Constraints", string.Join(",", parameter.RouteInfo.Constraints?.Select(c => c.GetType().Name).ToArray()));
                                                            json.JsonValue("DefaultValue", parameter.RouteInfo.DefaultValue.ToString());
                                                            json.JsonValue("IsOptional", parameter.RouteInfo.IsOptional.ToString());
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    }
}
