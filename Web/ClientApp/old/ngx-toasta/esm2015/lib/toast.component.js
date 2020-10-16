/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastData } from './toasta.service';
/**
 * A Toast component shows message with title and close button.
 */
export class ToastComponent {
    constructor() {
        this.progressPercent = 0;
        this.startTime = performance.now();
        this.closeToastEvent = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.toast.showDuration && this.toast.timeout > 0) {
            this.progressInterval = window.setInterval((/**
             * @return {?}
             */
            () => {
                this.progressPercent = (100 - ((performance.now() - this.startTime) / this.toast.timeout * 100)); // Descending progress
                if (this.progressPercent <= 0) {
                    clearInterval(this.progressInterval);
                }
            }), 16.7); // 60 fps
        }
    }
    /**
     * Event handler invokes when user clicks on close button.
     * This method emit new event into ToastaContainer to close it.
     * @param {?} $event
     * @return {?}
     */
    close($event) {
        $event.preventDefault();
        this.closeToastEvent.next(this.toast);
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }
}
ToastComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-toast',
                template: `
        <div class="toast" [ngClass]="[toast.type, toast.theme]">
            <div *ngIf="toast.showClose" class="close-button" (click)="close($event)"></div>
            <div *ngIf="toast.title || toast.msg" class="toast-text">
                <span *ngIf="toast.title" class="toast-title" [innerHTML]="toast.title | safeHtml"></span>
                <br *ngIf="toast.title && toast.msg" />
                <span *ngIf="toast.msg" class="toast-msg" [innerHtml]="toast.msg | safeHtml"></span>
            </div>
            <div class="durationbackground" *ngIf="toast.showDuration && toast.timeout > 0">
                <div class="durationbar" [style.width.%]="progressPercent">
                </div>
            </div>
        </div>`
            }] }
];
ToastComponent.propDecorators = {
    toast: [{ type: Input }],
    closeToastEvent: [{ type: Output, args: ['closeToast',] }]
};
if (false) {
    /** @type {?} */
    ToastComponent.prototype.progressInterval;
    /** @type {?} */
    ToastComponent.prototype.progressPercent;
    /** @type {?} */
    ToastComponent.prototype.startTime;
    /** @type {?} */
    ToastComponent.prototype.toast;
    /** @type {?} */
    ToastComponent.prototype.closeToastEvent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRvYXN0YS8iLCJzb3VyY2VzIjpbImxpYi90b2FzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7OztBQXFCN0MsTUFBTSxPQUFPLGNBQWM7SUFoQjNCO1FBbUJFLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLGNBQVMsR0FBVyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFaEIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBMEI3RCxDQUFDOzs7O0lBeEJDLGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRTtZQUNyRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFdBQVc7OztZQUFDLEdBQUcsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO2dCQUV4SCxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxFQUFFO29CQUM3QixhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7aUJBQ3RDO1lBQ0gsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUztTQUNwQjtJQUNILENBQUM7Ozs7Ozs7SUFNRCxLQUFLLENBQUMsTUFBVztRQUNmLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdEMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7O1lBL0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7ZUFZRzthQUNkOzs7b0JBTUUsS0FBSzs4QkFDTCxNQUFNLFNBQUMsWUFBWTs7OztJQUpwQiwwQ0FBeUI7O0lBQ3pCLHlDQUFvQjs7SUFDcEIsbUNBQXNDOztJQUN0QywrQkFBMEI7O0lBQzFCLHlDQUEyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUb2FzdERhdGEgfSBmcm9tICcuL3RvYXN0YS5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBBIFRvYXN0IGNvbXBvbmVudCBzaG93cyBtZXNzYWdlIHdpdGggdGl0bGUgYW5kIGNsb3NlIGJ1dHRvbi5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LXRvYXN0JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2FzdFwiIFtuZ0NsYXNzXT1cIlt0b2FzdC50eXBlLCB0b2FzdC50aGVtZV1cIj5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInRvYXN0LnNob3dDbG9zZVwiIGNsYXNzPVwiY2xvc2UtYnV0dG9uXCIgKGNsaWNrKT1cImNsb3NlKCRldmVudClcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInRvYXN0LnRpdGxlIHx8IHRvYXN0Lm1zZ1wiIGNsYXNzPVwidG9hc3QtdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0b2FzdC50aXRsZVwiIGNsYXNzPVwidG9hc3QtdGl0bGVcIiBbaW5uZXJIVE1MXT1cInRvYXN0LnRpdGxlIHwgc2FmZUh0bWxcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8YnIgKm5nSWY9XCJ0b2FzdC50aXRsZSAmJiB0b2FzdC5tc2dcIiAvPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0b2FzdC5tc2dcIiBjbGFzcz1cInRvYXN0LW1zZ1wiIFtpbm5lckh0bWxdPVwidG9hc3QubXNnIHwgc2FmZUh0bWxcIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHVyYXRpb25iYWNrZ3JvdW5kXCIgKm5nSWY9XCJ0b2FzdC5zaG93RHVyYXRpb24gJiYgdG9hc3QudGltZW91dCA+IDBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkdXJhdGlvbmJhclwiIFtzdHlsZS53aWR0aC4lXT1cInByb2dyZXNzUGVyY2VudFwiPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmBcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvYXN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIHByb2dyZXNzSW50ZXJ2YWw6IG51bWJlcjtcclxuICBwcm9ncmVzc1BlcmNlbnQgPSAwO1xyXG4gIHN0YXJ0VGltZTogbnVtYmVyID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgQElucHV0KCkgdG9hc3Q6IFRvYXN0RGF0YTtcclxuICBAT3V0cHV0KCdjbG9zZVRvYXN0JykgY2xvc2VUb2FzdEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAodGhpcy50b2FzdC5zaG93RHVyYXRpb24gJiYgdGhpcy50b2FzdC50aW1lb3V0ID4gMCkge1xyXG4gICAgICB0aGlzLnByb2dyZXNzSW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NQZXJjZW50ID0gKDEwMCAtICgocGVyZm9ybWFuY2Uubm93KCkgLSB0aGlzLnN0YXJ0VGltZSkgLyB0aGlzLnRvYXN0LnRpbWVvdXQgKiAxMDApKTsgLy8gRGVzY2VuZGluZyBwcm9ncmVzc1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc1BlcmNlbnQgPD0gMCkge1xyXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnByb2dyZXNzSW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMTYuNyk7IC8vIDYwIGZwc1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgaGFuZGxlciBpbnZva2VzIHdoZW4gdXNlciBjbGlja3Mgb24gY2xvc2UgYnV0dG9uLlxyXG4gICAqIFRoaXMgbWV0aG9kIGVtaXQgbmV3IGV2ZW50IGludG8gVG9hc3RhQ29udGFpbmVyIHRvIGNsb3NlIGl0LlxyXG4gICAqL1xyXG4gIGNsb3NlKCRldmVudDogYW55KSB7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuY2xvc2VUb2FzdEV2ZW50Lm5leHQodGhpcy50b2FzdCk7XHJcblxyXG4gICAgaWYgKHRoaXMucHJvZ3Jlc3NJbnRlcnZhbCkge1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMucHJvZ3Jlc3NJbnRlcnZhbCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==