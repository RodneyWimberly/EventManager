import { __decorate } from "tslib";
import { Directive } from '@angular/core';
let CheckallDirective = class CheckallDirective {
    constructor(el) {
        this.el = el;
        let $element = $(el.nativeElement);
        $element.on('change', function () {
            let index = $element.index() + 1, checkbox = $element.find('input[type="checkbox"]'), table = $element.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]')
                .prop('checked', checkbox[0].checked);
        });
    }
};
CheckallDirective = __decorate([
    Directive({
        selector: '[checkAll]'
    })
], CheckallDirective);
export { CheckallDirective };
//# sourceMappingURL=checkall.directive.js.map