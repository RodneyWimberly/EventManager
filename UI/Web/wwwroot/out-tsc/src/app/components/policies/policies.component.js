import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { fadeInOut } from '../../helpers/animations';
let PoliciesComponent = class PoliciesComponent {
    constructor(configurations) {
        this.configurations = configurations;
    }
};
PoliciesComponent = __decorate([
    Component({
        selector: 'policies',
        templateUrl: './policies.component.html',
        styleUrls: ['./policies.component.scss'],
        animations: [fadeInOut]
    })
], PoliciesComponent);
export { PoliciesComponent };
//# sourceMappingURL=policies.component.js.map