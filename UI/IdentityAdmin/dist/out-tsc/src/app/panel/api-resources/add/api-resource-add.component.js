import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ApiResource } from '@shared/viewModel/api-resource.model';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { StandardClaims } from '@shared/viewModel/standard-claims.model';
import { ToasterConfig } from 'angular2-toaster';
import { ApiResourceService } from '../api-resource.service';
let ApiResourceAddComponent = class ApiResourceAddComponent {
    constructor(route, router, translator, apiResourceService, toasterService) {
        this.route = route;
        this.router = router;
        this.translator = translator;
        this.apiResourceService = apiResourceService;
        this.toasterService = toasterService;
        this.toasterconfig = new ToasterConfig({
            positionClass: 'toast-top-right',
            showCloseButton: true
        });
    }
    ngOnInit() {
        this.model = new ApiResource();
        this.errors = [];
        this.showButtonLoading = false;
        this.standardClaims = StandardClaims.claims;
    }
    save() {
        this.errors = [];
        this.showButtonLoading = true;
        this.apiResourceService.save(this.model).subscribe(registerResult => {
            this.showSuccessMessage();
            this.router.navigate(["/api-resource"]);
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    addClaim(claim) {
        if (this.model.userClaims.find(f => f == claim) == null)
            this.model.userClaims.push(claim);
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
};
ApiResourceAddComponent = __decorate([
    Component({
        selector: "app-api-resource-add",
        templateUrl: "./api-resource-add.component.html",
        styleUrls: ["./api-resource-add.component.scss"],
        providers: [ApiResourceService]
    })
], ApiResourceAddComponent);
export { ApiResourceAddComponent };
//# sourceMappingURL=api-resource-add.component.js.map