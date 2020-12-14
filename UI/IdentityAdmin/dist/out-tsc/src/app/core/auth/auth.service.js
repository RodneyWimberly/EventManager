import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { OAuthErrorEvent } from 'angular-oauth2-oidc';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
let AuthService = class AuthService {
    constructor(oauthService, router) {
        this.oauthService = oauthService;
        this.router = router;
        this.isAuthenticatedSubject$ = new BehaviorSubject(false);
        this.isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();
        this.isDoneLoadingSubject$ = new ReplaySubject();
        this.isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();
        /**
         * Publishes `true` if and only if (a) all the asynchronous initial
         * login calls have completed or errorred, and (b) the user ended up
         * being authenticated.
         *
         * In essence, it combines:
         *
         * - the latest known state of whether the user is authorized
         * - whether the ajax calls for initial log in have all been done
         */
        this.canActivateProtectedRoutes$ = combineLatest([
            this.isAuthenticated$,
            this.isDoneLoading$
        ]).pipe(map(values => values.every(b => b)));
        // Useful for debugging:
        this.oauthService.events.subscribe(event => {
            if (event instanceof OAuthErrorEvent) {
                console.error(event);
            }
            else {
                console.warn(event);
            }
        });
        // This is tricky, as it might cause race conditions (where access_token is set in another
        // tab before everything is said and done there.
        // TODO: Improve this setup.
        window.addEventListener('storage', (event) => {
            // The `key` is `null` if the event was caused by `.clear()`
            if (event.key !== 'access_token' && event.key !== null) {
                return;
            }
            console.warn('Noticed changes to access_token (most likely from another tab), updating isAuthenticated');
            this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
            if (!this.oauthService.hasValidAccessToken()) {
                this.navigateToLoginPage();
            }
        });
        this.oauthService.events
            .subscribe(_ => {
            this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
        });
        this.oauthService.events
            .pipe(filter(e => ['token_received'].includes(e.type)))
            .subscribe(e => this.oauthService.loadUserProfile());
        this.oauthService.events
            .pipe(filter(e => ['session_terminated', 'session_error'].includes(e.type)))
            .subscribe(e => this.navigateToLoginPage());
        this.oauthService.setupAutomaticSilentRefresh();
    }
    navigateToLoginPage() {
        // TODO: Remember current URL
        this.router.navigateByUrl('/login');
    }
    runInitialLoginSequence() {
        if (location.hash) {
            console.log('Encountered hash fragment, plotting as table...');
            console.table(location.hash.substr(1).split('&').map(kvp => kvp.split('=')));
        }
        // 0. LOAD CONFIG:
        // First we have to check to see how the IdServer is
        // currently configured:
        return this.oauthService.loadDiscoveryDocument()
            // For demo purposes, we pretend the previous call was very slow
            .then(() => new Promise(resolve => setTimeout(() => resolve(), 1000)))
            // 1. HASH LOGIN:
            // Try to log in via hash fragment after redirect back
            // from IdServer from initImplicitFlow:
            .then(() => this.oauthService.tryLogin())
            .then(() => {
            if (this.oauthService.hasValidAccessToken()) {
                return Promise.resolve();
            }
            // 2. SILENT LOGIN:
            // Try to log in via a refresh because then we can prevent
            // needing to redirect the user:
            return this.oauthService.silentRefresh()
                .then(() => Promise.resolve())
                .catch(result => {
                // Subset of situations from https://openid.net/specs/openid-connect-core-1_0.html#AuthError
                // Only the ones where it's reasonably sure that sending the
                // user to the IdServer will help.
                const errorResponsesRequiringUserInteraction = [
                    'interaction_required',
                    'login_required',
                    'account_selection_required',
                    'consent_required',
                ];
                if (result
                    && result.reason
                    && errorResponsesRequiringUserInteraction.indexOf(result.reason.error) >= 0) {
                    // 3. ASK FOR LOGIN:
                    // At this point we know for sure that we have to ask the
                    // user to log in, so we redirect them to the IdServer to
                    // enter credentials.
                    //
                    // Enable this to ALWAYS force a user to login.
                    // this.oauthService.initImplicitFlow();
                    //
                    // Instead, we'll now do this:
                    console.warn('User interaction is needed to log in, we will wait for the user to manually log in.');
                    return Promise.resolve();
                }
                // We can't handle the truth, just pass on the problem to the
                // next handler.
                return Promise.reject(result);
            });
        })
            .then(() => {
            this.isDoneLoadingSubject$.next(true);
            // Check for the strings 'undefined' and 'null' just to be sure. Our current
            // login(...) should never have this, but in case someone ever calls
            // initImplicitFlow(undefined | null) this could happen.
            if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
                let stateUrl = this.oauthService.state;
                if (stateUrl.startsWith('/') === false) {
                    stateUrl = decodeURIComponent(stateUrl);
                }
                console.log(`There was state of ${this.oauthService.state}, so we are sending you to: ${stateUrl}`);
                this.router.navigateByUrl(stateUrl);
            }
        })
            .catch(() => this.isDoneLoadingSubject$.next(true));
    }
    login(targetUrl) {
        // Note: before version 9.1.0 of the library you needed to
        // call encodeURIComponent on the argument to the method.
        this.oauthService.initLoginFlow(targetUrl || this.router.url);
    }
    logout() { this.oauthService.logOut(); }
    refresh() { this.oauthService.silentRefresh(); }
    hasValidToken() { return this.oauthService.hasValidAccessToken(); }
    // These normally won't be exposed from a service like this, but
    // for debugging it makes sense.
    get accessToken() { return this.oauthService.getAccessToken(); }
    get refreshToken() { return this.oauthService.getRefreshToken(); }
    get identityClaims() { return this.oauthService.getIdentityClaims(); }
    get idToken() { return this.oauthService.getIdToken(); }
    get logoutUrl() { return this.oauthService.logoutUrl; }
};
AuthService = __decorate([
    Injectable({ providedIn: 'root' })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map