import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { ToasterModule } from 'angular2-toaster';
import { TagInputModule } from 'ngx-chips';
import { UserAddComponent } from './add/user-add.component';
import { UserClaimsComponent } from './claims/user-claims.component';
import { UserEditComponent } from './edit/user-edit.component';
import { UserEventsComponent } from './events/user-events.component';
import { UserListComponent } from './list/user-list.component';
import { UserLoginsComponent } from './logins/user-logins.component';
import { UserRolesComponent } from './roles/user-roles.component';
const routes = [
    { path: "", component: UserListComponent },
    { path: ":username/edit", component: UserEditComponent },
    { path: "add", component: UserAddComponent },
    { path: ":username/claims", component: UserClaimsComponent },
    { path: ":username/roles", component: UserRolesComponent },
    { path: ":username/logins", component: UserLoginsComponent },
    { path: ":username/events", component: UserEventsComponent },
];
let UserModule = class UserModule {
};
UserModule = __decorate([
    NgModule({
        imports: [
            SharedModule,
            ToasterModule.forRoot(),
            RouterModule.forChild(routes),
            TagInputModule,
            NgbPaginationModule,
        ],
        declarations: [
            UserListComponent,
            UserEditComponent,
            UserAddComponent,
            UserClaimsComponent,
            UserRolesComponent,
            UserLoginsComponent,
            UserEventsComponent
        ],
        exports: [
            RouterModule
        ]
    })
], UserModule);
export { UserModule };
//# sourceMappingURL=user.module.js.map