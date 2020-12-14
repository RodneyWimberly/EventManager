import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { ToasterModule } from 'angular2-toaster';
import { TagInputModule } from 'ngx-chips';
import { PersistedGrantListComponent } from './list/persisted-grants-list.component';
const routes = [
    { path: "", component: PersistedGrantListComponent },
];
let PersistedGrantsModule = class PersistedGrantsModule {
};
PersistedGrantsModule = __decorate([
    NgModule({
        imports: [
            SharedModule,
            ToasterModule.forRoot(),
            RouterModule.forChild(routes),
            TagInputModule,
            NgbPaginationModule
        ],
        declarations: [
            PersistedGrantListComponent,
        ],
        exports: [
            RouterModule
        ]
    })
], PersistedGrantsModule);
export { PersistedGrantsModule };
//# sourceMappingURL=persisted-grants.module.js.map