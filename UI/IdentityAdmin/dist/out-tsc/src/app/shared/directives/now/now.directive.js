import { __decorate } from "tslib";
import { Directive, Input } from '@angular/core';
import * as moment from 'moment';
let NowDirective = class NowDirective {
    constructor(element) {
        this.element = element;
    }
    ngOnInit() {
        this.updateTime();
        this.intervalId = setInterval(this.updateTime.bind(this), 1000);
    }
    updateTime() {
        let dt = moment().format(this.format);
        this.element.nativeElement.innerHTML = dt;
    }
    ngOnDestroy() {
        clearInterval(this.intervalId);
    }
};
__decorate([
    Input()
], NowDirective.prototype, "format", void 0);
NowDirective = __decorate([
    Directive({
        selector: '[now]'
    })
], NowDirective);
export { NowDirective };
//# sourceMappingURL=now.directive.js.map