import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { IdentityResource } from '@shared/viewModel/identity-resource.model';
import { StandardClaims } from '@shared/viewModel/standard-claims.model';
import { ToasterConfig } from 'angular2-toaster';
import { IdentityResourceService } from '../identity-resource.service';
let IdentityResourceAddComponent = class IdentityResourceAddComponent {
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
        this.model = new IdentityResource();
        this.errors = [];
        this.showButtonLoading = false;
        this.standardClaims = StandardClaims.claims;
    }
    save() {
        this.showButtonLoading = true;
        this.errors = [];
        this.identityResourceService.save(this.model).subscribe(registerResult => {
            this.showSuccessMessage();
            this.router.navigate(["/identity-resource"]);
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
IdentityResourceAddComponent = __decorate([
    Component({
        selector: "app-identity-resource-add",
        templateUrl: "./identity-resource-add.component.html",
        styleUrls: ["./identity-resource-add.component.scss"],
        providers: [IdentityResourceService]
    })
], IdentityResourceAddComponent);
export { IdentityResourceAddComponent };
//# sourceMappingURL=identity-resource-add.component.js.map