import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(settingsService, authService, router) {
        this.settingsService = settingsService;
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() {
        this.stream = this.authService.canActivateProtectedRoutes$.subscribe(yes => {
            if (yes)
                this.router.navigate(['/home']);
        });
    }
    ngOnDestroy() {
        this.stream.unsubscribe();
    }
    login() {
        this.authService.login('/login-callback');
    }
};
LoginComponent = __decorate([
    Component({
        selector: "app-login",
        templateUrl: "./login.component.html",
        styleUrls: ["./login.component.scss"],
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map