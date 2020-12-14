import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { Scope } from '@shared/viewModel/scope.model';
import { StandardClaims } from '@shared/viewModel/standard-claims.model';
import { ToasterConfig } from 'angular2-toaster';
import { throwError } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { ApiResourceService } from '../api-resource.service';
let ApiResourceScopesComponent = class ApiResourceScopesComponent {
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
        this.bsConfig = {
            containerClass: 'theme-angle'
        };
    }
    ngOnInit() {
        this.route.params
            .pipe(tap(p => this.resourceName = p["resource"]))
            .pipe(map(p => p["resource"]))
            .pipe(flatMap(m => this.apiResourceService.getScopes(m.toString())))
            .subscribe(result => this.apiScopes = result);
        this.errors = [];
        this.model = new Scope();
        this.showButtonLoading = false;
        this.standardClaims = StandardClaims.claims;
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
    remove(scope) {
        this.showButtonLoading = true;
        this.errors = [];
        this.apiResourceService.removeScope(this.resourceName, scope.name).subscribe(() => {
            this.showSuccessMessage();
            this.loadScopes();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    loadScopes() {
        this.apiResourceService.getScopes(this.resourceName).subscribe(c => this.apiScopes = c);
    }
    save() {
        this.showButtonLoading = true;
        this.errors = [];
        try {
            this.model.resourceName = this.resourceName;
            this.apiResourceService.saveScope(this.model).subscribe(scopes => {
                this.showSuccessMessage();
                this.apiScopes = scopes;
                this.model = new Scope();
                this.showButtonLoading = false;
            }, err => {
                this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
                this.showButtonLoading = false;
            });
        }
        catch (error) {
            this.errors = [];
            this.errors.push("Unknown error while trying to save");
            this.showButtonLoading = false;
            return throwError("Unknown error while trying to save");
        }
    }
    details(scope) {
        this.selectedScope = scope;
    }
    addClaim(claim) {
        if (this.model.userClaims.find(f => f == claim) == null)
            this.model.userClaims.push(claim);
    }
};
ApiResourceScopesComponent = __decorate([
    Component({
        selector: "app-api-resource-scopes",
        templateUrl: "./api-scopes.component.html",
        styleUrls: ["./api-scopes.component.scss"],
        providers: [ApiResourceService],
        encapsulation: ViewEncapsulation.None
    })
], ApiResourceScopesComponent);
export { ApiResourceScopesComponent };
//# sourceMappingURL=api-scopes.component.js.map