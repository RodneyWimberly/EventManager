import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let LoadingSpinnerComponent = class LoadingSpinnerComponent {
    constructor() {
        this.height = 40;
        this.width = 40;
        this.whiteStroke = false;
    }
};
__decorate([
    Input()
], LoadingSpinnerComponent.prototype, "height", void 0);
__decorate([
    Input()
], LoadingSpinnerComponent.prototype, "width", void 0);
__decorate([
    Input()
], LoadingSpinnerComponent.prototype, "whiteStroke", void 0);
LoadingSpinnerComponent = __decorate([
    Component({
        selector: 'loading-spinner',
        template: `
  <div class="spinner-container d-flex" [style.height.px]="height" [style.width.px]="width">
    <svg class="spinner" viewBox="0 0 50 50" [style.height.px]="height" [style.width.px]="width">
      <circle class="path" [class.white-stroke]="whiteStroke"
        cx="25" cy="25" r="20" fill="none" stroke-width="5">
      </circle>
    </svg>
  </div>`,
        styleUrls: ['./loading-spinner.component.scss'],
    })
], LoadingSpinnerComponent);
export { LoadingSpinnerComponent };
//# sourceMappingURL=loading-spinner.component.js.map