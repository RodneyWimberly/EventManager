import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { NavsearchComponent } from "./header/navsearch/navsearch.component";
import { OffsidebarComponent } from "./offsidebar/offsidebar.component";
import { UserblockComponent } from "./sidebar/userblock/userblock.component";
import { UserblockService } from "./sidebar/userblock/userblock.service";
import { FooterComponent } from "./footer/footer.component";
import { SharedModule } from "../shared.module";
import { NotificationsComponent } from "./header/notifications/notifications.component";
let LayoutModule = class LayoutModule {
};
LayoutModule = __decorate([
    NgModule({
        imports: [
            SharedModule
        ],
        providers: [
            UserblockService,
        ],
        declarations: [
            LayoutComponent,
            SidebarComponent,
            UserblockComponent,
            HeaderComponent,
            NavsearchComponent,
            OffsidebarComponent,
            FooterComponent,
            NotificationsComponent
        ],
        exports: [
            LayoutComponent,
            SidebarComponent,
            UserblockComponent,
            HeaderComponent,
            NavsearchComponent,
            OffsidebarComponent,
            FooterComponent,
            NotificationsComponent
        ]
    })
], LayoutModule);
export { LayoutModule };
//# sourceMappingURL=layout.module.js.map