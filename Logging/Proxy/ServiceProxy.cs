using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;

namespace EventManager.Logging.ServiceClient.Proxy
{
    public class ServiceProxy
    {
        private readonly HttpClient _httpClient;

        public ServiceProxy(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public string BaseUrl { get; set; }

        public void Post(ViewModel vmLog)
        {
            if (vmLog == null)
                throw new ArgumentNullException(nameof(vmLog));

            StringBuilder urlBuilder = new StringBuilder();
            urlBuilder.Append(BaseUrl != null ? BaseUrl.TrimEnd('/') : "");

            try
            {
                using (HttpRequestMessage request = new HttpRequestMessage())
                {
                    StringContent content = new StringContent(JsonConvert.SerializeObject(vmLog));
                    content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");

                    request.Content = content;
                    request.Method = new HttpMethod("POST");
                    request.Headers.Accept.Add(MediaTypeWithQualityHeaderValue.Parse("application/json"));
                    //request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJSUzI1NiIsImtpZCI6IkU2RkQ0NDM3NjlDREFGODlCRDZFMjc2QzkyMDFEMEVCIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MDU0MDU3NDEsImV4cCI6MTYwNTQwOTM0MSwiaXNzIjoiaHR0cHM6Ly9lbS13ZWIuYXp1cmV3ZWJzaXRlcy5uZXQiLCJhdWQiOiIzZjlkNjRlMS02NzVmLTQzZDMtYmUzYi1mZTA2YzAxZDE0ZDMiLCJjbGllbnRfaWQiOiIzZTE2NTE4Ny02MDBkLTQ2NjYtYTQ4My01MWJhZGYzMDQwYjMiLCJzdWIiOiI3MDFiOGJmZC03NWE1LTRiMGEtYWMyYS05ODdlNTdkN2NkOWMiLCJhdXRoX3RpbWUiOjE2MDU0MDU3NDEsImlkcCI6ImxvY2FsIiwicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJwZXJtaXNzaW9uIjpbImxvZ3MudmlldyIsImxvZ3MubWFuYWdlIiwiZXZlbnRzLnZpZXciLCJldmVudHMubWFuYWdlIiwiZXZlbnRzLmV4ZWN1dGUiLCJ1c2Vycy52aWV3IiwidXNlcnMubWFuYWdlIiwicm9sZXMudmlldyIsInJvbGVzLm1hbmFnZSIsInJvbGVzLmFzc2lnbiJdLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHdpbWJlcmx5dGVjaC5jb20iLCJwaG9uZV9udW1iZXIiOiIrMSAoMTIzKSA1NTUtMTIxMiIsImpvYnRpdGxlIjoiTWFuYWdlciIsImZ1bGxuYW1lIjoiTWFuYWdlciBTYW1wbGUgQWRtaW5pc3RyYXRvciBVc2VyIiwianRpIjoiRTJGRTg3QkFBMTVFOEM3NDBCRDczRERCRjA3NTJFNzgiLCJpYXQiOjE2MDU0MDU3NDEsInNjb3BlIjpbIjNmOWQ2NGUxLTY3NWYtNDNkMy1iZTNiLWZlMDZjMDFkMTRkMyIsImVtYWlsIiwib3BlbmlkIiwicGhvbmUiLCJwcm9maWxlIiwicm9sZXMiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.gVVbdoTwcewrw4H5QFmdrHjrvpQOJ8aT296s8kUtpx9HqmjnfOkKfZO2GtLmptsYNFJnTYUtsh5wjSUlTdk-BQNljQNL290OOvOmcRxvv67q3gerHK7UPiAxWZhwNSzNvn_IWA2QezjEjkUwIHouJKqaOI1xMzBlf153v2Xgv-Q-MdAtzWNNn_dmeYHJOQreyjc2N3Kai2ekLQiUQkkv8Cq4ozLH7nKhuzSbgiQPi-er_y6v8fxt-GXg2oxwOhzPQSWKrkKMA8rXAgHZHs_2vz5B-L4ewSoHLkD3DauXscu_mOC-6bqHHOV7X0netIz-k81oM_tP2cEes4BBBirkEQ");
                    request.RequestUri = new Uri(urlBuilder.ToString(), UriKind.RelativeOrAbsolute);

                    _httpClient.Send(request, HttpCompletionOption.ResponseHeadersRead, CancellationToken.None);
                }
            }
            finally
            {
            }
        }
    }
}