import { __decorate } from "tslib";
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
let GlobalSettingsService = class GlobalSettingsService {
    constructor(http) {
        this.http = http;
        this.endpoint = environment.ResourceServer + "global-configuration";
    }
    getSettings() {
        return this.http.get(`${this.endpoint}`);
    }
    update(model) {
        return this.http.put(`${this.endpoint}`, model);
    }
    testLdap(attributes, authType, distinguishedName, domainName, searchScope, address, portNumber, username, password) {
        let params = new HttpParams()
            .set('distinguishedName', distinguishedName)
            .set('domainName', domainName)
            .set('searchScope', searchScope)
            .set('address', address)
            .set('portNumber', portNumber.toString());
        if (authType != null && authType != "")
            params = params.set('authType', authType);
        if (attributes != null && attributes != "")
            params = params.set('attributes', attributes);
        if (username != null && username != "")
            params = params.set('username', username);
        if (password != null && password != "")
            params = params.set('password', password);
        return this.http.get(`${this.endpoint}/ldap-test`, { params });
    }
};
GlobalSettingsService = __decorate([
    Injectable()
], GlobalSettingsService);
export { GlobalSettingsService };
//# sourceMappingURL=global-settings.service.js.map