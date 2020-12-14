import { __decorate } from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { FormUtil } from '@shared/validators/form.utils';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { GlobalSettings } from '@shared/viewModel/global-settings.model';
import { ToasterConfig } from 'angular2-toaster';
import { share } from 'rxjs/operators';
let LdapComponent = class LdapComponent {
    constructor(translator, settingsServices, toasterService) {
        this.translator = translator;
        this.settingsServices = settingsServices;
        this.toasterService = toasterService;
        this.runningLdapTest = false;
        this.showLdapTest = false;
        this.settingsForms = new FormGroup({
            address: new FormControl(null, Validators.required),
            domainName: new FormControl(null, Validators.required),
            distinguishedName: new FormControl(null, Validators.required),
            authType: new FormControl(null, null),
            searchScope: new FormControl(null, Validators.required),
            portNumber: new FormControl({ value: 389, disabled: false }, [Validators.min(0), Validators.max(99999)]),
            connectionLess: new FormControl(null, Validators.required),
            fullyQualifiedDomainName: new FormControl(null, Validators.required)
        });
        this.toasterconfig = new ToasterConfig({
            positionClass: 'toast-top-right',
            showCloseButton: true
        });
        this.bsConfig = {
            containerClass: 'theme-angle'
        };
        this.showButtonLoading = false;
    }
    ngOnInit() {
        this.runningLdapTest = true;
        this.errors = [];
        this.attributes = [];
        this.showButtonLoading = false;
        const attr = GlobalSettings.getSetting(this.model, "Ldap:Attributes").value;
        if (attr.length > 0)
            this.attributes = GlobalSettings.getSetting(this.model, "Ldap:Attributes").value.split(',').map(m => m.trim());
        let content = {
            authType: GlobalSettings.getSetting(this.model, "Ldap:AuthType").value,
            distinguishedName: GlobalSettings.getSetting(this.model, "Ldap:DistinguishedName").value,
            domainName: GlobalSettings.getSetting(this.model, "Ldap:DomainName").value,
            address: GlobalSettings.getSetting(this.model, "Ldap:Address").value,
            searchScope: GlobalSettings.getSetting(this.model, "Ldap:SearchScope").value,
            portNumber: parseInt(GlobalSettings.getSetting(this.model, "Ldap:PortNumber").value),
            connectionLess: GlobalSettings.getSetting(this.model, "Ldap:ConnectionLess").value == 'true',
            fullyQualifiedDomainName: GlobalSettings.getSetting(this.model, "Ldap:FullyQualifiedDomainName").value == 'true',
        };
        this.settingsForms.setValue(content);
        this.useLdap = GlobalSettings.getSetting(this.model, "LoginStrategy").value == "Ldap";
        this.authType = [
            { id: "", text: "Select" },
            { id: "0", text: "Anonymous" },
            { id: "1", text: "Basic" },
            { id: "2", text: "Negotiate" },
            { id: "3", text: "Ntlm" },
            { id: "4", text: "Digest" },
            { id: "5", text: "Sicily" },
            { id: "6", text: "Dpa" },
            { id: "7", text: "Msn" },
            { id: "8", text: "External" },
            { id: "9", text: "Kerberos" }
        ];
        this.searchScope = [
            { id: "0", text: "Base" },
            { id: "1", text: "One Level" },
            { id: "2", text: "Subtree" }
        ];
    }
    updateSettings() {
        if (!this.validateForm(this.settingsForms)) {
            return;
        }
        this.errors.splice(0, this.errors.length);
        let configurations = new Array();
        if (this.attributes.length > 0)
            configurations.push(GlobalSettings.updateSetting(this.model, "Ldap:Attributes", this.attributes.reduce((a, c) => a + ',' + c)));
        else
            configurations.push(GlobalSettings.updateSetting(this.model, "Ldap:Attributes", ""));
        configurations.push(GlobalSettings.updateSetting(this.model, "Ldap:AuthType", this.settingsForms.value.authType));
        configurations.push(GlobalSettings.updateSetting(this.model, "Ldap:DistinguishedName", this.settingsForms.value.distinguishedName));
        configurations.push(GlobalSettings.updateSetting(this.model, "Ldap:DomainName", this.settingsForms.value.domainName));
        configurations.push(GlobalSettings.updateSetting(this.model, "Ldap:Address", this.settingsForms.value.address));
        configurations.push(GlobalSettings.updateSetting(this.model, "Ldap:SearchScope", this.settingsForms.value.searchScope));
        configurations.push(GlobalSettings.updateSetting(this.model, "Ldap:PortNumber", this.settingsForms.value.portNumber.toString()));
        configurations.push(GlobalSettings.updateSetting(this.model, "Ldap:ConnectionLess", this.settingsForms.value.connectionLess ? "true" : "false"));
        configurations.push(GlobalSettings.updateSetting(this.model, "Ldap:FullyQualifiedDomainName", this.settingsForms.value.fullyQualifiedDomainName ? "true" : "false"));
        configurations.push(GlobalSettings.updateSetting(this.model, "LoginStrategy", this.useLdap ? "Ldap" : "Identity"));
        this.showButtonLoading = true;
        this.errors = [];
        this.settingsServices.update(configurations).subscribe(() => {
            this.showSuccessMessage();
            this.showButtonLoading = false;
        }, err => {
            ProblemDetails.GetErrors(err).map(a => a.value).forEach(i => this.errors.push(i));
            this.showButtonLoading = false;
        });
    }
    testConnection() {
        if (!this.validateForm(this.settingsForms)) {
            return;
        }
        this.showLdapTest = true;
        this.runningLdapTest = true;
        this.showButtonLoading = true;
        this.ldapResult = null;
        this.errors.splice(0, this.errors.length);
        let attributes = '';
        if (this.attributes.length > 0)
            attributes = this.attributes.reduce((a, c) => a + ',' + c);
        const authType = this.settingsForms.value.authType;
        const distinguishedName = this.settingsForms.value.distinguishedName;
        const domainName = this.settingsForms.value.domainName;
        const searchScope = this.settingsForms.value.searchScope;
        const address = this.settingsForms.value.address;
        const number = this.settingsForms.value.portNumber;
        this.settingsServices.testLdap(attributes, authType, distinguishedName, domainName, searchScope, address, number, this.username, this.password).subscribe((data) => {
            this.ldapResult = data;
            this.showButtonLoading = false;
            this.runningLdapTest = false;
        }, err => {
            ProblemDetails.GetErrors(err).map(a => a.value).forEach(i => this.errors.push(i));
            this.showButtonLoading = false;
            this.runningLdapTest = false;
        });
    }
    validateForm(form) {
        if (form.invalid) {
            FormUtil.touchForm(form);
            FormUtil.dirtyForm(form);
            return false;
        }
        return true;
    }
    getErrorMessages() {
        return this.translator.translate.get('validations').pipe(share());
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
    addAttribute(type) {
        if (this.attributes.find(a => a == type) == null)
            this.attributes.push(type);
    }
};
__decorate([
    Input()
], LdapComponent.prototype, "errors", void 0);
__decorate([
    Input()
], LdapComponent.prototype, "model", void 0);
LdapComponent = __decorate([
    Component({
        selector: "app-ldap",
        templateUrl: "./ldap.component.html",
        styleUrls: ["./ldap.component.scss"],
        encapsulation: ViewEncapsulation.None
    })
], LdapComponent);
export { LdapComponent };
//# sourceMappingURL=ldap.component.js.map