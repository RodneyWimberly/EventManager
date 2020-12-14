import { __decorate } from "tslib";
import { Component, HostBinding } from '@angular/core';
// import { authConfig } from "./core/auth/auth.config";
let AppComponent = class AppComponent {
    constructor(authService, settings) {
        this.authService = authService;
        this.settings = settings;
        this.authService.runInitialLoginSequence();
    }
    get isFixed() { return this.settings.layout.isFixed; }
    get isCollapsed() { return this.settings.layout.isCollapsed; }
    get isBoxed() { return this.settings.layout.isBoxed; }
    get useFullLayout() { return this.settings.layout.useFullLayout; }
    get hiddenFooter() { return this.settings.layout.hiddenFooter; }
    get horizontal() { return this.settings.layout.horizontal; }
    get isFloat() { return this.settings.layout.isFloat; }
    get offsidebarOpen() { return this.settings.layout.offsidebarOpen; }
    get asideToggled() { return this.settings.layout.asideToggled; }
    get isCollapsedText() { return this.settings.layout.isCollapsedText; }
    ngOnInit() {
        $(document).on("click", "[href=\"#\"]", e => e.preventDefault());
    }
};
__decorate([
    HostBinding("class.layout-fixed")
], AppComponent.prototype, "isFixed", null);
__decorate([
    HostBinding("class.aside-collapsed")
], AppComponent.prototype, "isCollapsed", null);
__decorate([
    HostBinding("class.layout-boxed")
], AppComponent.prototype, "isBoxed", null);
__decorate([
    HostBinding("class.layout-fs")
], AppComponent.prototype, "useFullLayout", null);
__decorate([
    HostBinding("class.hidden-footer")
], AppComponent.prototype, "hiddenFooter", null);
__decorate([
    HostBinding("class.layout-h")
], AppComponent.prototype, "horizontal", null);
__decorate([
    HostBinding("class.aside-float")
], AppComponent.prototype, "isFloat", null);
__decorate([
    HostBinding("class.offsidebar-open")
], AppComponent.prototype, "offsidebarOpen", null);
__decorate([
    HostBinding("class.aside-toggled")
], AppComponent.prototype, "asideToggled", null);
__decorate([
    HostBinding("class.aside-collapsed-text")
], AppComponent.prototype, "isCollapsedText", null);
AppComponent = __decorate([
    Component({
        selector: "app-root",
        templateUrl: "./app.component.html",
        styleUrls: ["./app.component.scss"]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map