var EventConditionsValidatorDirective_1;
import { __decorate } from "tslib";
import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
let EventConditionsValidatorDirective = EventConditionsValidatorDirective_1 = class EventConditionsValidatorDirective {
    validate(control) {
        var isValid = true;
        var errors = {
            'value': {
                'message': 'The field Value is required'
            }
        };
        var valueTexts = control.get('valueText');
        isValid = valueTexts && Object.keys(valueTexts.controls).length > 0;
        if (isValid) {
            Object.keys(valueTexts.controls).forEach((value) => isValid = isValid && valueTexts.controls[value].valid);
        }
        return isValid ? null : errors;
    }
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
};
EventConditionsValidatorDirective = EventConditionsValidatorDirective_1 = __decorate([
    Directive({
        selector: '[eventConditionsValue]',
        providers: [{ provide: NG_VALIDATORS, useExisting: EventConditionsValidatorDirective_1, multi: true }]
    })
], EventConditionsValidatorDirective);
export { EventConditionsValidatorDirective };
//# sourceMappingURL=event-conditions-validator-directive.js.map