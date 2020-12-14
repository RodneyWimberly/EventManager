var CoreModule_1;
import { __decorate, __param } from "tslib";
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { VersionService } from '@shared/services/version.service';
import { AuthConfig, OAuthModule, OAuthModuleConfig, OAuthStorage, } from 'angular-oauth2-oidc';
import { authProdConfig } from './auth/auth-config.prod';
import { AuthGuardAuthenticadeOnly } from './auth/auth-guard-authenticated-only.service';
import { AuthGuardOnlyAdmin } from './auth/auth-guard-only-admin.service';
import { authModuleConfig } from './auth/auth-module-config';
import { AuthService } from './auth/auth.service';
import { MenuService } from './menu/menu.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SettingsService } from './settings/settings.service';
import { ThemesService } from './themes/themes.service';
import { TranslatorService } from './translator/translator.service';
export function storageFactory() {
    return localStorage;
}
let CoreModule = CoreModule_1 = class CoreModule {
    static forRoot() {
        return {
            ngModule: CoreModule_1,
            providers: [
                { provide: AuthConfig, useValue: authProdConfig },
                { provide: OAuthModuleConfig, useValue: authModuleConfig },
                { provide: OAuthStorage, useFactory: storageFactory },
            ]
        };
    }
    constructor(parentModule) {
        throwIfAlreadyLoaded(parentModule, "CoreModule");
    }
};
CoreModule = CoreModule_1 = __decorate([
    NgModule({
        imports: [
            HttpClientModule,
            OAuthModule.forRoot(),
        ],
        providers: [
            SettingsService,
            VersionService,
            ThemesService,
            TranslatorService,
            MenuService,
            AuthService,
            AuthGuardOnlyAdmin,
            AuthGuardAuthenticadeOnly,
        ],
        declarations: [],
        exports: []
    }),
    __param(0, Optional()), __param(0, SkipSelf())
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map