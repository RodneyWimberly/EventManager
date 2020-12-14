import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
let VersionService = class VersionService {
    constructor(http) {
        this.http = http;
        this.endpoint = environment.ResourceServer + "version";
    }
    getVersion() {
        return this.http.get(`${this.endpoint}`, { responseType: 'text' })
            .pipe(map(t => JSON.parse(t) == "light"));
    }
};
VersionService = __decorate([
    Injectable()
], VersionService);
export { VersionService };
//# sourceMappingURL=version.service.js.map