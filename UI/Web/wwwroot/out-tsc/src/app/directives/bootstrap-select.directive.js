import { __decorate } from "tslib";
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
let BootstrapSelectDirective = class BootstrapSelectDirective {
    constructor(el) {
        this.el = el;
        this.oldValues = '';
        this.ngModelChange = new EventEmitter();
        this.shown = new EventEmitter();
        this.hidden = new EventEmitter();
        this.changedSubscription = fromEvent($(this.el.nativeElement), 'changed.bs.select').subscribe((e) => setTimeout(() => {
            if (this.checkIsValuesChanged(this.selected)) {
                this.ngModelChange.emit(this.selected);
            }
        }));
        this.shownSubscription = fromEvent($(this.el.nativeElement), 'shown.bs.select').subscribe((e) => setTimeout(() => this.shown.emit()));
        this.hiddenSubscription = fromEvent($(this.el.nativeElement), 'hidden.bs.select').subscribe((e) => setTimeout(() => this.hidden.emit()));
    }
    set ngModel(values) {
        setTimeout(() => this.selected = values);
    }
    ngOnInit() {
        $(this.el.nativeElement).selectpicker();
        if (this.requiredAttribute) {
            $(this.el.nativeElement).selectpicker('setStyle', 'required', 'add');
        }
        setTimeout(() => {
            this.refresh();
            this.doValidation();
        });
    }
    ngOnDestroy() {
        if (this.changedSubscription) {
            this.changedSubscription.unsubscribe();
        }
        if (this.shownSubscription) {
            this.shownSubscription.unsubscribe();
        }
        if (this.hiddenSubscription) {
            this.hiddenSubscription.unsubscribe();
        }
        $(this.el.nativeElement).selectpicker('destroy');
    }
    checkIsValuesChanged(newValue) {
        return !(newValue == this.oldValues ||
            (newValue instanceof Array && newValue.length === this.oldValues.length && newValue.every((v, i) => v === this.oldValues[i])));
    }
    doValidation() {
        if (this.requiredAttribute) {
            $(this.el.nativeElement).selectpicker('setStyle', !this.valid ? 'ng-valid' : 'ng-invalid', 'remove');
            $(this.el.nativeElement).selectpicker('setStyle', this.valid ? 'ng-valid' : 'ng-invalid', 'add');
        }
    }
    get requiredAttribute() {
        return this.required === '' || this.required == 'true';
    }
    refresh() {
        setTimeout(() => {
            $(this.el.nativeElement).selectpicker('refresh');
        });
    }
    render() {
        setTimeout(() => {
            $(this.el.nativeElement).selectpicker('render');
        });
    }
    get valid() {
        return this.requiredAttribute ? this.selected && this.selected.length > 0 : true;
    }
    set selected(values) {
        if (!this.checkIsValuesChanged(values)) {
            return;
        }
        this.oldValues = this.selected;
        $(this.el.nativeElement).selectpicker('val', values);
        this.doValidation();
    }
    get selected() {
        return $(this.el.nativeElement).selectpicker('val');
    }
};
__decorate([
    Input()
], BootstrapSelectDirective.prototype, "required", void 0);
__decorate([
    Input()
], BootstrapSelectDirective.prototype, "ngModel", null);
__decorate([
    Output()
], BootstrapSelectDirective.prototype, "ngModelChange", void 0);
__decorate([
    Output()
], BootstrapSelectDirective.prototype, "shown", void 0);
__decorate([
    Output()
], BootstrapSelectDirective.prototype, "hidden", void 0);
BootstrapSelectDirective = __decorate([
    Directive({
        selector: '[bootstrapSelect]',
        exportAs: 'bootstrap-select'
    })
], BootstrapSelectDirective);
export { BootstrapSelectDirective };
//# sourceMappingURL=bootstrap-select.directive.js.map