import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { ToasterConfig } from 'angular2-toaster';
import { throwError } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
let UserLoginsComponent = class UserLoginsComponent {
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
        this.route.params.pipe(tap(p => this.userName = p["username"])).pipe(map(p => p["username"])).pipe(flatMap(m => this.userService.getUserLogins(m.toString()))).subscribe(result => this.logins = result);
        this.errors = [];
        this.showButtonLoading = false;
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
    remove(loginProvider, providerKey) {
        this.showButtonLoading = true;
        this.errors = [];
        try {
            this.userService.removeLogin(this.userName, loginProvider, providerKey).subscribe(registerResult => {
                if (registerResult.data) {
                    this.showSuccessMessage();
                    this.loadLogins();
                }
                this.showButtonLoading = false;
            }, err => {
                this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
                this.showButtonLoading = false;
            });
        }
        catch (error) {
            this.errors = [];
            this.errors.push("Unknown error while trying to remove");
            this.showButtonLoading = false;
            return throwError("Unknown error while trying to remove");
        }
    }
    loadLogins() {
        this.userService.getUserLogins(this.userName).subscribe(c => this.logins = c);
    }
};
UserLoginsComponent = __decorate([
    Component({
        selector: "app-user-logins",
        templateUrl: "./user-logins.component.html",
        styleUrls: ["./user-logins.component.scss"],
        providers: [UserService],
    })
], UserLoginsComponent);
export { UserLoginsComponent };
//# sourceMappingURL=user-logins.component.js.map