using EventManager.DataAccess.Accounts;
using EventManager.DataAccess.Core.Enums;
using EventManager.DataAccess.Core.Interfaces;
using IdentityModel;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using ZNetCS.AspNetCore.Logging.EntityFrameworkCore;


namespace EventManager.DataAccess
{
    public static partial class Permissions
    {
        public const string LogsPermissionGroupName = "Log Permissions";
        public static Permission ViewLogs = new Permission("View Events", "logs.view", LogsPermissionGroupName, "Permission to view log details");
        public static Permission ManageLogs = new Permission("Manage Events", "logs.manage", LogsPermissionGroupName, "Permission to create, delete and modify log details");
    }

    namespace Events.Models
    {
        public class ExtendedLog : Log<string>, IPrimaryKeyEntity<string>, IAuditableEntity,
            IConcurrencyTrackingEntity, IPermissionEntity
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

            [MaxLength(100)]
            public string Browser { get; set; }

            [MaxLength(250)]
            public string Host { get; set; }

            [MaxLength(250)]
            public string Path { get; set; }

            [MaxLength(100)]
            public string User { get; set; }

            [MaxLength(100)]
            public string Method { get; set; }

            public int StatusCode { get; set; }

            [MaxLength(250)]
            public string ServerVariables { get; set; }

            [MaxLength(250)]
            public string Cookies { get; set; }

            [MaxLength(250)]
            public string FormVariables { get; set; }

            [MaxLength(250)]
            public string QueryString { get; set; }

            #region IAuditableEntity
            [Required]
            [MaxLength(36)]
            public string CreatedBy { get; set; }

            [Required]
            [MaxLength(36)]
            public string UpdatedBy { get; set; }

            [Required]
            [Column(TypeName = "TEXT")]
            [MaxLength(28)]
            public DateTime UpdatedDate { get; set; }

            [Required]
            [Column(TypeName = "TEXT")]
            [MaxLength(28)]
            public DateTime CreatedDate { get; set; }
            #endregion

            #region IConcurrencyTrackingEntity
            [Timestamp]
            [Column(TypeName = "BLOB")]
            public byte[] RowVersion { get; set; }
            #endregion

            #region IPermissionEntity
            public List<Permission> GetPermissions(List<Permission> permissions)
            {
                permissions.Add(Permissions.ViewLogs);
                permissions.Add(Permissions.ManageLogs);
                return permissions;
            }

            public List<Permission> GetAdminPermissions(List<Permission> permissions)
            {
                permissions.Add(Permissions.ManageLogs);
                return permissions;
            }
            #endregion
        }
    }

}
