import { AfterViewInit, EventEmitter } from '@angular/core';
import { ToastData } from './toasta.service';
/**
 * A Toast component shows message with title and close button.
 */
import * as ɵngcc0 from '@angular/core';
export declare class ToastComponent implements AfterViewInit {
    progressInterval: number;
    progressPercent: number;
    startTime: number;
    toast: ToastData;
    closeToastEvent: EventEmitter<{}>;
    ngAfterViewInit(): void;
    /**
     * Event handler invokes when user clicks on close button.
     * This method emit new event into ToastaContainer to close it.
     */
    close($event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ToastComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ToastComponent, "ngx-toast", never, { "toast": "toast"; }, { "closeToastEvent": "closeToast"; }, never, never>;
}

//# sourceMappingURL=toast.component.d.ts.map