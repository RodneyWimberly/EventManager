using System.Collections.Generic;

namespace EventManager.Shared.DataAccess.Interfaces
{
    public interface IPermissionEntity
    {
        List<Permission> GetPermissions(List<Permission> permissions);
        List<Permission> GetAdminPermissions(List<Permission> permissions);
    }
}
