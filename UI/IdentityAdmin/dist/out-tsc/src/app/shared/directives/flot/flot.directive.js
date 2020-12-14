import { __decorate } from "tslib";
import { Directive, Input, Output, EventEmitter } from '@angular/core';
let FlotDirective = class FlotDirective {
    constructor(el) {
        this.el = el;
        this.ready = new EventEmitter();
        this.element = $(this.el.nativeElement);
        if (!$.plot) {
            console.log('Flot chart no available.');
        }
        this.plot = null;
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        if (!$.plot) {
            return;
        }
        if (changes['dataset']) {
            this.onDatasetChanged(this.dataset);
        }
        if (changes['series']) {
            this.onSerieToggled(this.series);
        }
    }
    init() {
        const heightDefault = 220;
        this.width = this.attrWidth || '100%';
        this.height = this.height || heightDefault;
        this.element.css({
            width: this.width,
            height: this.height
        });
        let plotObj;
        if (!this.dataset || !this.options) {
            return;
        }
        plotObj = $.plot(this.el.nativeElement, this.dataset, this.options);
        if (this.ready) {
            this.ready.next({ plot: plotObj });
        }
        return plotObj;
    }
    onDatasetChanged(dataset) {
        if (this.plot) {
            this.plot.setData(dataset);
            this.plot.setupGrid();
            return this.plot.draw();
        }
        else {
            this.plot = this.init();
            this.onSerieToggled(this.series);
            return this.plot;
        }
    }
    onSerieToggled(series) {
        if (!this.plot || !series) {
            return;
        }
        let someData = this.plot.getData();
        for (let sName in series) {
            series[sName].forEach(toggleFor(sName));
        }
        this.plot.setData(someData);
        this.plot.draw();
        function toggleFor(sName) {
            return function (s, i) {
                if (someData[i] && someData[i][sName]) {
                    someData[i][sName].show = s;
                }
            };
        }
    }
    ngOnDestroy() {
        if (this.plot) {
            this.plot.shutdown();
        }
    }
};
__decorate([
    Input()
], FlotDirective.prototype, "dataset", void 0);
__decorate([
    Input()
], FlotDirective.prototype, "options", void 0);
__decorate([
    Input()
], FlotDirective.prototype, "attrWidth", void 0);
__decorate([
    Input()
], FlotDirective.prototype, "height", void 0);
__decorate([
    Input()
], FlotDirective.prototype, "series", void 0);
__decorate([
    Output()
], FlotDirective.prototype, "ready", void 0);
FlotDirective = __decorate([
    Directive({
        selector: '[flot]'
    })
], FlotDirective);
export { FlotDirective };
//# sourceMappingURL=flot.directive.js.map