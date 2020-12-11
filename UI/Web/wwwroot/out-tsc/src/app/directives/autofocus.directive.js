import { __decorate } from "tslib";
import { Directive } from '@angular/core';
let AutofocusDirective = class AutofocusDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        setTimeout(() => this.elementRef.nativeElement.focus(), 500);
    }
};
AutofocusDirective = __decorate([
    Directive({
        selector: '[autofocus]'
    })
], AutofocusDirective);
export { AutofocusDirective };
//# sourceMappingURL=autofocus.directive.js.map