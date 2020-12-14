import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { Claim } from '@shared/viewModel/claim.model';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { StandardClaims } from '@shared/viewModel/standard-claims.model';
import { ToasterConfig } from 'angular2-toaster';
import { flatMap, map, tap } from 'rxjs/operators';
let UserClaimsComponent = class UserClaimsComponent {
    constructor(route, router, translator, userService, toasterService) {
        this.route = route;
        this.router = router;
        this.translator = translator;
        this.userService = userService;
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
        this.route.params.pipe(tap(p => this.userName = p["username"])).pipe(map(p => p["username"])).pipe(flatMap(m => this.userService.getUserClaims(m.toString()))).subscribe(result => this.claims = result);
        this.errors = [];
        this.model = new Claim();
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
    remove(type) {
        this.showButtonLoading = true;
        this.errors = [];
        this.userService.removeClaim(this.userName, type).subscribe(() => {
            this.showSuccessMessage();
            this.loadClaims();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    loadClaims() {
        this.userService.getUserClaims(this.userName).subscribe(c => this.claims = c);
    }
    save() {
        this.showButtonLoading = true;
        this.errors = [];
        this.userService.saveClaim(this.userName, this.model).subscribe(registerResult => {
            if (registerResult) {
                this.showSuccessMessage();
                this.loadClaims();
                this.model = new Claim();
            }
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
};
UserClaimsComponent = __decorate([
    Component({
        selector: "app-user-claim",
        templateUrl: "./user-claims.component.html",
        styleUrls: ["./user-claims.component.scss"],
        providers: [UserService],
    })
], UserClaimsComponent);
export { UserClaimsComponent };
//# sourceMappingURL=user-claims.component.js.map