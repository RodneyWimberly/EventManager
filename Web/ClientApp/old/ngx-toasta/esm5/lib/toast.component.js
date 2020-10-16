/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastData } from './toasta.service';
/**
 * A Toast component shows message with title and close button.
 */
var ToastComponent = /** @class */ (function () {
    function ToastComponent() {
        this.progressPercent = 0;
        this.startTime = performance.now();
        this.closeToastEvent = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ToastComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.toast.showDuration && this.toast.timeout > 0) {
            this.progressInterval = window.setInterval((/**
             * @return {?}
             */
            function () {
                _this.progressPercent = (100 - ((performance.now() - _this.startTime) / _this.toast.timeout * 100)); // Descending progress
                if (_this.progressPercent <= 0) {
                    clearInterval(_this.progressInterval);
                }
            }), 16.7); // 60 fps
        }
    };
    /**
     * Event handler invokes when user clicks on close button.
     * This method emit new event into ToastaContainer to close it.
     */
    /**
     * Event handler invokes when user clicks on close button.
     * This method emit new event into ToastaContainer to close it.
     * @param {?} $event
     * @return {?}
     */
    ToastComponent.prototype.close = /**
     * Event handler invokes when user clicks on close button.
     * This method emit new event into ToastaContainer to close it.
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.preventDefault();
        this.closeToastEvent.next(this.toast);
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    };
    ToastComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-toast',
                    template: "\n        <div class=\"toast\" [ngClass]=\"[toast.type, toast.theme]\">\n            <div *ngIf=\"toast.showClose\" class=\"close-button\" (click)=\"close($event)\"></div>\n            <div *ngIf=\"toast.title || toast.msg\" class=\"toast-text\">\n                <span *ngIf=\"toast.title\" class=\"toast-title\" [innerHTML]=\"toast.title | safeHtml\"></span>\n                <br *ngIf=\"toast.title && toast.msg\" />\n                <span *ngIf=\"toast.msg\" class=\"toast-msg\" [innerHtml]=\"toast.msg | safeHtml\"></span>\n            </div>\n            <div class=\"durationbackground\" *ngIf=\"toast.showDuration && toast.timeout > 0\">\n                <div class=\"durationbar\" [style.width.%]=\"progressPercent\">\n                </div>\n            </div>\n        </div>"
                }] }
    ];
    ToastComponent.propDecorators = {
        toast: [{ type: Input }],
        closeToastEvent: [{ type: Output, args: ['closeToast',] }]
    };
    return ToastComponent;
}());
export { ToastComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRvYXN0YS8iLCJzb3VyY2VzIjpbImxpYi90b2FzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7OztBQUs3QztJQUFBO1FBbUJFLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLGNBQVMsR0FBVyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFaEIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBMEI3RCxDQUFDOzs7O0lBeEJDLHdDQUFlOzs7SUFBZjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxXQUFXOzs7WUFBQztnQkFDekMsS0FBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO2dCQUV4SCxJQUFJLEtBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxFQUFFO29CQUM3QixhQUFhLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7aUJBQ3RDO1lBQ0gsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUztTQUNwQjtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCw4QkFBSzs7Ozs7O0lBQUwsVUFBTSxNQUFXO1FBQ2YsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDOztnQkEvQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsb3hCQVlHO2lCQUNkOzs7d0JBTUUsS0FBSztrQ0FDTCxNQUFNLFNBQUMsWUFBWTs7SUEwQnRCLHFCQUFDO0NBQUEsQUFoREQsSUFnREM7U0FoQ1ksY0FBYzs7O0lBRXpCLDBDQUF5Qjs7SUFDekIseUNBQW9COztJQUNwQixtQ0FBc0M7O0lBQ3RDLCtCQUEwQjs7SUFDMUIseUNBQTJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRvYXN0RGF0YSB9IGZyb20gJy4vdG9hc3RhLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIEEgVG9hc3QgY29tcG9uZW50IHNob3dzIG1lc3NhZ2Ugd2l0aCB0aXRsZSBhbmQgY2xvc2UgYnV0dG9uLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtdG9hc3QnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvYXN0XCIgW25nQ2xhc3NdPVwiW3RvYXN0LnR5cGUsIHRvYXN0LnRoZW1lXVwiPlxyXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwidG9hc3Quc2hvd0Nsb3NlXCIgY2xhc3M9XCJjbG9zZS1idXR0b25cIiAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwidG9hc3QudGl0bGUgfHwgdG9hc3QubXNnXCIgY2xhc3M9XCJ0b2FzdC10ZXh0XCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInRvYXN0LnRpdGxlXCIgY2xhc3M9XCJ0b2FzdC10aXRsZVwiIFtpbm5lckhUTUxdPVwidG9hc3QudGl0bGUgfCBzYWZlSHRtbFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxiciAqbmdJZj1cInRvYXN0LnRpdGxlICYmIHRvYXN0Lm1zZ1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInRvYXN0Lm1zZ1wiIGNsYXNzPVwidG9hc3QtbXNnXCIgW2lubmVySHRtbF09XCJ0b2FzdC5tc2cgfCBzYWZlSHRtbFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkdXJhdGlvbmJhY2tncm91bmRcIiAqbmdJZj1cInRvYXN0LnNob3dEdXJhdGlvbiAmJiB0b2FzdC50aW1lb3V0ID4gMFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImR1cmF0aW9uYmFyXCIgW3N0eWxlLndpZHRoLiVdPVwicHJvZ3Jlc3NQZXJjZW50XCI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9hc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgcHJvZ3Jlc3NJbnRlcnZhbDogbnVtYmVyO1xyXG4gIHByb2dyZXNzUGVyY2VudCA9IDA7XHJcbiAgc3RhcnRUaW1lOiBudW1iZXIgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICBASW5wdXQoKSB0b2FzdDogVG9hc3REYXRhO1xyXG4gIEBPdXRwdXQoJ2Nsb3NlVG9hc3QnKSBjbG9zZVRvYXN0RXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGlmICh0aGlzLnRvYXN0LnNob3dEdXJhdGlvbiAmJiB0aGlzLnRvYXN0LnRpbWVvdXQgPiAwKSB7XHJcbiAgICAgIHRoaXMucHJvZ3Jlc3NJbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc1BlcmNlbnQgPSAoMTAwIC0gKChwZXJmb3JtYW5jZS5ub3coKSAtIHRoaXMuc3RhcnRUaW1lKSAvIHRoaXMudG9hc3QudGltZW91dCAqIDEwMCkpOyAvLyBEZXNjZW5kaW5nIHByb2dyZXNzXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzUGVyY2VudCA8PSAwKSB7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMucHJvZ3Jlc3NJbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAxNi43KTsgLy8gNjAgZnBzXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBoYW5kbGVyIGludm9rZXMgd2hlbiB1c2VyIGNsaWNrcyBvbiBjbG9zZSBidXR0b24uXHJcbiAgICogVGhpcyBtZXRob2QgZW1pdCBuZXcgZXZlbnQgaW50byBUb2FzdGFDb250YWluZXIgdG8gY2xvc2UgaXQuXHJcbiAgICovXHJcbiAgY2xvc2UoJGV2ZW50OiBhbnkpIHtcclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5jbG9zZVRvYXN0RXZlbnQubmV4dCh0aGlzLnRvYXN0KTtcclxuXHJcbiAgICBpZiAodGhpcy5wcm9ncmVzc0ludGVydmFsKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5wcm9ncmVzc0ludGVydmFsKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19