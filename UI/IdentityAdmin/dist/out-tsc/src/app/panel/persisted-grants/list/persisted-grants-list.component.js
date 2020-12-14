import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import Swal from 'sweetalert2';
import { PersistedGrantsService } from '../persisted-grants.service';
let PersistedGrantListComponent = class PersistedGrantListComponent {
    constructor(translator, persistedGrantService, settings) {
        this.translator = translator;
        this.persistedGrantService = persistedGrantService;
        this.settings = settings;
        this.page = 1;
        this.quantity = 10;
    }
    ngOnInit() {
        this.loadGrants();
    }
    loadGrants() {
        this.persistedGrantService.getPersistedGrants(this.quantity, this.page).subscribe(a => {
            this.persistedGrants = a.collection;
            this.total = a.total;
            this.persistedGrants.forEach(grant => grant.parsedData = JSON.parse(grant.data));
        });
    }
    remove(name) {
        this.translator.translate.get('persistedGrant.remove').subscribe(m => {
            Swal.fire({
                title: m['title'],
                text: m["text"],
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: m["confirmButtonText"],
                cancelButtonText: m["cancelButtonText"],
            }).then(isConfirm => {
                if (isConfirm) {
                    this.persistedGrantService.remove(name).subscribe(() => {
                        this.loadGrants();
                        Swal.fire("Deleted!", m["deleted"], 'success');
                    }, err => {
                        let errors = ProblemDetails.GetErrors(err).map(a => a.value);
                        Swal.fire("Error!", errors[0], 'error');
                    });
                }
                else {
                    Swal.fire("Cancelled", m["cancelled"], 'error');
                }
            });
        });
    }
    getData(data) {
        return JSON.parse(data);
    }
    details(id) {
        this.grantDetail = this.persistedGrants.find(f => f.key == id);
    }
};
PersistedGrantListComponent = __decorate([
    Component({
        selector: "app-persisted-grants-list",
        templateUrl: "./persisted-grants-list.component.html",
        styleUrls: ["./persisted-grants-list.component.scss"],
        providers: [PersistedGrantsService]
    })
], PersistedGrantListComponent);
export { PersistedGrantListComponent };
//# sourceMappingURL=persisted-grants-list.component.js.map