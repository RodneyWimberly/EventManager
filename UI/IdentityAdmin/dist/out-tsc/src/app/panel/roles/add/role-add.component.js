import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RoleService } from '@shared/services/role.service';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { Role } from '@shared/viewModel/role.model';
import { ToasterConfig } from 'angular2-toaster';
let RoleAddComponent = class RoleAddComponent {
    constructor(router, translator, roleService, toasterService) {
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
        this.errors = [];
        this.model = new Role();
        this.showButtonLoading = false;
    }
    save() {
        this.showButtonLoading = true;
        this.errors = [];
        this.roleService.save(this.model).subscribe(registerResult => {
            if (registerResult) {
                this.showSuccessMessage();
                this.router.navigate(["/roles"]);
            }
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
RoleAddComponent = __decorate([
    Component({
        selector: "app-role-add",
        templateUrl: "./role-add.component.html",
        styleUrls: ["./role-add.component.scss"],
        providers: [RoleService]
    })
], RoleAddComponent);
export { RoleAddComponent };
//# sourceMappingURL=role-add.component.js.map