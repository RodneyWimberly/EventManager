import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import Swal from 'sweetalert2';
import { ApiResourceService } from '../api-resource.service';
let ApiResourceListComponent = class ApiResourceListComponent {
    constructor(translator, apiResourceservice) {
        this.translator = translator;
        this.apiResourceservice = apiResourceservice;
    }
    ngOnInit() {
        this.loadResources();
    }
    loadResources() {
        this.apiResourceservice.getApiResources().subscribe(a => this.apiResources = a);
    }
    remove(name) {
        this.translator.translate.get('apiResource.remove').subscribe(m => {
            Swal.fire({
                title: m['title'],
                text: m["text"],
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: m["confirmButtonText"],
                cancelButtonText: m["cancelButtonText"]
            }).then(isConfirm => {
                if (isConfirm.value) {
                    this.apiResourceservice.remove(name).subscribe(() => {
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
ApiResourceListComponent = __decorate([
    Component({
        selector: "app-api-resources-list",
        templateUrl: "./api-resources-list.component.html",
        styleUrls: ["./api-resources-list.component.scss"],
        providers: [ApiResourceService]
    })
], ApiResourceListComponent);
export { ApiResourceListComponent };
//# sourceMappingURL=api-resources-list.component.js.map