import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
let EmailService = class EmailService {
    constructor(http) {
        this.http = http;
        this.endpoint = environment.ResourceServer + "emails";
    }
    getEmailTypes() {
        return this.http.get(`${this.endpoint}/types`);
    }
    getEmail(type) {
        return this.http.get(`${this.endpoint}/${type}`);
    }
    update(type, model) {
        return this.http.put(`${this.endpoint}/${type}`, model);
    }
};
EmailService = __decorate([
    Injectable()
], EmailService);
export { EmailService };
//# sourceMappingURL=emails.service.js.map