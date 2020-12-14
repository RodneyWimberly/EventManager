import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
let AuthGuardOnlyAdmin = class AuthGuardOnlyAdmin {
    constructor(authService, settings, router) {
        this.authService = authService;
        this.settings = settings;
        this.router = router;
        this.authService.isAuthenticated$.subscribe(i => this.isAuthenticated = i);
    }
    canActivate(route, state) {
        return this.authService.isDoneLoading$
            .pipe(filter(isDone => isDone))
            .pipe(tap(_ => this.isAuthenticated || this.authService.login(state.url)))
            .pipe(map(_ => {
            if (this.isAuthenticated && this.settings.getUserClaims()["role"] === "Administrator") {
                return true;
            }
            this.router.navigate(['/not-found']);
            return false;
        }));
    }
};
AuthGuardOnlyAdmin = __decorate([
    Injectable()
], AuthGuardOnlyAdmin);
export { AuthGuardOnlyAdmin };
//# sourceMappingURL=auth-guard-only-admin.service.js.map