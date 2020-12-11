import { __awaiter, __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { MessageSeverity, DialogType } from '../../services/alert.service';
import { Utilities } from '../../helpers/utilities';
import { UserLoginModel } from '../../models/user-login.model';
import { Subject } from 'rxjs';
let LoginComponent = class LoginComponent {
    constructor(alertService, authEndpointService, configurations) {
        this.alertService = alertService;
        this.authEndpointService = authEndpointService;
        this.configurations = configurations;
        this.userLogin = new UserLoginModel();
        this.isLoading = false;
        this.formResetToggle = true;
        this.loginDialogOperations = new Subject();
        this.isModal = false;
    }
    get authProvider() { return this.configurations.authProvider; }
    ngOnInit() {
        this.userLogin.rememberMe = this.authEndpointService.rememberMe;
        if (!this.shouldRedirect) {
            this.authEndpointService.redirectLoginUser();
        }
        else {
            this.loginStatusSubscription = this.authEndpointService.getLoginStatusEvent().subscribe(isLoggedIn => {
                if (!this.shouldRedirect) {
                    this.authEndpointService.redirectLoginUser();
                }
            });
        }
    }
    ngOnDestroy() {
        if (this.loginStatusSubscription) {
            this.loginStatusSubscription.unsubscribe();
        }
    }
    get loginDialogOperationsEvent() {
        return this.loginDialogOperations.asObservable();
    }
    get shouldRedirect() {
        return !this.isModal && this.authEndpointService.isLoggedIn && !this.authEndpointService.isSessionExpired;
    }
    showErrorAlert(caption, message) {
        this.alertService.showMessage(caption, message, MessageSeverity.error);
    }
    hideModal() {
        if (this.modalHideCallback) {
            this.modalHideCallback();
        }
    }
    login(authProvider) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoading = true;
            this.hideModal();
            try {
                yield this.authEndpointService.login(authProvider, this.userLogin.userName, this.userLogin.password, this.userLogin.rememberMe);
            }
            catch (error) {
                this.alertService.stopLoadingMessage();
                if (Utilities.checkNoNetwork(error)) {
                    this.alertService.showStickyMessage(Utilities.noNetworkMessageCaption, Utilities.noNetworkMessageDetail, MessageSeverity.error, error);
                    this.offerAlternateHost();
                }
                else {
                    const errorMessage = Utilities.getHttpResponseMessage(error);
                    if (errorMessage) {
                        this.alertService.showStickyMessage('Unable to login', this.mapLoginErrorMessage(errorMessage), MessageSeverity.error, error);
                    }
                    else {
                        this.alertService.showStickyMessage('Unable to login', 'An error occured whilst logging in, please try again later.\nError: ' + Utilities.getResponseBody(error), MessageSeverity.error, error);
                    }
                }
                setTimeout(() => {
                    this.isLoading = false;
                }, 500);
            }
        });
    }
    offerAlternateHost() {
        if (Utilities.checkIsLocalHost(location.origin) && Utilities.checkIsLocalHost(this.configurations.webBaseUrl)) {
            this.alertService.showDialog('Dear Developer!\nIt appears your backend Web API service is not running...\n' +
                'Would you want to temporarily switch to the online Demo API below?(Or specify another)', DialogType.prompt, (value) => {
                this.configurations.webBaseUrl = value;
                this.alertService.showStickyMessage('API Changed!', 'The target Web API has been changed to: ' + value, MessageSeverity.warn);
            }, null, null, null, this.configurations.fallbackBaseUrl);
        }
    }
    mapLoginErrorMessage(error) {
        if (error == 'invalid_username_or_password') {
            return 'Invalid username or password';
        }
        if (error == 'invalid_grant') {
            return 'This account has been disabled';
        }
        return error;
    }
    reset() {
        this.formResetToggle = false;
        setTimeout(() => {
            this.formResetToggle = true;
        });
    }
};
__decorate([
    Input()
], LoginComponent.prototype, "isModal", void 0);
LoginComponent = __decorate([
    Component({
        selector: 'login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map