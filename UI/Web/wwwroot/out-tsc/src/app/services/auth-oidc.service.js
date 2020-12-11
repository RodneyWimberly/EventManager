import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as Auth from 'angular-oauth2-oidc';
let AuthOidcService = class AuthOidcService extends Auth.OAuthService {
    constructor(ngZone, http, storage, tokenValidationHandler, config, urlHelper, logger) {
        super(ngZone, http, storage, tokenValidationHandler, config, urlHelper, logger, null);
    }
    getParamsObjectFromHash() {
        const hash = window.location.hash ? window.location.hash.split('#') : [];
        let toBeReturned = {};
        if (hash.length && hash[1].split('&').length) {
            toBeReturned = hash[1].split('&').reduce((acc, x) => {
                const hello = x.split('=');
                if (hello.length === 2)
                    acc[hello[0]] = hello[1];
                return acc;
            }, {});
        }
        return Object.keys(toBeReturned).length ? toBeReturned : null;
    }
};
AuthOidcService = __decorate([
    Injectable()
], AuthOidcService);
export { AuthOidcService };
//# sourceMappingURL=auth-oidc.service.js.map