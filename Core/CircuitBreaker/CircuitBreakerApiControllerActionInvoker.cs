using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;

namespace EventManager.Core.CircuitBreaker
{
    public class CircuitBreakerApiControllerActionInvoker : ApiControllerActionInvoker, IHttpActionInvoker
    {
        public override Task<HttpResponseMessage> InvokeActionAsync(HttpActionContext actionContext, CancellationToken cancellationToken)
        {
            Task<HttpResponseMessage> objResult = CircuitBreakerPanel.GetCircuit(actionContext).EnergizeAsync(cancellationToken);
            actionContext.Request.Properties["RuntimeReturnType"] = objResult.GetType();

            return objResult;
        }
    }
}
