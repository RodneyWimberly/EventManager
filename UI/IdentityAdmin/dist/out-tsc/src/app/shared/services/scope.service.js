import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
let ScopeService = class ScopeService {
    constructor(http) {
        this.http = http;
        this.endpoint = environment.ResourceServer + "scopes";
    }
    getScopes(text) {
        return this.http.get(`${this.endpoint}/${text}`);
    }
};
ScopeService = __decorate([
    Injectable()
], ScopeService);
export { ScopeService };
//# sourceMappingURL=scope.service.js.map