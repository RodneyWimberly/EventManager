var AccountService_1;
import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
let AccountService = AccountService_1 = class AccountService {
    constructor(authEndpointService, accountEndpointService) {
        this.authEndpointService = authEndpointService;
        this.accountEndpointService = accountEndpointService;
        this._rolesChanged = new Subject();
    }
    getUser(userId) {
        return userId ? this.accountEndpointService.getUserById(userId) : this.accountEndpointService.getCurrentUser();
    }
    getUserAndRoles(userId) {
        return forkJoin(this.getUser(userId), this.accountEndpointService.getRolesAll());
    }
    getUsers(page, pageSize) {
        return page && pageSize ? this.accountEndpointService.getUsers(page, pageSize) : this.accountEndpointService.getUsersAll();
    }
    getUsersAndRoles(page, pageSize) {
        return forkJoin(this.getUsers(page, pageSize), this.accountEndpointService.getRolesAll());
    }
    updateUser(user) {
        if (user.id) {
            return this.accountEndpointService.updateUser(user.id, user);
        }
        else {
            return this.accountEndpointService.getUserByUserName(user.userName).pipe(mergeMap(foundUser => {
                user.id = foundUser.id;
                return this.accountEndpointService.updateUser(user.id, user);
            }));
        }
    }
    newUser(user) {
        return this.accountEndpointService.register(user);
    }
    getUserPreferences() {
        return this.accountEndpointService.userPreferences();
    }
    updateUserPreferences(configuration) {
        return this.accountEndpointService.userPreferences2(configuration);
    }
    deleteUser(userOrUserId) {
        if (typeof userOrUserId === 'string' || userOrUserId instanceof String) {
            return this.accountEndpointService.deleteUser(userOrUserId).pipe(tap(data => this.onRolesUserCountChanged(data.roles)));
        }
        else {
            if (userOrUserId.id) {
                return this.deleteUser(userOrUserId.id);
            }
            else {
                return this.accountEndpointService.getUserByUserName(userOrUserId.userName).pipe(tap(user => this.deleteUser(user.id)));
            }
        }
    }
    unblockUser(userId) {
        return this.accountEndpointService.unblockUser(userId);
    }
    userHasPermission(permissionValue) {
        return this.permissions.some(p => p == permissionValue);
    }
    refreshLoggedInUser() {
        return this.accountEndpointService.refreshLogin();
    }
    getRoles(page, pageSize) {
        return page && pageSize ? this.accountEndpointService.getRoles(page, pageSize) : this.accountEndpointService.getRolesAll();
    }
    getRolesAndPermissions(page, pageSize) {
        return forkJoin(this.getRoles(page, pageSize), this.accountEndpointService.getAllPermissions());
    }
    updateRole(role) {
        if (role.id) {
            return this.accountEndpointService.updateRole(role.id, role).pipe(tap(data => this.onRolesChanged([role], AccountService_1.roleModifiedOperation)));
        }
        else {
            return this.accountEndpointService.getRoleByName(role.name).pipe(mergeMap(foundRole => {
                role.id = foundRole.id;
                return this.accountEndpointService.updateRole(role.id, role);
            }), tap(data => this.onRolesChanged([role], AccountService_1.roleModifiedOperation)));
        }
    }
    newRole(role) {
        return this.accountEndpointService.createRole(role).pipe(tap(data => this.onRolesChanged([role], AccountService_1.roleAddedOperation)));
    }
    deleteRole(roleOrRoleId) {
        if (typeof roleOrRoleId === 'string' || roleOrRoleId instanceof String) {
            return this.accountEndpointService.deleteRole(roleOrRoleId).pipe(tap(data => this.onRolesChanged([data], AccountService_1.roleDeletedOperation)));
        }
        else {
            if (roleOrRoleId.id) {
                return this.deleteRole(roleOrRoleId.id);
            }
            else {
                return this.accountEndpointService.getRoleByName(roleOrRoleId.name).pipe(tap(role => this.deleteRole(role.id)));
            }
        }
    }
    getPermissions() {
        return this.accountEndpointService.getAllPermissions();
    }
    onRolesChanged(roles, op) {
        this._rolesChanged.next({ roles, operation: op });
    }
    onRolesUserCountChanged(roles) {
        return this.onRolesChanged(roles, AccountService_1.roleModifiedOperation);
    }
    getRolesChangedEvent() {
        return this._rolesChanged.asObservable();
    }
    get permissions() {
        return this.authEndpointService.userPermissions;
    }
    get currentUser() {
        return this.authEndpointService.currentUser;
    }
};
AccountService.roleAddedOperation = 'add';
AccountService.roleDeletedOperation = 'delete';
AccountService.roleModifiedOperation = 'modify';
AccountService = AccountService_1 = __decorate([
    Injectable()
], AccountService);
export { AccountService };
//# sourceMappingURL=account.service.js.map