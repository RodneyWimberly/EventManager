var EqualValidatorDirective_1;
import { __decorate, __param } from "tslib";
import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
let EqualValidatorDirective = EqualValidatorDirective_1 = class EqualValidatorDirective {
    constructor(validateEqual, reverse) {
        this.validateEqual = validateEqual;
        this.reverse = reverse;
    }
    validate(c) {
        const other = c.root.get(this.validateEqual);
        if (!other) {
            return null;
        }
        return this.reverse === 'true' ? this.validateReverse(c, other) : this.validateNoReverse(c, other);
    }
    validateNoReverse(c, other) {
        return other.value === c.value ? null : { validateEqual: true };
    }
    validateReverse(c, other) {
        if (c.value === other.value) {
            if (other.errors) {
                delete other.errors.validateEqual;
                if (Object.keys(other.errors).length == 0) {
                    other.setErrors(null);
                }
            }
        }
        else {
            other.setErrors({ validateEqual: true });
        }
        return null;
    }
};
EqualValidatorDirective = EqualValidatorDirective_1 = __decorate([
    Directive({
        selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
        providers: [
            { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidatorDirective_1), multi: true }
        ]
    }),
    __param(0, Attribute('validateEqual')),
    __param(1, Attribute('reverse'))
], EqualValidatorDirective);
export { EqualValidatorDirective };
//# sourceMappingURL=equal-validator.directive.js.map