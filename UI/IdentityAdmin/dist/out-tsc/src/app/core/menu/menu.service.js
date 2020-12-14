import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let MenuService = class MenuService {
    constructor() {
        this.menuItems = [];
    }
    addMenu(items) {
        items.forEach((item) => {
            this.menuItems.push(item);
        });
    }
    getMenu() {
        return this.menuItems;
    }
};
MenuService = __decorate([
    Injectable()
], MenuService);
export { MenuService };
//# sourceMappingURL=menu.service.js.map