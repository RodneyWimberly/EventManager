import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
let ClientDeviceFlowComponent = class ClientDeviceFlowComponent {
    constructor(route, translator) {
        this.route = route;
        this.translator = translator;
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], ClientDeviceFlowComponent.prototype, "model", void 0);
ClientDeviceFlowComponent = __decorate([
    Component({
        selector: "app-client-device-flow",
        templateUrl: "./device-flow.component.html",
        styleUrls: ["./device-flow.component.scss"],
    })
], ClientDeviceFlowComponent);
export { ClientDeviceFlowComponent };
//# sourceMappingURL=device-flow.component.js.map