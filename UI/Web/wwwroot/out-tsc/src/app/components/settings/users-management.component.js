import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { DialogType, MessageSeverity } from '../../services/alert.service';
import { Utilities } from '../../helpers/utilities';
import * as generated from '../../services/endpoint.services';
let UsersManagementComponent = class UsersManagementComponent {
    constructor(alertService, translationService, accountClient) {
        this.alertService = alertService;
        this.translationService = translationService;
        this.accountClient = accountClient;
        this.columns = [];
        this.rows = [];
        this.rowsCache = [];
        this.allRoles = [];
    }
    ngOnInit() {
        const gT = (key) => this.translationService.getTranslation(key);
        this.columns = [
            { prop: 'index', name: '#', width: 40, cellTemplate: this.indexTemplate, canAutoResize: false },
            { prop: 'jobTitle', name: gT('users.management.Title'), width: 50 },
            { prop: 'userName', name: gT('users.management.UserName'), width: 90, cellTemplate: this.userNameTemplate },
            { prop: 'fullName', name: gT('users.management.FullName'), width: 120 },
            { prop: 'email', name: gT('users.management.Email'), width: 140 },
            { prop: 'roles', name: gT('users.management.Roles'), width: 120, cellTemplate: this.rolesTemplate },
            { prop: 'phoneNumber', name: gT('users.management.PhoneNumber'), width: 100 }
        ];
        if (this.canManageUsers) {
            this.columns.push({ name: '', width: 160, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false });
        }
        this.loadData();
    }
    ngAfterViewInit() {
        this.userEditor.changesSavedCallback = () => {
            this.addNewUserToList();
            this.editorModal.hide();
        };
        this.userEditor.changesCancelledCallback = () => {
            this.editedUser = null;
            this.sourceUser = null;
            this.editorModal.hide();
        };
    }
    addNewUserToList() {
        if (this.sourceUser) {
            Object.assign(this.sourceUser, this.editedUser);
            let sourceIndex = this.rowsCache.indexOf(this.sourceUser, 0);
            if (sourceIndex > -1) {
                Utilities.moveArrayItem(this.rowsCache, sourceIndex, 0);
            }
            sourceIndex = this.rows.indexOf(this.sourceUser, 0);
            if (sourceIndex > -1) {
                Utilities.moveArrayItem(this.rows, sourceIndex, 0);
            }
            this.editedUser = null;
            this.sourceUser = null;
        }
        else {
            const user = new generated.UserViewModel();
            Object.assign(user, this.editedUser);
            this.editedUser = null;
            let maxIndex = 0;
            for (const u of this.rowsCache) {
                if (u.index > maxIndex) {
                    maxIndex = u.index;
                }
            }
            user.index = maxIndex + 1;
            this.rowsCache.splice(0, 0, user);
            this.rows.splice(0, 0, user);
            this.rows = [...this.rows];
        }
    }
    loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        if (this.canViewRoles) {
            this.accountClient.getUsersAndRoles().subscribe(results => this.onDataLoadSuccessful(results[0], results[1]), error => this.onDataLoadFailed(error));
        }
        else {
            this.accountClient.getUsers().subscribe(users => this.onDataLoadSuccessful(users, this.accountClient.currentUser.roles.map(x => { let r = new generated.RoleViewModel(); r.name = x; return r; })), error => this.onDataLoadFailed(error));
        }
    }
    onDataLoadSuccessful(users, roles) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        users.forEach((user, index, users) => {
            user.index = index + 1;
        });
        this.rowsCache = [...users];
        this.rows = users;
        this.allRoles = roles;
    }
    onDataLoadFailed(error) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.alertService.showStickyMessage('Load Error', `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`, MessageSeverity.error, error);
    }
    onSearchChanged(value) {
        this.rows = this.rowsCache.filter(r => Utilities.searchArray(value, false, r.userName, r.fullName, r.email, r.phoneNumber, r.jobTitle, r.roles));
    }
    onEditorModalHidden() {
        this.editingUserName = null;
        this.userEditor.resetForm(true);
    }
    newUser() {
        this.editingUserName = null;
        this.sourceUser = null;
        this.editedUser = this.userEditor.newUser(this.allRoles);
        this.editorModal.show();
    }
    editUser(row) {
        this.editingUserName = { name: row.userName };
        this.sourceUser = row;
        this.editedUser = this.userEditor.editUser(row, this.allRoles);
        this.editorModal.show();
    }
    deleteUser(row) {
        this.alertService.showDialog('Are you sure you want to delete \"' + row.userName + '\"?', DialogType.confirm, () => this.deleteUserHelper(row));
    }
    deleteUserHelper(row) {
        this.alertService.startLoadingMessage('Deleting...');
        this.loadingIndicator = true;
        this.accountClient.deleteUser(row)
            .subscribe(results => {
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
            this.rowsCache = this.rowsCache.filter(item => item !== row);
            this.rows = this.rows.filter(item => item !== row);
        }, error => {
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
            this.alertService.showStickyMessage('Delete Error', `An error occured whilst deleting the user.\r\nError: "${Utilities.getHttpResponseMessages(error)}"`, MessageSeverity.error, error);
        });
    }
    get canAssignRoles() {
        return this.accountClient.userHasPermission(generated.PermissionValues.AssignRoles);
    }
    get canViewRoles() {
        return this.accountClient.userHasPermission(generated.PermissionValues.ViewRoles);
    }
    get canManageUsers() {
        return this.accountClient.userHasPermission(generated.PermissionValues.ManageUsers);
    }
};
__decorate([
    ViewChild('indexTemplate', { static: true })
], UsersManagementComponent.prototype, "indexTemplate", void 0);
__decorate([
    ViewChild('userNameTemplate', { static: true })
], UsersManagementComponent.prototype, "userNameTemplate", void 0);
__decorate([
    ViewChild('rolesTemplate', { static: true })
], UsersManagementComponent.prototype, "rolesTemplate", void 0);
__decorate([
    ViewChild('actionsTemplate', { static: true })
], UsersManagementComponent.prototype, "actionsTemplate", void 0);
__decorate([
    ViewChild('editorModal', { static: true })
], UsersManagementComponent.prototype, "editorModal", void 0);
__decorate([
    ViewChild('userEditor', { static: true })
], UsersManagementComponent.prototype, "userEditor", void 0);
UsersManagementComponent = __decorate([
    Component({
        selector: 'users-management',
        templateUrl: './users-management.component.html',
        styleUrls: ['./users-management.component.scss']
    })
], UsersManagementComponent);
export { UsersManagementComponent };
//# sourceMappingURL=users-management.component.js.map