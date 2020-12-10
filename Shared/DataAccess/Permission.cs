using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace EventManager.Shared.DataAccess
{
    public class PermissionType
    {
        public const string Add = "add";
        public const string Edit = "edit";
        public const string Delete = "delete";
        public const string View = "view";
        public const string Execute = "execute";
        public const string Manage = "manage";
        public const string Assign = "assign";
        public const string Delegate = "delegate";
    }

    public class Permission
    {
        public Permission() { }

        public Permission(string name, string value, string groupName, string description = null)
        {
            Name = name;
            Value = value;
            GroupName = groupName;
            Description = description;
        }

        public string Name { get; set; }
        public string Value { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }

        public override string ToString()
        {
            return Value;
        }

        public static implicit operator string(Permission permission)
        {
            return permission.Value;
        }
    }

    public class NewPermission<T> where T : EntityEntry
    {
        public string Namespace { get; set; }
        public T Entity { get; set; }
        public string PermissionType { get; set; }
        public string Description { get; set; }
        public string FullName { get => $"{Namespace}:{Value}"; }
        public string Value { get => $"{nameof(Entity)}:{PermissionType}"; }
        public bool CanView { get => CanEdit || PermissionType == DataAccess.PermissionType.View; }
        public bool CanEdit { get => CanAdd || PermissionType == DataAccess.PermissionType.Edit; }
        public bool CanAdd { get => CanManage || PermissionType == DataAccess.PermissionType.Add; }
        public bool CanDelete { get => CanManage || PermissionType == DataAccess.PermissionType.Delete; }
        public bool CanExecute { get => CanManage || PermissionType == DataAccess.PermissionType.Execute; }
        public bool CanManage { get => CanAssign || PermissionType == DataAccess.PermissionType.Manage; }
        public bool CanAssign { get => CanDelegate || PermissionType == DataAccess.PermissionType.Assign; }
        public bool CanDelegate { get => PermissionType == DataAccess.PermissionType.Delegate; }
        public NewPermission() { }

        public NewPermission(string @namespace, T entity, string permissionType, string description = null)
        {
            Namespace = @namespace;
            Entity = entity;
            PermissionType = permissionType;
            Description = description;
        }

        public override string ToString()
        {
            return Value;
        }

        public static implicit operator string(NewPermission<T> permission)
        {
            return permission.Value;
        }
    }
}
