import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { Subject } from 'rxjs';
import { flatMap, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
let ClientListComponent = class ClientListComponent {
    constructor(translator, clientService) {
        this.translator = translator;
        this.clientService = clientService;
        this.refresh = new Subject();
    }
    ngOnInit() {
        this.clientList$ = this.refresh.asObservable()
            .pipe(startWith("init"))
            .pipe(flatMap(_ => this.clientService.getClients()));
    }
    loadClients() {
        this.refresh.next('refresh');
    }
    copy(clientId) {
        this.translator.translate.get('client.clone').subscribe(m => {
            Swal.fire({
                title: m['title'],
                text: m["text"],
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#b82d8',
                confirmButtonText: m["confirmButtonText"],
                cancelButtonText: m["cancelButtonText"],
            }).then(isConfirm => {
                if (isConfirm.value) {
                    this.clientService.copy(clientId).subscribe(updatedClient => {
                        this.loadClients();
                        Swal.fire("Cloned!", m["cloned"], 'success');
                    }, err => {
                        let errors = ProblemDetails.GetErrors(err).map(a => a.value);
                        Swal.fire("Error!", errors[0], 'error');
                    });
                }
                else {
                    Swal.fire("Cancelled", m["cancelled"], 'info');
                }
            });
        });
    }
    remove(clientId) {
        this.translator.translate.get('client.remove').subscribe(m => {
            Swal.fire({
                title: m['title'],
                text: m["text"],
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: m["confirmButtonText"],
                cancelButtonText: m["cancelButtonText"]
            }).then(isConfirm => {
                if (isConfirm.value) {
                    this.clientService.remove(clientId).subscribe(() => {
                        this.loadClients();
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
};
ClientListComponent = __decorate([
    Component({
        selector: "app-clients-list",
        templateUrl: "./clients-list.component.html",
        styleUrls: ["./clients-list.component.scss"],
    })
], ClientListComponent);
export { ClientListComponent };
//# sourceMappingURL=clients-list.component.js.map