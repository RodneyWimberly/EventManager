import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { GlobalSettings } from '@shared/viewModel/global-settings.model';
import { RecaptchaSettings } from '@shared/viewModel/recaptcha-settings';
import { ToasterConfig } from 'angular2-toaster';
let RecaptchaSettingsComponent = class RecaptchaSettingsComponent {
    constructor(translator, toasterService, settingsServices) {
        this.translator = translator;
        this.toasterService = toasterService;
        this.settingsServices = settingsServices;
        this.toasterconfig = new ToasterConfig({
            positionClass: 'toast-top-right',
            showCloseButton: true,
            timeout: 60000
        });
    }
    ngOnInit() {
        this.settings = new RecaptchaSettings();
        this.settings.siteKey = GlobalSettings.getSetting(this.model, "Recaptcha:SiteKey");
        this.settings.privateKey = GlobalSettings.getSetting(this.model, "Recaptcha:PrivateKey");
        this.settings.useRecaptcha = GlobalSettings.getSetting(this.model, "UseRecaptcha");
        this.useRecaptcha = this.settings.useRecaptcha.value == "true";
    }
    updateSettings() {
        this.errors.splice(0, this.errors.length);
        let configurations = new Array();
        configurations.push(this.settings.siteKey);
        configurations.push(this.settings.privateKey);
        configurations.push(this.settings.useRecaptcha);
        this.showButtonLoading = true;
        this.settingsServices.update(configurations).subscribe(() => {
            this.showSuccessMessage();
            this.showButtonLoading = false;
        }, err => {
            ProblemDetails.GetErrors(err).map(a => a.value).forEach(i => this.errors.push(i));
            this.showButtonLoading = false;
        });
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
    changeUseRecaptcha() {
        this.settings.useRecaptcha.value = this.useRecaptcha.toString();
    }
};
__decorate([
    Input()
], RecaptchaSettingsComponent.prototype, "errors", void 0);
__decorate([
    Input()
], RecaptchaSettingsComponent.prototype, "model", void 0);
RecaptchaSettingsComponent = __decorate([
    Component({
        selector: "app-recaptcha",
        templateUrl: "./recaptcha.component.html",
        styleUrls: ["./recaptcha.component.scss"]
    })
], RecaptchaSettingsComponent);
export { RecaptchaSettingsComponent };
//# sourceMappingURL=recaptcha.component.js.map