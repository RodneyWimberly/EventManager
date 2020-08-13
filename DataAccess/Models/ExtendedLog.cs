using EventManager.DataAccess.Core.Interfaces;
using IdentityModel;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using ZNetCS.AspNetCore.Logging.EntityFrameworkCore;

namespace EventManager.DataAccess.Models
{
    public class ExtendedLog : Log, IPrimaryKeyEntity<int>, IAuditableEntity, IConcurrencyTrackingEntity
    {
        public ExtendedLog(IHttpContextAccessor accessor, IAccountManager accountManager)
        {
            if (accessor != null && accessor.HttpContext != null)
            {
                HttpContext context = accessor.HttpContext;
                HttpRequest request = context.Request;
                IHeaderDictionary headers = request?.Headers;

                // Browser
                string browser = headers["User-Agent"];
                if (!string.IsNullOrEmpty(browser) && (browser.Length > 255))
                    browser = browser.Substring(0, 255);
                Browser = browser;

                // User
                User = context.User?.Identity?.Name;
                if (string.IsNullOrEmpty(User))
                {
                    string subject = context.User?.FindFirst(JwtClaimTypes.Subject)?.Value?.Trim();
                    if (!string.IsNullOrEmpty(subject))
                        User = accountManager.GetUserByIdAsync(subject).Result.FriendlyName;
                }

                // Host
                Host = context.Connection?.RemoteIpAddress?.MapToIPv4().ToString();
                if (Host == "0.0.0.1")
                    Host = "127.0.0.1";

                // ServerVariables
                ServerVariables = "";
                headers?.Keys.ToDictionary(k => k, k => headers[k].ToString()).ToList().ForEach(kvp => ServerVariables += $"{kvp.Key} = {kvp.Value}\r\n");

                // Cookies
                Cookies = "";
                request?.Cookies?.Keys.ToDictionary(k => k, k => request.Cookies[k].ToString()).ToList().ForEach(kvp => Cookies += $"{kvp.Key} = {kvp.Value}\r\n");

                // Form
                try
                {
                    FormVariables = "";
                    request?.Form?.Keys.ToDictionary(k => k, k => request.Form[k].ToString()).ToList().ForEach(kvp => FormVariables += $"{kvp.Key} = {kvp.Value}\r\n");
                }
                catch (InvalidOperationException)
                {
                    FormVariables = "";
                }

                // QueryString
                QueryString = "";
                request?.Query?.Keys.ToDictionary(k => k, k => request.Query[k].ToString()).ToList().ForEach(kvp => QueryString += $"{kvp.Key} = {kvp.Value}\r\n");

                // Method
                Method = request?.Method;

                // Status Code
                StatusCode = context.Response.StatusCode;

                // Path
                Path = request.Path.Value;
            }
        }

        public ExtendedLog() { }

        [NotMapped]
        [Display(Name = "Level Description", GroupName = "ExtendedLog")]
        public virtual string LevelDescription
        {
            get
            {
                try
                {
                    return Enum.GetName(typeof(LogLevel), Level);
                }
                catch
                {
                    return null;
                }
            }

            set
            {
                if (!string.IsNullOrEmpty(value))
                    try
                    {
                        Level = (int)Enum.Parse<LogLevel>(value);
                    }
                    catch { }
            }
        }

        [StringLength(100, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Browser", GroupName = "ExtendedLog")]
        public string Browser { get; set; }


        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Host", GroupName = "ExtendedLog")]
        public string Host { get; set; }


        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Path", GroupName = "ExtendedLog")]
        public string Path { get; set; }


        [StringLength(100, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "User", GroupName = "ExtendedLog")]
        public string User { get; set; }


        [StringLength(100, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Method", GroupName = "ExtendedLog")]
        public string Method { get; set; }

        [Display(Name = "Status Code", GroupName = "ExtendedLog")]
        public int StatusCode { get; set; }


        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Server Variables", GroupName = "ExtendedLog")]
        public string ServerVariables { get; set; }

        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Cookies", GroupName = "ExtendedLog")]
        public string Cookies { get; set; }

        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Form Variables", GroupName = "ExtendedLog")]
        public string FormVariables { get; set; }

        [StringLength(250, ErrorMessage = "{0} length must be less than {1}.")]
        [Display(Name = "Query String", GroupName = "ExtendedLog")]
        public string QueryString { get; set; }

        #region IAuditableEntity
        [Required(ErrorMessage = "{0} is required")]
        [StringLength(36, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Created By", GroupName = "ExtendedLog")]
        public string CreatedBy { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(36, MinimumLength = 1, ErrorMessage = "{0} length must be between {2} and {1}.")]
        [Display(Name = "Updated By", GroupName = "ExtendedLog")]
        public string UpdatedBy { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.DateTime)]
        [Display(Name = "Updated Date", GroupName = "ExtendedLog")]
        public DateTime UpdatedDate { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Column(TypeName = "TEXT")]
        [DataType(DataType.DateTime)]
        [Display(Name = "Created Date", GroupName = "ExtendedLog")]
        public DateTime CreatedDate { get; set; }
        #endregion

        #region IConcurrencyTrackingEntity
        [Timestamp]
        [Column(TypeName = "BLOB")]
        [Display(Name = "Row Version", GroupName = "ExtendedLog")]
        public byte[] RowVersion { get; set; }
        #endregion
    }
}
