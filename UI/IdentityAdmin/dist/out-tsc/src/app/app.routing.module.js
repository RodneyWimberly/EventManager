import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { menu } from './core/menu/menu';
import { PagesModule } from './pages/pages.module';
import { LayoutComponent } from './shared/layout/layout.component';
export const routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    {
        path: "",
        component: LayoutComponent,
        loadChildren: () => import("./panel/panel.module").then(m => m.PanelModule)
    },
    // 404 Not found
    { path: "**", redirectTo: "not-found" }
];
let RoutesModule = class RoutesModule {
    constructor(menuService, tr, settings) {
        this.menuService = menuService;
        this.settings = settings;
        this.settings.isLightVersion$.subscribe(lightVersion => {
            if (lightVersion)
                menuService.addMenu(menu.filter(f => f.lightVersion == lightVersion));
            else
                menuService.addMenu(menu);
        });
    }
};
RoutesModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes),
            PagesModule,
        ],
        declarations: [],
        exports: [
            RouterModule
        ]
    })
], RoutesModule);
export { RoutesModule };
//# sourceMappingURL=app.routing.module.js.map