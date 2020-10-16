import { Injectable, Component, Input, Output, EventEmitter, Pipe, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Check and return true if an object is type of string
 * @param {?} obj Analyse has to object the string type
 * @return {?} result of analysis
 */
function isString(obj) {
    return typeof obj === 'string';
}
/**
 * Check and return true if an object is type of number
 * @param {?} obj Analyse has to object the boolean type
 * @return {?} result of analysis
 */
function isNumber(obj) {
    return typeof obj === 'number';
}
/**
 * Check and return true if an object is type of Function
 * @param {?} obj Analyse has to object the function type
 * @return {?} result of analysis
 */
function isFunction(obj) {
    return typeof obj === 'function';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/** @enum {number} */
var ToastaEventType = {
    ADD: 0,
    CLEAR: 1,
    CLEAR_ALL: 2,
};
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
/**
 * @param {?} config
 * @return {?}
 */
function toastaServiceFactory(config) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SafeHtmlPipe = /** @class */ (function () {
    function SafeHtmlPipe(domSanitized) {
        this.domSanitized = domSanitized;
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    SafeHtmlPipe.prototype.transform = /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.domSanitized.bypassSecurityTrustHtml(value);
    };
    SafeHtmlPipe.decorators = [
        { type: Pipe, args: [{ name: 'safeHtml' },] }
    ];
    /** @nocollapse */
    SafeHtmlPipe.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    return SafeHtmlPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ɵ0 = toastaServiceFactory;
/** @type {?} */
var providers = [
    ToastaConfig,
    { provide: ToastaService, useFactory: ɵ0, deps: [ToastaConfig] }
];
var ToastaModule = /** @class */ (function () {
    function ToastaModule() {
    }
    /**
     * @return {?}
     */
    ToastaModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: ToastaModule,
            providers: providers
        };
    };
    ToastaModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [ToastComponent, ToastaComponent, SafeHtmlPipe],
                    exports: [ToastComponent, ToastaComponent],
                    providers: providers
                },] }
    ];
    return ToastaModule;
}());

export { SafeHtmlPipe, ToastComponent, ToastData, ToastOptions, ToastaComponent, ToastaConfig, ToastaEvent, ToastaEventType, ToastaModule, ToastaService, providers, toastaServiceFactory };
//# sourceMappingURL=ngx-toasta.js.map
