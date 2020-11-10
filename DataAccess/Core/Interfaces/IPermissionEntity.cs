using System.Collections.Generic;

namespace EventManager.DataAccess.Core.Interfaces
{
    public interface IPermissionEntity
    {
        List<Permission> GetPermissions(List<Permission> permissions);
        List<Permission> GetAdminPermissions(List<Permission> permissions);
    }
}
