import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { ResetPassword } from '@shared/viewModel/reset-password.model';
import { ToasterConfig } from 'angular2-toaster';
import * as jsonpatch from 'fast-json-patch';
import { throwError } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
let UserEditComponent = class UserEditComponent {
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
        this.showButtonLoading = true;
        this.shouldChangePass = false;
        this.shouldChangeUserData = true;
    }
    ngOnInit() {
        this.route.params
            .pipe(tap(p => this.username = p["username"]), flatMap(p => this.userService.getDetails(p["username"])), tap(user => this.patchObserver = jsonpatch.observe(user))).subscribe(result => {
            this.model = result;
            this.showButtonLoading = false;
            if (this.model.lockoutEnd != null)
                this.model.lockoutEnd = new Date(this.model.lockoutEnd);
        }, err => {
            this.router.navigate(['/users']);
        });
        this.errors = [];
        this.resetPassword = new ResetPassword();
    }
    update() {
        this.showButtonLoading = true;
        this.errors = [];
        try {
            this.userService.patch(this.username, jsonpatch.generate(this.patchObserver)).subscribe(() => {
                this.showSuccessMessage();
                this.router.navigate(["/users"]);
            }, err => {
                this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
                this.showButtonLoading = false;
            });
        }
        catch (error) {
            this.errors = [];
            this.errors.push("Unknown error while trying to update");
            this.showButtonLoading = false;
            return throwError("Unknown error while trying to update");
        }
    }
    resetPass() {
        this.showButtonLoading = true;
        this.errors = [];
        this.userService.resetPassword(this.username, this.resetPassword).subscribe(() => {
            this.showSuccessMessage();
            this.router.navigate(["/users"]);
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    showChangePass() {
        this.shouldChangePass = true;
        this.shouldChangeUserData = false;
    }
    showChangeData() {
        this.shouldChangePass = false;
        this.shouldChangeUserData = true;
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
};
UserEditComponent = __decorate([
    Component({
        selector: "app-user-edit",
        templateUrl: "./user-edit.component.html",
        styleUrls: ["./user-edit.component.scss"],
        providers: [UserService],
        encapsulation: ViewEncapsulation.None
    })
], UserEditComponent);
export { UserEditComponent };
//# sourceMappingURL=user-edit.component.js.map