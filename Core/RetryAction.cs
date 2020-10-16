using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace EventManager.Core
{
    public class RetryAction<TTransientException> where TTransientException : Exception
    {
        public int RetryCount { get; set; } = 3;
        public TimeSpan RetryDelaySeconds { get; set; } = TimeSpan.FromSeconds(5);

        public async Task Invoke(Action action)
        {
            int currentRetry = 0;

            for (; ; )
            {
                try
                {
                    await Task.Run(action).ConfigureAwait(false);
                    break;
                }
                catch (Exception ex)
                {
                    currentRetry++;
                    if (currentRetry > this.RetryCount || !IsTransient(ex))
                        throw;
                }

                await Task.Delay(RetryDelaySeconds).ConfigureAwait(false);
            }
        }

        private static bool IsTransient(Exception ex)
        {
            if (ex is TTransientException)
                return true;

            if (ex is WebException webException)
            {
                return new[] {WebExceptionStatus.ConnectionClosed,
                  WebExceptionStatus.Timeout,
                  WebExceptionStatus.RequestCanceled }.
                        Contains(webException.Status);
            }

            return false;
        }
    }
}
