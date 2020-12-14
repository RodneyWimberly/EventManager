import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
let SettingsComponent = class SettingsComponent {
    constructor(translator, toasterService, settingsServices) {
        this.translator = translator;
        this.toasterService = toasterService;
        this.settingsServices = settingsServices;
        this.toasterconfig = new ToasterConfig({
            positionClass: 'toast-top-right',
            showCloseButton: true,
            timeout: 60000
        });
        this.settingSection = 1;
    }
    ngOnInit() {
        this.errors = [];
        this.settings = [];
        this.settingsServices.getSettings().subscribe(s => this.settings = s);
    }
};
SettingsComponent = __decorate([
    Component({
        selector: "app-settings",
        templateUrl: "./settings.component.html",
        styleUrls: ["./settings.component.scss"],
    })
], SettingsComponent);
export { SettingsComponent };
//# sourceMappingURL=settings.component.js.map