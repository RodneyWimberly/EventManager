import { __decorate } from "tslib";
import { Directive, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
let BootstrapTabDirective = class BootstrapTabDirective {
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
        this.showBSTab = new EventEmitter();
        this.hideBSTab = new EventEmitter();
        this.tabShownSubscription = fromEvent($(this.el.nativeElement), 'show.bs.tab')
            .subscribe((e) => {
            this.runInZone(() => this.showBSTab.emit({ type: e.type, target: e.target, relatedTarget: e.relatedTarget }));
        });
        this.tabHiddenSubscription = fromEvent($(this.el.nativeElement), 'hidden.bs.tab')
            .subscribe((e) => {
            this.runInZone(() => this.hideBSTab.emit({ type: e.type, target: e.target, relatedTarget: e.relatedTarget }));
        });
    }
    ngOnDestroy() {
        this.tabShownSubscription.unsubscribe();
        this.tabHiddenSubscription.unsubscribe();
    }
    runInZone(delegate) {
        this.zone.run(() => {
            delegate();
        });
    }
    show(selector) {
        $(selector).tab('show');
    }
};
__decorate([
    Output()
], BootstrapTabDirective.prototype, "showBSTab", void 0);
__decorate([
    Output()
], BootstrapTabDirective.prototype, "hideBSTab", void 0);
BootstrapTabDirective = __decorate([
    Directive({
        selector: '[bootstrapTab]',
        exportAs: 'bootstrap-tab'
    })
], BootstrapTabDirective);
export { BootstrapTabDirective };
//# sourceMappingURL=bootstrap-tab.directive.js.map