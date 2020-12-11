import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthGuardService = class AuthGuardService {
    constructor(authEndpointService, router) {
        this.authEndpointService = authEndpointService;
        this.router = router;
    }
    canActivate(route, state) {
        const url = state.url;
        return this.checkLogin(url);
    }
    canActivateChild(route, state) {
        return this.canActivate(route, state);
    }
    canLoad(route) {
        const url = `/${route.path}`;
        return this.checkLogin(url);
    }
    checkLogin(url) {
        if (this.authEndpointService.isLoggedIn) {
            return true;
        }
        this.authEndpointService.loginRedirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
};
AuthGuardService = __decorate([
    Injectable()
], AuthGuardService);
export { AuthGuardService };
//# sourceMappingURL=auth-guard.service.js.map