import { __decorate } from "tslib";
import { Directive, Input } from '@angular/core';
let VectormapDirective = class VectormapDirective {
    constructor(element) {
        this.element = element;
    }
    ngOnInit() {
        this.$element = $(this.element.nativeElement);
        this.$element.css('height', this.mapHeight);
        if (!this.$element.length || !this.$element.vectorMap) {
            return;
        }
        this.$element.vectorMap({
            map: this.mapName,
            backgroundColor: this.mapOptions.bgColor,
            zoomMin: 1,
            zoomMax: 8,
            zoomOnScroll: false,
            regionStyle: {
                initial: {
                    'fill': this.mapOptions.regionFill,
                    'fill-opacity': 1,
                    'stroke': 'none',
                    'stroke-width': 1.5,
                    'stroke-opacity': 1
                },
                hover: {
                    'fill-opacity': 0.8
                },
                selected: {
                    fill: 'blue'
                },
                selectedHover: {}
            },
            focusOn: { x: 0.4, y: 0.6, scale: this.mapOptions.scale },
            markerStyle: {
                initial: {
                    fill: this.mapOptions.markerColor,
                    stroke: this.mapOptions.markerColor
                }
            },
            onRegionLabelShow: (e, el, code) => {
                if (this.seriesData && this.seriesData[code]) {
                    el.html(el.html() + ': ' + this.seriesData[code] + ' visitors');
                }
            },
            markers: this.markersData,
            series: {
                regions: [{
                        values: this.seriesData,
                        scale: this.mapOptions.scaleColors,
                        normalizeFunction: 'polynomial'
                    }]
            },
        });
    }
    ngOnDestroy() {
        this.$element.vectorMap('get', 'mapObject').remove();
    }
};
__decorate([
    Input()
], VectormapDirective.prototype, "mapHeight", void 0);
__decorate([
    Input()
], VectormapDirective.prototype, "mapName", void 0);
__decorate([
    Input()
], VectormapDirective.prototype, "mapOptions", void 0);
__decorate([
    Input()
], VectormapDirective.prototype, "seriesData", void 0);
__decorate([
    Input()
], VectormapDirective.prototype, "markersData", void 0);
VectormapDirective = __decorate([
    Directive({
        selector: '[vectormap]'
    })
], VectormapDirective);
export { VectormapDirective };
//# sourceMappingURL=vectormap.directive.js.map