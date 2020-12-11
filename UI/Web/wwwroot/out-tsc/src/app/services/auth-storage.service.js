var AuthStorageService_1;
import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthStorageService = AuthStorageService_1 = class AuthStorageService {
    constructor(localStorage) {
        this.localStorage = localStorage;
        this.dbKeyPrefix = 'AUTH:';
    }
    getItem(key) {
        return this.localStorage.getData(this.dbKeyPrefix + key);
    }
    removeItem(key) {
        this.localStorage.deleteData(this.dbKeyPrefix + key);
    }
    setItem(key, data) {
        if (AuthStorageService_1.RememberMe) {
            this.localStorage.savePermanentData(data, this.dbKeyPrefix + key);
        }
        else {
            this.localStorage.saveSyncedSessionData(data, this.dbKeyPrefix + key);
        }
    }
};
AuthStorageService.RememberMe = false;
AuthStorageService = AuthStorageService_1 = __decorate([
    Injectable()
], AuthStorageService);
export { AuthStorageService };
//# sourceMappingURL=auth-storage.service.js.map