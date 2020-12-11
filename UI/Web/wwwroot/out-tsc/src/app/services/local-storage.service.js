var LocalStorageService_1;
import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Utilities } from '../helpers/utilities';
import { DbKeys } from '../helpers/db-keys';
let LocalStorageService = LocalStorageService_1 = 
/**
* Provides a wrapper for accessing the web storage API and synchronizing session storage across tabs/windows.
*/
class LocalStorageService {
    constructor() {
        this.syncKeys = [];
        this.initEvent = new Subject();
        this.reservedKeys = [
            'sync_keys',
            'addToSyncKeys',
            'removeFromSyncKeys',
            'getSessionStorage',
            'setSessionStorage',
            'addToSessionStorage',
            'removeFromSessionStorage',
            'clearAllSessionsStorage'
        ];
        this.sessionStorageTransferHandler = (event) => {
            if (!event.newValue) {
                return;
            }
            if (event.key == 'getSessionStorage') {
                if (sessionStorage.length) {
                    this.localStorageSetItem('setSessionStorage', sessionStorage);
                    localStorage.removeItem('setSessionStorage');
                }
            }
            else if (event.key == 'setSessionStorage') {
                if (!this.syncKeys.length) {
                    this.loadSyncKeys();
                }
                const data = JSON.parse(event.newValue);
                // console.info("Set => Key: Transfer setSessionStorage" + ",  data: " + JSON.stringify(data));
                for (const key in data) {
                    if (this.syncKeysContains(key)) {
                        this.sessionStorageSetItem(key, JSON.parse(data[key]));
                    }
                }
                this.onInit();
            }
            else if (event.key == 'addToSessionStorage') {
                const data = JSON.parse(event.newValue);
                // console.warn("Set => Key: Transfer addToSessionStorage" + ",  data: " + JSON.stringify(data));
                this.addToSessionStorageHelper(data.data, data.key);
            }
            else if (event.key == 'removeFromSessionStorage') {
                this.removeFromSessionStorageHelper(event.newValue);
            }
            else if (event.key == 'clearAllSessionsStorage' && sessionStorage.length) {
                this.clearInstanceSessionStorage();
            }
            else if (event.key == 'addToSyncKeys') {
                this.addToSyncKeysHelper(event.newValue);
            }
            else if (event.key == 'removeFromSyncKeys') {
                this.removeFromSyncKeysHelper(event.newValue);
            }
        };
    }
    initialiseStorageSyncListener() {
        if (LocalStorageService_1.syncListenerInitialised == true) {
            return;
        }
        LocalStorageService_1.syncListenerInitialised = true;
        window.addEventListener('storage', this.sessionStorageTransferHandler, false);
        this.syncSessionStorage();
    }
    deinitialiseStorageSyncListener() {
        window.removeEventListener('storage', this.sessionStorageTransferHandler, false);
        LocalStorageService_1.syncListenerInitialised = false;
    }
    clearAllStorage() {
        this.clearAllSessionsStorage();
        this.clearLocalStorage();
    }
    clearAllSessionsStorage() {
        this.clearInstanceSessionStorage();
        localStorage.removeItem(DbKeys.SYNC_KEYS);
        localStorage.setItem('clearAllSessionsStorage', '_dummy');
        localStorage.removeItem('clearAllSessionsStorage');
    }
    clearInstanceSessionStorage() {
        sessionStorage.clear();
        this.syncKeys = [];
    }
    clearLocalStorage() {
        localStorage.clear();
    }
    saveSessionData(data, key = DbKeys.USER_DATA) {
        this.testForInvalidKeys(key);
        this.removeFromSyncKeys(key);
        localStorage.removeItem(key);
        this.sessionStorageSetItem(key, data);
    }
    saveSyncedSessionData(data, key = DbKeys.USER_DATA) {
        this.testForInvalidKeys(key);
        localStorage.removeItem(key);
        this.addToSessionStorage(data, key);
    }
    savePermanentData(data, key = DbKeys.USER_DATA) {
        this.testForInvalidKeys(key);
        this.removeFromSessionStorage(key);
        this.localStorageSetItem(key, data);
    }
    moveDataToSessionStorage(key = DbKeys.USER_DATA) {
        this.testForInvalidKeys(key);
        const data = this.getData(key);
        if (data == null) {
            return;
        }
        this.saveSessionData(data, key);
    }
    moveDataToSyncedSessionStorage(key = DbKeys.USER_DATA) {
        this.testForInvalidKeys(key);
        const data = this.getData(key);
        if (data == null) {
            return;
        }
        this.saveSyncedSessionData(data, key);
    }
    moveDataToPermanentStorage(key = DbKeys.USER_DATA) {
        this.testForInvalidKeys(key);
        const data = this.getData(key);
        if (data == null) {
            return;
        }
        this.savePermanentData(data, key);
    }
    exists(key = DbKeys.USER_DATA) {
        let data = sessionStorage.getItem(key);
        if (data == null) {
            data = localStorage.getItem(key);
        }
        return data != null;
    }
    getData(key = DbKeys.USER_DATA) {
        this.testForInvalidKeys(key);
        let data = this.sessionStorageGetItem(key);
        if (data == null) {
            data = this.localStorageGetItem(key);
        }
        return data;
    }
    getDataObject(key = DbKeys.USER_DATA, isDateType = false) {
        let data = this.getData(key);
        if (data != null) {
            if (isDateType) {
                data = new Date(data);
            }
            return data;
        }
        else {
            return null;
        }
    }
    deleteData(key = DbKeys.USER_DATA) {
        this.testForInvalidKeys(key);
        this.removeFromSessionStorage(key);
        localStorage.removeItem(key);
    }
    getInitEvent() {
        return this.initEvent.asObservable();
    }
    syncSessionStorage() {
        localStorage.setItem('getSessionStorage', '_dummy');
        localStorage.removeItem('getSessionStorage');
    }
    addToSessionStorage(data, key) {
        this.addToSessionStorageHelper(data, key);
        this.addToSyncKeysBackup(key);
        this.localStorageSetItem('addToSessionStorage', { key, data });
        localStorage.removeItem('addToSessionStorage');
    }
    addToSessionStorageHelper(data, key) {
        this.addToSyncKeysHelper(key);
        this.sessionStorageSetItem(key, data);
    }
    removeFromSessionStorage(keyToRemove) {
        this.removeFromSessionStorageHelper(keyToRemove);
        this.removeFromSyncKeysBackup(keyToRemove);
        localStorage.setItem('removeFromSessionStorage', keyToRemove);
        localStorage.removeItem('removeFromSessionStorage');
    }
    removeFromSessionStorageHelper(keyToRemove) {
        sessionStorage.removeItem(keyToRemove);
        this.removeFromSyncKeysHelper(keyToRemove);
    }
    testForInvalidKeys(key) {
        if (!key) {
            throw new Error('key cannot be empty');
        }
        if (this.reservedKeys.some(x => x == key)) {
            throw new Error(`The storage key "${key}" is reserved and cannot be used. Please use a different key`);
        }
    }
    syncKeysContains(key) {
        return this.syncKeys.some(x => x == key);
    }
    loadSyncKeys() {
        if (this.syncKeys.length) {
            return;
        }
        this.syncKeys = this.getSyncKeysFromStorage();
    }
    getSyncKeysFromStorage(defaultValue = []) {
        const data = this.localStorageGetItem(DbKeys.SYNC_KEYS);
        if (data == null) {
            return defaultValue;
        }
        else {
            return data;
        }
    }
    addToSyncKeys(key) {
        this.addToSyncKeysHelper(key);
        this.addToSyncKeysBackup(key);
        localStorage.setItem('addToSyncKeys', key);
        localStorage.removeItem('addToSyncKeys');
    }
    addToSyncKeysBackup(key) {
        const storedSyncKeys = this.getSyncKeysFromStorage();
        if (!storedSyncKeys.some(x => x == key)) {
            storedSyncKeys.push(key);
            this.localStorageSetItem(DbKeys.SYNC_KEYS, storedSyncKeys);
        }
    }
    removeFromSyncKeysBackup(key) {
        const storedSyncKeys = this.getSyncKeysFromStorage();
        const index = storedSyncKeys.indexOf(key);
        if (index > -1) {
            storedSyncKeys.splice(index, 1);
            this.localStorageSetItem(DbKeys.SYNC_KEYS, storedSyncKeys);
        }
    }
    addToSyncKeysHelper(key) {
        if (!this.syncKeysContains(key)) {
            this.syncKeys.push(key);
        }
    }
    removeFromSyncKeys(key) {
        this.removeFromSyncKeysHelper(key);
        this.removeFromSyncKeysBackup(key);
        localStorage.setItem('removeFromSyncKeys', key);
        localStorage.removeItem('removeFromSyncKeys');
    }
    removeFromSyncKeysHelper(key) {
        const index = this.syncKeys.indexOf(key);
        if (index > -1) {
            this.syncKeys.splice(index, 1);
        }
    }
    localStorageSetItem(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    sessionStorageSetItem(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    }
    localStorageGetItem(key) {
        return Utilities.JsonTryParse(localStorage.getItem(key));
    }
    sessionStorageGetItem(key) {
        return Utilities.JsonTryParse(sessionStorage.getItem(key));
    }
    onInit() {
        setTimeout(() => {
            this.initEvent.next();
            this.initEvent.complete();
        });
    }
};
LocalStorageService.syncListenerInitialised = false;
LocalStorageService = LocalStorageService_1 = __decorate([
    Injectable()
    /**
    * Provides a wrapper for accessing the web storage API and synchronizing session storage across tabs/windows.
    */
], LocalStorageService);
export { LocalStorageService };
//# sourceMappingURL=local-storage.service.js.map