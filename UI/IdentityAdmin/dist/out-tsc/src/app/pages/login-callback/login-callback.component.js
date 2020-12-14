import { __decorate } from "tslib";
import { Component } from "@angular/core";
let LoginCallbackComponent = class LoginCallbackComponent {
    constructor(authService, router, settingsService) {
        this.authService = authService;
        this.router = router;
        this.settingsService = settingsService;
    }
    ngOnInit() {
        this.stream = this.authService.canActivateProtectedRoutes$.subscribe(yes => {
            if (yes)
                return this.router.navigate(['/home']);
            else
                return this.router.navigate(['/login']);
        });
    }
    ngOnDestroy() {
        this.stream.unsubscribe();
    }
};
LoginCallbackComponent = __decorate([
    Component({
        selector: "app-login-callback",
        templateUrl: "login-callback.component.html",
        styleUrls: ["./login-callback.component.scss"],
    })
], LoginCallbackComponent);
export { LoginCallbackComponent };
//# sourceMappingURL=login-callback.component.js.map