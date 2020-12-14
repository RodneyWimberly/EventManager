import { __decorate } from "tslib";
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
let ApiResourceService = class ApiResourceService {
    constructor(http) {
        this.http = http;
        this.endpoint = environment.ResourceServer + "api-resources";
    }
    getApiResources() {
        return this.http.get(`${this.endpoint}`);
    }
    getApiResourceDetails(name) {
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
    getSecrets(resourceName) {
        return this.http.get(`${this.endpoint}/${resourceName}/secrets`);
    }
    removeSecret(resourceName, type, value) {
        const params = new HttpParams()
            .set('type', type)
            .set('value', encodeURIComponent(value));
        return this.http.delete(`${this.endpoint}/${resourceName}/secrets`, { params });
    }
    saveSecret(model) {
        return this.http.post(`${this.endpoint}/${model.resourceName}/secrets`, model);
    }
    getScopes(resourceName) {
        return this.http.get(`${this.endpoint}/${resourceName}/scopes`);
    }
    removeScope(resourceName, name) {
        return this.http.delete(`${this.endpoint}/${resourceName}/scopes/${name}`);
    }
    saveScope(model) {
        return this.http.post(`${this.endpoint}/${model.resourceName}/scopes`, model);
    }
};
ApiResourceService = __decorate([
    Injectable()
], ApiResourceService);
export { ApiResourceService };
//# sourceMappingURL=api-resource.service.js.map