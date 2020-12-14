import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { StandardClaims } from '@shared/viewModel/standard-claims.model';
import { ToasterConfig } from 'angular2-toaster';
import * as jsonpatch from 'fast-json-patch';
import { flatMap, tap } from 'rxjs/operators';
import { ApiResourceService } from '../api-resource.service';
let ApiResourceEditComponent = class ApiResourceEditComponent {
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
        this.route.params.pipe(tap(p => this.resourceId = p["name"]), flatMap(p => this.apiResourceService.getApiResourceDetails(p["name"])), tap(resource => this.patchObserver = jsonpatch.observe(resource)))
            .subscribe(result => this.model = result);
        this.errors = [];
        this.showButtonLoading = false;
        this.standardClaims = StandardClaims.claims;
    }
    update() {
        this.showButtonLoading = true;
        this.errors = [];
        this.apiResourceService.partialUpdate(this.resourceId, jsonpatch.generate(this.patchObserver)).subscribe(() => {
            this.showSuccessMessage();
            this.showButtonLoading = false;
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
ApiResourceEditComponent = __decorate([
    Component({
        selector: "app-api-resource-edit",
        templateUrl: "./api-resource-edit.component.html",
        styleUrls: ["./api-resource-edit.component.scss"],
        providers: [ApiResourceService]
    })
], ApiResourceEditComponent);
export { ApiResourceEditComponent };
//# sourceMappingURL=api-resource-edit.component.js.map