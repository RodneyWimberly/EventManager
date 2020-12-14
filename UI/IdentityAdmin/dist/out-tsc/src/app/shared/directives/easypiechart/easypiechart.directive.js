import { __decorate } from "tslib";
import { Directive, Input } from '@angular/core';
let EasypiechartDirective = class EasypiechartDirective {
    constructor(element) {
        this.element = element;
        /**
         * default easy pie chart options
         * @type {Object}
         */
        this.defaultOptions = {
            barColor: '#ef1e25',
            trackColor: '#f9f9f9',
            scaleColor: '#dfe0e0',
            scaleLength: 5,
            lineCap: 'round',
            lineWidth: 3,
            size: 110,
            rotate: 0,
            animate: {
                duration: 1000,
                enabled: true
            }
        };
        this.percent = this.percent || 0;
        this.options = $.extend({}, this.defaultOptions, this.options);
    }
    ngOnInit() {
        if (EasyPieChart) {
            this.pieChart = new EasyPieChart(this.element.nativeElement, this.options);
            this.pieChart.update(this.percent);
        }
    }
    ngOnChanges(changes) {
        if (this.pieChart && changes['percent']) {
            this.pieChart.update(this.percent);
        }
    }
};
__decorate([
    Input()
], EasypiechartDirective.prototype, "percent", void 0);
__decorate([
    Input()
], EasypiechartDirective.prototype, "options", void 0);
EasypiechartDirective = __decorate([
    Directive({
        selector: '[easypiechart]'
    })
], EasypiechartDirective);
export { EasypiechartDirective };
//# sourceMappingURL=easypiechart.directive.js.map