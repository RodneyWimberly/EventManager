import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
let NotificationsComponent = class NotificationsComponent {
    constructor(http) {
        this.http = http;
    }
    ngOnInit() {
        // this.notifications = of<Array<NotificationViewModel>>(
        //  JSON.parse('{"notifications":[{"icon":"text-info fas fa-kiwi-bird","title":"Session","description":"2019-05 UI Session improvements"},
        // {"icon":"text-warning fab fa-docker","title":"Docker","description":"2019-04 Docker Ready"},
        // {"icon":"text-info fas fa-code-branch","title":"NET Core 2.2","description":"2019-03 Updated to ASP.NET Core 2.2"},
        // {"icon":"text-success fas fa-id-card","title":"ID4","description":"2019-03 IdentityServer4 2.4 Components"},
        // {"icon":"text-info fas fa-rocket","title":"Launch","description":"2018-10 first release"}]}').notifications);
        this.notifications$ = this.http.get('https://my-json-server.typicode.com/brunohbrito/JPProject.IdentityServer4.AdminUI/notifications');
    }
};
NotificationsComponent = __decorate([
    Component({
        selector: 'app-notifications',
        templateUrl: './notifications.component.html',
        encapsulation: ViewEncapsulation.Emulated
    })
], NotificationsComponent);
export { NotificationsComponent };
//# sourceMappingURL=notifications.component.js.map