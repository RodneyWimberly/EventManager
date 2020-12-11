import { __decorate } from "tslib";
import { Component, ViewChildren } from '@angular/core';
import { DialogType, MessageSeverity } from '../services/alert.service';
import * as generated from '../services/endpoint.services';
import { LoginComponent } from '../components/login/login.component';
const alertify = require('../assets/scripts/alertify.js');
let AppComponent = class AppComponent {
    constructor(storageManager, toastaService, toastaConfig, accountService, alertService, notificationService, appTitleService, authEndpointService, translationService, configurations, router) {
        this.toastaService = toastaService;
        this.toastaConfig = toastaConfig;
        this.accountService = accountService;
        this.alertService = alertService;
        this.notificationService = notificationService;
        this.appTitleService = appTitleService;
        this.authEndpointService = authEndpointService;
        this.translationService = translationService;
        this.configurations = configurations;
        this.router = router;
        this.newNotificationCount = 0;
        this.appTitle = 'Event Manager';
        this.stickyToasties = [];
        this.dataLoadingConsecutiveFailures = 0;
        this.gT = (key, interpolateParams) => this.translationService.getTranslation(key, interpolateParams);
        storageManager.initialiseStorageSyncListener();
        this.toastaConfig.theme = 'bootstrap';
        this.toastaConfig.position = 'top-right';
        this.toastaConfig.limit = 100;
        this.toastaConfig.showClose = true;
        this.toastaConfig.showDuration = false;
        this.appTitleService.appName = this.appTitle;
    }
    get notificationsTitle() {
        if (this.newNotificationCount) {
            return `${this.gT('app.Notifications')} (${this.newNotificationCount} ${this.gT('app.New')})`;
        }
        else {
            return this.gT('app.Notifications');
        }
    }
    ngAfterViewInit() {
        this.modalLoginControls.changes.subscribe((controls) => {
            controls.forEach(control => {
                if (control) {
                    if (control instanceof LoginComponent) {
                        this.loginControl = control;
                        this.loginControl.modalHideCallback = () => this.loginModal.hide();
                    }
                    else {
                        this.loginModal = control;
                        this.loginModal.show();
                    }
                }
            });
        });
    }
    onLoginModalShown() {
        this.alertService.showStickyMessage('Session Expired', 'Your Session has expired. Please log in again', MessageSeverity.info);
    }
    onLoginModalHidden() {
        this.alertService.resetStickyMessage();
        this.loginControl.reset();
        this.shouldShowLoginModal = false;
        if (this.authEndpointService.isSessionExpired) {
            this.alertService.showStickyMessage('Session Expired', 'Your Session has expired. Please log in again to renew your session', MessageSeverity.warn);
        }
    }
    onLoginModalHide() {
        this.alertService.resetStickyMessage();
    }
    ngOnInit() {
        this.isUserLoggedIn = this.authEndpointService.isLoggedIn;
        setTimeout(() => {
            this.isAppLoaded = true;
        }, 100);
        setTimeout(() => this.removePrebootScreen = true, 500);
        setTimeout(() => {
            if (this.isUserLoggedIn) {
                this.alertService.resetStickyMessage();
                if (!this.authEndpointService.isSessionExpired)
                    this.alertService.showMessage('Login', `Welcome back ${this.userName}!`, MessageSeverity.default);
                else
                    this.alertService.showStickyMessage("Session Expired", "Your Session has expired. Please log in again", MessageSeverity.warn);
            }
        }, 2000);
        this.dialogSubscription = this.alertService.getDialogEvent().subscribe(alert => this.showDialog(alert));
        this.messageSubscription = this.alertService.getMessageEvent().subscribe(message => this.showToast(message));
        this.loginStatusSubscription = this.authEndpointService.getLoginStatusEvent().subscribe(isLoggedIn => {
            this.authEndpointService.reLoginDelegate = () => this.shouldShowLoginModal = true;
            this.isUserLoggedIn = isLoggedIn;
            if (this.isUserLoggedIn) {
                this.initNotificationsLoading();
            }
            else {
                this.unsubscribeNotifications();
            }
            setTimeout(() => {
                if (!this.isUserLoggedIn) {
                    this.alertService.showMessage('Session Ended!', '', MessageSeverity.default);
                }
            }, 500);
        });
    }
    ngOnDestroy() {
        this.unsubscribeNotifications();
        if (this.dialogSubscription) {
            this.dialogSubscription.unsubscribe();
        }
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.loginStatusSubscription) {
            this.loginStatusSubscription.unsubscribe();
        }
    }
    unsubscribeNotifications() {
        if (this.notificationsLoadingSubscription) {
            this.notificationsLoadingSubscription.unsubscribe();
        }
    }
    initNotificationsLoading() {
        this.notificationsLoadingSubscription = this.notificationService.getNewNotificationsPeriodically()
            .subscribe(notifications => {
            this.dataLoadingConsecutiveFailures = 0;
            this.newNotificationCount = notifications.filter(n => !n.isRead).length;
        }, error => {
            this.alertService.logError(error);
            if (this.dataLoadingConsecutiveFailures++ < 20) {
                setTimeout(() => this.initNotificationsLoading(), 5000);
            }
            else {
                this.alertService.showStickyMessage('Load Error', 'Loading new notifications from the server failed!', MessageSeverity.error);
            }
        });
    }
    markNotificationsAsRead() {
        const recentNotifications = this.notificationService.recentNotifications;
        if (recentNotifications.length) {
            /*this.notificationService.readUnreadNotification(recentNotifications.map(n => n.id), true)
              .subscribe(response => {
                for (const n of recentNotifications) {
                  n.isRead = true;
                }
      
                this.newNotificationCount = recentNotifications.filter(n => !n.isRead).length;
              },
                error => {
                  this.alertService.logError(error);
                  this.alertService.showMessage('Notification Error', 'Marking read notifications failed', MessageSeverity.error);
      
                });*/
        }
    }
    showDialog(dialog) {
        alertify.set({
            labels: {
                ok: dialog.okLabel || 'OK',
                cancel: dialog.cancelLabel || 'Cancel'
            }
        });
        switch (dialog.type) {
            case DialogType.alert:
                alertify.alert(dialog.message);
                break;
            case DialogType.confirm:
                alertify
                    .confirm(dialog.message, (e) => {
                    if (e) {
                        dialog.okCallback();
                    }
                    else {
                        if (dialog.cancelCallback) {
                            dialog.cancelCallback();
                        }
                    }
                });
                break;
            case DialogType.prompt:
                alertify
                    .prompt(dialog.message, (e, val) => {
                    if (e) {
                        dialog.okCallback(val);
                    }
                    else {
                        if (dialog.cancelCallback) {
                            dialog.cancelCallback();
                        }
                    }
                }, dialog.defaultValue);
                break;
        }
    }
    showToast(alert) {
        if (alert.operation == 'clear') {
            for (const id of this.stickyToasties.slice(0)) {
                this.toastaService.clear(id);
            }
            return;
        }
        const toastOptions = {
            title: alert.message.summary,
            msg: alert.message.detail,
        };
        if (alert.operation == 'add_sticky') {
            toastOptions.timeout = 0;
            toastOptions.onAdd = (toast) => {
                this.stickyToasties.push(toast.id);
            };
            toastOptions.onRemove = (toast) => {
                const index = this.stickyToasties.indexOf(toast.id, 0);
                if (index > -1) {
                    this.stickyToasties.splice(index, 1);
                }
                if (alert.onRemove) {
                    alert.onRemove();
                }
                toast.onAdd = null;
                toast.onRemove = null;
            };
        }
        else {
            toastOptions.timeout = 4000;
        }
        switch (alert.message.severity) {
            case MessageSeverity.default:
                this.toastaService.default(toastOptions);
                break;
            case MessageSeverity.info:
                this.toastaService.info(toastOptions);
                break;
            case MessageSeverity.success:
                this.toastaService.success(toastOptions);
                break;
            case MessageSeverity.error:
                this.toastaService.error(toastOptions);
                break;
            case MessageSeverity.warn:
                this.toastaService.warning(toastOptions);
                break;
            case MessageSeverity.wait:
                this.toastaService.wait(toastOptions);
                break;
        }
    }
    logout() {
        this.authEndpointService.logout();
        this.authEndpointService.redirectLogoutUser();
    }
    getYear() {
        return new Date().getUTCFullYear();
    }
    get userName() {
        return this.authEndpointService.currentUser ? this.authEndpointService.currentUser.userName : '';
    }
    get fullName() {
        return this.authEndpointService.currentUser ? this.authEndpointService.currentUser.fullName : '';
    }
    get canViewEvents() {
        return this.accountService.userHasPermission(generated.PermissionValues.ViewEvents);
    }
    get canViewLogs() {
        return this.accountService.userHasPermission(generated.PermissionValues.ViewLogs);
    }
};
__decorate([
    ViewChildren('loginModal,loginControl')
], AppComponent.prototype, "modalLoginControls", void 0);
__decorate([
    ViewChildren('loginModal')
], AppComponent.prototype, "loginModal", void 0);
__decorate([
    ViewChildren('loginControl')
], AppComponent.prototype, "loginControl", void 0);
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map