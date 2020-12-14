import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
let IdentityResourceService = class IdentityResourceService {
    constructor(http) {
        this.http = http;
        this.endpoint = environment.ResourceServer + "identity-resources";
    }
    getIdentityResources() {
        return this.http.get(`${this.endpoint}`);
    }
    getIdentityResourceDetails(name) {
        return this.http.get(`${this.endpoint}/${name}`);
    }
    save(model) {
        return this.http.post(`${this.endpoint}`, model);
    }
    update(resource, model) {
        return this.http.put(`${this.endpoint}/${resource}`, model);
    }
    partialUpdate(resource, patch) {
        return this.http.patch(`${this.endpoint}/${resource}`, patch);
    }
    remove(name) {
        return this.http.delete(`${this.endpoint}/${name}`);
    }
};
IdentityResourceService = __decorate([
    Injectable()
], IdentityResourceService);
export { IdentityResourceService };
//# sourceMappingURL=identity-resource.service.js.map