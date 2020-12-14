import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { ClientProperty } from '@shared/viewModel/client.model';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { ToasterConfig } from 'angular2-toaster';
import { flatMap, map, tap } from 'rxjs/operators';
let ClientPropertiesComponent = class ClientPropertiesComponent {
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
            .pipe(flatMap(m => this.clientService.getClientProperties(m.toString())))
            .subscribe(result => this.clientProperties = result);
        this.errors = [];
        this.model = new ClientProperty();
        this.showButtonLoading = false;
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
    remove(key) {
        this.showButtonLoading = true;
        this.clientService.removeProperty(this.client, key).subscribe(() => {
            this.showSuccessMessage();
            this.loadProperties();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    loadProperties() {
        this.clientService.getClientProperties(this.client).subscribe(c => this.clientProperties = c);
    }
    save() {
        this.showButtonLoading = true;
        this.model.clientId = this.client;
        this.clientService.saveProperty(this.model).subscribe(properties => {
            this.showSuccessMessage();
            this.clientProperties = properties;
            this.model = new ClientProperty();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
};
ClientPropertiesComponent = __decorate([
    Component({
        selector: "app-client-properties",
        templateUrl: "./properties.component.html",
        styleUrls: ["./properties.component.scss"],
        encapsulation: ViewEncapsulation.None
    })
], ClientPropertiesComponent);
export { ClientPropertiesComponent };
//# sourceMappingURL=properties.component.js.map