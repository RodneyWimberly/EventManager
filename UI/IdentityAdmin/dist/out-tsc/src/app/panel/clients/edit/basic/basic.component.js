import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FileViewModel } from '@shared/viewModel/file.model';
let ClientBasicComponent = class ClientBasicComponent {
    constructor(route, translator, settings) {
        this.route = route;
        this.translator = translator;
        this.settings = settings;
        // Image settings
        this.imageChangedEvent = '';
        this.croppedImage = '';
        this.showCropper = false;
    }
    ngOnInit() {
    }
    fileChangeEvent(event) {
        if (event == null || event.target == null)
            return;
        const fileToUpload = event.target.files.item(0);
        this.file = fileToUpload;
        const reader = new FileReader();
        reader.readAsDataURL(fileToUpload);
        this.imageChangedEvent = event;
        this.showCropper = true;
    }
    imageCropped(event) {
        this.model.logo = new FileViewModel(this.file.name, this.file.type, event.base64.split(',')[1]);
        this.croppedImage = event.base64;
    }
    imageLoaded() {
        this.showCropper = true;
    }
    loadImageFailed() {
        // show message
    }
};
__decorate([
    Input()
], ClientBasicComponent.prototype, "model", void 0);
ClientBasicComponent = __decorate([
    Component({
        selector: "app-client-basic",
        templateUrl: "./basic.component.html",
        styleUrls: ["./basic.component.scss"],
    })
], ClientBasicComponent);
export { ClientBasicComponent };
//# sourceMappingURL=basic.component.js.map