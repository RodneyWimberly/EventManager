import { __decorate } from "tslib";
import { Directive } from '@angular/core';
let InputRefDirective = class InputRefDirective {
    constructor(formControl) {
        this.formControl = formControl;
    }
    get hasError() {
        return this.formControl.invalid;
    }
    get errors() {
        if (this.hasError && this.formControl.errors) {
            return this.formControl.errors;
        }
        return null;
    }
    get controlValue() {
        return this.formControl.value;
    }
    get controlName() {
        return this.formControl.name;
    }
};
InputRefDirective = __decorate([
    Directive({
        selector: '[inputRef]'
    })
], InputRefDirective);
export { InputRefDirective };
//# sourceMappingURL=input-ref.directive.js.map