/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { isFunction } from './toasta.utils';
import { ToastaService, ToastaConfig, ToastaEventType } from './toasta.service';
/**
 * Toasta is container for Toast components
 */
export class ToastaComponent {
    /**
     * @param {?} config
     * @param {?} toastaService
     */
    constructor(config, toastaService) {
        this.config = config;
        this.toastaService = toastaService;
        this._position = '';
        // The storage for toasts.
        this.toasts = [];
        // Initialise position
        this.position = '';
    }
    // The window position where the toast pops up. Possible values:
    // - bottom-right (default value from ToastConfig)
    // - bottom-left
    // - bottom-center
    // - bottom-fullwidth
    // - top-right
    // - top-left
    // - top-center
    // - top-fullwidth
    // - center-center
    /**
     * @param {?} value
     * @return {?}
     */
    set position(value) {
        if (value) {
            /** @type {?} */
            let notFound = true;
            for (let i = 0; i < ToastaComponent.POSITIONS.length; i++) {
                if (ToastaComponent.POSITIONS[i] === value) {
                    notFound = false;
                    break;
                }
            }
            if (notFound) {
                // Position was wrong - clear it here to use the one from config.
                value = this.config.position;
            }
        }
        else {
            value = this.config.position;
        }
        this._position = 'toasta-position-' + value;
    }
    /**
     * @return {?}
     */
    get position() {
        return this._position;
    }
    /**
     * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
     * first time, and before any of its children have been checked. It is invoked only once when the
     * directive is instantiated.
     * @return {?}
     */
    ngOnInit() {
        // We listen events from our service
        this.toastaService.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event.type === ToastaEventType.ADD) {
                // Add the new one
                /** @type {?} */
                const toast = event.value;
                this.add(toast);
            }
            else if (event.type === ToastaEventType.CLEAR) {
                // Clear the one by number
                /** @type {?} */
                const id = event.value;
                this.clear(id);
            }
            else if (event.type === ToastaEventType.CLEAR_ALL) {
                // Lets clear all toasts
                this.clearAll();
            }
        }));
    }
    /**
     * Event listener of 'closeToast' event comes from ToastaComponent.
     * This method removes ToastComponent assosiated with this Toast.
     * @param {?} toast
     * @return {?}
     */
    closeToast(toast) {
        this.clear(toast.id);
    }
    /**
     * Add new Toast
     * @param {?} toast
     * @return {?}
     */
    add(toast) {
        // If we've gone over our limit, remove the earliest
        // one from the array
        if (this.config.limit && this.toasts.length >= this.config.limit) {
            this.toasts.shift();
        }
        // Add toasta to array
        this.toasts.push(toast);
        //
        // If there's a timeout individually or globally,
        // set the toast to timeout
        if (+toast.timeout) {
            this._setTimeout(toast);
        }
    }
    /**
     * Clear individual toast by id
     * @param {?} id is unique identifier of Toast
     * @return {?}
     */
    clear(id) {
        if (id) {
            this.toasts.forEach((/**
             * @param {?} value
             * @param {?} key
             * @return {?}
             */
            (value, key) => {
                if (value.id === id) {
                    if (value.onRemove && isFunction(value.onRemove)) {
                        value.onRemove.call(this, value);
                    }
                    this.toasts.splice(key, 1);
                }
            }));
        }
        else {
            throw new Error('Please provide id of Toast to close');
        }
    }
    /**
     * Clear all toasts
     * @return {?}
     */
    clearAll() {
        this.toasts.forEach((/**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */
        (value, key) => {
            if (value.onRemove && isFunction(value.onRemove)) {
                value.onRemove.call(this, value);
            }
        }));
        this.toasts = [];
    }
    /**
     * Custom setTimeout function for specific setTimeouts on individual toasts.
     * @private
     * @param {?} toast
     * @return {?}
     */
    _setTimeout(toast) {
        window.setTimeout((/**
         * @return {?}
         */
        () => {
            this.clear(toast.id);
        }), toast.timeout);
    }
}
/**
 * Set of constants defines position of Toasta on the page.
 */
ToastaComponent.POSITIONS = ['bottom-right', 'bottom-left', 'bottom-center', 'bottom-fullwidth', 'top-right', 'top-left', 'top-center', 'top-fullwidth', 'center-center'];
ToastaComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-toasta',
                template: `
    <div id="toasta" [ngClass]="[position]">
        <ngx-toast *ngFor="let toast of toasts" [toast]="toast" (closeToast)="closeToast(toast)"></ngx-toast>
    </div>`
            }] }
];
/** @nocollapse */
ToastaComponent.ctorParameters = () => [
    { type: ToastaConfig },
    { type: ToastaService }
];
ToastaComponent.propDecorators = {
    position: [{ type: Input }]
};
if (false) {
    /**
     * Set of constants defines position of Toasta on the page.
     * @type {?}
     */
    ToastaComponent.POSITIONS;
    /**
     * @type {?}
     * @private
     */
    ToastaComponent.prototype._position;
    /** @type {?} */
    ToastaComponent.prototype.toasts;
    /**
     * @type {?}
     * @private
     */
    ToastaComponent.prototype.config;
    /**
     * @type {?}
     * @private
     */
    ToastaComponent.prototype.toastaService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10b2FzdGEvIiwic291cmNlcyI6WyJsaWIvdG9hc3RhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxhQUFhLEVBQWEsWUFBWSxFQUFlLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBWXhHLE1BQU0sT0FBTyxlQUFlOzs7OztJQTRDMUIsWUFBb0IsTUFBb0IsRUFBVSxhQUE0QjtRQUExRCxXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUF0Q3RFLGNBQVMsR0FBRyxFQUFFLENBQUM7O1FBb0N2QixXQUFNLEdBQXFCLEVBQUUsQ0FBQztRQUc1QixzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0lBOUJELElBQ0ksUUFBUSxDQUFDLEtBQWE7UUFDeEIsSUFBSSxLQUFLLEVBQUU7O2dCQUNMLFFBQVEsR0FBRyxJQUFJO1lBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekQsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTtvQkFDMUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDakIsTUFBTTtpQkFDUDthQUNGO1lBQ0QsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osaUVBQWlFO2dCQUNqRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7YUFDOUI7U0FDRjthQUFNO1lB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QUM7YUFDbEM7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7Ozs7SUFLTyxXQUFXLENBQUMsS0FBZ0I7UUFDbEMsTUFBTSxDQUFDLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixDQUFDLEdBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BCLENBQUM7Ozs7O0FBcklNLHlCQUFTLEdBQWtCLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDOztZQVhqTCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRTs7O1dBR0Q7YUFDVjs7OztZQVhrQyxZQUFZO1lBQXRDLGFBQWE7Ozt1QkE2Qm5CLEtBQUs7Ozs7Ozs7SUFiTiwwQkFBZ0w7Ozs7O0lBRWhMLG9DQUF1Qjs7SUFvQ3ZCLGlDQUE4Qjs7Ozs7SUFFbEIsaUNBQTRCOzs7OztJQUFFLHdDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdG9hc3RhLnV0aWxzJztcclxuaW1wb3J0IHsgVG9hc3RhU2VydmljZSwgVG9hc3REYXRhLCBUb2FzdGFDb25maWcsIFRvYXN0YUV2ZW50LCBUb2FzdGFFdmVudFR5cGUgfSBmcm9tICcuL3RvYXN0YS5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBUb2FzdGEgaXMgY29udGFpbmVyIGZvciBUb2FzdCBjb21wb25lbnRzXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC10b2FzdGEnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGlkPVwidG9hc3RhXCIgW25nQ2xhc3NdPVwiW3Bvc2l0aW9uXVwiPlxyXG4gICAgICAgIDxuZ3gtdG9hc3QgKm5nRm9yPVwibGV0IHRvYXN0IG9mIHRvYXN0c1wiIFt0b2FzdF09XCJ0b2FzdFwiIChjbG9zZVRvYXN0KT1cImNsb3NlVG9hc3QodG9hc3QpXCI+PC9uZ3gtdG9hc3Q+XHJcbiAgICA8L2Rpdj5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb2FzdGFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIC8qKlxyXG4gICAqIFNldCBvZiBjb25zdGFudHMgZGVmaW5lcyBwb3NpdGlvbiBvZiBUb2FzdGEgb24gdGhlIHBhZ2UuXHJcbiAgICovXHJcbiAgc3RhdGljIFBPU0lUSU9OUzogQXJyYXk8U3RyaW5nPiA9IFsnYm90dG9tLXJpZ2h0JywgJ2JvdHRvbS1sZWZ0JywgJ2JvdHRvbS1jZW50ZXInLCAnYm90dG9tLWZ1bGx3aWR0aCcsICd0b3AtcmlnaHQnLCAndG9wLWxlZnQnLCAndG9wLWNlbnRlcicsICd0b3AtZnVsbHdpZHRoJywgJ2NlbnRlci1jZW50ZXInXTtcclxuXHJcbiAgcHJpdmF0ZSBfcG9zaXRpb24gPSAnJztcclxuICAvLyBUaGUgd2luZG93IHBvc2l0aW9uIHdoZXJlIHRoZSB0b2FzdCBwb3BzIHVwLiBQb3NzaWJsZSB2YWx1ZXM6XHJcbiAgLy8gLSBib3R0b20tcmlnaHQgKGRlZmF1bHQgdmFsdWUgZnJvbSBUb2FzdENvbmZpZylcclxuICAvLyAtIGJvdHRvbS1sZWZ0XHJcbiAgLy8gLSBib3R0b20tY2VudGVyXHJcbiAgLy8gLSBib3R0b20tZnVsbHdpZHRoXHJcbiAgLy8gLSB0b3AtcmlnaHRcclxuICAvLyAtIHRvcC1sZWZ0XHJcbiAgLy8gLSB0b3AtY2VudGVyXHJcbiAgLy8gLSB0b3AtZnVsbHdpZHRoXHJcbiAgLy8gLSBjZW50ZXItY2VudGVyXHJcbiAgQElucHV0KClcclxuICBzZXQgcG9zaXRpb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIGxldCBub3RGb3VuZCA9IHRydWU7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVG9hc3RhQ29tcG9uZW50LlBPU0lUSU9OUy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChUb2FzdGFDb21wb25lbnQuUE9TSVRJT05TW2ldID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgbm90Rm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobm90Rm91bmQpIHtcclxuICAgICAgICAvLyBQb3NpdGlvbiB3YXMgd3JvbmcgLSBjbGVhciBpdCBoZXJlIHRvIHVzZSB0aGUgb25lIGZyb20gY29uZmlnLlxyXG4gICAgICAgIHZhbHVlID0gdGhpcy5jb25maWcucG9zaXRpb247XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gdGhpcy5jb25maWcucG9zaXRpb247XHJcbiAgICB9XHJcbiAgICB0aGlzLl9wb3NpdGlvbiA9ICd0b2FzdGEtcG9zaXRpb24tJyArIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBvc2l0aW9uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XHJcbiAgfVxyXG5cclxuICAvLyBUaGUgc3RvcmFnZSBmb3IgdG9hc3RzLlxyXG4gIHRvYXN0czogQXJyYXk8VG9hc3REYXRhPiA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogVG9hc3RhQ29uZmlnLCBwcml2YXRlIHRvYXN0YVNlcnZpY2U6IFRvYXN0YVNlcnZpY2UpIHtcclxuICAgIC8vIEluaXRpYWxpc2UgcG9zaXRpb25cclxuICAgIHRoaXMucG9zaXRpb24gPSAnJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGBuZ09uSW5pdGAgaXMgY2FsbGVkIHJpZ2h0IGFmdGVyIHRoZSBkaXJlY3RpdmUncyBkYXRhLWJvdW5kIHByb3BlcnRpZXMgaGF2ZSBiZWVuIGNoZWNrZWQgZm9yIHRoZVxyXG4gICAqIGZpcnN0IHRpbWUsIGFuZCBiZWZvcmUgYW55IG9mIGl0cyBjaGlsZHJlbiBoYXZlIGJlZW4gY2hlY2tlZC4gSXQgaXMgaW52b2tlZCBvbmx5IG9uY2Ugd2hlbiB0aGVcclxuICAgKiBkaXJlY3RpdmUgaXMgaW5zdGFudGlhdGVkLlxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IGFueSB7XHJcbiAgICAvLyBXZSBsaXN0ZW4gZXZlbnRzIGZyb20gb3VyIHNlcnZpY2VcclxuICAgIHRoaXMudG9hc3RhU2VydmljZS5ldmVudHMuc3Vic2NyaWJlKChldmVudDogVG9hc3RhRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFRvYXN0YUV2ZW50VHlwZS5BREQpIHtcclxuICAgICAgICAvLyBBZGQgdGhlIG5ldyBvbmVcclxuICAgICAgICBjb25zdCB0b2FzdDogVG9hc3REYXRhID0gZXZlbnQudmFsdWU7XHJcbiAgICAgICAgdGhpcy5hZGQodG9hc3QpO1xyXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09IFRvYXN0YUV2ZW50VHlwZS5DTEVBUikge1xyXG4gICAgICAgIC8vIENsZWFyIHRoZSBvbmUgYnkgbnVtYmVyXHJcbiAgICAgICAgY29uc3QgaWQ6IG51bWJlciA9IGV2ZW50LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2xlYXIoaWQpO1xyXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09IFRvYXN0YUV2ZW50VHlwZS5DTEVBUl9BTEwpIHtcclxuICAgICAgICAvLyBMZXRzIGNsZWFyIGFsbCB0b2FzdHNcclxuICAgICAgICB0aGlzLmNsZWFyQWxsKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgbGlzdGVuZXIgb2YgJ2Nsb3NlVG9hc3QnIGV2ZW50IGNvbWVzIGZyb20gVG9hc3RhQ29tcG9uZW50LlxyXG4gICAqIFRoaXMgbWV0aG9kIHJlbW92ZXMgVG9hc3RDb21wb25lbnQgYXNzb3NpYXRlZCB3aXRoIHRoaXMgVG9hc3QuXHJcbiAgICovXHJcbiAgY2xvc2VUb2FzdCh0b2FzdDogVG9hc3REYXRhKSB7XHJcbiAgICB0aGlzLmNsZWFyKHRvYXN0LmlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBuZXcgVG9hc3RcclxuICAgKi9cclxuICBhZGQodG9hc3Q6IFRvYXN0RGF0YSkge1xyXG4gICAgLy8gSWYgd2UndmUgZ29uZSBvdmVyIG91ciBsaW1pdCwgcmVtb3ZlIHRoZSBlYXJsaWVzdFxyXG4gICAgLy8gb25lIGZyb20gdGhlIGFycmF5XHJcbiAgICBpZiAodGhpcy5jb25maWcubGltaXQgJiYgdGhpcy50b2FzdHMubGVuZ3RoID49IHRoaXMuY29uZmlnLmxpbWl0KSB7XHJcbiAgICAgIHRoaXMudG9hc3RzLnNoaWZ0KCk7XHJcbiAgICB9XHJcbiAgICAvLyBBZGQgdG9hc3RhIHRvIGFycmF5XHJcbiAgICB0aGlzLnRvYXN0cy5wdXNoKHRvYXN0KTtcclxuICAgIC8vXHJcbiAgICAvLyBJZiB0aGVyZSdzIGEgdGltZW91dCBpbmRpdmlkdWFsbHkgb3IgZ2xvYmFsbHksXHJcbiAgICAvLyBzZXQgdGhlIHRvYXN0IHRvIHRpbWVvdXRcclxuICAgIGlmICgrdG9hc3QudGltZW91dCkge1xyXG4gICAgICB0aGlzLl9zZXRUaW1lb3V0KHRvYXN0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIGluZGl2aWR1YWwgdG9hc3QgYnkgaWRcclxuICAgKiBAcGFyYW0gaWQgaXMgdW5pcXVlIGlkZW50aWZpZXIgb2YgVG9hc3RcclxuICAgKi9cclxuICBjbGVhcihpZDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaWQpIHtcclxuICAgICAgdGhpcy50b2FzdHMuZm9yRWFjaCgodmFsdWU6IGFueSwga2V5OiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZiAodmFsdWUuaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICBpZiAodmFsdWUub25SZW1vdmUgJiYgaXNGdW5jdGlvbih2YWx1ZS5vblJlbW92ZSkpIHtcclxuICAgICAgICAgICAgdmFsdWUub25SZW1vdmUuY2FsbCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnRvYXN0cy5zcGxpY2Uoa2V5LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBpZCBvZiBUb2FzdCB0byBjbG9zZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgYWxsIHRvYXN0c1xyXG4gICAqL1xyXG4gIGNsZWFyQWxsKCkge1xyXG4gICAgdGhpcy50b2FzdHMuZm9yRWFjaCgodmFsdWU6IGFueSwga2V5OiBudW1iZXIpID0+IHtcclxuICAgICAgaWYgKHZhbHVlLm9uUmVtb3ZlICYmIGlzRnVuY3Rpb24odmFsdWUub25SZW1vdmUpKSB7XHJcbiAgICAgICAgdmFsdWUub25SZW1vdmUuY2FsbCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy50b2FzdHMgPSBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1c3RvbSBzZXRUaW1lb3V0IGZ1bmN0aW9uIGZvciBzcGVjaWZpYyBzZXRUaW1lb3V0cyBvbiBpbmRpdmlkdWFsIHRvYXN0cy5cclxuICAgKi9cclxuICBwcml2YXRlIF9zZXRUaW1lb3V0KHRvYXN0OiBUb2FzdERhdGEpIHtcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5jbGVhcih0b2FzdC5pZCk7XHJcbiAgICB9LCB0b2FzdC50aW1lb3V0KTtcclxuICB9XHJcbn1cclxuIl19