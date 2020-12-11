import { __decorate } from "tslib";
import { Component, Input, ContentChild } from '@angular/core';
import { InputRefDirective } from '../../directives/input-ref.directive';
let CustomInputComponent = class CustomInputComponent {
    constructor() { }
    get isError() {
        return this.input.hasError;
    }
    get errorMessages() {
        const errors = this.input.errors;
        const messages = [];
        const keys = Object.keys(this.validations);
        keys.forEach(key => {
            if (errors[key]) {
                messages.push(this.validations[key]);
            }
        });
        return messages;
    }
    ngOnInit() { }
};
__decorate([
    Input()
], CustomInputComponent.prototype, "label", void 0);
__decorate([
    Input()
], CustomInputComponent.prototype, "validations", void 0);
__decorate([
    Input()
], CustomInputComponent.prototype, "info", void 0);
__decorate([
    ContentChild(InputRefDirective, { static: true })
], CustomInputComponent.prototype, "input", void 0);
CustomInputComponent = __decorate([
    Component({
        selector: 'custom-input',
        templateUrl: './custom-input.component.html',
        styleUrls: ['./custom-input.component.scss']
    })
], CustomInputComponent);
export { CustomInputComponent };
//# sourceMappingURL=custom-input.component.js.map