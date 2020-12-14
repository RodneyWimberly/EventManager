import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
let EventsComponent = class EventsComponent {
    constructor(route, translator, eventService) {
        this.route = route;
        this.translator = translator;
        this.eventService = eventService;
        this.page = 1;
        this.quantity = 10;
        this.eventSearch = new Subject();
    }
    ngOnInit() {
        this.eventService.listAggregates().subscribe(s => {
            this.eventsToSelect = s;
            this.aggregatesTypes = Array.from(new Set(this.eventsToSelect.map(m => m.aggregateType)));
        });
        this.eventSearch
            .pipe(debounceTime(500))
            .pipe(switchMap(text => this.eventService.searchEvents(text, this.quantity, this.page)))
            .subscribe((response) => {
            this.model = response.collection;
            this.total = response.total;
            this.model.forEach(e => e.show = false);
        });
        this.loadResources();
    }
    loadResources() {
        this.eventSearch.next(this.selectedAggregate == null ? "" : this.selectedAggregate);
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
        let htmlContent = `<pre>${JSON.stringify(JSON.parse(item.details), null, 4)}</pre>`;
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
        // set all others items as show = false
        this.model.forEach(e => {
            e.show = false;
        });
    }
    getAggregates(type) {
        this.aggregatesToSelect = this.eventsToSelect.filter(f => f.aggregateType == type).map(m => m.aggregate);
    }
};
EventsComponent = __decorate([
    Component({
        selector: "app-events",
        templateUrl: "./events.component.html",
        styleUrls: ["./events.component.scss"],
        providers: [UserService]
    })
], EventsComponent);
export { EventsComponent };
//# sourceMappingURL=events.component.js.map