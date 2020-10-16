using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace EventManager.Core.CircuitBreaker
{
    public class Circuit : IDisposable
    {
        private readonly HttpActionContext _action;
        private Timer _timeout;
        private CircuitBreakerState _state;
        private bool _disposed;
        private Exception _lastException;

        public Circuit(HttpActionContext action, CircuitConfiguration configuration)
        {
            _action = action;
            Configuration = configuration;
        }

        public Circuit(HttpActionContext action, int failureThreshold = 3, int successThreshold = 3, int failureTimeout = 1000) :
            this(action, new CircuitConfiguration
            {
                FailureThreshold = failureThreshold,
                SuccessThreshold = successThreshold,
                FailureTimeout = failureTimeout
            })
        { }

        public CircuitConfiguration Configuration { get; set; }

        public CircuitBreakerState State
        {
            get { return _state; }
            set
            {
                if (_state == value)
                    return;
                switch (value)
                {
                    case CircuitBreakerState.Open:
                        _timeout = new Timer(new TimerCallback(OpenStateTimeout), null, Configuration.FailureTimeout, Timeout.Infinite);
                        break;
                    case CircuitBreakerState.Closed:
                        _timeout = null;
                        Configuration.FailureCount = 0;
                        break;
                    case CircuitBreakerState.HalfOpen:
                        _timeout = null;
                        Configuration.SuccessCount = 0;
                        break;
                }
                _state = value;
            }
        }


        public async Task<HttpResponseMessage> EnergizeAsync(CancellationToken cancellationToken)
        {
            Task<HttpResponseMessage> response;
            switch (_state)
            {
                case CircuitBreakerState.Open:
                    response = Task.Run(() =>
                    {
                        _lastException = new CircuitBreakerOpenException(_lastException);
                        return new HttpResponseMessage(HttpStatusCode.InternalServerError);
                    });
                    break;
                case CircuitBreakerState.HalfOpen:
                    response = InvokeActionAsync(cancellationToken);
                    if(_lastException == null)
                    {
                        Configuration.SuccessCount++;
                        if (Configuration.SuccessCount == Configuration.SuccessThreshold)
                            State = CircuitBreakerState.Closed;
                    }
                    break;
                case CircuitBreakerState.Closed:
                default:
                    response = InvokeActionAsync(cancellationToken);
                    if (_lastException != null)
                    {
                        Configuration.FailureCount++;
                        if (Configuration.FailureCount == Configuration.FailureThreshold)
                            State = CircuitBreakerState.Open;
                    }
                    break;
            }
            return await response.ConfigureAwait(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (_disposed)
                return;

            if (disposing)
                if (_timeout != null)
                    _timeout.Dispose();

            _disposed = true;
        }

        private async Task<HttpResponseMessage> InvokeActionAsync(CancellationToken cancellationToken)
        {
            _lastException = null;
            HttpControllerContext controllerContext =  _action.ControllerContext;
            HttpActionDescriptor actionDescriptor = _action.ActionDescriptor;
            try
            {
                object actionResult = await actionDescriptor.ExecuteAsync(controllerContext,
                    _action.ActionArguments, cancellationToken).ConfigureAwait(false);
                return actionDescriptor.ResultConverter.Convert(controllerContext, actionResult);
            }
            catch (HttpResponseException httpResponseException)
            {
                _lastException = httpResponseException;
                HttpResponseMessage response = httpResponseException.Response;
                response.RequestMessage = _action.Request;
                return response;
            }
        }

        private void OpenStateTimeout(object state)
        {
            State = CircuitBreakerState.HalfOpen;
        }
    }
}
