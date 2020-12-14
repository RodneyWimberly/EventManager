import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ToasterModule } from 'angular2-toaster';
import { TagInputModule } from 'ngx-chips';
import { EmailSettingsComponent } from './emails/email-settings.component';
import { GlobalSettingsService } from './global-settings.service';
import { LdapComponent } from './ldap/ldap.component';
import { RecaptchaSettingsComponent } from './recaptcha/recaptcha.component';
import { SettingsComponent } from './settings.component';
import { StorageSettingsComponent } from './storage/storage-settings.component';
const routes = [
    { path: "", component: SettingsComponent },
];
let SettingsModule = class SettingsModule {
};
SettingsModule = __decorate([
    NgModule({
        imports: [
            SharedModule,
            ToasterModule.forRoot(),
            RouterModule.forChild(routes),
            TagInputModule
        ],
        declarations: [
            SettingsComponent,
            EmailSettingsComponent,
            StorageSettingsComponent,
            RecaptchaSettingsComponent,
            LdapComponent
        ],
        providers: [
            GlobalSettingsService
        ],
        exports: [
            RouterModule
        ]
    })
], SettingsModule);
export { SettingsModule };
//# sourceMappingURL=settings.module.js.map