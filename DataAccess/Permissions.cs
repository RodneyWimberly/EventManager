using EventManager.Core;
using EventManager.DataAccess.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace EventManager.DataAccess
{
    public static partial class Permissions
    {
        public static ReadOnlyCollection<Permission> AllPermissions;
        public static ReadOnlyCollection<Permission> AdminPermissions;

        static Permissions()
        {
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

                returnValue = type.InvokeMethod("GetAdminPermissions", new object[] { allPermissions });
                if (returnValue != null) 
                    adminPermissions = returnValue as List<Permission>;

            }
            AllPermissions = allPermissions.AsReadOnly();
            AdminPermissions = adminPermissions.AsReadOnly();
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
            return AdminPermissions.Select(p => p.Value).ToArray();
        }
    }
}
