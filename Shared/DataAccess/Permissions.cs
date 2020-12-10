using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using EventManager.Shared.Core.Constants;

namespace EventManager.Shared.DataAccess
{
    public static partial class Permissions
    {
        public static ReadOnlyCollection<Permission> AllPermissions;
        public static ReadOnlyCollection<Permission> AdminPermissions;
        public static string EventsNamespace = $"{ApplicationValues.RootNamespace}:events";
        public static Permission ViewEvents = new Permission("View Events", $"{EventsNamespace}:{PermissionType.View}", EventsNamespace, "Permission to view event details");
        public static Permission ManageEvents = new Permission("Manage Events", $"{EventsNamespace}:{PermissionType.Manage}", EventsNamespace, "Permission to create, delete and modify event details");
        public static Permission ExecuteEvents = new Permission("Execute Events", $"{EventsNamespace}:{PermissionType.Execute}", EventsNamespace, "Permission to execute events");
        public static List<Permission> EventsPermissions = new List<Permission> { ViewEvents, ManageEvents, ExecuteEvents };
        public static string LogsNamespace = $"{ApplicationValues.RootNamespace}:logs";
        public static Permission ViewLogs = new Permission("View Logs", $"{LogsNamespace}:{PermissionType.View}", LogsNamespace, "Permission to view log details");
        public static Permission ManageLogs = new Permission("Manage Logs", $"{LogsNamespace}:manage", LogsNamespace, "Permission to create, delete and modify log details");
        public static List<Permission> LogsPermissions = new List<Permission> { ViewLogs, ManageLogs };
        public static string RolesNamespace = $"{ApplicationValues.RootNamespace}:roles";
        public static Permission ViewRoles = new Permission("View Roles", $"{RolesNamespace}:{PermissionType.View}", RolesNamespace, "Permission to view available roles");
        public static Permission ManageRoles = new Permission("Manage Roles", $"{RolesNamespace}:{PermissionType.Manage}", RolesNamespace, "Permission to create, delete and modify roles");
        public static Permission AssignRoles = new Permission("Assign Roles", $"{RolesNamespace}:{PermissionType.Assign}", RolesNamespace, "Permission to assign roles to users");
        public static List<Permission> RolesPermissions = new List<Permission> { ViewRoles, ManageRoles, AssignRoles };
        public static string UsersNamespace = $"{ApplicationValues.RootNamespace}:users";
        public static Permission ViewUsers = new Permission("View Users", $"{UsersNamespace}:{PermissionType.View}", UsersNamespace, "Permission to view other users account details");
        public static Permission ManageUsers = new Permission("Manage Users", $"{UsersNamespace}:{PermissionType.Manage}", UsersNamespace, "Permission to create, delete and modify other users account details");
        public static List<Permission> UsersPermissions = new List<Permission> { ViewUsers, ManageUsers };

        static Permissions()
        {
            /*
            object returnValue;
            List<Permission> allPermissions = new List<Permission>();
            List<Permission> adminPermissions = new List<Permission>();
            IEnumerable<Type> types = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypesWithInterface<IPermissionEntity>());
            foreach (Type type in types)
            {
                returnValue = type.InvokeMethod("GetPermissions", new object[] { allPermissions });
                if(returnValue != null)
                    allPermissions = returnValue as List<Permission>;

                returnValue = type.InvokeMethod("GetAdminPermissions", new object[] { adminPermissions });
                if (returnValue != null) 
                    adminPermissions = returnValue as List<Permission>;

            }
            AllPermissions = allPermissions.AsReadOnly();
            AdminPermissions = adminPermissions.AsReadOnly();*/
            List<Permission> allPermissions = new List<Permission>();
            allPermissions.AddRange(LogsPermissions);
            allPermissions.AddRange(EventsPermissions);
            allPermissions.AddRange(UsersPermissions);
            allPermissions.AddRange(RolesPermissions);
            AllPermissions = allPermissions.AsReadOnly();
        }

        public static Permission GetPermissionByName(string permissionName)
        {
            return AllPermissions.Where(p => p.Name == permissionName).SingleOrDefault();
        }

        public static Permission GetPermissionByValue(string permissionValue)
        {
            return AllPermissions.Where(p => p.Value == permissionValue).SingleOrDefault();
        }

        public static string[] GetAllPermissionValues()
        {
            return AllPermissions.Select(p => p.Value).ToArray();
        }

        public static string[] GetAdministrativePermissionValues()
        {
            return new string[] { ManageLogs, ManageEvents, ExecuteEvents, ManageUsers, ManageRoles, AssignRoles };
        }
    }
}
