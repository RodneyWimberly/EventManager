import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ToasterModule } from 'angular2-toaster';
import { TagInputModule } from 'ngx-chips';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ClientAddComponent } from './add/add.component';
import { ClientClaimsComponent } from './claims/claims.component';
import { ClientService } from './clients.service';
import { ClientAuthComponent } from './edit/auth/auth.component';
import { ClientBasicComponent } from './edit/basic/basic.component';
import { ClientEditComponent } from './edit/client-edit.component';
import { ClientDeviceFlowComponent } from './edit/device-flow/device-flow.component';
import { ClientSettingsComponent } from './edit/settings/settings.component';
import { ClientTokenComponent } from './edit/token/token.component';
import { ClientListComponent } from './list/clients-list.component';
import { ClientPropertiesComponent } from './properties/properties.component';
import { ClientSecretsComponent } from './secrets/secrets.component';
const routes = [
    { path: "", component: ClientListComponent },
    { path: ":clientId/edit", component: ClientEditComponent },
    { path: ":clientId/secrets", component: ClientSecretsComponent },
    { path: ":clientId/properties", component: ClientPropertiesComponent },
    { path: ":clientId/claims", component: ClientClaimsComponent },
    { path: "add", component: ClientAddComponent },
];
let ClientsModule = class ClientsModule {
};
ClientsModule = __decorate([
    NgModule({
        imports: [
            SharedModule,
            ToasterModule.forRoot(),
            RouterModule.forChild(routes),
            ToasterModule.forRoot(),
            TagInputModule,
            ImageCropperModule
        ],
        declarations: [
            ClientListComponent,
            ClientEditComponent,
            ClientSettingsComponent,
            ClientAuthComponent,
            ClientTokenComponent,
            ClientDeviceFlowComponent,
            ClientBasicComponent,
            ClientSecretsComponent,
            ClientPropertiesComponent,
            ClientClaimsComponent,
            ClientAddComponent
        ],
        providers: [
            ClientService
        ],
        exports: [
            RouterModule
        ]
    })
], ClientsModule);
export { ClientsModule };
//# sourceMappingURL=clients.module.js.map