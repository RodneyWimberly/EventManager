import { Validators } from '@ng-stack/forms';
export class FormUtil {
    static errorValidation(formControl) {
        return formControl.invalid && formControl.touched;
    }
    static errorValidationDirty(formControl) {
        return formControl.invalid && formControl.touched && formControl.dirty;
    }
    static emptyOrNull(formControl) {
        return formControl.value === null || formControl.value === '';
    }
    static touchForm(form) {
        form.markAsTouched();
        Object.keys(form.controls).forEach(control => form.controls[control].markAsTouched());
    }
    static dirtyForm(form) {
        form.markAsDirty();
        Object.keys(form.controls).forEach(control => form.controls[control].markAsDirty());
    }
    static updateValidationInput(input) {
        input.updateValueAndValidity();
        input.markAsDirty();
        input.markAsTouched();
    }
    static requiredEnabled(control) {
        control.setValidators([Validators.required]);
        control.enable();
    }
    static notRequiredEnabled(control) {
        control.clearValidators();
        control.enable();
    }
    static notRequiredDisabled(control) {
        control.clearValidators();
        control.disable();
    }
    static isoDateStringToBrDateString(isoDate) {
        if (!isoDate || isoDate === '') {
            return '';
        }
        const dateMs = Date.parse(isoDate);
        const date = new Date(dateMs);
        return (date.getUTCDate().toString().padStart(2, '0') + '/' +
            (date.getUTCMonth() + 1).toString().padStart(2, '0') + '/' +
            date.getUTCFullYear().toString());
    }
    static brDateStringToIsoDateString(brDate) {
        const date = brDate.split('/');
        return date[2] + '-' + date[1] + '-' + date[0];
    }
    static validateForm(form) {
        FormUtil.touchForm(form);
        FormUtil.dirtyForm(form);
        return form.valid;
    }
    static resetValueAndValidators(control) {
        control.reset();
        control.clearValidators();
        control.updateValueAndValidity();
    }
}
//# sourceMappingURL=form.utils.js.map