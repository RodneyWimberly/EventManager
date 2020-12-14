import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ScopeService } from '@shared/services/scope.service';
import { debounceTime, map } from 'rxjs/operators';
let ClientSettingsComponent = class ClientSettingsComponent {
    constructor(route, translator, scopeService) {
        this.route = route;
        this.translator = translator;
        this.scopeService = scopeService;
        this.requestScopeItems = (text) => {
            return this.scopeService.getScopes(text).pipe(debounceTime(500)).pipe(map(a => a));
        };
    }
    addGrantType(type) {
        if (this.model.allowedGrantTypes.find(a => a == type) == null)
            this.model.allowedGrantTypes.push(type);
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], ClientSettingsComponent.prototype, "model", void 0);
ClientSettingsComponent = __decorate([
    Component({
        selector: "app-client-settings",
        templateUrl: "./settings.component.html",
        styleUrls: ["./settings.component.scss"],
        providers: [ScopeService]
    })
], ClientSettingsComponent);
export { ClientSettingsComponent };
//# sourceMappingURL=settings.component.js.map