import { __decorate } from "tslib";
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
let BootstrapDatepickerDirective = class BootstrapDatepickerDirective {
    constructor(el) {
        this.el = el;
        this._isShown = false;
        this.options = {};
        this.ngModelChange = new EventEmitter();
        this.changedSubscription = fromEvent($(this.el.nativeElement), 'change').subscribe((e) => setTimeout(() => this.ngModelChange.emit(e.target.value)));
        this.shownSubscription = fromEvent($(this.el.nativeElement), 'show').subscribe((e) => this._isShown = true);
        this.hiddenSubscription = fromEvent($(this.el.nativeElement), 'hide').subscribe((e) => this._isShown = false);
    }
    get isShown() {
        return this._isShown;
    }
    set ngModel(value) {
        this.tryUpdate(value);
    }
    ngOnInit() {
        this.initialize(this.options);
    }
    ngOnDestroy() {
        this.destroy();
    }
    initialize(options) {
        $(this.el.nativeElement).datepicker(options);
    }
    destroy() {
        if (this.changedSubscription) {
            this.changedSubscription.unsubscribe();
            this.shownSubscription.unsubscribe();
            this.hiddenSubscription.unsubscribe();
        }
        $(this.el.nativeElement).datepicker('destroy');
    }
    show() {
        $(this.el.nativeElement).datepicker('show');
    }
    hide() {
        $(this.el.nativeElement).datepicker('hide');
    }
    toggle() {
        this.isShown ? this.hide() : this.show();
    }
    tryUpdate(value) {
        clearTimeout(this.updateTimeout);
        if (!$(this.el.nativeElement).is(':focus')) {
            this.update(value);
        }
        else {
            this.updateTimeout = setTimeout(() => {
                this.updateTimeout = null;
                this.tryUpdate(value);
            }, 100);
        }
    }
    update(value) {
        setTimeout(() => $(this.el.nativeElement).datepicker('update', value));
    }
    setDate(value) {
        setTimeout(() => $(this.el.nativeElement).datepicker('setDate', value));
    }
    setUTCDate(value) {
        setTimeout(() => $(this.el.nativeElement).datepicker('setUTCDate', value));
    }
    clearDates() {
        setTimeout(() => $(this.el.nativeElement).datepicker('clearDates'));
    }
    getDate() {
        $(this.el.nativeElement).datepicker('getDate');
    }
    getUTCDate() {
        $(this.el.nativeElement).datepicker('getUTCDate');
    }
};
__decorate([
    Input()
], BootstrapDatepickerDirective.prototype, "options", void 0);
__decorate([
    Input()
], BootstrapDatepickerDirective.prototype, "ngModel", null);
__decorate([
    Output()
], BootstrapDatepickerDirective.prototype, "ngModelChange", void 0);
BootstrapDatepickerDirective = __decorate([
    Directive({
        selector: '[bootstrapDatepicker]',
        exportAs: 'bootstrap-datepicker'
    })
], BootstrapDatepickerDirective);
export { BootstrapDatepickerDirective };
//# sourceMappingURL=bootstrap-datepicker.directive.js.map