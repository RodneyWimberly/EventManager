import { __decorate } from "tslib";
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
let EventsService = class EventsService {
    constructor(http, settings) {
        this.http = http;
        this.settings = settings;
        this.endpoint = environment.ResourceServer + "events";
    }
    searchEvents(aggregate, quantity, page) {
        let params = new HttpParams()
            .set('limit', quantity.toString())
            .set('offset', ((page - 1) * quantity).toString());
        if (aggregate && aggregate != "") {
            params = params.set('aggregate', aggregate);
        }
        return this.http.get(`${this.endpoint}`, { params });
    }
    listAggregates() {
        return this.http.get(`${this.endpoint}/aggregates`);
    }
};
EventsService = __decorate([
    Injectable()
], EventsService);
export { EventsService };
//# sourceMappingURL=events.service.js.map