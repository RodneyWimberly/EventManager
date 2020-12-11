import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { map, flatMap, startWith } from 'rxjs/operators';
import * as generated from './endpoint.services';
let NotificationService = class NotificationService {
    constructor(notificationMockService, authEndpointService) {
        this.notificationMockService = notificationMockService;
        this.authEndpointService = authEndpointService;
    }
    get currentUser() {
        return this.authEndpointService.currentUser;
    }
    get recentNotifications() {
        return this._recentNotifications;
    }
    set recentNotifications(notifications) {
        this._recentNotifications = notifications;
    }
    getNotification(notificationId) {
        return this.notificationMockService.getNotificationEndpoint(notificationId).pipe(map(response => generated.NotificationViewModel.fromJS(response)));
    }
    getNotifications(page, pageSize) {
        return this.notificationMockService.getNotificationsEndpoint(page, pageSize).pipe(map(response => {
            return this.getNotificationsFromResponse(response);
        }));
    }
    getUnreadNotifications(userId) {
        return this.notificationMockService.getUnreadNotificationsEndpoint(userId).pipe(map(response => this.getNotificationsFromResponse(response)));
    }
    getNewNotifications() {
        return this.notificationMockService.getNewNotificationsEndpoint(this.lastNotificationDate).pipe(map(response => this.processNewNotificationsFromResponse(response)));
    }
    getNewNotificationsPeriodically() {
        return interval(10000).pipe(startWith(0), flatMap(() => {
            return this.notificationMockService.getNewNotificationsEndpoint(this.lastNotificationDate).pipe(map(response => this.processNewNotificationsFromResponse(response)));
        }));
    }
    pinUnpinNotification(notificationOrNotificationId, isPinned) {
        if (typeof notificationOrNotificationId === 'string' || notificationOrNotificationId instanceof String) {
            return this.notificationMockService.getPinUnpinNotificationEndpoint(notificationOrNotificationId, isPinned);
        }
        else {
            return this.pinUnpinNotification(notificationOrNotificationId.id);
        }
    }
    readUnreadNotification(notificationIds, isRead) {
        return this.notificationMockService.getReadUnreadNotificationEndpoint(notificationIds, isRead);
    }
    deleteNotification(notificationOrNotificationId) {
        if (typeof notificationOrNotificationId === 'string' || notificationOrNotificationId instanceof String) { // Todo: Test me if its check is valid
            return this.notificationMockService.getDeleteNotificationEndpoint(notificationOrNotificationId).pipe(map(response => {
                this.recentNotifications = this.recentNotifications.filter(n => n.id != notificationOrNotificationId);
                return generated.NotificationViewModel.fromJS(response);
            }));
        }
        else {
            return this.deleteNotification(notificationOrNotificationId.id);
        }
    }
    processNewNotificationsFromResponse(response) {
        const notifications = this.getNotificationsFromResponse(response);
        for (const n of notifications) {
            if (n.date > this.lastNotificationDate) {
                this.lastNotificationDate = n.date;
            }
        }
        return notifications;
    }
    getNotificationsFromResponse(response) {
        const notifications = [];
        for (const i in response) {
            notifications[i] = generated.NotificationViewModel.fromJS(response[i]);
        }
        notifications.sort((a, b) => b.date.valueOf() - a.date.valueOf());
        notifications.sort((a, b) => (a.isPinned === b.isPinned) ? 0 : a.isPinned ? -1 : 1);
        this.recentNotifications = notifications;
        return notifications;
    }
};
NotificationService = __decorate([
    Injectable()
], NotificationService);
export { NotificationService };
//# sourceMappingURL=notification.service.js.map