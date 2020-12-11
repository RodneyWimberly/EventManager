import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { fadeInOut } from '../../helpers/animations';
import * as generated from '../../services/endpoint.services';
let SettingsComponent = class SettingsComponent {
    constructor(router, route, accountClient) {
        this.router = router;
        this.route = route;
        this.accountClient = accountClient;
        this.isProfileActivated = true;
        this.isPreferencesActivated = false;
        this.isUsersActivated = false;
        this.isRolesActivated = false;
        this.profileTab = 'profile';
        this.preferencesTab = 'preferences';
        this.usersTab = 'users';
        this.rolesTab = 'roles';
    }
    ngOnInit() {
        this.fragmentSubscription = this.route.fragment.subscribe(anchor => this.showContent(anchor));
    }
    ngOnDestroy() {
        this.fragmentSubscription.unsubscribe();
    }
    showContent(anchor) {
        if (anchor) {
            anchor = anchor.toLowerCase();
        }
        if ((this.isFragmentEquals(anchor, this.usersTab) && !this.canViewUsers) ||
            (this.isFragmentEquals(anchor, this.rolesTab) && !this.canViewRoles)) {
            return;
        }
        this.tab.show(`#${anchor || this.profileTab}Tab`);
    }
    isFragmentEquals(fragment1, fragment2) {
        if (fragment1 == null) {
            fragment1 = '';
        }
        if (fragment2 == null) {
            fragment2 = '';
        }
        return fragment1.toLowerCase() == fragment2.toLowerCase();
    }
    onShowTab(event) {
        const activeTab = event.target.hash.split('#', 2).pop();
        this.isProfileActivated = activeTab == this.profileTab;
        this.isPreferencesActivated = activeTab == this.preferencesTab;
        this.isUsersActivated = activeTab == this.usersTab;
        this.isRolesActivated = activeTab == this.rolesTab;
        this.router.navigate([], { fragment: activeTab });
    }
    get canViewUsers() {
        return this.accountClient.userHasPermission(generated.PermissionValues.ViewUsers);
    }
    get canViewRoles() {
        return this.accountClient.userHasPermission(generated.PermissionValues.ViewRoles);
    }
};
__decorate([
    ViewChild('tab', { static: true })
], SettingsComponent.prototype, "tab", void 0);
SettingsComponent = __decorate([
    Component({
        selector: 'settings',
        templateUrl: './settings.component.html',
        styleUrls: ['./settings.component.scss'],
        animations: [fadeInOut]
    })
], SettingsComponent);
export { SettingsComponent };
//# sourceMappingURL=settings.component.js.map