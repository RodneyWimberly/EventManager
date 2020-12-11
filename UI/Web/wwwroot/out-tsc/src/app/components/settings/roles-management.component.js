import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { DialogType, MessageSeverity } from '../../services/alert.service';
import { Utilities } from '../../helpers/utilities';
import * as generated from '../../services/endpoint.services';
let RolesManagementComponent = class RolesManagementComponent {
    constructor(alertService, translationService, accountClient) {
        this.alertService = alertService;
        this.translationService = translationService;
        this.accountClient = accountClient;
        this.columns = [];
        this.rows = [];
        this.rowsCache = [];
        this.allPermissions = [];
    }
    ngOnInit() {
        const gT = (key) => this.translationService.getTranslation(key);
        this.columns = [
            { prop: 'index', name: '#', width: 50, cellTemplate: this.indexTemplate, canAutoResize: false },
            { prop: 'name', name: gT('roles.management.Name'), width: 180 },
            { prop: 'description', name: gT('roles.management.Description'), width: 320 },
            { prop: 'usersCount', name: gT('roles.management.Users'), width: 50 },
            { name: '', width: 160, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false }
        ];
        this.loadData();
    }
    ngAfterViewInit() {
        this.roleEditor.changesSavedCallback = () => {
            this.addNewRoleToList();
            this.editorModal.hide();
        };
        this.roleEditor.changesCancelledCallback = () => {
            this.editedRole = null;
            this.sourceRole = null;
            this.editorModal.hide();
        };
    }
    addNewRoleToList() {
        if (this.sourceRole) {
            Object.assign(this.sourceRole, this.editedRole);
            let sourceIndex = this.rowsCache.indexOf(this.sourceRole, 0);
            if (sourceIndex > -1) {
                Utilities.moveArrayItem(this.rowsCache, sourceIndex, 0);
            }
            sourceIndex = this.rows.indexOf(this.sourceRole, 0);
            if (sourceIndex > -1) {
                Utilities.moveArrayItem(this.rows, sourceIndex, 0);
            }
            this.editedRole = null;
            this.sourceRole = null;
        }
        else {
            const role = new generated.RoleViewModel();
            Object.assign(role, this.editedRole);
            this.editedRole = null;
            let maxIndex = 0;
            for (const r of this.rowsCache) {
                if (r.index > maxIndex) {
                    maxIndex = r.index;
                }
            }
            role.index = maxIndex + 1;
            this.rowsCache.splice(0, 0, role);
            this.rows.splice(0, 0, role);
            this.rows = [...this.rows];
        }
    }
    loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.accountClient.getRolesAndPermissions()
            .subscribe(results => {
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
            const roles = results[0];
            const permissions = results[1];
            roles.forEach((role, index, roles) => {
                role.index = index + 1;
            });
            this.rowsCache = [...roles];
            this.rows = roles;
            this.allPermissions = permissions;
        }, error => {
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
            this.alertService.showStickyMessage('Load Error', `Unable to retrieve roles from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`, MessageSeverity.error, error);
        });
    }
    onSearchChanged(value) {
        this.rows = this.rowsCache.filter(r => Utilities.searchArray(value, false, r.name, r.description));
    }
    onEditorModalHidden() {
        this.editingRoleName = null;
        this.roleEditor.resetForm(true);
    }
    newRole() {
        this.editingRoleName = null;
        this.sourceRole = null;
        this.editedRole = this.roleEditor.newRole(this.allPermissions);
        this.editorModal.show();
    }
    editRole(row) {
        this.editingRoleName = { name: row.name };
        this.sourceRole = row;
        this.editedRole = this.roleEditor.editRole(row, this.allPermissions);
        this.editorModal.show();
    }
    deleteRole(row) {
        this.alertService.showDialog('Are you sure you want to delete the \"' + row.name + '\" role?', DialogType.confirm, () => this.deleteRoleHelper(row));
    }
    deleteRoleHelper(row) {
        this.alertService.startLoadingMessage('Deleting...');
        this.loadingIndicator = true;
        this.accountClient.deleteRole(row)
            .subscribe(results => {
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
            this.rowsCache = this.rowsCache.filter(item => item !== row);
            this.rows = this.rows.filter(item => item !== row);
        }, error => {
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
            this.alertService.showStickyMessage('Delete Error', `An error occured whilst deleting the role.\r\nError: "${Utilities.getHttpResponseMessages(error)}"`, MessageSeverity.error, error);
        });
    }
    get canManageRoles() {
        return this.accountClient.userHasPermission(generated.PermissionValues.ManageRoles);
    }
};
__decorate([
    ViewChild('indexTemplate', { static: true })
], RolesManagementComponent.prototype, "indexTemplate", void 0);
__decorate([
    ViewChild('actionsTemplate', { static: true })
], RolesManagementComponent.prototype, "actionsTemplate", void 0);
__decorate([
    ViewChild('editorModal', { static: true })
], RolesManagementComponent.prototype, "editorModal", void 0);
__decorate([
    ViewChild('roleEditor', { static: true })
], RolesManagementComponent.prototype, "roleEditor", void 0);
RolesManagementComponent = __decorate([
    Component({
        selector: 'roles-management',
        templateUrl: './roles-management.component.html',
        styleUrls: ['./roles-management.component.scss']
    })
], RolesManagementComponent);
export { RolesManagementComponent };
//# sourceMappingURL=roles-management.component.js.map