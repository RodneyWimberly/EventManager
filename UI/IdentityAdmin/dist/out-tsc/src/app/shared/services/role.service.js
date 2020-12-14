import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
let RoleService = class RoleService {
    constructor(http) {
        this.http = http;
        this.endpoint = environment.ResourceServer + "roles";
    }
    getAvailableRoles() {
        return this.http.get(`${this.endpoint}`);
    }
    remove(name) {
        return this.http.delete(`${this.endpoint}/${name}`);
    }
    getRoleDetails(name) {
        return this.http.get(`${this.endpoint}/${name}`);
    }
    update(name, model) {
        return this.http.put(`${this.endpoint}/${name}`, model);
    }
    removeUserFromRole(user, role) {
        return this.http.delete(`${this.endpoint}/${role}/${user}`);
    }
    save(model) {
        return this.http.post(`${this.endpoint}`, model);
    }
    getUsersFromRole(role) {
        return this.http.get(`${this.endpoint}/${role}/users`);
    }
};
RoleService = __decorate([
    Injectable()
], RoleService);
export { RoleService };
//# sourceMappingURL=role.service.js.map