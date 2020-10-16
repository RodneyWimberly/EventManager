/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { isString, isNumber, isFunction } from './toasta.utils';
/**
 * Options to configure a new Toast
 */
export class ToastOptions {
}
ToastOptions.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    ToastOptions.prototype.title;
    /** @type {?} */
    ToastOptions.prototype.msg;
    /** @type {?} */
    ToastOptions.prototype.showClose;
    /** @type {?} */
    ToastOptions.prototype.showDuration;
    /** @type {?} */
    ToastOptions.prototype.theme;
    /** @type {?} */
    ToastOptions.prototype.timeout;
    /** @type {?} */
    ToastOptions.prototype.onAdd;
    /** @type {?} */
    ToastOptions.prototype.onRemove;
}
/**
 * Structrure of a created Toast
 */
export class ToastData {
}
ToastData.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    ToastData.prototype.id;
    /** @type {?} */
    ToastData.prototype.title;
    /** @type {?} */
    ToastData.prototype.msg;
    /** @type {?} */
    ToastData.prototype.showClose;
    /** @type {?} */
    ToastData.prototype.showDuration;
    /** @type {?} */
    ToastData.prototype.type;
    /** @type {?} */
    ToastData.prototype.theme;
    /** @type {?} */
    ToastData.prototype.timeout;
    /** @type {?} */
    ToastData.prototype.onAdd;
    /** @type {?} */
    ToastData.prototype.onRemove;
    /** @type {?} */
    ToastData.prototype.onClick;
}
/**
 * Default configuration for all toasts and toasta container
 */
export class ToastaConfig {
    constructor() {
        // Maximum number of toasties to show at once
        this.limit = 5;
        // Whether to show the 'X' icon to close the toast
        this.showClose = true;
        // Whether to show a progress bar at the bottom of the notification
        this.showDuration = true;
        // The window position where the toast pops up
        this.position = 'bottom-right';
        // How long (in miliseconds) the toasta shows before it's removed. Set to null/0 to turn off.
        this.timeout = 5000;
        // What theme to use
        this.theme = 'default';
    }
}
ToastaConfig.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    ToastaConfig.prototype.limit;
    /** @type {?} */
    ToastaConfig.prototype.showClose;
    /** @type {?} */
    ToastaConfig.prototype.showDuration;
    /** @type {?} */
    ToastaConfig.prototype.position;
    /** @type {?} */
    ToastaConfig.prototype.timeout;
    /** @type {?} */
    ToastaConfig.prototype.theme;
}
/** @enum {number} */
const ToastaEventType = {
    ADD: 0,
    CLEAR: 1,
    CLEAR_ALL: 2,
};
export { ToastaEventType };
ToastaEventType[ToastaEventType.ADD] = 'ADD';
ToastaEventType[ToastaEventType.CLEAR] = 'CLEAR';
ToastaEventType[ToastaEventType.CLEAR_ALL] = 'CLEAR_ALL';
export class ToastaEvent {
    /**
     * @param {?} type
     * @param {?=} value
     */
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
if (false) {
    /** @type {?} */
    ToastaEvent.prototype.type;
    /** @type {?} */
    ToastaEvent.prototype.value;
}
/**
 * @param {?} config
 * @return {?}
 */
export function toastaServiceFactory(config) {
    return new ToastaService(config);
}
/**
 * Toasta service helps create different kinds of Toasts
 */
export class ToastaService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        // Init the counter
        this.uniqueCounter = 0;
        // ToastData event emitter
        // private toastsEmitter: EventEmitter<ToastData> = new EventEmitter<ToastData>();
        // Clear event emitter
        // private clearEmitter: EventEmitter<number> = new EventEmitter<number>();
        this.eventSource = new Subject();
        this.events = this.eventSource.asObservable();
    }
    /**
       * Get list of toats
       */
    // getToasts(): Observable<ToastData> {
    //   return this.toastsEmitter.asObservable();
    // }
    // getClear(): Observable<number> {
    //   return this.clearEmitter.asObservable();
    // }
    /**
     * Create Toast of a default type
     * @param {?} options
     * @return {?}
     */
    default(options) {
        this.add(options, 'default');
    }
    /**
     * Create Toast of info type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    info(options) {
        this.add(options, 'info');
    }
    /**
     * Create Toast of success type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    success(options) {
        this.add(options, 'success');
    }
    /**
     * Create Toast of wait type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    wait(options) {
        this.add(options, 'wait');
    }
    /**
     * Create Toast of error type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    error(options) {
        this.add(options, 'error');
    }
    /**
     * Create Toast of warning type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    warning(options) {
        this.add(options, 'warning');
    }
    // Add a new toast item
    /**
     * @private
     * @param {?} options
     * @param {?} type
     * @return {?}
     */
    add(options, type) {
        /** @type {?} */
        let toastaOptions;
        if (isString(options) && options !== '' || isNumber(options)) {
            toastaOptions = (/** @type {?} */ ({
                title: options.toString()
            }));
        }
        else {
            toastaOptions = (/** @type {?} */ (options));
        }
        if (!toastaOptions || !toastaOptions.title && !toastaOptions.msg) {
            throw new Error('ngx-toasta: No toast title or message specified!');
        }
        type = type || 'default';
        // Set a unique counter for an id
        this.uniqueCounter++;
        // Set the local vs global config items
        /** @type {?} */
        const showClose = this._checkConfigItem(this.config, toastaOptions, 'showClose');
        // Set the local vs global config items
        /** @type {?} */
        const showDuration = this._checkConfigItem(this.config, toastaOptions, 'showDuration');
        // If we have a theme set, make sure it's a valid one
        /** @type {?} */
        let theme;
        if (toastaOptions.theme) {
            theme = ToastaService.THEMES.indexOf(toastaOptions.theme) > -1 ? toastaOptions.theme : this.config.theme;
        }
        else {
            theme = this.config.theme;
        }
        /** @type {?} */
        const toast = (/** @type {?} */ ({
            id: this.uniqueCounter,
            title: toastaOptions.title,
            msg: toastaOptions.msg,
            showClose,
            showDuration,
            type: 'toasta-type-' + type,
            theme: 'toasta-theme-' + theme,
            onAdd: toastaOptions.onAdd && isFunction(toastaOptions.onAdd) ? toastaOptions.onAdd : null,
            onRemove: toastaOptions.onRemove && isFunction(toastaOptions.onRemove) ? toastaOptions.onRemove : null
        }));
        // If there's a timeout individually or globally, set the toast to timeout
        // Allows a caller to pass null/0 and override the default. Can also set the default to null/0 to turn off.
        toast.timeout = toastaOptions.hasOwnProperty('timeout') ? toastaOptions.timeout : this.config.timeout;
        // Push up a new toast item
        // this.toastsSubscriber.next(toast);
        // this.toastsEmitter.next(toast);
        this.emitEvent(new ToastaEvent(ToastaEventType.ADD, toast));
        // If we have a onAdd function, call it here
        if (toastaOptions.onAdd && isFunction(toastaOptions.onAdd)) {
            toastaOptions.onAdd.call(this, toast);
        }
    }
    // Clear all toasts
    /**
     * @return {?}
     */
    clearAll() {
        // this.clearEmitter.next(null);
        this.emitEvent(new ToastaEvent(ToastaEventType.CLEAR_ALL));
    }
    // Clear the specific one
    /**
     * @param {?} id
     * @return {?}
     */
    clear(id) {
        // this.clearEmitter.next(id);
        this.emitEvent(new ToastaEvent(ToastaEventType.CLEAR, id));
    }
    // Checks whether the local option is set, if not,
    // checks the global config
    /**
     * @private
     * @param {?} config
     * @param {?} options
     * @param {?} property
     * @return {?}
     */
    _checkConfigItem(config, options, property) {
        if (options[property] === false) {
            return false;
        }
        else if (!options[property]) {
            return config[property];
        }
        else {
            return true;
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    emitEvent(event) {
        if (this.eventSource) {
            // Push up a new event
            this.eventSource.next(event);
        }
    }
}
// Allowed THEMES
ToastaService.THEMES = ['default', 'material', 'bootstrap'];
ToastaService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ToastaService.ctorParameters = () => [
    { type: ToastaConfig }
];
if (false) {
    /** @type {?} */
    ToastaService.THEMES;
    /** @type {?} */
    ToastaService.prototype.uniqueCounter;
    /**
     * @type {?}
     * @private
     */
    ToastaService.prototype.eventSource;
    /** @type {?} */
    ToastaService.prototype.events;
    /**
     * @type {?}
     * @private
     */
    ToastaService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdG9hc3RhLyIsInNvdXJjZXMiOlsibGliL3RvYXN0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFRaEUsTUFBTSxPQUFPLFlBQVk7OztZQUR4QixVQUFVOzs7O0lBRVQsNkJBQWM7O0lBQ2QsMkJBQWE7O0lBQ2IsaUNBQW9COztJQUNwQixvQ0FBdUI7O0lBQ3ZCLDZCQUFlOztJQUNmLCtCQUFpQjs7SUFDakIsNkJBQWlCOztJQUNqQixnQ0FBb0I7Ozs7O0FBT3RCLE1BQU0sT0FBTyxTQUFTOzs7WUFEckIsVUFBVTs7OztJQUVULHVCQUFXOztJQUNYLDBCQUFjOztJQUNkLHdCQUFZOztJQUNaLDhCQUFtQjs7SUFDbkIsaUNBQXNCOztJQUN0Qix5QkFBYTs7SUFDYiwwQkFBYzs7SUFDZCw0QkFBZ0I7O0lBQ2hCLDBCQUFnQjs7SUFDaEIsNkJBQW1COztJQUNuQiw0QkFBa0I7Ozs7O0FBT3BCLE1BQU0sT0FBTyxZQUFZO0lBRHpCOztRQUlFLFVBQUssR0FBRyxDQUFDLENBQUM7O1FBR1YsY0FBUyxHQUFHLElBQUksQ0FBQzs7UUFHakIsaUJBQVksR0FBRyxJQUFJLENBQUM7O1FBR3BCLGFBQVEsR0FBd0osY0FBYyxDQUFDOztRQUcvSyxZQUFPLEdBQUcsSUFBSSxDQUFDOztRQUdmLFVBQUssR0FBeUMsU0FBUyxDQUFDO0lBQzFELENBQUM7OztZQXBCQSxVQUFVOzs7O0lBSVQsNkJBQVU7O0lBR1YsaUNBQWlCOztJQUdqQixvQ0FBb0I7O0lBR3BCLGdDQUErSzs7SUFHL0ssK0JBQWU7O0lBR2YsNkJB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bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc0Z1bmN0aW9uIH0gZnJvbSAnLi90b2FzdGEudXRpbHMnO1xyXG5cclxuXHJcblxyXG4vKipcclxuICogT3B0aW9ucyB0byBjb25maWd1cmUgYSBuZXcgVG9hc3RcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRvYXN0T3B0aW9ucyB7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBtc2c/OiBzdHJpbmc7XHJcbiAgc2hvd0Nsb3NlPzogYm9vbGVhbjtcclxuICBzaG93RHVyYXRpb24/OiBib29sZWFuO1xyXG4gIHRoZW1lPzogc3RyaW5nO1xyXG4gIHRpbWVvdXQ/OiBudW1iZXI7XHJcbiAgb25BZGQ/OiBGdW5jdGlvbjtcclxuICBvblJlbW92ZT86IEZ1bmN0aW9uO1xyXG59XHJcblxyXG4vKipcclxuICogU3RydWN0cnVyZSBvZiBhIGNyZWF0ZWQgVG9hc3RcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRvYXN0RGF0YSB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIG1zZzogc3RyaW5nO1xyXG4gIHNob3dDbG9zZTogYm9vbGVhbjtcclxuICBzaG93RHVyYXRpb246IGJvb2xlYW47XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIHRoZW1lOiBzdHJpbmc7XHJcbiAgdGltZW91dDogbnVtYmVyO1xyXG4gIG9uQWRkOiBGdW5jdGlvbjtcclxuICBvblJlbW92ZTogRnVuY3Rpb247XHJcbiAgb25DbGljazogRnVuY3Rpb247XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZhdWx0IGNvbmZpZ3VyYXRpb24gZm9yIGFsbCB0b2FzdHMgYW5kIHRvYXN0YSBjb250YWluZXJcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRvYXN0YUNvbmZpZyB7XHJcblxyXG4gIC8vIE1heGltdW0gbnVtYmVyIG9mIHRvYXN0aWVzIHRvIHNob3cgYXQgb25jZVxyXG4gIGxpbWl0ID0gNTtcclxuXHJcbiAgLy8gV2hldGhlciB0byBzaG93IHRoZSAnWCcgaWNvbiB0byBjbG9zZSB0aGUgdG9hc3RcclxuICBzaG93Q2xvc2UgPSB0cnVlO1xyXG5cclxuICAvLyBXaGV0aGVyIHRvIHNob3cgYSBwcm9ncmVzcyBiYXIgYXQgdGhlIGJvdHRvbSBvZiB0aGUgbm90aWZpY2F0aW9uXHJcbiAgc2hvd0R1cmF0aW9uID0gdHJ1ZTtcclxuXHJcbiAgLy8gVGhlIHdpbmRvdyBwb3NpdGlvbiB3aGVyZSB0aGUgdG9hc3QgcG9wcyB1cFxyXG4gIHBvc2l0aW9uOiAnYm90dG9tLXJpZ2h0JyB8ICdib3R0b20tbGVmdCcgfCAnYm90dG9tLWNlbnRlcicgfCAnYm90dG9tLWZ1bGx3aWR0aCcgfCAndG9wLXJpZ2h0JyB8ICd0b3AtbGVmdCcgfCAndG9wLWNlbnRlcicgfCAndG9wLWZ1bGx3aWR0aCcgfCAnY2VudGVyLWNlbnRlcicgPSAnYm90dG9tLXJpZ2h0JztcclxuXHJcbiAgLy8gSG93IGxvbmcgKGluIG1pbGlzZWNvbmRzKSB0aGUgdG9hc3RhIHNob3dzIGJlZm9yZSBpdCdzIHJlbW92ZWQuIFNldCB0byBudWxsLzAgdG8gdHVybiBvZmYuXHJcbiAgdGltZW91dCA9IDUwMDA7XHJcblxyXG4gIC8vIFdoYXQgdGhlbWUgdG8gdXNlXHJcbiAgdGhlbWU6ICdkZWZhdWx0JyB8ICdtYXRlcmlhbCcgfCAnYm9vdHN0cmFwJyA9ICdkZWZhdWx0JztcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVG9hc3RhRXZlbnRUeXBlIHtcclxuICBBREQsXHJcbiAgQ0xFQVIsXHJcbiAgQ0xFQVJfQUxMXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUb2FzdGFFdmVudCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IFRvYXN0YUV2ZW50VHlwZSwgcHVibGljIHZhbHVlPzogYW55KSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvYXN0YVNlcnZpY2VGYWN0b3J5KGNvbmZpZzogVG9hc3RhQ29uZmlnKTogVG9hc3RhU2VydmljZSB7XHJcbiAgcmV0dXJuIG5ldyBUb2FzdGFTZXJ2aWNlKGNvbmZpZyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUb2FzdGEgc2VydmljZSBoZWxwcyBjcmVhdGUgZGlmZmVyZW50IGtpbmRzIG9mIFRvYXN0c1xyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVG9hc3RhU2VydmljZSB7XHJcbiAgLy8gQWxsb3dlZCBUSEVNRVNcclxuICBzdGF0aWMgVEhFTUVTOiBBcnJheTxzdHJpbmc+ID0gWydkZWZhdWx0JywgJ21hdGVyaWFsJywgJ2Jvb3RzdHJhcCddO1xyXG4gIC8vIEluaXQgdGhlIGNvdW50ZXJcclxuICB1bmlxdWVDb3VudGVyID0gMDtcclxuICAvLyBUb2FzdERhdGEgZXZlbnQgZW1pdHRlclxyXG4gIC8vIHByaXZhdGUgdG9hc3RzRW1pdHRlcjogRXZlbnRFbWl0dGVyPFRvYXN0RGF0YT4gPSBuZXcgRXZlbnRFbWl0dGVyPFRvYXN0RGF0YT4oKTtcclxuICAvLyBDbGVhciBldmVudCBlbWl0dGVyXHJcbiAgLy8gcHJpdmF0ZSBjbGVhckVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcblxyXG4gIHByaXZhdGUgZXZlbnRTb3VyY2U6IFN1YmplY3Q8VG9hc3RhRXZlbnQ+ID0gbmV3IFN1YmplY3Q8VG9hc3RhRXZlbnQ+KCk7XHJcbiAgcHVibGljIGV2ZW50czogT2JzZXJ2YWJsZTxUb2FzdGFFdmVudD4gPSB0aGlzLmV2ZW50U291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogVG9hc3RhQ29uZmlnKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGxpc3Qgb2YgdG9hdHNcclxuICAgKi9cclxuICAvLyBnZXRUb2FzdHMoKTogT2JzZXJ2YWJsZTxUb2FzdERhdGE+IHtcclxuICAvLyAgIHJldHVybiB0aGlzLnRvYXN0c0VtaXR0ZXIuYXNPYnNlcnZhYmxlKCk7XHJcbiAgLy8gfVxyXG5cclxuICAvLyBnZXRDbGVhcigpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xyXG4gIC8vICAgcmV0dXJuIHRoaXMuY2xlYXJFbWl0dGVyLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIC8vIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIFRvYXN0IG9mIGEgZGVmYXVsdCB0eXBlXHJcbiAgICovXHJcbiAgZGVmYXVsdChvcHRpb25zOiBUb2FzdE9wdGlvbnMgfCBzdHJpbmcgfCBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkKG9wdGlvbnMsICdkZWZhdWx0Jyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgVG9hc3Qgb2YgaW5mbyB0eXBlXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgSW5kaXZpZHVhbCB0b2FzdGEgY29uZmlnIG92ZXJyaWRlc1xyXG4gICAqL1xyXG4gIGluZm8ob3B0aW9uczogVG9hc3RPcHRpb25zIHwgc3RyaW5nIHwgbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmFkZChvcHRpb25zLCAnaW5mbycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIFRvYXN0IG9mIHN1Y2Nlc3MgdHlwZVxyXG4gICAqIEBwYXJhbSBvcHRpb25zIEluZGl2aWR1YWwgdG9hc3RhIGNvbmZpZyBvdmVycmlkZXNcclxuICAgKi9cclxuICBzdWNjZXNzKG9wdGlvbnM6IFRvYXN0T3B0aW9ucyB8IHN0cmluZyB8IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5hZGQob3B0aW9ucywgJ3N1Y2Nlc3MnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBUb2FzdCBvZiB3YWl0IHR5cGVcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBJbmRpdmlkdWFsIHRvYXN0YSBjb25maWcgb3ZlcnJpZGVzXHJcbiAgICovXHJcbiAgd2FpdChvcHRpb25zOiBUb2FzdE9wdGlvbnMgfCBzdHJpbmcgfCBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkKG9wdGlvbnMsICd3YWl0Jyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgVG9hc3Qgb2YgZXJyb3IgdHlwZVxyXG4gICAqIEBwYXJhbSBvcHRpb25zIEluZGl2aWR1YWwgdG9hc3RhIGNvbmZpZyBvdmVycmlkZXNcclxuICAgKi9cclxuICBlcnJvcihvcHRpb25zOiBUb2FzdE9wdGlvbnMgfCBzdHJpbmcgfCBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkKG9wdGlvbnMsICdlcnJvcicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIFRvYXN0IG9mIHdhcm5pbmcgdHlwZVxyXG4gICAqIEBwYXJhbSBvcHRpb25zIEluZGl2aWR1YWwgdG9hc3RhIGNvbmZpZyBvdmVycmlkZXNcclxuICAgKi9cclxuICB3YXJuaW5nKG9wdGlvbnM6IFRvYXN0T3B0aW9ucyB8IHN0cmluZyB8IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5hZGQob3B0aW9ucywgJ3dhcm5pbmcnKTtcclxuICB9XHJcblxyXG5cclxuICAvLyBBZGQgYSBuZXcgdG9hc3QgaXRlbVxyXG4gIHByaXZhdGUgYWRkKG9wdGlvbnM6IFRvYXN0T3B0aW9ucyB8IHN0cmluZyB8IG51bWJlciwgdHlwZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgdG9hc3RhT3B0aW9uczogVG9hc3RPcHRpb25zO1xyXG5cclxuICAgIGlmIChpc1N0cmluZyhvcHRpb25zKSAmJiBvcHRpb25zICE9PSAnJyB8fCBpc051bWJlcihvcHRpb25zKSkge1xyXG4gICAgICB0b2FzdGFPcHRpb25zID0ge1xyXG4gICAgICAgIHRpdGxlOiBvcHRpb25zLnRvU3RyaW5nKClcclxuICAgICAgfSBhcyBUb2FzdE9wdGlvbnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b2FzdGFPcHRpb25zID0gb3B0aW9ucyBhcyBUb2FzdE9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0b2FzdGFPcHRpb25zIHx8ICF0b2FzdGFPcHRpb25zLnRpdGxlICYmICF0b2FzdGFPcHRpb25zLm1zZykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25neC10b2FzdGE6IE5vIHRvYXN0IHRpdGxlIG9yIG1lc3NhZ2Ugc3BlY2lmaWVkIScpO1xyXG4gICAgfVxyXG5cclxuICAgIHR5cGUgPSB0eXBlIHx8ICdkZWZhdWx0JztcclxuXHJcbiAgICAvLyBTZXQgYSB1bmlxdWUgY291bnRlciBmb3IgYW4gaWRcclxuICAgIHRoaXMudW5pcXVlQ291bnRlcisrO1xyXG5cclxuICAgIC8vIFNldCB0aGUgbG9jYWwgdnMgZ2xvYmFsIGNvbmZpZyBpdGVtc1xyXG4gICAgY29uc3Qgc2hvd0Nsb3NlID0gdGhpcy5fY2hlY2tDb25maWdJdGVtKHRoaXMuY29uZmlnLCB0b2FzdGFPcHRpb25zLCAnc2hvd0Nsb3NlJyk7XHJcblxyXG4gICAgLy8gU2V0IHRoZSBsb2NhbCB2cyBnbG9iYWwgY29uZmlnIGl0ZW1zXHJcbiAgICBjb25zdCBzaG93RHVyYXRpb24gPSB0aGlzLl9jaGVja0NvbmZpZ0l0ZW0odGhpcy5jb25maWcsIHRvYXN0YU9wdGlvbnMsICdzaG93RHVyYXRpb24nKTtcclxuXHJcbiAgICAvLyBJZiB3ZSBoYXZlIGEgdGhlbWUgc2V0LCBtYWtlIHN1cmUgaXQncyBhIHZhbGlkIG9uZVxyXG4gICAgbGV0IHRoZW1lOiBzdHJpbmc7XHJcbiAgICBpZiAodG9hc3RhT3B0aW9ucy50aGVtZSkge1xyXG4gICAgICB0aGVtZSA9IFRvYXN0YVNlcnZpY2UuVEhFTUVTLmluZGV4T2YodG9hc3RhT3B0aW9ucy50aGVtZSkgPiAtMSA/IHRvYXN0YU9wdGlvbnMudGhlbWUgOiB0aGlzLmNvbmZpZy50aGVtZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoZW1lID0gdGhpcy5jb25maWcudGhlbWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdG9hc3Q6IFRvYXN0RGF0YSA9IHtcclxuICAgICAgaWQ6IHRoaXMudW5pcXVlQ291bnRlcixcclxuICAgICAgdGl0bGU6IHRvYXN0YU9wdGlvbnMudGl0bGUsXHJcbiAgICAgIG1zZzogdG9hc3RhT3B0aW9ucy5tc2csXHJcbiAgICAgIHNob3dDbG9zZSxcclxuICAgICAgc2hvd0R1cmF0aW9uLFxyXG4gICAgICB0eXBlOiAndG9hc3RhLXR5cGUtJyArIHR5cGUsXHJcbiAgICAgIHRoZW1lOiAndG9hc3RhLXRoZW1lLScgKyB0aGVtZSxcclxuICAgICAgb25BZGQ6IHRvYXN0YU9wdGlvbnMub25BZGQgJiYgaXNGdW5jdGlvbih0b2FzdGFPcHRpb25zLm9uQWRkKSA/IHRvYXN0YU9wdGlvbnMub25BZGQgOiBudWxsLFxyXG4gICAgICBvblJlbW92ZTogdG9hc3RhT3B0aW9ucy5vblJlbW92ZSAmJiBpc0Z1bmN0aW9uKHRvYXN0YU9wdGlvbnMub25SZW1vdmUpID8gdG9hc3RhT3B0aW9ucy5vblJlbW92ZSA6IG51bGxcclxuICAgIH0gYXMgVG9hc3REYXRhO1xyXG5cclxuICAgIC8vIElmIHRoZXJlJ3MgYSB0aW1lb3V0IGluZGl2aWR1YWxseSBvciBnbG9iYWxseSwgc2V0IHRoZSB0b2FzdCB0byB0aW1lb3V0XHJcbiAgICAvLyBBbGxvd3MgYSBjYWxsZXIgdG8gcGFzcyBudWxsLzAgYW5kIG92ZXJyaWRlIHRoZSBkZWZhdWx0LiBDYW4gYWxzbyBzZXQgdGhlIGRlZmF1bHQgdG8gbnVsbC8wIHRvIHR1cm4gb2ZmLlxyXG4gICAgdG9hc3QudGltZW91dCA9IHRvYXN0YU9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3RpbWVvdXQnKSA/IHRvYXN0YU9wdGlvbnMudGltZW91dCA6IHRoaXMuY29uZmlnLnRpbWVvdXQ7XHJcblxyXG4gICAgLy8gUHVzaCB1cCBhIG5ldyB0b2FzdCBpdGVtXHJcbiAgICAvLyB0aGlzLnRvYXN0c1N1YnNjcmliZXIubmV4dCh0b2FzdCk7XHJcbiAgICAvLyB0aGlzLnRvYXN0c0VtaXR0ZXIubmV4dCh0b2FzdCk7XHJcbiAgICB0aGlzLmVtaXRFdmVudChuZXcgVG9hc3RhRXZlbnQoVG9hc3RhRXZlbnRUeXBlLkFERCwgdG9hc3QpKTtcclxuICAgIC8vIElmIHdlIGhhdmUgYSBvbkFkZCBmdW5jdGlvbiwgY2FsbCBpdCBoZXJlXHJcbiAgICBpZiAodG9hc3RhT3B0aW9ucy5vbkFkZCAmJiBpc0Z1bmN0aW9uKHRvYXN0YU9wdGlvbnMub25BZGQpKSB7XHJcbiAgICAgIHRvYXN0YU9wdGlvbnMub25BZGQuY2FsbCh0aGlzLCB0b2FzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBDbGVhciBhbGwgdG9hc3RzXHJcbiAgY2xlYXJBbGwoKSB7XHJcbiAgICAvLyB0aGlzLmNsZWFyRW1pdHRlci5uZXh0KG51bGwpO1xyXG4gICAgdGhpcy5lbWl0RXZlbnQobmV3IFRvYXN0YUV2ZW50KFRvYXN0YUV2ZW50VHlwZS5DTEVBUl9BTEwpKTtcclxuICB9XHJcblxyXG4gIC8vIENsZWFyIHRoZSBzcGVjaWZpYyBvbmVcclxuICBjbGVhcihpZDogbnVtYmVyKSB7XHJcbiAgICAvLyB0aGlzLmNsZWFyRW1pdHRlci5uZXh0KGlkKTtcclxuICAgIHRoaXMuZW1pdEV2ZW50KG5ldyBUb2FzdGFFdmVudChUb2FzdGFFdmVudFR5cGUuQ0xFQVIsIGlkKSk7XHJcbiAgfVxyXG5cclxuICAvLyBDaGVja3Mgd2hldGhlciB0aGUgbG9jYWwgb3B0aW9uIGlzIHNldCwgaWYgbm90LFxyXG4gIC8vIGNoZWNrcyB0aGUgZ2xvYmFsIGNvbmZpZ1xyXG4gIHByaXZhdGUgX2NoZWNrQ29uZmlnSXRlbShjb25maWc6IGFueSwgb3B0aW9uczogYW55LCBwcm9wZXJ0eTogc3RyaW5nKSB7XHJcbiAgICBpZiAob3B0aW9uc1twcm9wZXJ0eV0gPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoIW9wdGlvbnNbcHJvcGVydHldKSB7XHJcbiAgICAgIHJldHVybiBjb25maWdbcHJvcGVydHldO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtaXRFdmVudChldmVudDogVG9hc3RhRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmV2ZW50U291cmNlKSB7XHJcbiAgICAgIC8vIFB1c2ggdXAgYSBuZXcgZXZlbnRcclxuICAgICAgdGhpcy5ldmVudFNvdXJjZS5uZXh0KGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19