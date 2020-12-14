import { __decorate } from "tslib";
import { Component } from "@angular/core";
let UserblockComponent = class UserblockComponent {
    constructor(userblockService, settings) {
        this.userblockService = userblockService;
        this.settings = settings;
    }
    ngOnInit() {
        this.settings.getUserProfile().subscribe(a => this.user = a);
    }
    getUserImage() {
        if (this.user != null && this.user.picture != null)
            return this.user.picture;
        return "assets/img/dummy.png";
    }
    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }
};
UserblockComponent = __decorate([
    Component({
        selector: "app-userblock",
        templateUrl: "./userblock.component.html",
        styleUrls: ["./userblock.component.scss"]
    })
], UserblockComponent);
export { UserblockComponent };
//# sourceMappingURL=userblock.component.js.map