using Newtonsoft.Json;

namespace EventManager.Logging.ServiceClient.Proxy
{
    public class ViewModel
    {
        [JsonProperty("browser", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public string Browser { get; set; }

        [JsonProperty("host", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public string Host { get; set; }

        [JsonProperty("path", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public string Path { get; set; }

        [JsonProperty("user", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public string User { get; set; }

        [JsonProperty("eventId", Required = Required.DisallowNull, NullValueHandling = NullValueHandling.Ignore)]
        public int EventId { get; set; }

        [JsonProperty("id", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public string Id { get; set; }

        [JsonProperty("level", Required = Required.DisallowNull, NullValueHandling = NullValueHandling.Ignore)]
        public int Level { get; set; }

        [JsonProperty("levelDescription", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public string LevelDescription { get; set; }

        [JsonProperty("message", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public string Message { get; set; }

        [JsonProperty("name", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public string Name { get; set; }

        [JsonProperty("method", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public string Method { get; set; }

        [JsonProperty("statusCode", Required = Required.DisallowNull, NullValueHandling = NullValueHandling.Ignore)]
        public int StatusCode { get; set; }

        [JsonProperty("serverVariables", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public string ServerVariables { get; set; }

        [JsonProperty("cookies", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public string Cookies { get; set; }

        [JsonProperty("formVariables", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public string FormVariables { get; set; }

        [JsonProperty("queryString", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public string QueryString { get; set; }

        [JsonProperty("timeStamp", Required = Required.DisallowNull, NullValueHandling = NullValueHandling.Ignore)]
        public System.DateTimeOffset TimeStamp { get; set; }

        [JsonProperty("createdBy", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        [System.ComponentModel.DataAnnotations.StringLength(256)]
        public string CreatedBy { get; set; }

        [JsonProperty("updatedBy", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        [System.ComponentModel.DataAnnotations.StringLength(256)]
        public string UpdatedBy { get; set; }

        [JsonProperty("updatedDate", Required = Required.DisallowNull, NullValueHandling = NullValueHandling.Ignore)]
        public System.DateTimeOffset UpdatedDate { get; set; }

        [JsonProperty("createdDate", Required = Required.DisallowNull, NullValueHandling = NullValueHandling.Ignore)]
        public System.DateTimeOffset CreatedDate { get; set; }

        [JsonProperty("rowVersion", Required = Required.Default, NullValueHandling = NullValueHandling.Ignore)]
        public byte[] RowVersion { get; set; }
    }
}