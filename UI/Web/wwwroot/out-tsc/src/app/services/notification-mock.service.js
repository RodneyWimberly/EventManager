import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
let NotificationMockService = class NotificationMockService {
    constructor() {
        this.demoNotifications = [
            {
                id: "1",
                header: '20 New Products were added to your inventory by "administrator"',
                body: '20 new "BMW M6" were added to your stock by "administrator" on 5/28/2017 4:54:13 PM',
                isRead: true,
                isPinned: true,
                date: '2017-05-28T16:29:13.5877958'
            },
            {
                id: "2",
                header: '1 Product running low',
                body: 'You are running low on "Nissan Patrol". 2 Items remaining',
                isRead: false,
                isPinned: false,
                date: '2017-05-28T19:54:42.4144502'
            },
            {
                id: "3",
                header: 'Tomorrow is half day',
                body: 'Guys, tomorrow we close by midday. Please check in your sales before noon. Thanx. Alex.',
                isRead: false,
                isPinned: false,
                date: '2017-05-30T11:13:42.4144502'
            }
        ];
    }
    getNotificationEndpoint(notificationId) {
        const notification = this.demoNotifications.find(val => val.id == notificationId);
        let response;
        if (notification) {
            response = this.createResponse(notification, 200);
        }
        else {
            response = this.createResponse(null, 404);
        }
        return of(response.body);
    }
    getNotificationsEndpoint(page, pageSize) {
        const notifications = this.demoNotifications;
        const response = this.createResponse(this.demoNotifications, 200);
        return of(response.body);
    }
    getUnreadNotificationsEndpoint(userId) {
        const unreadNotifications = this.demoNotifications.filter(val => !val.isRead);
        const response = this.createResponse(unreadNotifications, 200);
        return of(response.body);
    }
    getNewNotificationsEndpoint(lastNotificationDate) {
        const unreadNotifications = this.demoNotifications;
        const response = this.createResponse(unreadNotifications, 200);
        return of(response.body);
    }
    getPinUnpinNotificationEndpoint(notificationId, isPinned) {
        const notification = this.demoNotifications.find(val => val.id == notificationId);
        let response;
        if (notification) {
            response = this.createResponse(null, 204);
            if (isPinned == null) {
                isPinned = !notification.isPinned;
            }
            notification.isPinned = isPinned;
            notification.isRead = true;
        }
        else {
            response = this.createResponse(null, 404);
        }
        return of(response.body);
    }
    getReadUnreadNotificationEndpoint(notificationIds, isRead) {
        for (const notificationId of notificationIds) {
            const notification = this.demoNotifications.find(val => val.id == notificationId);
            if (notification) {
                notification.isRead = isRead;
            }
        }
        const response = this.createResponse(null, 204);
        return of(response.body);
    }
    getDeleteNotificationEndpoint(notificationId) {
        const notification = this.demoNotifications.find(val => val.id == notificationId);
        let response;
        if (notification) {
            this.demoNotifications = this.demoNotifications.filter(val => val.id != notificationId);
            response = this.createResponse(notification, 200);
        }
        else {
            response = this.createResponse(null, 404);
        }
        return of(response.body);
    }
    createResponse(body, status) {
        return new HttpResponse({ body, status });
    }
};
NotificationMockService = __decorate([
    Injectable()
], NotificationMockService);
export { NotificationMockService };
//# sourceMappingURL=notification-mock.service.js.map