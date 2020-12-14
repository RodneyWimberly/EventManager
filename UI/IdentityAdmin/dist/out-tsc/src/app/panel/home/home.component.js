import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { environment } from "@env/environment";
let HomeComponent = class HomeComponent {
    constructor(translator) {
        this.translator = translator;
        this.env = environment;
    }
    ngOnInit() {
    }
};
HomeComponent = __decorate([
    Component({
        selector: "app-home",
        templateUrl: "./home.component.html",
        styleUrls: ["./home.component.scss"]
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map