using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace EventManager.Core
{
    public class WebCrawler
    {
        private readonly Logger<WebCrawler> _logger;
        private readonly HttpClient _httpClient;

        public WebCrawler(Logger<WebCrawler> logger, HttpClient httpClient)
        {
            _logger = logger;
            _httpClient = httpClient;
        }

        public async Task<string> DownloadFile(string url, string fileName)
        {
            // validation
            _logger.LogInformation($"Downloading File [{fileName}].");
            FileInfo fileInfo = new FileInfo(fileName);

            HttpResponseMessage response = await _httpClient.GetAsync(new Uri(url)).ConfigureAwait(false);
            response.EnsureSuccessStatusCode();
            await using (Stream ms = await response.Content.ReadAsStreamAsync().ConfigureAwait(false))
            {
                await using (FileStream fs = File.Create(fileInfo.FullName))
                {
                    ms.Seek(0, SeekOrigin.Begin);
                    ms.CopyTo(fs);
                }
            }
            _logger.LogInformation($"File saved as [{fileInfo.Name}].");
            return fileInfo.FullName;
        }

        public Task<string> DownloadFile(System.Uri url, string fileName)
        {
            throw new System.NotImplementedException();
        }
    }
}
