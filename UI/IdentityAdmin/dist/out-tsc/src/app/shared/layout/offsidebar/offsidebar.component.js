import { __decorate } from "tslib";
import { Component } from "@angular/core";
let OffsidebarComponent = class OffsidebarComponent {
    constructor(settings, themes, translator) {
        this.settings = settings;
        this.themes = themes;
        this.translator = translator;
        this.clickEvent = "click.offsidebar";
        this.$doc = null;
        this.currentTheme = themes.getDefaultTheme();
        this.selectedLanguage = this.getLangs()[0].code;
    }
    ngOnInit() {
        this.anyClickClose();
    }
    setTheme() {
        this.themes.setTheme(this.currentTheme);
    }
    getLangs() {
        return this.translator.getAvailableLanguages();
    }
    setLang(value) {
        this.translator.useLanguage(value);
    }
    anyClickClose() {
        this.$doc = $(document).on(this.clickEvent, (e) => {
            if (!$(e.target).parents(".offsidebar").length) {
                this.settings.layout.offsidebarOpen = false;
            }
        });
    }
    ngOnDestroy() {
        if (this.$doc)
            this.$doc.off(this.clickEvent);
    }
};
OffsidebarComponent = __decorate([
    Component({
        selector: "app-offsidebar",
        templateUrl: "./offsidebar.component.html",
        styleUrls: ["./offsidebar.component.scss"]
    })
], OffsidebarComponent);
export { OffsidebarComponent };
//# sourceMappingURL=offsidebar.component.js.map