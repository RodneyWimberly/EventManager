import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { ClientSecret } from '@shared/viewModel/client.model';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { ToasterConfig } from 'angular2-toaster';
import { flatMap, map, tap } from 'rxjs/operators';
let ClientSecretsComponent = class ClientSecretsComponent {
    constructor(route, router, translator, clientService, toasterService) {
        this.route = route;
        this.router = router;
        this.translator = translator;
        this.clientService = clientService;
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
            .pipe(tap(p => this.client = p["clientId"]))
            .pipe(map(p => p["clientId"]))
            .pipe(flatMap(m => this.clientService.getClientSecrets(m.toString())))
            .subscribe(result => this.clientSecrets = result);
        this.errors = [];
        this.model = new ClientSecret();
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
        this.clientService.removeSecret(this.client, secret.type, secret.value).subscribe(() => {
            this.showSuccessMessage();
            this.loadSecrets();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    loadSecrets() {
        this.clientService.getClientSecrets(this.client).subscribe(c => this.clientSecrets = c);
    }
    save() {
        this.showButtonLoading = true;
        this.errors = [];
        this.model.clientId = this.client;
        this.clientService.saveSecret(this.model).subscribe(registerResult => {
            this.showSuccessMessage();
            this.clientSecrets = registerResult;
            this.model = new ClientSecret();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
};
ClientSecretsComponent = __decorate([
    Component({
        selector: "app-client-secrets",
        templateUrl: "./secrets.component.html",
        styleUrls: ["./secrets.component.scss"],
        encapsulation: ViewEncapsulation.None
    })
], ClientSecretsComponent);
export { ClientSecretsComponent };
//# sourceMappingURL=secrets.component.js.map