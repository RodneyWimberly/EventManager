import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ToasterModule } from 'angular2-toaster';
import { TagInputModule } from 'ngx-chips';
import { ApiResourceAddComponent } from './add/api-resource-add.component';
import { ApiResourceEditComponent } from './edit/api-resource-edit.component';
import { ApiResourceListComponent } from './list/api-resources-list.component';
import { ApiResourceScopesComponent } from './scope/api-scopes.component';
import { ApiResourceSecretsComponent } from './secrets/api-secrets.component';
const routes = [
    { path: "", component: ApiResourceListComponent },
    { path: ":name/edit", component: ApiResourceEditComponent },
    { path: "add", component: ApiResourceAddComponent },
    { path: ":resource/secrets", component: ApiResourceSecretsComponent },
    { path: ":resource/scopes", component: ApiResourceScopesComponent },
];
let ApiResourceModule = class ApiResourceModule {
};
ApiResourceModule = __decorate([
    NgModule({
        imports: [
            SharedModule,
            ToasterModule.forRoot(),
            RouterModule.forChild(routes),
            TagInputModule
        ],
        declarations: [
            ApiResourceListComponent,
            ApiResourceEditComponent,
            ApiResourceAddComponent,
            ApiResourceSecretsComponent,
            ApiResourceScopesComponent
        ],
        exports: [
            RouterModule
        ]
    })
], ApiResourceModule);
export { ApiResourceModule };
//# sourceMappingURL=api-resource.module.js.map