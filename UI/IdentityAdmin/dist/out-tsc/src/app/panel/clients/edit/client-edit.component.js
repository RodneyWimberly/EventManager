import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Client } from '@shared/viewModel/client.model';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { ToasterConfig } from 'angular2-toaster';
import * as jsonpatch from 'fast-json-patch';
import { flatMap, tap } from 'rxjs/operators';
let ClientEditComponent = class ClientEditComponent {
    constructor(route, router, translator, clientService, toasterService) {
        this.route = route;
        this.router = router;
        this.translator = translator;
        this.clientService = clientService;
        this.toasterService = toasterService;
        this.toasterconfig = new ToasterConfig({
            positionClass: 'toast-top-right',
            showCloseButton: true,
            timeout: 2000
        });
    }
    ngOnInit() {
        this.route.params.pipe(tap(p => this.clientId = p["clientId"]), flatMap(p => this.clientService.getClientDetails(p["clientId"])), tap(client => this.patchObserver = jsonpatch.observe(client)))
            .subscribe(result => this.model = result);
        this.errors = [];
        this.showButtonLoading = false;
    }
    update() {
        if (!Client.isValid(this.model, this.errors))
            return;
        this.showButtonLoading = true;
        this.errors = [];
        this.clientService.update(this.clientId, this.model).subscribe(() => {
            this.updateCurrentClientId();
            this.showSuccessMessage();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    updateCurrentClientId() {
        this.clientId = this.model.clientId;
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
};
ClientEditComponent = __decorate([
    Component({
        selector: "app-client-edit",
        templateUrl: "./client-edit.component.html",
        styleUrls: ["./client-edit.component.scss"],
    })
], ClientEditComponent);
export { ClientEditComponent };
//# sourceMappingURL=client-edit.component.js.map