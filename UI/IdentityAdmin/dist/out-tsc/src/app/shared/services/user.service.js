import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.endpoint = environment.ResourceServer + "admin/users";
        this.endpointSignUp = environment.ResourceServer + "sign-up";
    }
    getUsers(quantity, page) {
        return this.http.get(`${this.endpoint}?limit=${quantity}&offset=${(page - 1) * quantity}`);
    }
    findUsers(text, quantity, page) {
        return this.http.get(`${this.endpoint}?limit=${quantity}&offset=${(page - 1) * quantity}&search=${encodeURI(text)}`);
    }
    getDetails(username) {
        return this.http.get(`${this.endpoint}/${username}`);
    }
    update(username, updateCommand) {
        return this.http.put(`${this.endpoint}/${username}`, updateCommand);
    }
    patch(username, patch) {
        return this.http.patch(`${this.endpoint}/${username}`, patch);
    }
    save(model) {
        return this.http.post(`${this.endpoint}`, model);
    }
    remove(username) {
        return this.http.delete(`${this.endpoint}/${username}`);
    }
    getUserClaims(userName) {
        return this.http.get(`${this.endpoint}/${userName}/claims`);
    }
    removeClaim(username, type) {
        return this.http.delete(`${this.endpoint}/${username}/claims/${type}`);
    }
    saveClaim(username, model) {
        return this.http.post(`${this.endpoint}/${username}/claims`, model);
    }
    getUserRoles(userName) {
        return this.http.get(`${this.endpoint}/${userName}/roles`);
    }
    removeRole(username, role) {
        return this.http.delete(`${this.endpoint}/${username}/roles/${role}`);
    }
    saveRole(username, model) {
        return this.http.post(`${this.endpoint}/${username}/roles`, model);
    }
    getUserLogins(username) {
        return this.http.get(`${this.endpoint}/${username}/logins`);
    }
    removeLogin(userName, loginProvider, providerKey) {
        return this.http.delete(`${this.endpoint}/${userName}/logins?loginProvider=${loginProvider}&providerKey=${providerKey}`);
    }
    checkUserName(userName) {
        return this.http.get(`${this.endpointSignUp}/check-username/${userName}`);
    }
    checkEmail(email) {
        return this.http.get(`${this.endpointSignUp}/check-email/${email}`);
    }
    resetPassword(username, resetPassword) {
        return this.http.put(`${this.endpoint}/${username}/password`, resetPassword);
    }
    showEvents(username, quantity, page) {
        return this.http.get(`${this.endpoint}/${username}/logs?limit=${quantity}&offset=${(page - 1) * quantity}`);
    }
    searchEvents(username, text, quantity, page) {
        return this.http.get(`${this.endpoint}/${username}/logs?limit=${quantity}&offset=${(page - 1) * quantity}&search=${encodeURI(text)}`);
    }
};
UserService = __decorate([
    Injectable()
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map