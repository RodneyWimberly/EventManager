import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { ApiResourceSecret } from '@shared/viewModel/api-resource.model';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { ToasterConfig } from 'angular2-toaster';
import { flatMap, map, tap } from 'rxjs/operators';
import { ApiResourceService } from '../api-resource.service';
let ApiResourceSecretsComponent = class ApiResourceSecretsComponent {
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
        this.route.params.pipe(tap(p => this.resourceName = p["resource"])).pipe(map(p => p["resource"])).pipe(flatMap(m => this.apiResourceService.getSecrets(m.toString()))).subscribe(result => this.apiSecrets = result);
        this.errors = [];
        this.model = new ApiResourceSecret();
        this.showButtonLoading = false;
        this.hashTypes = [{ id: 0, text: "Sha256" }, { id: 1, text: "Sha512" }];
        this.secretTypes = [{ id: 'SharedSecret', text: "Shared Secret" }, { id: 'X509Thumbprint', text: "X509 Thumbprint" }, { id: 'X509Name', text: "X509 Name" }, { id: 'X509CertificateBase64', text: "X509 Certificate Base64" }];
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
    remove(secret) {
        this.showButtonLoading = true;
        this.errors = [];
        this.apiResourceService.removeSecret(this.resourceName, secret.type, secret.value).subscribe(() => {
            this.showSuccessMessage();
            this.loadSecrets();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    loadSecrets() {
        this.apiResourceService.getSecrets(this.resourceName).subscribe(c => this.apiSecrets = c);
    }
    save() {
        this.showButtonLoading = true;
        this.errors = [];
        this.model.resourceName = this.resourceName;
        this.apiResourceService.saveSecret(this.model).subscribe(secrets => {
            this.showSuccessMessage();
            this.apiSecrets = secrets;
            this.model = new ApiResourceSecret();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
};
ApiResourceSecretsComponent = __decorate([
    Component({
        selector: "app-api-resource-secrets",
        templateUrl: "./api-secrets.component.html",
        styleUrls: ["./api-secrets.component.scss"],
        providers: [ApiResourceService],
        encapsulation: ViewEncapsulation.None
    })
], ApiResourceSecretsComponent);
export { ApiResourceSecretsComponent };
//# sourceMappingURL=api-secrets.component.js.map