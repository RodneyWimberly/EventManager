import { __decorate } from "tslib";
import { Directive, Input, Output, EventEmitter } from '@angular/core';
let LastElementDirective = class LastElementDirective {
    constructor() {
        this.lastFunction = new EventEmitter();
    }
    set lastElement(isLastElement) {
        if (isLastElement) {
            setTimeout(() => {
                this.lastFunction.emit();
            });
        }
    }
};
__decorate([
    Input()
], LastElementDirective.prototype, "lastElement", null);
__decorate([
    Output()
], LastElementDirective.prototype, "lastFunction", void 0);
LastElementDirective = __decorate([
    Directive({
        selector: '[lastElement]'
    })
], LastElementDirective);
export { LastElementDirective };
//# sourceMappingURL=last-element.directive.js.map