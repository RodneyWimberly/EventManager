import { __decorate } from "tslib";
import { Directive, Input } from '@angular/core';
let JqcloudDirective = class JqcloudDirective {
    constructor(element) {
        this.initialized = false; // flag to not update before plugin was initialized
        this.$elem = $(element.nativeElement);
        this.options = $.fn.jQCloud.defaults.get();
    }
    ngOnInit() {
        let opts = {};
        if (this.width) {
            opts.width = this.width;
        }
        if (this.height) {
            opts.height = this.height;
        }
        if (this.steps) {
            opts.steps = this.steps;
        }
        $.extend(this.options, opts);
        this.$elem.jQCloud(this.words, opts);
        this.initialized = true;
    }
    ngOnChanges(changes) {
        if (this.initialized && this.words && changes['words']) {
            this.$elem.jQCloud('update', this.words);
        }
    }
    ngOnDestroy() {
        this.$elem.jQCloud('destroy');
    }
};
__decorate([
    Input()
], JqcloudDirective.prototype, "words", void 0);
__decorate([
    Input()
], JqcloudDirective.prototype, "width", void 0);
__decorate([
    Input()
], JqcloudDirective.prototype, "height", void 0);
__decorate([
    Input()
], JqcloudDirective.prototype, "steps", void 0);
JqcloudDirective = __decorate([
    Directive({
        selector: '[jqcloud]'
    })
], JqcloudDirective);
export { JqcloudDirective };
//# sourceMappingURL=jqcloud.directive.js.map