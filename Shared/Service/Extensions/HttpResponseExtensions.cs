using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace EventManager.Shared.Service.Extensions
{
    public static class HttpResponseExtensions
    {
        public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(new PageHeader(currentPage, itemsPerPage, totalItems, totalPages)));
            response.Headers.Add("access-control-expose-headers", "Pagination"); // CORS
        }
    }
}
