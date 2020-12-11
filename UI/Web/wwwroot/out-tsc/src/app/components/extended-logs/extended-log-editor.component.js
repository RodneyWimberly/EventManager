import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import * as generated from '../../services/endpoint.services';
let ExtendedLogEditorComponent = class ExtendedLogEditorComponent {
    constructor() {
        this.logEdit = new generated.ExtendedLogViewModel();
        this.selectedValues = {};
        this.formResetToggle = true;
    }
    cancel() {
        this.logEdit = new generated.ExtendedLogViewModel();
        this.resetForm();
        if (this.changesCancelledCallback) {
            this.changesCancelledCallback();
        }
    }
    resetForm(replace = false) {
        if (!replace) {
            this.form.reset();
        }
        else {
            this.formResetToggle = false;
            setTimeout(() => {
                this.formResetToggle = true;
            });
        }
    }
    editLog(log) {
        if (log) {
            this.editingLogId = log.id;
            this.selectedValues = {};
            this.logEdit = new generated.ExtendedLogViewModel();
            Object.assign(this.logEdit, log);
            return this.logEdit;
        }
    }
    get errorLevel() {
        return this.logEdit.level + " - " + this.logEdit.levelDescription;
    }
    set errorLevel(value) {
    }
};
__decorate([
    ViewChild('f')
], ExtendedLogEditorComponent.prototype, "form", void 0);
ExtendedLogEditorComponent = __decorate([
    Component({
        selector: 'extended-log-editor',
        templateUrl: './extended-log-editor.component.html',
        styleUrls: ['./extended-log-editor.component.scss']
    })
], ExtendedLogEditorComponent);
export { ExtendedLogEditorComponent };
//# sourceMappingURL=extended-log-editor.component.js.map