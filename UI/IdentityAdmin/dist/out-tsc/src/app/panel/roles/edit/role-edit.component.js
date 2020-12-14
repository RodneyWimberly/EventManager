import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RoleService } from '@shared/services/role.service';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { ToasterConfig } from 'angular2-toaster';
import { flatMap, tap } from 'rxjs/operators';
let RoleEditComponent = class RoleEditComponent {
    constructor(route, router, translator, roleService, toasterService) {
        this.route = route;
        this.router = router;
        this.translator = translator;
        this.roleService = roleService;
        this.toasterService = toasterService;
        this.toasterconfig = new ToasterConfig({
            positionClass: 'toast-top-right',
            showCloseButton: true
        });
    }
    ngOnInit() {
        this.route.params.pipe(tap(p => this.role = p["role"])).pipe(flatMap(p => this.roleService.getRoleDetails(p["role"]))).subscribe(result => this.model = result);
        this.errors = [];
        this.showButtonLoading = false;
    }
    update() {
        this.showButtonLoading = true;
        this.errors = [];
        this.roleService.update(this.role, this.model).subscribe(registerResult => {
            this.showSuccessMessage();
            this.router.navigate(["/roles"]);
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
};
RoleEditComponent = __decorate([
    Component({
        selector: "app-role-edit",
        templateUrl: "./role-edit.component.html",
        styleUrls: ["./role-edit.component.scss"],
        providers: [RoleService]
    })
], RoleEditComponent);
export { RoleEditComponent };
//# sourceMappingURL=role-edit.component.js.map