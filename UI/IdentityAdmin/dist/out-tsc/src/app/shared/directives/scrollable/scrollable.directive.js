import { __decorate } from "tslib";
import { Directive, Input } from '@angular/core';
let ScrollableDirective = class ScrollableDirective {
    constructor(element) {
        this.element = element;
        this.defaultHeight = 250;
    }
    ngOnInit() {
        $(this.element.nativeElement).slimScroll({
            height: (this.height || this.defaultHeight)
        });
    }
};
__decorate([
    Input()
], ScrollableDirective.prototype, "height", void 0);
ScrollableDirective = __decorate([
    Directive({
        selector: 'scrollable'
    })
], ScrollableDirective);
export { ScrollableDirective };
//# sourceMappingURL=scrollable.directive.js.map