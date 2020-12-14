import { __decorate } from "tslib";
import { Component } from "@angular/core";
let SpinnersComponent = class SpinnersComponent {
    constructor(translator) {
        this.translator = translator;
    }
    ngOnInit() {
        this.spinner = Math.floor(Math.random() * 38);
    }
};
SpinnersComponent = __decorate([
    Component({
        selector: "app-loading",
        templateUrl: "./spinners.component.html"
    })
], SpinnersComponent);
export { SpinnersComponent };
//# sourceMappingURL=spinners.component.js.map