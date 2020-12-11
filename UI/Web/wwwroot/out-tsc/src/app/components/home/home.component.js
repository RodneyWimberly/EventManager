import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { fadeInOut } from '../../helpers/animations';
let HomeComponent = class HomeComponent {
    constructor(configurations) {
        this.configurations = configurations;
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss'],
        animations: [fadeInOut]
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map