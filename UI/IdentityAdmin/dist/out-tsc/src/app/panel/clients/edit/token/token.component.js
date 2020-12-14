import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ClientTokenComponent = class ClientTokenComponent {
    constructor(route, translator) {
        this.route = route;
        this.translator = translator;
    }
    ngOnInit() {
        this.accessTokenTypes = [{ id: 0, text: "Jwt" }, { id: 1, text: "Reference" }];
        this.refreshTokenUsages = [{ id: 0, text: "ReUse" }, { id: 1, text: "One Time Only" }];
        this.tokenExpirations = [{ id: 0, text: "Sliding" }, { id: 1, text: "Absolute" }];
    }
};
__decorate([
    Input()
], ClientTokenComponent.prototype, "model", void 0);
ClientTokenComponent = __decorate([
    Component({
        selector: "app-client-token",
        templateUrl: "./token.component.html",
        styleUrls: ["./token.component.scss"],
    })
], ClientTokenComponent);
export { ClientTokenComponent };
//# sourceMappingURL=token.component.js.map