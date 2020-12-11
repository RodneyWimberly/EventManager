import { __decorate } from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { DialogType, MessageSeverity } from '../../services/alert.service';
import * as generated from '../../services/endpoint.services';
import { Utilities } from '../../helpers/utilities';
let NotificationsManagementComponent = class NotificationsManagementComponent {
    constructor(alertService, translationService, accountClient, notificationService) {
        this.alertService = alertService;
        this.translationService = translationService;
        this.accountClient = accountClient;
        this.notificationService = notificationService;
        this.columns = [];
        this.rows = [];
        this.dataLoadingConsecutiveFailurs = 0;
        this.verticalScrollbar = false;
    }
    ngOnInit() {
        if (this.isViewOnly) {
            this.columns = [
                { prop: 'date', cellTemplate: this.dateTemplate, width: 100, resizeable: false, canAutoResize: false, sortable: false, draggable: false },
                { prop: 'header', cellTemplate: this.contentHeaderTemplate, width: 200, resizeable: false, sortable: false, draggable: false },
            ];
        }
        else {
            const gT = (key) => this.translationService.getTranslation(key);
            this.columns = [
                { prop: '', name: '', width: 10, headerTemplate: this.statusHeaderTemplate, cellTemplate: this.statusTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false },
                { prop: 'date', name: gT('notifications.Date'), cellTemplate: this.dateTemplate, width: 30 },
                { prop: 'body', name: gT('notifications.Notification'), cellTemplate: this.contenBodytTemplate, width: 500 },
                { name: '', width: 80, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false }
            ];
        }
        this.initDataLoading();
    }
    ngOnDestroy() {
        if (this.dataLoadingSubscription) {
            this.dataLoadingSubscription.unsubscribe();
        }
    }
    initDataLoading() {
        if (this.isViewOnly && this.notificationService.recentNotifications) {
            this.rows = this.processResults(this.notificationService.recentNotifications);
            return;
        }
        this.loadingIndicator = true;
        const dataLoadTask = this.isViewOnly ? this.notificationService.getNewNotifications() : this.notificationService.getNewNotificationsPeriodically();
        this.dataLoadingSubscription = dataLoadTask
            .subscribe(notifications => {
            this.loadingIndicator = false;
            this.dataLoadingConsecutiveFailurs = 0;
            this.rows = this.processResults(notifications);
        }, error => {
            this.loadingIndicator = false;
            this.alertService.showMessage('Load Error', 'Loading new notifications from the server failed!', MessageSeverity.warn);
            this.alertService.logError(error);
            if (this.dataLoadingConsecutiveFailurs++ < 5) {
                setTimeout(() => this.initDataLoading(), 5000);
            }
            else {
                this.alertService.showStickyMessage('Load Error', 'Loading new notifications from the server failed!', MessageSeverity.error);
            }
        });
        if (this.isViewOnly) {
            this.dataLoadingSubscription = null;
        }
    }
    processResults(notifications) {
        if (this.isViewOnly) {
            notifications.sort((a, b) => {
                return b.date.valueOf() - a.date.valueOf();
            });
        }
        return notifications;
    }
    getPrintedDate(value) {
        if (value) {
            return Utilities.printTimeOnly(value) + ' on ' + Utilities.printDateOnly(value);
        }
    }
    deleteNotification(row) {
        this.alertService.showDialog('Are you sure you want to delete the notification \"' + row.header + '\"?', DialogType.confirm, () => this.deleteNotificationHelper(row));
    }
    deleteNotificationHelper(row) {
        this.alertService.startLoadingMessage('Deleting...');
        this.loadingIndicator = true;
        this.notificationService.deleteNotification(row)
            .subscribe(results => {
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
            this.rows = this.rows.filter(item => item.id != row.id);
        }, error => {
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
            this.alertService.showStickyMessage('Delete Error', `An error occured whilst deleting the notification.\r\nError: "${Utilities.getHttpResponseMessages(error)}"`, MessageSeverity.error, error);
        });
    }
    togglePin(row) {
        const pin = !row.isPinned;
        const opText = pin ? 'Pinning' : 'Unpinning';
        this.alertService.startLoadingMessage(opText + '...');
        this.loadingIndicator = true;
        this.notificationService.pinUnpinNotification(row, pin)
            .subscribe(results => {
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
            row.isPinned = pin;
        }, error => {
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
            this.alertService.showStickyMessage(opText + ' Error', `An error occured whilst ${opText} the notification.\r\nError: "${Utilities.getHttpResponseMessages(error)}"`, MessageSeverity.error, error);
        });
    }
    get canManageNotifications() {
        return this.accountClient.userHasPermission(generated.PermissionValues.ManageRoles); // Todo: Consider creating separate permission for notifications
    }
};
__decorate([
    Input()
], NotificationsManagementComponent.prototype, "isViewOnly", void 0);
__decorate([
    Input()
], NotificationsManagementComponent.prototype, "verticalScrollbar", void 0);
__decorate([
    ViewChild('statusHeaderTemplate', { static: true })
], NotificationsManagementComponent.prototype, "statusHeaderTemplate", void 0);
__decorate([
    ViewChild('statusTemplate', { static: true })
], NotificationsManagementComponent.prototype, "statusTemplate", void 0);
__decorate([
    ViewChild('dateTemplate', { static: true })
], NotificationsManagementComponent.prototype, "dateTemplate", void 0);
__decorate([
    ViewChild('contentHeaderTemplate', { static: true })
], NotificationsManagementComponent.prototype, "contentHeaderTemplate", void 0);
__decorate([
    ViewChild('contenBodytTemplate', { static: true })
], NotificationsManagementComponent.prototype, "contenBodytTemplate", void 0);
__decorate([
    ViewChild('actionsTemplate', { static: true })
], NotificationsManagementComponent.prototype, "actionsTemplate", void 0);
NotificationsManagementComponent = __decorate([
    Component({
        selector: 'notifications-management',
        templateUrl: './notifications-management.component.html',
        styleUrls: ['./notifications-management.component.scss']
    })
], NotificationsManagementComponent);
export { NotificationsManagementComponent };
//# sourceMappingURL=notifications-management.component.js.map