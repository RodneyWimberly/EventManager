import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { GlobalSettings } from '@shared/viewModel/global-settings.model';
import { SMTP } from '@shared/viewModel/smtp.model';
import { ToasterConfig } from 'angular2-toaster';
let EmailSettingsComponent = class EmailSettingsComponent {
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
        this.settings = new SMTP();
        this.settings.username = GlobalSettings.getSetting(this.model, "Smtp:Username");
        this.settings.password = GlobalSettings.getSetting(this.model, "Smtp:Password");
        this.settings.server = GlobalSettings.getSetting(this.model, "Smtp:Server");
        this.settings.port = GlobalSettings.getSetting(this.model, "Smtp:Port");
        this.settings.useSsl = GlobalSettings.getSetting(this.model, "Smtp:UseSsl");
        this.settings.sendMail = GlobalSettings.getSetting(this.model, "SendEmail");
        this.sendMail = this.settings.sendMail.value == "true";
        this.useSsl = this.settings.useSsl.value == "true";
    }
    updateSettings() {
        this.errors.splice(0, this.errors.length);
        let configurations = new Array();
        configurations.push(this.settings.username);
        configurations.push(this.settings.password);
        configurations.push(this.settings.sendMail);
        configurations.push(this.settings.server);
        configurations.push(this.settings.port);
        configurations.push(this.settings.useSsl);
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
    changeUseSsl() {
        this.settings.useSsl.value = this.useSsl.toString();
    }
    changeSendEmail() {
        this.settings.sendMail.value = this.sendMail.toString();
    }
};
__decorate([
    Input()
], EmailSettingsComponent.prototype, "errors", void 0);
__decorate([
    Input()
], EmailSettingsComponent.prototype, "model", void 0);
EmailSettingsComponent = __decorate([
    Component({
        selector: "app-email-settings",
        templateUrl: "./email-settings.component.html",
        styleUrls: ["./email-settings.component.scss"]
    })
], EmailSettingsComponent);
export { EmailSettingsComponent };
//# sourceMappingURL=email-settings.component.js.map