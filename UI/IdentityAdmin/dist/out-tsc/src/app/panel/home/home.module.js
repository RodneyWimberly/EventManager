import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './home.component';
const routes = [
    { path: "", component: HomeComponent },
];
let HomeModule = class HomeModule {
};
HomeModule = __decorate([
    NgModule({
        imports: [
            SharedModule,
            RouterModule.forChild(routes),
        ],
        declarations: [
            HomeComponent
        ],
        exports: [
            RouterModule
        ]
    })
], HomeModule);
export { HomeModule };
//# sourceMappingURL=home.module.js.map