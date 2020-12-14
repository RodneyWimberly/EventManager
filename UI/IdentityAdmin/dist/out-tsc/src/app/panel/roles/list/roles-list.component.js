import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RoleService } from '@shared/services/role.service';
import { UserService } from '@shared/services/user.service';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import Swal from 'sweetalert2';
let RolesListComponent = class RolesListComponent {
    constructor(router, translator, roleService, toasterService) {
        this.router = router;
        this.translator = translator;
        this.roleService = roleService;
        this.toasterService = toasterService;
    }
    ngOnInit() {
        this.errors = [];
        this.loadRoles();
    }
    loadRoles() {
        this.roleService.getAvailableRoles().subscribe(a => {
            this.roles = a;
        });
    }
    remove(name) {
        this.translator.translate.get('persistedGrant.remove').subscribe(m => {
            Swal.fire({
                title: m['title'],
                text: m["text"],
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: m["confirmButtonText"],
                cancelButtonText: m["cancelButtonText"],
            }).then(isConfirm => {
                if (isConfirm) {
                    this.selectedRole = null;
                    this.roleService.remove(name).subscribe(registerResult => {
                        this.loadRoles();
                        Swal.fire("Deleted!", m["deleted"], 'success');
                    }, err => {
                        let errors = ProblemDetails.GetErrors(err).map(a => a.value);
                        Swal.fire("Error!", errors[0], 'error');
                    });
                }
                else {
                    Swal.fire("Cancelled", m["cancelled"], 'error');
                }
            });
        });
    }
    removeFromRole(user, role) {
        this.showButtonLoading = true;
        this.errors = [];
        this.roleService.removeUserFromRole(user, role).subscribe(registerResult => {
            this.details(this.selectedRole);
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
    details(role) {
        this.selectedRole = role;
        this.users$ = this.roleService.getUsersFromRole(role);
    }
};
RolesListComponent = __decorate([
    Component({
        selector: "app-roles-list",
        templateUrl: "./roles-list.component.html",
        styleUrls: ["./roles-list.component.scss"],
        providers: [RoleService, UserService]
    })
], RolesListComponent);
export { RolesListComponent };
//# sourceMappingURL=roles-list.component.js.map