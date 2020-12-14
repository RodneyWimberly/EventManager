import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { UserService } from '@shared/services/user.service';
import { EqualToValidator, PasswordValidator } from '@shared/validators';
import { FormUtil } from '@shared/validators/form.utils';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { ToasterConfig } from 'angular2-toaster';
import { debounceTime, share, switchMap } from 'rxjs/operators';
let UserAddComponent = class UserAddComponent {
    constructor(route, router, translator, userService, toasterService) {
        this.route = route;
        this.router = router;
        this.translator = translator;
        this.userService = userService;
        this.toasterService = toasterService;
        this.registerForm = new FormGroup({
            password: new FormControl(null, [Validators.required, PasswordValidator.validator]),
            confirmPassword: new FormControl(null, [Validators.required, EqualToValidator.validator('password')]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            name: new FormControl(null, [Validators.minLength(2), Validators.required]),
            userName: new FormControl(null, [Validators.required]),
            phoneNumber: new FormControl(null, null),
            confirmEmail: new FormControl(null, null)
        });
        this.toasterconfig = new ToasterConfig({
            positionClass: 'toast-top-right',
            showCloseButton: true
        });
        this.bsConfig = {
            containerClass: 'theme-angle'
        };
        this.showButtonLoading = false;
    }
    ngOnInit() {
        this.errors = [];
        this.showButtonLoading = false;
        this.registerForm.controls.email.valueChanges.pipe(debounceTime(500))
            .pipe(switchMap(a => this.userService.checkEmail(a)))
            .subscribe((emailExist) => {
            if (emailExist)
                this.registerForm.controls.email.setErrors({ 'emailExist': true });
        });
        this.registerForm.controls.userName.valueChanges.pipe(debounceTime(500))
            .pipe(switchMap(a => this.userService.checkUserName(a)))
            .subscribe((userExist) => {
            if (userExist)
                this.registerForm.controls.userName.setErrors({ 'usernameExist': true });
        });
    }
    save() {
        if (!this.validateForm(this.registerForm)) {
            return;
        }
        this.showButtonLoading = true;
        this.errors = [];
        this.userService.save(this.registerForm.value).subscribe(registerResult => {
            if (registerResult) {
                this.showSuccessMessage();
                this.router.navigate(["/users", this.registerForm.value.userName, 'edit']);
            }
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    validateForm(form) {
        if (form.invalid) {
            FormUtil.touchForm(form);
            FormUtil.dirtyForm(form);
            return false;
        }
        return true;
    }
    getErrorMessages() {
        return this.translator.translate.get('validations').pipe(share());
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
};
UserAddComponent = __decorate([
    Component({
        selector: "app-user-add",
        templateUrl: "./user-add.component.html",
        styleUrls: ["./user-add.component.scss"],
        providers: [UserService],
        encapsulation: ViewEncapsulation.None
    })
], UserAddComponent);
export { UserAddComponent };
//# sourceMappingURL=user-add.component.js.map