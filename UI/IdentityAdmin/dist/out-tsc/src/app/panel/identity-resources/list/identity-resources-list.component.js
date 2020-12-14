import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import Swal from 'sweetalert2';
import { IdentityResourceService } from '../identity-resource.service';
let IdentityResourceListComponent = class IdentityResourceListComponent {
    constructor(translator, identityResourceService) {
        this.translator = translator;
        this.identityResourceService = identityResourceService;
    }
    ngOnInit() {
        this.loadResources();
    }
    loadResources() {
        this.identityResourceService.getIdentityResources().subscribe(a => this.identityResources = a);
    }
    remove(name) {
        this.translator.translate.get('identityResource.remove').subscribe(m => {
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
                    this.identityResourceService.remove(name).subscribe(() => {
                        this.loadResources();
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
};
IdentityResourceListComponent = __decorate([
    Component({
        selector: "app-identity-resources-list",
        templateUrl: "./identity-resources-list.component.html",
        styleUrls: ["./identity-resources-list.component.scss"],
        providers: [IdentityResourceService]
    })
], IdentityResourceListComponent);
export { IdentityResourceListComponent };
//# sourceMappingURL=identity-resources-list.component.js.map