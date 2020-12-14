import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let UserblockService = class UserblockService {
    constructor() {
        // initially visible
        this.userBlockVisible = true;
    }
    getVisibility() {
        return this.userBlockVisible;
    }
    setVisibility(stat = true) {
        this.userBlockVisible = stat;
    }
    toggleVisibility() {
        this.userBlockVisible = !this.userBlockVisible;
    }
};
UserblockService = __decorate([
    Injectable()
], UserblockService);
export { UserblockService };
//# sourceMappingURL=userblock.service.js.map