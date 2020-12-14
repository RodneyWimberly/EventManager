import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { NewClient } from '@shared/viewModel/client.model';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { FileViewModel } from '@shared/viewModel/file.model';
import { ToasterConfig } from 'angular2-toaster';
let ClientAddComponent = class ClientAddComponent {
    constructor(router, translator, clientService, toasterService, settings) {
        this.router = router;
        this.translator = translator;
        this.clientService = clientService;
        this.toasterService = toasterService;
        this.settings = settings;
        this.toasterconfig = new ToasterConfig({
            positionClass: 'toast-top-right',
            showCloseButton: true
        });
        this.bsConfig = {
            containerClass: 'theme-angle'
        };
        // Image settings
        this.imageChangedEvent = '';
        this.croppedImage = '';
        this.showCropper = false;
    }
    ngOnInit() {
        this.errors = [];
        this.model = new NewClient();
        this.showButtonLoading = false;
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
    selectClient(type) {
        this.model.clientType = type;
    }
    save() {
        this.showButtonLoading = true;
        if (this.fileData != null) {
            this.model.logo = new FileViewModel(this.file.name, this.file.type, this.fileData.base64.split(',')[1]);
        }
        this.clientService.save(this.model).subscribe(registerResult => {
            if (registerResult) {
                this.showSuccessMessage();
                this.router.navigate(['/clients', this.model.clientId, 'edit']);
            }
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
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
        this.fileData = event;
        this.croppedImage = event.base64;
    }
    imageLoaded() {
        this.showCropper = true;
    }
    loadImageFailed() {
        // show message
    }
};
ClientAddComponent = __decorate([
    Component({
        selector: "app-client-add",
        templateUrl: "./add.component.html",
        styleUrls: ["./add.component.scss"],
        encapsulation: ViewEncapsulation.None
    })
], ClientAddComponent);
export { ClientAddComponent };
//# sourceMappingURL=add.component.js.map