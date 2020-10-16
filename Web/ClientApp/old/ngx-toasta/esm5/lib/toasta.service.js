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
var ToastOptions = /** @class */ (function () {
    function ToastOptions() {
    }
    ToastOptions.decorators = [
        { type: Injectable }
    ];
    return ToastOptions;
}());
export { ToastOptions };
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
var ToastData = /** @class */ (function () {
    function ToastData() {
    }
    ToastData.decorators = [
        { type: Injectable }
    ];
    return ToastData;
}());
export { ToastData };
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
var ToastaConfig = /** @class */ (function () {
    function ToastaConfig() {
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
    ToastaConfig.decorators = [
        { type: Injectable }
    ];
    return ToastaConfig;
}());
export { ToastaConfig };
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
var ToastaEventType = {
    ADD: 0,
    CLEAR: 1,
    CLEAR_ALL: 2,
};
export { ToastaEventType };
ToastaEventType[ToastaEventType.ADD] = 'ADD';
ToastaEventType[ToastaEventType.CLEAR] = 'CLEAR';
ToastaEventType[ToastaEventType.CLEAR_ALL] = 'CLEAR_ALL';
var ToastaEvent = /** @class */ (function () {
    function ToastaEvent(type, value) {
        this.type = type;
        this.value = value;
    }
    return ToastaEvent;
}());
export { ToastaEvent };
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
var ToastaService = /** @class */ (function () {
    function ToastaService(config) {
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
     */
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
    ToastaService.prototype.default = /**
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
    function (options) {
        this.add(options, 'default');
    };
    /**
     * Create Toast of info type
     * @param options Individual toasta config overrides
     */
    /**
     * Create Toast of info type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    ToastaService.prototype.info = /**
     * Create Toast of info type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    function (options) {
        this.add(options, 'info');
    };
    /**
     * Create Toast of success type
     * @param options Individual toasta config overrides
     */
    /**
     * Create Toast of success type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    ToastaService.prototype.success = /**
     * Create Toast of success type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    function (options) {
        this.add(options, 'success');
    };
    /**
     * Create Toast of wait type
     * @param options Individual toasta config overrides
     */
    /**
     * Create Toast of wait type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    ToastaService.prototype.wait = /**
     * Create Toast of wait type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    function (options) {
        this.add(options, 'wait');
    };
    /**
     * Create Toast of error type
     * @param options Individual toasta config overrides
     */
    /**
     * Create Toast of error type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    ToastaService.prototype.error = /**
     * Create Toast of error type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    function (options) {
        this.add(options, 'error');
    };
    /**
     * Create Toast of warning type
     * @param options Individual toasta config overrides
     */
    /**
     * Create Toast of warning type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    ToastaService.prototype.warning = /**
     * Create Toast of warning type
     * @param {?} options Individual toasta config overrides
     * @return {?}
     */
    function (options) {
        this.add(options, 'warning');
    };
    // Add a new toast item
    // Add a new toast item
    /**
     * @private
     * @param {?} options
     * @param {?} type
     * @return {?}
     */
    ToastaService.prototype.add = 
    // Add a new toast item
    /**
     * @private
     * @param {?} options
     * @param {?} type
     * @return {?}
     */
    function (options, type) {
        /** @type {?} */
        var toastaOptions;
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
        var showClose = this._checkConfigItem(this.config, toastaOptions, 'showClose');
        // Set the local vs global config items
        /** @type {?} */
        var showDuration = this._checkConfigItem(this.config, toastaOptions, 'showDuration');
        // If we have a theme set, make sure it's a valid one
        /** @type {?} */
        var theme;
        if (toastaOptions.theme) {
            theme = ToastaService.THEMES.indexOf(toastaOptions.theme) > -1 ? toastaOptions.theme : this.config.theme;
        }
        else {
            theme = this.config.theme;
        }
        /** @type {?} */
        var toast = (/** @type {?} */ ({
            id: this.uniqueCounter,
            title: toastaOptions.title,
            msg: toastaOptions.msg,
            showClose: showClose,
            showDuration: showDuration,
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
    };
    // Clear all toasts
    // Clear all toasts
    /**
     * @return {?}
     */
    ToastaService.prototype.clearAll = 
    // Clear all toasts
    /**
     * @return {?}
     */
    function () {
        // this.clearEmitter.next(null);
        this.emitEvent(new ToastaEvent(ToastaEventType.CLEAR_ALL));
    };
    // Clear the specific one
    // Clear the specific one
    /**
     * @param {?} id
     * @return {?}
     */
    ToastaService.prototype.clear = 
    // Clear the specific one
    /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        // this.clearEmitter.next(id);
        this.emitEvent(new ToastaEvent(ToastaEventType.CLEAR, id));
    };
    // Checks whether the local option is set, if not,
    // checks the global config
    // Checks whether the local option is set, if not,
    // checks the global config
    /**
     * @private
     * @param {?} config
     * @param {?} options
     * @param {?} property
     * @return {?}
     */
    ToastaService.prototype._checkConfigItem = 
    // Checks whether the local option is set, if not,
    // checks the global config
    /**
     * @private
     * @param {?} config
     * @param {?} options
     * @param {?} property
     * @return {?}
     */
    function (config, options, property) {
        if (options[property] === false) {
            return false;
        }
        else if (!options[property]) {
            return config[property];
        }
        else {
            return true;
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    ToastaService.prototype.emitEvent = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.eventSource) {
            // Push up a new event
            this.eventSource.next(event);
        }
    };
    // Allowed THEMES
    ToastaService.THEMES = ['default', 'material', 'bootstrap'];
    ToastaService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ToastaService.ctorParameters = function () { return [
        { type: ToastaConfig }
    ]; };
    return ToastaService;
}());
export { ToastaService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdG9hc3RhLyIsInNvdXJjZXMiOlsibGliL3RvYXN0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFPaEU7SUFBQTtJQVVBLENBQUM7O2dCQVZBLFVBQVU7O0lBVVgsbUJBQUM7Q0FBQSxBQVZELElBVUM7U0FUWSxZQUFZOzs7SUFDdkIsNkJBQWM7O0lBQ2QsMkJBQWE7O0lBQ2IsaUNBQW9COztJQUNwQixvQ0FBdUI7O0lBQ3ZCLDZCQUFlOztJQUNmLCtCQUFpQjs7SUFDakIsNkJBQWlCOztJQUNqQixnQ0FBb0I7Ozs7O0FBTXRCO0lBQUE7SUFhQSxDQUFDOztnQkFiQSxVQUFVOztJQWFYLGdCQUFDO0NBQUEsQUFiRCxJQWFDO1NBWlksU0FBUzs7O0lBQ3BCLHVCQUFXOztJQUNYLDBCQUFjOztJQUNkLHdCQUFZOztJQUNaLDhCQUFtQjs7SUFDbkIsaUNBQXNCOztJQUN0Qix5QkFBYTs7SUFDYiwwQkFBYzs7SUFDZCw0QkFBZ0I7O0lBQ2hCLDBCQUFnQjs7SUFDaEIsNkJBQW1COztJQUNuQiw0QkFBa0I7Ozs7O0FBTXBCO0lBQUE7O1FBSUUsVUFBSyxHQUFHLENBQUMsQ0FBQzs7UUFHVixjQUFTLEdBQUcsSUFBSSxDQUFDOztRQUdqQixpQkFBWSxHQUFHLElBQUksQ0FBQzs7UUFHcEIsYUFBUSxHQUF3SixjQUFjLENBQUM7O1FBRy9LLFlBQU8sR0FBRyxJQUFJLENBQUM7O1FBR2YsVUFBSyxHQUF5QyxTQUFTLENBQUM7SUFDMUQsQ0FBQzs7Z0JBcEJBLFVBQVU7O0lBb0JYLG1CQUFDO0NBQUEsQUFw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QVEsQ0FBQyxFQUFFO1lBQzdCLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8saUNBQVM7Ozs7O0lBQWpCLFVBQWtCLEtBQWtCO1FBQ2xDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDOztJQWxLTSxvQkFBTSxHQUFrQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7O2dCQUhyRSxVQUFVOzs7O2dCQWNtQixZQUFZOztJQXdKMUMsb0JBQUM7Q0FBQSxBQXRLRCxJQXNLQztTQXJLWSxhQUFhOzs7SUFFeEIscUJBQW9FOztJQUVwRSxzQ0FBa0I7Ozs7O0lBTWxCLG9DQUF1RTs7SUFDdkUsK0JBQXlFOzs7OztJQUU3RCwrQkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IGlzU3RyaW5nLCBpc051bWJlciwgaXNGdW5jdGlvbiB9IGZyb20gJy4vdG9hc3RhLnV0aWxzJztcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIE9wdGlvbnMgdG8gY29uZmlndXJlIGEgbmV3IFRvYXN0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUb2FzdE9wdGlvbnMge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgbXNnPzogc3RyaW5nO1xyXG4gIHNob3dDbG9zZT86IGJvb2xlYW47XHJcbiAgc2hvd0R1cmF0aW9uPzogYm9vbGVhbjtcclxuICB0aGVtZT86IHN0cmluZztcclxuICB0aW1lb3V0PzogbnVtYmVyO1xyXG4gIG9uQWRkPzogRnVuY3Rpb247XHJcbiAgb25SZW1vdmU/OiBGdW5jdGlvbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN0cnVjdHJ1cmUgb2YgYSBjcmVhdGVkIFRvYXN0XHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUb2FzdERhdGEge1xyXG4gIGlkOiBudW1iZXI7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBtc2c6IHN0cmluZztcclxuICBzaG93Q2xvc2U6IGJvb2xlYW47XHJcbiAgc2hvd0R1cmF0aW9uOiBib29sZWFuO1xyXG4gIHR5cGU6IHN0cmluZztcclxuICB0aGVtZTogc3RyaW5nO1xyXG4gIHRpbWVvdXQ6IG51bWJlcjtcclxuICBvbkFkZDogRnVuY3Rpb247XHJcbiAgb25SZW1vdmU6IEZ1bmN0aW9uO1xyXG4gIG9uQ2xpY2s6IEZ1bmN0aW9uO1xyXG59XHJcblxyXG4vKipcclxuICogRGVmYXVsdCBjb25maWd1cmF0aW9uIGZvciBhbGwgdG9hc3RzIGFuZCB0b2FzdGEgY29udGFpbmVyXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUb2FzdGFDb25maWcge1xyXG5cclxuICAvLyBNYXhpbXVtIG51bWJlciBvZiB0b2FzdGllcyB0byBzaG93IGF0IG9uY2VcclxuICBsaW1pdCA9IDU7XHJcblxyXG4gIC8vIFdoZXRoZXIgdG8gc2hvdyB0aGUgJ1gnIGljb24gdG8gY2xvc2UgdGhlIHRvYXN0XHJcbiAgc2hvd0Nsb3NlID0gdHJ1ZTtcclxuXHJcbiAgLy8gV2hldGhlciB0byBzaG93IGEgcHJvZ3Jlc3MgYmFyIGF0IHRoZSBib3R0b20gb2YgdGhlIG5vdGlmaWNhdGlvblxyXG4gIHNob3dEdXJhdGlvbiA9IHRydWU7XHJcblxyXG4gIC8vIFRoZSB3aW5kb3cgcG9zaXRpb24gd2hlcmUgdGhlIHRvYXN0IHBvcHMgdXBcclxuICBwb3NpdGlvbjogJ2JvdHRvbS1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHwgJ2JvdHRvbS1jZW50ZXInIHwgJ2JvdHRvbS1mdWxsd2lkdGgnIHwgJ3RvcC1yaWdodCcgfCAndG9wLWxlZnQnIHwgJ3RvcC1jZW50ZXInIHwgJ3RvcC1mdWxsd2lkdGgnIHwgJ2NlbnRlci1jZW50ZXInID0gJ2JvdHRvbS1yaWdodCc7XHJcblxyXG4gIC8vIEhvdyBsb25nIChpbiBtaWxpc2Vjb25kcykgdGhlIHRvYXN0YSBzaG93cyBiZWZvcmUgaXQncyByZW1vdmVkLiBTZXQgdG8gbnVsbC8wIHRvIHR1cm4gb2ZmLlxyXG4gIHRpbWVvdXQgPSA1MDAwO1xyXG5cclxuICAvLyBXaGF0IHRoZW1lIHRvIHVzZVxyXG4gIHRoZW1lOiAnZGVmYXVsdCcgfCAnbWF0ZXJpYWwnIHwgJ2Jvb3RzdHJhcCcgPSAnZGVmYXVsdCc7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFRvYXN0YUV2ZW50VHlwZSB7XHJcbiAgQURELFxyXG4gIENMRUFSLFxyXG4gIENMRUFSX0FMTFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVG9hc3RhRXZlbnQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBUb2FzdGFFdmVudFR5cGUsIHB1YmxpYyB2YWx1ZT86IGFueSkgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2FzdGFTZXJ2aWNlRmFjdG9yeShjb25maWc6IFRvYXN0YUNvbmZpZyk6IFRvYXN0YVNlcnZpY2Uge1xyXG4gIHJldHVybiBuZXcgVG9hc3RhU2VydmljZShjb25maWcpO1xyXG59XHJcblxyXG4vKipcclxuICogVG9hc3RhIHNlcnZpY2UgaGVscHMgY3JlYXRlIGRpZmZlcmVudCBraW5kcyBvZiBUb2FzdHNcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRvYXN0YVNlcnZpY2Uge1xyXG4gIC8vIEFsbG93ZWQgVEhFTUVTXHJcbiAgc3RhdGljIFRIRU1FUzogQXJyYXk8c3RyaW5nPiA9IFsnZGVmYXVsdCcsICdtYXRlcmlhbCcsICdib290c3RyYXAnXTtcclxuICAvLyBJbml0IHRoZSBjb3VudGVyXHJcbiAgdW5pcXVlQ291bnRlciA9IDA7XHJcbiAgLy8gVG9hc3REYXRhIGV2ZW50IGVtaXR0ZXJcclxuICAvLyBwcml2YXRlIHRvYXN0c0VtaXR0ZXI6IEV2ZW50RW1pdHRlcjxUb2FzdERhdGE+ID0gbmV3IEV2ZW50RW1pdHRlcjxUb2FzdERhdGE+KCk7XHJcbiAgLy8gQ2xlYXIgZXZlbnQgZW1pdHRlclxyXG4gIC8vIHByaXZhdGUgY2xlYXJFbWl0dGVyOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICBwcml2YXRlIGV2ZW50U291cmNlOiBTdWJqZWN0PFRvYXN0YUV2ZW50PiA9IG5ldyBTdWJqZWN0PFRvYXN0YUV2ZW50PigpO1xyXG4gIHB1YmxpYyBldmVudHM6IE9ic2VydmFibGU8VG9hc3RhRXZlbnQ+ID0gdGhpcy5ldmVudFNvdXJjZS5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IFRvYXN0YUNvbmZpZykgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBsaXN0IG9mIHRvYXRzXHJcbiAgICovXHJcbiAgLy8gZ2V0VG9hc3RzKCk6IE9ic2VydmFibGU8VG9hc3REYXRhPiB7XHJcbiAgLy8gICByZXR1cm4gdGhpcy50b2FzdHNFbWl0dGVyLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIC8vIH1cclxuXHJcbiAgLy8gZ2V0Q2xlYXIoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcclxuICAvLyAgIHJldHVybiB0aGlzLmNsZWFyRW1pdHRlci5hc09ic2VydmFibGUoKTtcclxuICAvLyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBUb2FzdCBvZiBhIGRlZmF1bHQgdHlwZVxyXG4gICAqL1xyXG4gIGRlZmF1bHQob3B0aW9uczogVG9hc3RPcHRpb25zIHwgc3RyaW5nIHwgbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmFkZChvcHRpb25zLCAnZGVmYXVsdCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIFRvYXN0IG9mIGluZm8gdHlwZVxyXG4gICAqIEBwYXJhbSBvcHRpb25zIEluZGl2aWR1YWwgdG9hc3RhIGNvbmZpZyBvdmVycmlkZXNcclxuICAgKi9cclxuICBpbmZvKG9wdGlvbnM6IFRvYXN0T3B0aW9ucyB8IHN0cmluZyB8IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5hZGQob3B0aW9ucywgJ2luZm8nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBUb2FzdCBvZiBzdWNjZXNzIHR5cGVcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBJbmRpdmlkdWFsIHRvYXN0YSBjb25maWcgb3ZlcnJpZGVzXHJcbiAgICovXHJcbiAgc3VjY2VzcyhvcHRpb25zOiBUb2FzdE9wdGlvbnMgfCBzdHJpbmcgfCBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkKG9wdGlvbnMsICdzdWNjZXNzJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgVG9hc3Qgb2Ygd2FpdCB0eXBlXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgSW5kaXZpZHVhbCB0b2FzdGEgY29uZmlnIG92ZXJyaWRlc1xyXG4gICAqL1xyXG4gIHdhaXQob3B0aW9uczogVG9hc3RPcHRpb25zIHwgc3RyaW5nIHwgbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmFkZChvcHRpb25zLCAnd2FpdCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIFRvYXN0IG9mIGVycm9yIHR5cGVcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBJbmRpdmlkdWFsIHRvYXN0YSBjb25maWcgb3ZlcnJpZGVzXHJcbiAgICovXHJcbiAgZXJyb3Iob3B0aW9uczogVG9hc3RPcHRpb25zIHwgc3RyaW5nIHwgbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmFkZChvcHRpb25zLCAnZXJyb3InKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBUb2FzdCBvZiB3YXJuaW5nIHR5cGVcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBJbmRpdmlkdWFsIHRvYXN0YSBjb25maWcgb3ZlcnJpZGVzXHJcbiAgICovXHJcbiAgd2FybmluZyhvcHRpb25zOiBUb2FzdE9wdGlvbnMgfCBzdHJpbmcgfCBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkKG9wdGlvbnMsICd3YXJuaW5nJyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gQWRkIGEgbmV3IHRvYXN0IGl0ZW1cclxuICBwcml2YXRlIGFkZChvcHRpb25zOiBUb2FzdE9wdGlvbnMgfCBzdHJpbmcgfCBudW1iZXIsIHR5cGU6IHN0cmluZykge1xyXG4gICAgbGV0IHRvYXN0YU9wdGlvbnM6IFRvYXN0T3B0aW9ucztcclxuXHJcbiAgICBpZiAoaXNTdHJpbmcob3B0aW9ucykgJiYgb3B0aW9ucyAhPT0gJycgfHwgaXNOdW1iZXIob3B0aW9ucykpIHtcclxuICAgICAgdG9hc3RhT3B0aW9ucyA9IHtcclxuICAgICAgICB0aXRsZTogb3B0aW9ucy50b1N0cmluZygpXHJcbiAgICAgIH0gYXMgVG9hc3RPcHRpb25zO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9hc3RhT3B0aW9ucyA9IG9wdGlvbnMgYXMgVG9hc3RPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdG9hc3RhT3B0aW9ucyB8fCAhdG9hc3RhT3B0aW9ucy50aXRsZSAmJiAhdG9hc3RhT3B0aW9ucy5tc2cpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCduZ3gtdG9hc3RhOiBObyB0b2FzdCB0aXRsZSBvciBtZXNzYWdlIHNwZWNpZmllZCEnKTtcclxuICAgIH1cclxuXHJcbiAgICB0eXBlID0gdHlwZSB8fCAnZGVmYXVsdCc7XHJcblxyXG4gICAgLy8gU2V0IGEgdW5pcXVlIGNvdW50ZXIgZm9yIGFuIGlkXHJcbiAgICB0aGlzLnVuaXF1ZUNvdW50ZXIrKztcclxuXHJcbiAgICAvLyBTZXQgdGhlIGxvY2FsIHZzIGdsb2JhbCBjb25maWcgaXRlbXNcclxuICAgIGNvbnN0IHNob3dDbG9zZSA9IHRoaXMuX2NoZWNrQ29uZmlnSXRlbSh0aGlzLmNvbmZpZywgdG9hc3RhT3B0aW9ucywgJ3Nob3dDbG9zZScpO1xyXG5cclxuICAgIC8vIFNldCB0aGUgbG9jYWwgdnMgZ2xvYmFsIGNvbmZpZyBpdGVtc1xyXG4gICAgY29uc3Qgc2hvd0R1cmF0aW9uID0gdGhpcy5fY2hlY2tDb25maWdJdGVtKHRoaXMuY29uZmlnLCB0b2FzdGFPcHRpb25zLCAnc2hvd0R1cmF0aW9uJyk7XHJcblxyXG4gICAgLy8gSWYgd2UgaGF2ZSBhIHRoZW1lIHNldCwgbWFrZSBzdXJlIGl0J3MgYSB2YWxpZCBvbmVcclxuICAgIGxldCB0aGVtZTogc3RyaW5nO1xyXG4gICAgaWYgKHRvYXN0YU9wdGlvbnMudGhlbWUpIHtcclxuICAgICAgdGhlbWUgPSBUb2FzdGFTZXJ2aWNlLlRIRU1FUy5pbmRleE9mKHRvYXN0YU9wdGlvbnMudGhlbWUpID4gLTEgPyB0b2FzdGFPcHRpb25zLnRoZW1lIDogdGhpcy5jb25maWcudGhlbWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGVtZSA9IHRoaXMuY29uZmlnLnRoZW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRvYXN0OiBUb2FzdERhdGEgPSB7XHJcbiAgICAgIGlkOiB0aGlzLnVuaXF1ZUNvdW50ZXIsXHJcbiAgICAgIHRpdGxlOiB0b2FzdGFPcHRpb25zLnRpdGxlLFxyXG4gICAgICBtc2c6IHRvYXN0YU9wdGlvbnMubXNnLFxyXG4gICAgICBzaG93Q2xvc2UsXHJcbiAgICAgIHNob3dEdXJhdGlvbixcclxuICAgICAgdHlwZTogJ3RvYXN0YS10eXBlLScgKyB0eXBlLFxyXG4gICAgICB0aGVtZTogJ3RvYXN0YS10aGVtZS0nICsgdGhlbWUsXHJcbiAgICAgIG9uQWRkOiB0b2FzdGFPcHRpb25zLm9uQWRkICYmIGlzRnVuY3Rpb24odG9hc3RhT3B0aW9ucy5vbkFkZCkgPyB0b2FzdGFPcHRpb25zLm9uQWRkIDogbnVsbCxcclxuICAgICAgb25SZW1vdmU6IHRvYXN0YU9wdGlvbnMub25SZW1vdmUgJiYgaXNGdW5jdGlvbih0b2FzdGFPcHRpb25zLm9uUmVtb3ZlKSA/IHRvYXN0YU9wdGlvbnMub25SZW1vdmUgOiBudWxsXHJcbiAgICB9IGFzIFRvYXN0RGF0YTtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSdzIGEgdGltZW91dCBpbmRpdmlkdWFsbHkgb3IgZ2xvYmFsbHksIHNldCB0aGUgdG9hc3QgdG8gdGltZW91dFxyXG4gICAgLy8gQWxsb3dzIGEgY2FsbGVyIHRvIHBhc3MgbnVsbC8wIGFuZCBvdmVycmlkZSB0aGUgZGVmYXVsdC4gQ2FuIGFsc28gc2V0IHRoZSBkZWZhdWx0IHRvIG51bGwvMCB0byB0dXJuIG9mZi5cclxuICAgIHRvYXN0LnRpbWVvdXQgPSB0b2FzdGFPcHRpb25zLmhhc093blByb3BlcnR5KCd0aW1lb3V0JykgPyB0b2FzdGFPcHRpb25zLnRpbWVvdXQgOiB0aGlzLmNvbmZpZy50aW1lb3V0O1xyXG5cclxuICAgIC8vIFB1c2ggdXAgYSBuZXcgdG9hc3QgaXRlbVxyXG4gICAgLy8gdGhpcy50b2FzdHNTdWJzY3JpYmVyLm5leHQodG9hc3QpO1xyXG4gICAgLy8gdGhpcy50b2FzdHNFbWl0dGVyLm5leHQodG9hc3QpO1xyXG4gICAgdGhpcy5lbWl0RXZlbnQobmV3IFRvYXN0YUV2ZW50KFRvYXN0YUV2ZW50VHlwZS5BREQsIHRvYXN0KSk7XHJcbiAgICAvLyBJZiB3ZSBoYXZlIGEgb25BZGQgZnVuY3Rpb24sIGNhbGwgaXQgaGVyZVxyXG4gICAgaWYgKHRvYXN0YU9wdGlvbnMub25BZGQgJiYgaXNGdW5jdGlvbih0b2FzdGFPcHRpb25zLm9uQWRkKSkge1xyXG4gICAgICB0b2FzdGFPcHRpb25zLm9uQWRkLmNhbGwodGhpcywgdG9hc3QpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQ2xlYXIgYWxsIHRvYXN0c1xyXG4gIGNsZWFyQWxsKCkge1xyXG4gICAgLy8gdGhpcy5jbGVhckVtaXR0ZXIubmV4dChudWxsKTtcclxuICAgIHRoaXMuZW1pdEV2ZW50KG5ldyBUb2FzdGFFdmVudChUb2FzdGFFdmVudFR5cGUuQ0xFQVJfQUxMKSk7XHJcbiAgfVxyXG5cclxuICAvLyBDbGVhciB0aGUgc3BlY2lmaWMgb25lXHJcbiAgY2xlYXIoaWQ6IG51bWJlcikge1xyXG4gICAgLy8gdGhpcy5jbGVhckVtaXR0ZXIubmV4dChpZCk7XHJcbiAgICB0aGlzLmVtaXRFdmVudChuZXcgVG9hc3RhRXZlbnQoVG9hc3RhRXZlbnRUeXBlLkNMRUFSLCBpZCkpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2hlY2tzIHdoZXRoZXIgdGhlIGxvY2FsIG9wdGlvbiBpcyBzZXQsIGlmIG5vdCxcclxuICAvLyBjaGVja3MgdGhlIGdsb2JhbCBjb25maWdcclxuICBwcml2YXRlIF9jaGVja0NvbmZpZ0l0ZW0oY29uZmlnOiBhbnksIG9wdGlvbnM6IGFueSwgcHJvcGVydHk6IHN0cmluZykge1xyXG4gICAgaWYgKG9wdGlvbnNbcHJvcGVydHldID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKCFvcHRpb25zW3Byb3BlcnR5XSkge1xyXG4gICAgICByZXR1cm4gY29uZmlnW3Byb3BlcnR5XTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBlbWl0RXZlbnQoZXZlbnQ6IFRvYXN0YUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5ldmVudFNvdXJjZSkge1xyXG4gICAgICAvLyBQdXNoIHVwIGEgbmV3IGV2ZW50XHJcbiAgICAgIHRoaXMuZXZlbnRTb3VyY2UubmV4dChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==