import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RoleService } from '@shared/services/role.service';
import { UserService } from '@shared/services/user.service';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { SaveRole } from '@shared/viewModel/role.model';
import { ToasterConfig } from 'angular2-toaster';
import { flatMap, map, tap } from 'rxjs/operators';
let UserRolesComponent = class UserRolesComponent {
    constructor(route, router, translator, userService, toasterService, roleService) {
        this.route = route;
        this.router = router;
        this.translator = translator;
        this.userService = userService;
        this.toasterService = toasterService;
        this.roleService = roleService;
        this.toasterconfig = new ToasterConfig({
            positionClass: 'toast-top-right',
            showCloseButton: true
        });
        this.bsConfig = {
            containerClass: 'theme-angle'
        };
    }
    ngOnInit() {
        this.route.params.pipe(tap(p => this.userName = p["username"])).pipe(map(p => p["username"])).pipe(flatMap(m => this.userService.getUserRoles(m.toString()))).subscribe(result => this.userRoles = result);
        this.errors = [];
        this.model = new SaveRole();
        this.showButtonLoading = false;
        this.roleService.getAvailableRoles().subscribe(roles => this.roles = roles.map(r => r.name));
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
    remove(role) {
        this.showButtonLoading = true;
        this.errors = [];
        this.userService.removeRole(this.userName, role).subscribe(() => {
            this.showSuccessMessage();
            this.loadClaims();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    loadClaims() {
        this.userService.getUserRoles(this.userName).subscribe(c => this.userRoles = c);
    }
    save() {
        this.showButtonLoading = true;
        this.errors = [];
        this.userService.saveRole(this.userName, this.model).subscribe(registerResult => {
            if (registerResult) {
                this.showSuccessMessage();
                this.loadClaims();
                this.model = new SaveRole();
            }
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
};
UserRolesComponent = __decorate([
    Component({
        selector: "app-user-roles",
        templateUrl: "./user-roles.component.html",
        styleUrls: ["./user-roles.component.scss"],
        providers: [UserService, RoleService],
    })
], UserRolesComponent);
export { UserRolesComponent };
//# sourceMappingURL=user-roles.component.js.map