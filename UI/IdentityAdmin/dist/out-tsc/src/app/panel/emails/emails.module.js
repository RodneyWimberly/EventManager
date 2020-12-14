import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from '@shared/shared.module';
import { ToasterModule } from 'angular2-toaster';
import { TagInputModule } from 'ngx-chips';
import { EmailComponent } from './edit/email.component';
import { EmailService } from './emails.service';
const routes = [
    { path: "", component: EmailComponent },
];
let EmailModule = class EmailModule {
};
EmailModule = __decorate([
    NgModule({
        imports: [
            SharedModule,
            ToasterModule.forRoot(),
            RouterModule.forChild(routes),
            TagInputModule,
            AngularEditorModule
        ],
        declarations: [
            EmailComponent
        ],
        providers: [
            EmailService
        ],
        exports: [
            RouterModule
        ]
    })
], EmailModule);
export { EmailModule };
//# sourceMappingURL=emails.module.js.map