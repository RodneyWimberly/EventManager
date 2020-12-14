import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { StandardClaims } from '@shared/viewModel/standard-claims.model';
import { ToasterConfig } from 'angular2-toaster';
import * as jsonpatch from 'fast-json-patch';
import { flatMap, tap } from 'rxjs/operators';
import { IdentityResourceService } from '../identity-resource.service';
let IdentityResourceEditComponent = class IdentityResourceEditComponent {
    constructor(route, router, translator, identityResourceService, toasterService) {
        this.route = route;
        this.router = router;
        this.translator = translator;
        this.identityResourceService = identityResourceService;
        this.toasterService = toasterService;
        this.toasterconfig = new ToasterConfig({
            positionClass: 'toast-top-right',
            showCloseButton: true
        });
    }
    ngOnInit() {
        this.route.params
            .pipe(tap(p => this.name = p["name"]))
            .pipe(flatMap(p => this.identityResourceService.getIdentityResourceDetails(p["name"])), tap(resource => this.patchObserver = jsonpatch.observe(resource)))
            .subscribe(result => this.model = result);
        this.errors = [];
        this.showButtonLoading = false;
        this.standardClaims = StandardClaims.claims;
    }
    update() {
        this.showButtonLoading = true;
        this.errors = [];
        this.identityResourceService.partialUpdate(this.name, jsonpatch.generate(this.patchObserver)).subscribe(() => {
            this.updateCurrentResourceId();
            this.showSuccessMessage();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    updateCurrentResourceId() {
        this.name = this.model.name;
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
IdentityResourceEditComponent = __decorate([
    Component({
        selector: "app-identity-resource-edit",
        templateUrl: "./identity-resource-edit.component.html",
        styleUrls: ["./identity-resource-edit.component.scss"],
        providers: [IdentityResourceService]
    })
], IdentityResourceEditComponent);
export { IdentityResourceEditComponent };
//# sourceMappingURL=identity-resource-edit.component.js.map