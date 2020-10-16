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
var ToastaComponent = /** @class */ (function () {
    function ToastaComponent(config, toastaService) {
        this.config = config;
        this.toastaService = toastaService;
        this._position = '';
        // The storage for toasts.
        this.toasts = [];
        // Initialise position
        this.position = '';
    }
    Object.defineProperty(ToastaComponent.prototype, "position", {
        get: /**
         * @return {?}
         */
        function () {
            return this._position;
        },
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
        set: 
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
        function (value) {
            if (value) {
                /** @type {?} */
                var notFound = true;
                for (var i = 0; i < ToastaComponent.POSITIONS.length; i++) {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
     * first time, and before any of its children have been checked. It is invoked only once when the
     * directive is instantiated.
     */
    /**
     * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
     * first time, and before any of its children have been checked. It is invoked only once when the
     * directive is instantiated.
     * @return {?}
     */
    ToastaComponent.prototype.ngOnInit = /**
     * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
     * first time, and before any of its children have been checked. It is invoked only once when the
     * directive is instantiated.
     * @return {?}
     */
    function () {
        var _this = this;
        // We listen events from our service
        this.toastaService.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.type === ToastaEventType.ADD) {
                // Add the new one
                /** @type {?} */
                var toast = event.value;
                _this.add(toast);
            }
            else if (event.type === ToastaEventType.CLEAR) {
                // Clear the one by number
                /** @type {?} */
                var id = event.value;
                _this.clear(id);
            }
            else if (event.type === ToastaEventType.CLEAR_ALL) {
                // Lets clear all toasts
                _this.clearAll();
            }
        }));
    };
    /**
     * Event listener of 'closeToast' event comes from ToastaComponent.
     * This method removes ToastComponent assosiated with this Toast.
     */
    /**
     * Event listener of 'closeToast' event comes from ToastaComponent.
     * This method removes ToastComponent assosiated with this Toast.
     * @param {?} toast
     * @return {?}
     */
    ToastaComponent.prototype.closeToast = /**
     * Event listener of 'closeToast' event comes from ToastaComponent.
     * This method removes ToastComponent assosiated with this Toast.
     * @param {?} toast
     * @return {?}
     */
    function (toast) {
        this.clear(toast.id);
    };
    /**
     * Add new Toast
     */
    /**
     * Add new Toast
     * @param {?} toast
     * @return {?}
     */
    ToastaComponent.prototype.add = /**
     * Add new Toast
     * @param {?} toast
     * @return {?}
     */
    function (toast) {
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
    };
    /**
     * Clear individual toast by id
     * @param id is unique identifier of Toast
     */
    /**
     * Clear individual toast by id
     * @param {?} id is unique identifier of Toast
     * @return {?}
     */
    ToastaComponent.prototype.clear = /**
     * Clear individual toast by id
     * @param {?} id is unique identifier of Toast
     * @return {?}
     */
    function (id) {
        var _this = this;
        if (id) {
            this.toasts.forEach((/**
             * @param {?} value
             * @param {?} key
             * @return {?}
             */
            function (value, key) {
                if (value.id === id) {
                    if (value.onRemove && isFunction(value.onRemove)) {
                        value.onRemove.call(_this, value);
                    }
                    _this.toasts.splice(key, 1);
                }
            }));
        }
        else {
            throw new Error('Please provide id of Toast to close');
        }
    };
    /**
     * Clear all toasts
     */
    /**
     * Clear all toasts
     * @return {?}
     */
    ToastaComponent.prototype.clearAll = /**
     * Clear all toasts
     * @return {?}
     */
    function () {
        var _this = this;
        this.toasts.forEach((/**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */
        function (value, key) {
            if (value.onRemove && isFunction(value.onRemove)) {
                value.onRemove.call(_this, value);
            }
        }));
        this.toasts = [];
    };
    /**
     * Custom setTimeout function for specific setTimeouts on individual toasts.
     */
    /**
     * Custom setTimeout function for specific setTimeouts on individual toasts.
     * @private
     * @param {?} toast
     * @return {?}
     */
    ToastaComponent.prototype._setTimeout = /**
     * Custom setTimeout function for specific setTimeouts on individual toasts.
     * @private
     * @param {?} toast
     * @return {?}
     */
    function (toast) {
        var _this = this;
        window.setTimeout((/**
         * @return {?}
         */
        function () {
            _this.clear(toast.id);
        }), toast.timeout);
    };
    /**
     * Set of constants defines position of Toasta on the page.
     */
    ToastaComponent.POSITIONS = ['bottom-right', 'bottom-left', 'bottom-center', 'bottom-fullwidth', 'top-right', 'top-left', 'top-center', 'top-fullwidth', 'center-center'];
    ToastaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-toasta',
                    template: "\n    <div id=\"toasta\" [ngClass]=\"[position]\">\n        <ngx-toast *ngFor=\"let toast of toasts\" [toast]=\"toast\" (closeToast)=\"closeToast(toast)\"></ngx-toast>\n    </div>"
                }] }
    ];
    /** @nocollapse */
    ToastaComponent.ctorParameters = function () { return [
        { type: ToastaConfig },
        { type: ToastaService }
    ]; };
    ToastaComponent.propDecorators = {
        position: [{ type: Input }]
    };
    return ToastaComponent;
}());
export { ToastaComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10b2FzdGEvIiwic291cmNlcyI6WyJsaWIvdG9hc3RhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxhQUFhLEVBQWEsWUFBWSxFQUFlLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBS3hHO0lBbURFLHlCQUFvQixNQUFvQixFQUFVLGFBQTRCO1FBQTFELFdBQU0sR0FBTixNQUFNLENBQWM7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXRDdEUsY0FBUyxHQUFHLEVBQUUsQ0FBQzs7UUFvQ3ZCLFdBQU0sR0FBcUIsRUFBRSxDQUFDO1FBRzVCLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBOUJELHNCQUNJLHFDQUFROzs7O1FBbUJaO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7UUFoQ0QsZ0VBQWdFO1FBQ2hFLGtEQUFrRDtRQUNsRCxnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLHFCQUFxQjtRQUNyQixjQUFjO1FBQ2QsYUFBYTtRQUNiLGVBQWU7UUFDZixrQkFBa0I7UUFDbEIsa0JBQWtCOzs7Ozs7Ozs7Ozs7Ozs7O1FBQ2xCLFVBQ2EsS0FBYTtZQUN4QixJQUFJLEtBQUssRUFBRTs7b0JBQ0wsUUFBUSxHQUFHLElBQUk7Z0JBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDekQsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxL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LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL3RvYXN0YS51dGlscyc7XHJcbmltcG9ydCB7IFRvYXN0YVNlcnZpY2UsIFRvYXN0RGF0YSwgVG9hc3RhQ29uZmlnLCBUb2FzdGFFdmVudCwgVG9hc3RhRXZlbnRUeXBlIH0gZnJvbSAnLi90b2FzdGEuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogVG9hc3RhIGlzIGNvbnRhaW5lciBmb3IgVG9hc3QgY29tcG9uZW50c1xyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtdG9hc3RhJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBpZD1cInRvYXN0YVwiIFtuZ0NsYXNzXT1cIltwb3NpdGlvbl1cIj5cclxuICAgICAgICA8bmd4LXRvYXN0ICpuZ0Zvcj1cImxldCB0b2FzdCBvZiB0b2FzdHNcIiBbdG9hc3RdPVwidG9hc3RcIiAoY2xvc2VUb2FzdCk9XCJjbG9zZVRvYXN0KHRvYXN0KVwiPjwvbmd4LXRvYXN0PlxyXG4gICAgPC9kaXY+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9hc3RhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAvKipcclxuICAgKiBTZXQgb2YgY29uc3RhbnRzIGRlZmluZXMgcG9zaXRpb24gb2YgVG9hc3RhIG9uIHRoZSBwYWdlLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBQT1NJVElPTlM6IEFycmF5PFN0cmluZz4gPSBbJ2JvdHRvbS1yaWdodCcsICdib3R0b20tbGVmdCcsICdib3R0b20tY2VudGVyJywgJ2JvdHRvbS1mdWxsd2lkdGgnLCAndG9wLXJpZ2h0JywgJ3RvcC1sZWZ0JywgJ3RvcC1jZW50ZXInLCAndG9wLWZ1bGx3aWR0aCcsICdjZW50ZXItY2VudGVyJ107XHJcblxyXG4gIHByaXZhdGUgX3Bvc2l0aW9uID0gJyc7XHJcbiAgLy8gVGhlIHdpbmRvdyBwb3NpdGlvbiB3aGVyZSB0aGUgdG9hc3QgcG9wcyB1cC4gUG9zc2libGUgdmFsdWVzOlxyXG4gIC8vIC0gYm90dG9tLXJpZ2h0IChkZWZhdWx0IHZhbHVlIGZyb20gVG9hc3RDb25maWcpXHJcbiAgLy8gLSBib3R0b20tbGVmdFxyXG4gIC8vIC0gYm90dG9tLWNlbnRlclxyXG4gIC8vIC0gYm90dG9tLWZ1bGx3aWR0aFxyXG4gIC8vIC0gdG9wLXJpZ2h0XHJcbiAgLy8gLSB0b3AtbGVmdFxyXG4gIC8vIC0gdG9wLWNlbnRlclxyXG4gIC8vIC0gdG9wLWZ1bGx3aWR0aFxyXG4gIC8vIC0gY2VudGVyLWNlbnRlclxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHBvc2l0aW9uKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBsZXQgbm90Rm91bmQgPSB0cnVlO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFRvYXN0YUNvbXBvbmVudC5QT1NJVElPTlMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoVG9hc3RhQ29tcG9uZW50LlBPU0lUSU9OU1tpXSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgIG5vdEZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5vdEZvdW5kKSB7XHJcbiAgICAgICAgLy8gUG9zaXRpb24gd2FzIHdyb25nIC0gY2xlYXIgaXQgaGVyZSB0byB1c2UgdGhlIG9uZSBmcm9tIGNvbmZpZy5cclxuICAgICAgICB2YWx1ZSA9IHRoaXMuY29uZmlnLnBvc2l0aW9uO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWx1ZSA9IHRoaXMuY29uZmlnLnBvc2l0aW9uO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcG9zaXRpb24gPSAndG9hc3RhLXBvc2l0aW9uLScgKyB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBwb3NpdGlvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgLy8gVGhlIHN0b3JhZ2UgZm9yIHRvYXN0cy5cclxuICB0b2FzdHM6IEFycmF5PFRvYXN0RGF0YT4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IFRvYXN0YUNvbmZpZywgcHJpdmF0ZSB0b2FzdGFTZXJ2aWNlOiBUb2FzdGFTZXJ2aWNlKSB7XHJcbiAgICAvLyBJbml0aWFsaXNlIHBvc2l0aW9uXHJcbiAgICB0aGlzLnBvc2l0aW9uID0gJyc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBgbmdPbkluaXRgIGlzIGNhbGxlZCByaWdodCBhZnRlciB0aGUgZGlyZWN0aXZlJ3MgZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIGhhdmUgYmVlbiBjaGVja2VkIGZvciB0aGVcclxuICAgKiBmaXJzdCB0aW1lLCBhbmQgYmVmb3JlIGFueSBvZiBpdHMgY2hpbGRyZW4gaGF2ZSBiZWVuIGNoZWNrZWQuIEl0IGlzIGludm9rZWQgb25seSBvbmNlIHdoZW4gdGhlXHJcbiAgICogZGlyZWN0aXZlIGlzIGluc3RhbnRpYXRlZC5cclxuICAgKi9cclxuICBuZ09uSW5pdCgpOiBhbnkge1xyXG4gICAgLy8gV2UgbGlzdGVuIGV2ZW50cyBmcm9tIG91ciBzZXJ2aWNlXHJcbiAgICB0aGlzLnRvYXN0YVNlcnZpY2UuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQ6IFRvYXN0YUV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC50eXBlID09PSBUb2FzdGFFdmVudFR5cGUuQUREKSB7XHJcbiAgICAgICAgLy8gQWRkIHRoZSBuZXcgb25lXHJcbiAgICAgICAgY29uc3QgdG9hc3Q6IFRvYXN0RGF0YSA9IGV2ZW50LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuYWRkKHRvYXN0KTtcclxuICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSBUb2FzdGFFdmVudFR5cGUuQ0xFQVIpIHtcclxuICAgICAgICAvLyBDbGVhciB0aGUgb25lIGJ5IG51bWJlclxyXG4gICAgICAgIGNvbnN0IGlkOiBudW1iZXIgPSBldmVudC52YWx1ZTtcclxuICAgICAgICB0aGlzLmNsZWFyKGlkKTtcclxuICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSBUb2FzdGFFdmVudFR5cGUuQ0xFQVJfQUxMKSB7XHJcbiAgICAgICAgLy8gTGV0cyBjbGVhciBhbGwgdG9hc3RzXHJcbiAgICAgICAgdGhpcy5jbGVhckFsbCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGxpc3RlbmVyIG9mICdjbG9zZVRvYXN0JyBldmVudCBjb21lcyBmcm9tIFRvYXN0YUNvbXBvbmVudC5cclxuICAgKiBUaGlzIG1ldGhvZCByZW1vdmVzIFRvYXN0Q29tcG9uZW50IGFzc29zaWF0ZWQgd2l0aCB0aGlzIFRvYXN0LlxyXG4gICAqL1xyXG4gIGNsb3NlVG9hc3QodG9hc3Q6IFRvYXN0RGF0YSkge1xyXG4gICAgdGhpcy5jbGVhcih0b2FzdC5pZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbmV3IFRvYXN0XHJcbiAgICovXHJcbiAgYWRkKHRvYXN0OiBUb2FzdERhdGEpIHtcclxuICAgIC8vIElmIHdlJ3ZlIGdvbmUgb3ZlciBvdXIgbGltaXQsIHJlbW92ZSB0aGUgZWFybGllc3RcclxuICAgIC8vIG9uZSBmcm9tIHRoZSBhcnJheVxyXG4gICAgaWYgKHRoaXMuY29uZmlnLmxpbWl0ICYmIHRoaXMudG9hc3RzLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5saW1pdCkge1xyXG4gICAgICB0aGlzLnRvYXN0cy5zaGlmdCgpO1xyXG4gICAgfVxyXG4gICAgLy8gQWRkIHRvYXN0YSB0byBhcnJheVxyXG4gICAgdGhpcy50b2FzdHMucHVzaCh0b2FzdCk7XHJcbiAgICAvL1xyXG4gICAgLy8gSWYgdGhlcmUncyBhIHRpbWVvdXQgaW5kaXZpZHVhbGx5IG9yIGdsb2JhbGx5LFxyXG4gICAgLy8gc2V0IHRoZSB0b2FzdCB0byB0aW1lb3V0XHJcbiAgICBpZiAoK3RvYXN0LnRpbWVvdXQpIHtcclxuICAgICAgdGhpcy5fc2V0VGltZW91dCh0b2FzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciBpbmRpdmlkdWFsIHRvYXN0IGJ5IGlkXHJcbiAgICogQHBhcmFtIGlkIGlzIHVuaXF1ZSBpZGVudGlmaWVyIG9mIFRvYXN0XHJcbiAgICovXHJcbiAgY2xlYXIoaWQ6IG51bWJlcikge1xyXG4gICAgaWYgKGlkKSB7XHJcbiAgICAgIHRoaXMudG9hc3RzLmZvckVhY2goKHZhbHVlOiBhbnksIGtleTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgaWYgKHZhbHVlLmlkID09PSBpZCkge1xyXG4gICAgICAgICAgaWYgKHZhbHVlLm9uUmVtb3ZlICYmIGlzRnVuY3Rpb24odmFsdWUub25SZW1vdmUpKSB7XHJcbiAgICAgICAgICAgIHZhbHVlLm9uUmVtb3ZlLmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy50b2FzdHMuc3BsaWNlKGtleSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgaWQgb2YgVG9hc3QgdG8gY2xvc2UnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIGFsbCB0b2FzdHNcclxuICAgKi9cclxuICBjbGVhckFsbCgpIHtcclxuICAgIHRoaXMudG9hc3RzLmZvckVhY2goKHZhbHVlOiBhbnksIGtleTogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGlmICh2YWx1ZS5vblJlbW92ZSAmJiBpc0Z1bmN0aW9uKHZhbHVlLm9uUmVtb3ZlKSkge1xyXG4gICAgICAgIHZhbHVlLm9uUmVtb3ZlLmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMudG9hc3RzID0gW107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDdXN0b20gc2V0VGltZW91dCBmdW5jdGlvbiBmb3Igc3BlY2lmaWMgc2V0VGltZW91dHMgb24gaW5kaXZpZHVhbCB0b2FzdHMuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc2V0VGltZW91dCh0b2FzdDogVG9hc3REYXRhKSB7XHJcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2xlYXIodG9hc3QuaWQpO1xyXG4gICAgfSwgdG9hc3QudGltZW91dCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==