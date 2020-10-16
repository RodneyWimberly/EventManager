import { ModuleWithProviders } from '@angular/core';
import { ToastaService, ToastaConfig, toastaServiceFactory } from './toasta.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from './toast.component';
import * as ɵngcc2 from './toasta.component';
import * as ɵngcc3 from './shared';
import * as ɵngcc4 from '@angular/common';
export declare let providers: (typeof ToastaConfig | {
    provide: typeof ToastaService;
    useFactory: typeof toastaServiceFactory;
    deps: (typeof ToastaConfig)[];
})[];
export declare class ToastaModule {
    static forRoot(): ModuleWithProviders<ToastaModule>;
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<ToastaModule, [typeof ɵngcc1.ToastComponent, typeof ɵngcc2.ToastaComponent, typeof ɵngcc3.SafeHtmlPipe], [typeof ɵngcc4.CommonModule], [typeof ɵngcc1.ToastComponent, typeof ɵngcc2.ToastaComponent]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<ToastaModule>;
}

//# sourceMappingURL=toasta.module.d.ts.map