import { __decorate } from "tslib";
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
let ClientService = class ClientService {
    constructor(http) {
        this.http = http;
        this.endpoint = environment.ResourceServer + "clients";
    }
    getClients() {
        return this.http.get(this.endpoint);
    }
    getClientDetails(clientId) {
        return this.http.get(`${this.endpoint}/${clientId}`);
    }
    save(model) {
        return this.http.post(this.endpoint, model);
    }
    update(client, model) {
        return this.http.put(`${this.endpoint}/${client}`, model);
    }
    partialUpdate(client, patch) {
        return this.http.patch(`${this.endpoint}/${client}`, patch);
    }
    copy(clientId) {
        const command = {};
        return this.http.post(`${this.endpoint}/${clientId}/copy`, command);
    }
    remove(clientId) {
        return this.http.delete(`${this.endpoint}/${clientId}`);
    }
    getClientSecrets(clientId) {
        return this.http.get(`${this.endpoint}/${clientId}/secrets`);
    }
    removeSecret(client, type, value) {
        const params = new HttpParams()
            .set('type', type)
            .set('value', encodeURIComponent(value));
        return this.http.delete(`${this.endpoint}/${client}/secrets`, { params });
    }
    saveSecret(model) {
        return this.http.post(`${this.endpoint}/${model.clientId}/secrets`, model);
    }
    getClientProperties(clientId) {
        return this.http.get(`${this.endpoint}/${clientId}/properties`);
    }
    removeProperty(client, key) {
        return this.http.delete(`${this.endpoint}/${client}/properties/${key}`);
    }
    saveProperty(model) {
        return this.http.post(`${this.endpoint}/${model.clientId}/properties`, model);
    }
    getClientClaims(clientId) {
        return this.http.get(`${this.endpoint}/${clientId}/claims`);
    }
    removeClaim(client, type, value) {
        const params = new HttpParams()
            .set('type', type)
            .set('value', value);
        return this.http.delete(`${this.endpoint}/${client}/claims`, { params });
    }
    saveClaim(model) {
        return this.http.post(`${this.endpoint}/${model.clientId}/claims`, model);
    }
};
ClientService = __decorate([
    Injectable()
], ClientService);
export { ClientService };
//# sourceMappingURL=clients.service.js.map