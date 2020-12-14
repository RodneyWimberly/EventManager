import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { defer, from, of } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';
let SettingsService = class SettingsService {
    constructor(oauthService, versionService) {
        this.oauthService = oauthService;
        this.versionService = versionService;
        this.isLightVersion$ = this.versionService.getVersion().pipe(tap(light => this.lightVersion = light));
        // App Settings
        // -----------------------------------
        this.app = {
            name: "Jp Project - IS4Admin",
            description: "IdentityServer4 Admin Panel",
            year: ((new Date()).getFullYear()),
            version: environment.version
        };
        // Layout Settings
        // -----------------------------------
        let savedLayout = localStorage.getItem("LayoutSettings");
        if (savedLayout == null)
            this.layout = {
                isFixed: true,
                isCollapsed: false,
                isBoxed: true,
                isRTL: false,
                horizontal: false,
                isFloat: false,
                asideHover: false,
                theme: null,
                asideScrollbar: false,
                isCollapsedText: false,
                useFullLayout: false,
                hiddenFooter: false,
                offsidebarOpen: false,
                asideToggled: false,
                viewAnimation: "ng-fadeInUp"
            };
        else {
            this.layout = JSON.parse(savedLayout);
            this.layout.offsidebarOpen = false;
        }
        /**
         * Defer makes promise cold
         * https://blog.angularindepth.com/observable-frompromise-cold-or-hot-531229818255
         */
        this.userProfileObservable = defer(() => from(this.oauthService.loadUserProfile())).pipe(share());
        this.loadDiscoveryDocumentAndTryLoginObservable = defer(() => from(this.oauthService.loadDiscoveryDocument())).pipe(share()).pipe(tap(a => this.doc = a)).pipe(switchMap(a => this.oauthService.tryLogin())).pipe(map(() => this.doc));
    }
    getUserProfile() {
        if (this.user == null) {
            return this.userProfileObservable;
        }
        return of(this.user);
    }
    set userpicture(image) {
        this.user.picture = image;
    }
    getUserClaims() {
        return this.oauthService.getIdentityClaims();
    }
    saveLayout() {
        localStorage.setItem("LayoutSettings", JSON.stringify(this.layout));
    }
    getAppSetting(name) {
        return name ? this.app[name] : this.app;
    }
    getUserSetting(name) {
        return name ? this.user[name] : this.user;
    }
    getLayoutSetting(name) {
        return name ? this.layout[name] : this.layout;
    }
    setAppSetting(name, value) {
        if (typeof this.app[name] !== "undefined")
            this.app[name] = value;
    }
    setUserSetting(name, value) {
        if (typeof this.user[name] !== "undefined")
            this.user[name] = value;
    }
    setLayoutSetting(name, value) {
        if (typeof this.layout[name] !== "undefined")
            return this.layout[name] = value;
    }
    toggleLayoutSetting(name) {
        return this.setLayoutSetting(name, !this.getLayoutSetting(name));
    }
};
SettingsService = __decorate([
    Injectable()
], SettingsService);
export { SettingsService };
//# sourceMappingURL=settings.service.js.map