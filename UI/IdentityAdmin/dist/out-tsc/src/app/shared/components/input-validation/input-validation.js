import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FormUtil } from '@shared/validators/form.utils';
let InputValidationComponent = class InputValidationComponent {
    constructor() {
        this.errorMsgs = {};
        this.errorValidation = FormUtil.errorValidation;
        this.ObjectKeys = Object.keys;
    }
};
__decorate([
    Input()
], InputValidationComponent.prototype, "control", void 0);
__decorate([
    Input()
], InputValidationComponent.prototype, "errorMsgs", void 0);
__decorate([
    Input()
], InputValidationComponent.prototype, "errorValidation", void 0);
InputValidationComponent = __decorate([
    Component({
        selector: 'app-input-validation',
        templateUrl: "./input-validation.html",
    })
], InputValidationComponent);
export { InputValidationComponent };
//# sourceMappingURL=input-validation.js.map