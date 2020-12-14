import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { Subject } from 'rxjs';
import { debounceTime, flatMap, switchMap, tap } from 'rxjs/operators';
let UserEventsComponent = class UserEventsComponent {
    constructor(route, router, translator, userService) {
        this.route = route;
        this.router = router;
        this.translator = translator;
        this.userService = userService;
        this.page = 1;
        this.quantity = 10;
        this.eventSearch = new Subject();
    }
    ngOnInit() {
        this.route.params
            .pipe(flatMap(p => this.userService.getDetails(p["username"])), tap(user => this.user = user))
            .subscribe(s => this.loadResources(), err => {
            this.router.navigate(['/users']);
        });
        this.eventSearch
            .pipe(debounceTime(500))
            .pipe(switchMap(text => this.userService.searchEvents(this.user.userName, text, this.quantity, this.page)))
            .subscribe((response) => {
            this.model = response.collection;
            this.total = response.total;
        });
    }
    loadResources() {
        this.userService.showEvents(this.user.userName, this.quantity, this.page)
            .subscribe((response) => {
            this.setEveryoneToNotShow();
            this.model = response.collection;
            this.total = response.total;
        });
    }
    findEvent(event) {
        if (event.target.value == null || event.target.value === "") {
            this.loadResources();
        }
        this.eventSearch.next(event.target.value);
    }
    addRow(index, tableName) {
        var table = document.getElementById(tableName);
        // Hide everyone before. In case users click in another item from list
        table.querySelectorAll("[temp='true']").forEach((i) => i.remove());
        var item = this.model[index];
        if (item.show) {
            this.setEveryoneToNotShow();
            return;
        }
        let htmlContent = `<pre class="pre-scrollable-width">${JSON.stringify(JSON.parse(item.details), null, 4)}</pre>`;
        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(index + 2);
        row.setAttribute("temp", "true");
        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell = row.insertCell(0);
        // Add some text to the new cells:
        cell.innerHTML = htmlContent;
        cell.colSpan = 7;
        this.setEveryoneToNotShow();
        item.show = true;
    }
    setEveryoneToNotShow() {
        if (this.model == null)
            return;
        // set all others items as show = false
        this.model.forEach(e => {
            e.show = false;
        });
    }
};
UserEventsComponent = __decorate([
    Component({
        selector: "app-user-events",
        templateUrl: "./user-events.component.html",
        styleUrls: ["./user-events.component.scss"],
        providers: [UserService]
    })
], UserEventsComponent);
export { UserEventsComponent };
//# sourceMappingURL=user-events.component.js.map