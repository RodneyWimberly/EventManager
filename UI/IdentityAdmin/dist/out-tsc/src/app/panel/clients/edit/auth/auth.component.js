import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
let ClientAuthComponent = class ClientAuthComponent {
    constructor(route, translator) {
        this.route = route;
        this.translator = translator;
    }
    ngOnInit() {
    }
    addIdentityProvidersRestrictions(type) {
        if (this.model.identityProviderRestrictions.find(a => a == type) == null)
            this.model.identityProviderRestrictions.push(type);
    }
};
__decorate([
    Input()
], ClientAuthComponent.prototype, "model", void 0);
ClientAuthComponent = __decorate([
    Component({
        selector: "app-client-auth",
        templateUrl: "./auth.component.html",
        styleUrls: ["./auth.component.scss"],
    })
], ClientAuthComponent);
export { ClientAuthComponent };
//# sourceMappingURL=auth.component.js.map