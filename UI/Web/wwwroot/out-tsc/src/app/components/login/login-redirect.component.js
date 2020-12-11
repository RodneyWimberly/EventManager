import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { fadeInOut } from '../../helpers/animations';
let LoginRedirectComponent = class LoginRedirectComponent {
    constructor(authService, accountService, configurations) {
        this.authService = authService;
        this.accountService = accountService;
        this.configurations = configurations;
    }
    ngOnInit() {
        this.authService.processImplicitFlowResponse().then((user) => {
            //if (user)
            //this.accountService.getUser(user.id).subscribe((dbUser: UserViewModel) => {
            // if (!dbUser)
            //this.accountService.newUser(user);
            //});
        });
    }
    ngOnDestroy() {
    }
};
LoginRedirectComponent = __decorate([
    Component({
        selector: 'login-redirect',
        templateUrl: './login-redirect.component.html',
        styleUrls: ['./login-redirect.component.scss'],
        animations: [fadeInOut]
    })
], LoginRedirectComponent);
export { LoginRedirectComponent };
//# sourceMappingURL=login-redirect.component.js.map