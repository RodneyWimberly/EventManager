import { __awaiter, __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { environment } from '@env/environment';
const screenfull = require("screenfull");
const browser = require("jquery.browser");
let HeaderComponent = class HeaderComponent {
    constructor(menu, userblockService, settings, authService, router) {
        this.menu = menu;
        this.userblockService = userblockService;
        this.settings = settings;
        this.authService = authService;
        this.router = router;
        this.navCollapsed = true; // for horizontal layout
        this.menuItems = []; // for horizontal layout
        // show only a few items on demo
        this.menuItems = menu.getMenu();
    }
    ngOnInit() {
        this.ssoUri = environment.IssuerUri;
        this.isNavSearchVisible = false;
        if (browser.msie) { // Not supported under IE
            this.fsbutton.nativeElement.style.display = "none";
        }
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authService.logout();
        });
    }
    toggleUserBlock(event) {
        event.preventDefault();
        this.userblockService.toggleVisibility();
    }
    openNavSearch(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setNavSearchVisible(true);
    }
    setNavSearchVisible(stat) {
        // console.log(stat);
        this.isNavSearchVisible = stat;
    }
    getNavSearchVisible() {
        return this.isNavSearchVisible;
    }
    toggleOffsidebar() {
        this.settings.layout.offsidebarOpen = !this.settings.layout.offsidebarOpen;
    }
    toggleCollapsedSideabar() {
        this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    }
    isCollapsedText() {
        return this.settings.layout.isCollapsedText;
    }
    toggleFullScreen(event) {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
        // Switch icon indicator
        let el = $(this.fsbutton.nativeElement);
        if (screenfull.isFullscreen) {
            el.children("em").removeClass("fa-expand").addClass("fa-compress");
        }
        else {
            el.children("em").removeClass("fa-compress").addClass("fa-expand");
        }
    }
};
__decorate([
    ViewChild("fsbutton", { static: false })
], HeaderComponent.prototype, "fsbutton", void 0);
HeaderComponent = __decorate([
    Component({
        selector: "app-header",
        templateUrl: "./header.component.html",
        styleUrls: ["./header.component.scss"],
        providers: []
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map