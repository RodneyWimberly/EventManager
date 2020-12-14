import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
let PersistedGrantsService = class PersistedGrantsService {
    constructor(http, settings) {
        this.http = http;
        this.settings = settings;
        this.endpoint = environment.ResourceServer + "persisted-grants";
    }
    getPersistedGrants(quantity, page) {
        return this.http.get(`${this.endpoint}?limit=${quantity}&offset=${(page - 1) * quantity}`);
    }
    remove(key) {
        return this.http.delete(`${this.endpoint}/${btoa(key)}`);
    }
};
PersistedGrantsService = __decorate([
    Injectable()
], PersistedGrantsService);
export { PersistedGrantsService };
//# sourceMappingURL=persisted-grants.service.js.map