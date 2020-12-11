import { __decorate } from "tslib";
import { Component, Input, ContentChild } from '@angular/core';
import { InputRefDirective } from '../../directives/input-ref.directive';
let ValidationControlComponent = class ValidationControlComponent {
    constructor(translationService) {
        this.translationService = translationService;
        this.isEditMode = true;
        this.showValidationErrors = true;
        this.showSeperator = true;
    }
    ngOnInit() {
    }
    get label() {
        return this.translationService.getTranslation(this.translationKey);
    }
    get controlName() {
        return this.input.controlName;
    }
    get controlValue() {
        return this.input.controlValue;
    }
    get hasError() {
        return this.input.hasError;
    }
    get errorMessages() {
        const messages = [];
        const errorKeys = Object.keys(this.input.errors);
        errorKeys.forEach(errorKey => {
            messages.push(this.translationService.getTranslation(this.translationKey + "Validations." + errorKey));
        });
        return messages;
    }
};
__decorate([
    Input()
], ValidationControlComponent.prototype, "isEditMode", void 0);
__decorate([
    Input()
], ValidationControlComponent.prototype, "showValidationErrors", void 0);
__decorate([
    Input()
], ValidationControlComponent.prototype, "showSeperator", void 0);
__decorate([
    Input()
], ValidationControlComponent.prototype, "form", void 0);
__decorate([
    Input()
], ValidationControlComponent.prototype, "translationKey", void 0);
__decorate([
    ContentChild(InputRefDirective, { static: true })
], ValidationControlComponent.prototype, "input", void 0);
ValidationControlComponent = __decorate([
    Component({
        selector: 'validation-control',
        templateUrl: './validation-control.component.html',
        styleUrls: ['./validation-control.component.scss']
    })
], ValidationControlComponent);
export { ValidationControlComponent };
//# sourceMappingURL=validation-control.component.js.map