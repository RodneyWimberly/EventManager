import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
let AuthGuardAuthenticadeOnly = class AuthGuardAuthenticadeOnly {
    constructor(authService) {
        this.authService = authService;
        this.authService.isAuthenticated$.subscribe(i => this.isAuthenticated = i);
    }
    canActivate(route, state) {
        return this.authService.isDoneLoading$
            .pipe(filter(isDone => isDone))
            .pipe(tap(_ => this.isAuthenticated || this.authService.login(state.url)))
            .pipe(map(_ => this.isAuthenticated));
    }
};
AuthGuardAuthenticadeOnly = __decorate([
    Injectable()
], AuthGuardAuthenticadeOnly);
export { AuthGuardAuthenticadeOnly };
//# sourceMappingURL=auth-guard-authenticated-only.service.js.map