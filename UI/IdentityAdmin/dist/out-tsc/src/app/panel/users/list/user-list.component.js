import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
let UserListComponent = class UserListComponent {
    constructor(translator, userService) {
        this.translator = translator;
        this.userService = userService;
        this.loading = true;
        this.page = 1;
        this.quantity = 10;
        this.userSearch = new Subject();
    }
    ngOnInit() {
        this.loadResources();
        this.userSearch
            .pipe(debounceTime(500))
            .pipe(tap(() => this.animateLoadUsers()))
            .pipe(switchMap(a => this.userService.findUsers(a, this.quantity, this.page)))
            .subscribe((response) => {
            this.users = response.collection;
            this.total = response.total;
            this.stopAnimateLoadUsers();
        });
    }
    animateLoadUsers() {
        this.loading = true;
    }
    stopAnimateLoadUsers() {
        this.loading = false;
    }
    loadResources() {
        this.animateLoadUsers();
        this.userService.getUsers(this.quantity, this.page)
            .subscribe(a => {
            this.users = a.collection;
            this.total = a.total;
            this.stopAnimateLoadUsers();
        });
    }
    remove(user) {
        this.translator.translate.get('identityResource.remove').subscribe(m => {
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
                    this.userService.remove(user.userName).subscribe(() => {
                        this.loadResources();
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
    findUser(event) {
        if (event.target.value == null || event.target.value === "") {
            this.loadResources();
        }
        this.userSearch.next(event.target.value);
    }
};
UserListComponent = __decorate([
    Component({
        selector: "app-user-list",
        templateUrl: "./user-list.component.html",
        styleUrls: ["./user-list.component.scss"],
        providers: [UserService]
    })
], UserListComponent);
export { UserListComponent };
//# sourceMappingURL=user-list.component.js.map