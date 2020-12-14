import { __decorate } from "tslib";
import { Directive, HostListener } from '@angular/core';
let NumberDirective = class NumberDirective {
    constructor(_el) {
        this._el = _el;
    }
    onInputChange(event) {
        const initalValue = this._el.nativeElement.value;
        this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
        }
    }
};
__decorate([
    HostListener('input', ['$event'])
], NumberDirective.prototype, "onInputChange", null);
NumberDirective = __decorate([
    Directive({
        selector: 'input[numbersOnly]'
    })
], NumberDirective);
export { NumberDirective };
//# sourceMappingURL=numbers-only.directive.js.map