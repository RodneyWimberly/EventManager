import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { ClientService } from '@app/clients/clients.service';
import { ScopeService } from '@shared/services/scope.service';
import { ClientClaim } from '@shared/viewModel/client.model';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { StandardClaims } from '@shared/viewModel/standard-claims.model';
import { ToasterConfig } from 'angular2-toaster';
import { flatMap, map, tap } from 'rxjs/operators';
let ClientClaimsComponent = class ClientClaimsComponent {
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
        this.route.params.pipe(tap(p => this.client = p["clientId"])).pipe(map(p => p["clientId"])).pipe(flatMap(m => this.clientService.getClientClaims(m.toString()))).subscribe(result => this.claims = result);
        this.errors = [];
        this.model = new ClientClaim();
        this.showButtonLoading = false;
        this.standardClaims = StandardClaims.claims;
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
    selectType(type) {
        this.model.type = type;
    }
    remove(claim) {
        this.showButtonLoading = true;
        this.errors = [];
        this.clientService.removeClaim(this.client, claim.type, claim.value).subscribe(() => {
            this.showSuccessMessage();
            this.loadClaims();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    loadClaims() {
        this.clientService.getClientClaims(this.client).subscribe(c => this.claims = c);
    }
    save() {
        this.showButtonLoading = true;
        this.errors = [];
        this.model.clientId = this.client;
        this.clientService.saveClaim(this.model).subscribe(claims => {
            this.showSuccessMessage();
            this.claims = claims;
            this.model = new ClientClaim();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
};
ClientClaimsComponent = __decorate([
    Component({
        selector: "app-client-claim",
        templateUrl: "./claims.component.html",
        styleUrls: ["./claims.component.scss"],
        providers: [ClientService, ScopeService],
        encapsulation: ViewEncapsulation.None
    })
], ClientClaimsComponent);
export { ClientClaimsComponent };
//# sourceMappingURL=claims.component.js.map