import { __decorate } from "tslib";
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
let BootstrapToggleDirective = class BootstrapToggleDirective {
    constructor(el) {
        this.el = el;
        this.ngModelChange = new EventEmitter();
        this.checkedSubscription = fromEvent($(this.el.nativeElement), 'change')
            .subscribe((e) => this.ngModelChange.emit(e.target.checked));
    }
    set ngModel(value) {
        this.toggle(value);
    }
    ngOnInit() {
        this.initialize();
    }
    ngOnDestroy() {
        this.destroy();
    }
    initialize(options) {
        $(this.el.nativeElement).bootstrapToggle(options);
    }
    destroy() {
        if (this.checkedSubscription) {
            this.checkedSubscription.unsubscribe();
        }
        $(this.el.nativeElement).bootstrapToggle('destroy');
    }
    toggleOn() {
        $(this.el.nativeElement).bootstrapToggle('on');
    }
    toggleOff() {
        $(this.el.nativeElement).bootstrapToggle('off');
    }
    toggle(value) {
        if (value == null) {
            $(this.el.nativeElement).bootstrapToggle('toggle');
        }
        else {
            $(this.el.nativeElement).prop('checked', value).change();
        }
    }
    enable() {
        $(this.el.nativeElement).bootstrapToggle('enable');
    }
    disable() {
        $(this.el.nativeElement).bootstrapToggle('disable');
    }
};
__decorate([
    Input()
], BootstrapToggleDirective.prototype, "ngModel", null);
__decorate([
    Output()
], BootstrapToggleDirective.prototype, "ngModelChange", void 0);
BootstrapToggleDirective = __decorate([
    Directive({
        selector: '[bootstrapToggle]',
        exportAs: 'bootstrap-toggle'
    })
], BootstrapToggleDirective);
export { BootstrapToggleDirective };
//# sourceMappingURL=bootstrap-toggle.directive.js.map