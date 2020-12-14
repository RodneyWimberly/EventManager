import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ToasterModule } from 'angular2-toaster';
import { TagInputModule } from 'ngx-chips';
import { RoleAddComponent } from './add/role-add.component';
import { RoleEditComponent } from './edit/role-edit.component';
import { RolesListComponent } from './list/roles-list.component';
const routes = [
    { path: "", component: RolesListComponent },
    { path: ":role/edit", component: RoleEditComponent },
    { path: "add", component: RoleAddComponent }
];
let RoleModule = class RoleModule {
};
RoleModule = __decorate([
    NgModule({
        imports: [
            SharedModule,
            ToasterModule.forRoot(),
            RouterModule.forChild(routes),
            TagInputModule
        ],
        declarations: [
            RolesListComponent,
            RoleEditComponent,
            RoleAddComponent
        ],
        exports: [
            RouterModule
        ]
    })
], RoleModule);
export { RoleModule };
//# sourceMappingURL=roles.module.js.map