import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ToasterModule } from 'angular2-toaster';
import { TagInputModule } from 'ngx-chips';
import { IdentityResourceAddComponent } from './add/identity-resource-add.component';
import { IdentityResourceEditComponent } from './edit/identity-resource-edit.component';
import { IdentityResourceListComponent } from './list/identity-resources-list.component';
const routes = [
    { path: "", component: IdentityResourceListComponent },
    { path: ":name/edit", component: IdentityResourceEditComponent },
    { path: "add", component: IdentityResourceAddComponent },
];
let IdentityResourceModule = class IdentityResourceModule {
};
IdentityResourceModule = __decorate([
    NgModule({
        imports: [
            SharedModule,
            ToasterModule.forRoot(),
            RouterModule.forChild(routes),
            TagInputModule
        ],
        declarations: [
            IdentityResourceListComponent,
            IdentityResourceEditComponent,
            IdentityResourceAddComponent
        ],
        exports: [
            RouterModule
        ]
    })
], IdentityResourceModule);
export { IdentityResourceModule };
//# sourceMappingURL=identity-resource.module.js.map