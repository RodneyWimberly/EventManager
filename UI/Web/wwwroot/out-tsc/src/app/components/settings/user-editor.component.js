import { __decorate } from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { MessageSeverity } from '../../services/alert.service';
import { Utilities } from '../../helpers/utilities';
import * as generated from '../../services/endpoint.services';
let UserEditorComponent = class UserEditorComponent {
    constructor(alertService, accountClient) {
        this.alertService = alertService;
        this.accountClient = accountClient;
        this.isEditMode = false;
        this.isNewUser = false;
        this.isSaving = false;
        this.isChangePassword = false;
        this.isEditingSelf = false;
        this.showValidationErrors = false;
        this.uniqueId = Utilities.uniqueId();
        this.user = new generated.UserViewModel();
        this.allRoles = [];
        this.formResetToggle = true;
        this.isGeneralEditor = false;
    }
    ngOnInit() {
        if (!this.isGeneralEditor) {
            this.loadCurrentUserData();
        }
    }
    loadCurrentUserData() {
        this.alertService.startLoadingMessage();
        if (this.canViewAllRoles) {
            this.accountClient.getUserAndRoles().subscribe(results => this.onCurrentUserDataLoadSuccessful(results[0], results[1]), error => this.onCurrentUserDataLoadFailed(error));
        }
        else {
            this.accountClient.getUser().subscribe(user => this.onCurrentUserDataLoadSuccessful(user, user.roles.map(x => { let r = new generated.RoleViewModel(); r.name = x; return r; })), error => this.onCurrentUserDataLoadFailed(error));
        }
    }
    onCurrentUserDataLoadSuccessful(user, roles) {
        this.alertService.stopLoadingMessage();
        this.user = user;
        this.allRoles = roles;
    }
    onCurrentUserDataLoadFailed(error) {
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage('Load Error', `Unable to retrieve user data from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`, MessageSeverity.error, error);
        this.user = new generated.UserViewModel();
    }
    getRoleByName(name) {
        return this.allRoles.find((r) => r.name == name);
    }
    showErrorAlert(caption, message) {
        this.alertService.showMessage(caption, message, MessageSeverity.error);
    }
    deletePasswordFromUser(user) {
        const userEdit = user;
        delete userEdit.currentPassword;
        delete userEdit.newPassword;
    }
    edit() {
        if (!this.isGeneralEditor) {
            this.isEditingSelf = true;
            this.userEdit = new generated.UserEditViewModel();
            Object.assign(this.userEdit, this.user);
        }
        else {
            if (!this.userEdit) {
                this.userEdit = new generated.UserEditViewModel();
            }
            this.isEditingSelf = this.accountClient.currentUser ? this.userEdit.id == this.accountClient.currentUser.id : false;
        }
        this.isEditMode = true;
        this.showValidationErrors = true;
        this.isChangePassword = false;
    }
    save() {
        this.isSaving = true;
        this.alertService.startLoadingMessage('Saving changes...');
        if (this.isNewUser) {
            this.accountClient.newUser(this.userEdit).subscribe(user => this.saveSuccessHelper(user), error => this.saveFailedHelper(error));
        }
        else {
            this.accountClient.updateUser(this.userEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
        }
    }
    saveSuccessHelper(user) {
        this.testIsRoleUserCountChanged(this.user, this.userEdit);
        if (user) {
            Object.assign(this.userEdit, user);
        }
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.isChangePassword = false;
        this.showValidationErrors = false;
        this.deletePasswordFromUser(this.userEdit);
        Object.assign(this.user, this.userEdit);
        this.userEdit = new generated.UserEditViewModel();
        this.resetForm();
        if (this.isGeneralEditor) {
            if (this.isNewUser) {
                this.alertService.showMessage('Success', `User \"${this.user.userName}\" was created successfully`, MessageSeverity.success);
            }
            else if (!this.isEditingSelf) {
                this.alertService.showMessage('Success', `Changes to user \"${this.user.userName}\" was saved successfully`, MessageSeverity.success);
            }
        }
        if (this.isEditingSelf) {
            this.alertService.showMessage('Success', 'Changes to your User Profile was saved successfully', MessageSeverity.success);
            this.refreshLoggedInUser();
        }
        this.isEditMode = false;
        if (this.changesSavedCallback) {
            this.changesSavedCallback();
        }
    }
    saveFailedHelper(error) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage('Save Error', 'The below errors occured whilst saving your changes:', MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
        if (this.changesFailedCallback) {
            this.changesFailedCallback();
        }
    }
    testIsRoleUserCountChanged(currentUser, editedUser) {
        const rolesAdded = this.isNewUser ? editedUser.roles : editedUser.roles.filter(role => currentUser.roles.indexOf(role) == -1);
        const rolesRemoved = this.isNewUser ? [] : currentUser.roles.filter(role => editedUser.roles.indexOf(role) == -1);
        const modifiedRoles = rolesAdded.concat(rolesRemoved);
        if (modifiedRoles.length) {
            setTimeout(() => this.accountClient.onRolesUserCountChanged(modifiedRoles));
        }
    }
    cancel() {
        if (this.isGeneralEditor) {
            this.userEdit = this.user = new generated.UserEditViewModel();
        }
        else {
            this.userEdit = new generated.UserEditViewModel();
        }
        this.showValidationErrors = false;
        this.resetForm();
        this.alertService.showMessage('Cancelled', 'Operation cancelled by user', MessageSeverity.default);
        this.alertService.resetStickyMessage();
        if (!this.isGeneralEditor) {
            this.isEditMode = false;
        }
        if (this.changesCancelledCallback) {
            this.changesCancelledCallback();
        }
    }
    close() {
        this.userEdit = this.user = new generated.UserEditViewModel();
        this.showValidationErrors = false;
        this.resetForm();
        this.isEditMode = false;
        if (this.changesSavedCallback) {
            this.changesSavedCallback();
        }
    }
    refreshLoggedInUser() {
        this.accountClient.refreshLoggedInUser()
            .subscribe(user => {
            this.loadCurrentUserData();
        }, error => {
            this.alertService.resetStickyMessage();
            this.alertService.showStickyMessage('Refresh failed', 'An error occured whilst refreshing logged in user information from the server', MessageSeverity.error, error);
        });
    }
    changePassword() {
        this.isChangePassword = true;
    }
    unlockUser() {
        this.isSaving = true;
        this.alertService.startLoadingMessage('Unblocking user...');
        this.accountClient.unblockUser(this.userEdit.id)
            .subscribe(() => {
            this.isSaving = false;
            //this.userEdit.isLockedOut = false;
            this.alertService.stopLoadingMessage();
            this.alertService.showMessage('Success', 'User has been successfully unblocked', MessageSeverity.success);
        }, error => {
            this.isSaving = false;
            this.alertService.stopLoadingMessage();
            this.alertService.showStickyMessage('Unblock Error', 'The below errors occured whilst unblocking the user:', MessageSeverity.error, error);
            this.alertService.showStickyMessage(error, null, MessageSeverity.error);
        });
    }
    resetForm(replace = false) {
        this.isChangePassword = false;
        if (!replace) {
            this.form.reset();
        }
        else {
            this.formResetToggle = false;
            setTimeout(() => {
                this.formResetToggle = true;
            });
        }
    }
    newUser(allRoles) {
        this.isGeneralEditor = true;
        this.isNewUser = true;
        this.allRoles = [...allRoles];
        this.user = this.userEdit = new generated.UserEditViewModel();
        this.userEdit.isEnabled = true;
        this.edit();
        return this.userEdit;
    }
    editUser(user, allRoles) {
        if (user) {
            this.isGeneralEditor = true;
            this.isNewUser = false;
            this.setRoles(user, allRoles);
            this.user = new generated.UserViewModel();
            this.userEdit = new generated.UserEditViewModel();
            Object.assign(this.user, user);
            Object.assign(this.userEdit, user);
            this.edit();
            return this.userEdit;
        }
        else {
            return this.newUser(allRoles);
        }
    }
    displayUser(user, allRoles) {
        this.user = new generated.UserViewModel();
        Object.assign(this.user, user);
        this.deletePasswordFromUser(this.user);
        this.setRoles(user, allRoles);
        this.isEditMode = false;
    }
    setRoles(user, allRoles) {
        this.allRoles = allRoles ? [...allRoles] : [];
        if (user.roles) {
            for (let ur of user.roles) {
                if (!this.allRoles.some(r => r.name == ur)) {
                    let rl = new generated.RoleViewModel();
                    rl.name = ur;
                    this.allRoles.unshift(rl);
                }
            }
        }
        if (allRoles == null || this.allRoles.length != allRoles.length) {
            setTimeout(() => {
                if (this.rolesSelector) {
                    this.rolesSelector.refresh();
                }
            });
        }
    }
    get canViewAllRoles() {
        return this.accountClient.userHasPermission(generated.PermissionValues.ViewRoles);
    }
    get canAssignRoles() {
        return this.accountClient.userHasPermission(generated.PermissionValues.AssignRoles);
    }
};
__decorate([
    Input()
], UserEditorComponent.prototype, "isViewOnly", void 0);
__decorate([
    Input()
], UserEditorComponent.prototype, "isGeneralEditor", void 0);
__decorate([
    ViewChild('f')
], UserEditorComponent.prototype, "form", void 0);
__decorate([
    ViewChild('userName')
], UserEditorComponent.prototype, "userName", void 0);
__decorate([
    ViewChild('userPassword')
], UserEditorComponent.prototype, "userPassword", void 0);
__decorate([
    ViewChild('email')
], UserEditorComponent.prototype, "email", void 0);
__decorate([
    ViewChild('currentPassword')
], UserEditorComponent.prototype, "currentPassword", void 0);
__decorate([
    ViewChild('newPassword')
], UserEditorComponent.prototype, "newPassword", void 0);
__decorate([
    ViewChild('confirmPassword')
], UserEditorComponent.prototype, "confirmPassword", void 0);
__decorate([
    ViewChild('roles')
], UserEditorComponent.prototype, "roles", void 0);
__decorate([
    ViewChild('rolesSelector')
], UserEditorComponent.prototype, "rolesSelector", void 0);
UserEditorComponent = __decorate([
    Component({
        selector: 'user-editor',
        templateUrl: './user-editor.component.html',
        styleUrls: ['./user-editor.component.scss']
    })
], UserEditorComponent);
export { UserEditorComponent };
//# sourceMappingURL=user-editor.component.js.map