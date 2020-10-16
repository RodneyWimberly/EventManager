import { Injectable, Component, Input, EventEmitter, Output, Pipe, NgModule } from '@angular/core';
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
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/platform-browser';

function ToastaComponent_ngx_toast_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-toast", 2);
    ɵngcc0.ɵɵlistener("closeToast", function ToastaComponent_ngx_toast_1_Template_ngx_toast_closeToast_0_listener() { ɵngcc0.ɵɵrestoreView(_r3); const toast_r1 = ctx.$implicit; const ctx_r2 = ɵngcc0.ɵɵnextContext(); return ctx_r2.closeToast(toast_r1); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const toast_r1 = ctx.$implicit;
    ɵngcc0.ɵɵproperty("toast", toast_r1);
} }
const _c0 = function (a0) { return [a0]; };
function ToastComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 4);
    ɵngcc0.ɵɵlistener("click", function ToastComponent_div_1_Template_div_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r4); const ctx_r3 = ɵngcc0.ɵɵnextContext(); return ctx_r3.close($event); });
    ɵngcc0.ɵɵelementEnd();
} }
function ToastComponent_div_2_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "span", 9);
    ɵngcc0.ɵɵpipe(1, "safeHtml");
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("innerHTML", ɵngcc0.ɵɵpipeBind1(1, 1, ctx_r5.toast.title), ɵngcc0.ɵɵsanitizeHtml);
} }
function ToastComponent_div_2_br_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "br");
} }
function ToastComponent_div_2_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "span", 10);
    ɵngcc0.ɵɵpipe(1, "safeHtml");
} if (rf & 2) {
    const ctx_r7 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("innerHtml", ɵngcc0.ɵɵpipeBind1(1, 1, ctx_r7.toast.msg), ɵngcc0.ɵɵsanitizeHtml);
} }
function ToastComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 5);
    ɵngcc0.ɵɵtemplate(1, ToastComponent_div_2_span_1_Template, 2, 3, "span", 6);
    ɵngcc0.ɵɵtemplate(2, ToastComponent_div_2_br_2_Template, 1, 0, "br", 7);
    ɵngcc0.ɵɵtemplate(3, ToastComponent_div_2_span_3_Template, 2, 3, "span", 8);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r1.toast.title);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r1.toast.title && ctx_r1.toast.msg);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r1.toast.msg);
} }
function ToastComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 11);
    ɵngcc0.ɵɵelement(1, "div", 12);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵstyleProp("width", ctx_r2.progressPercent, "%");
} }
const _c1 = function (a0, a1) { return [a0, a1]; };
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
class ToastOptions {
}
ToastOptions.ɵfac = function ToastOptions_Factory(t) { return new (t || ToastOptions)(); };
ToastOptions.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ToastOptions, factory: ToastOptions.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ToastOptions, [{
        type: Injectable
    }], null, null); })();
/**
 * Structrure of a created Toast
 */
class ToastData {
}
ToastData.ɵfac = function ToastData_Factory(t) { return new (t || ToastData)(); };
ToastData.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ToastData, factory: ToastData.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ToastData, [{
        type: Injectable
    }], null, null); })();
/**
 * Default configuration for all toasts and toasta container
 */
class ToastaConfig {
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
ToastaConfig.ɵfac = function ToastaConfig_Factory(t) { return new (t || ToastaConfig)(); };
ToastaConfig.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ToastaConfig, factory: ToastaConfig.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ToastaConfig, [{
        type: Injectable
    }], function () { return []; }, null); })();
/** @enum {number} */
const ToastaEventType = {
    ADD: 0,
    CLEAR: 1,
    CLEAR_ALL: 2,
};
ToastaEventType[ToastaEventType.ADD] = 'ADD';
ToastaEventType[ToastaEventType.CLEAR] = 'CLEAR';
ToastaEventType[ToastaEventType.CLEAR_ALL] = 'CLEAR_ALL';
class ToastaEvent {
    /**
     * @param {?} type
     * @param {?=} value
     */
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
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
class ToastaService {
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
ToastaService.ɵfac = function ToastaService_Factory(t) { return new (t || ToastaService)(ɵngcc0.ɵɵinject(ToastaConfig)); };
ToastaService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ToastaService, factory: ToastaService.ɵfac });
// Allowed THEMES
ToastaService.THEMES = ['default', 'material', 'bootstrap'];
/** @nocollapse */
ToastaService.ctorParameters = () => [
    { type: ToastaConfig }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ToastaService, [{
        type: Injectable
    }], function () { return [{ type: ToastaConfig }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Toasta is container for Toast components
 */
class ToastaComponent {
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
ToastaComponent.ɵfac = function ToastaComponent_Factory(t) { return new (t || ToastaComponent)(ɵngcc0.ɵɵdirectiveInject(ToastaConfig), ɵngcc0.ɵɵdirectiveInject(ToastaService)); };
ToastaComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: ToastaComponent, selectors: [["ngx-toasta"]], inputs: { position: "position" }, decls: 2, vars: 4, consts: [["id", "toasta", 3, "ngClass"], [3, "toast", "closeToast", 4, "ngFor", "ngForOf"], [3, "toast", "closeToast"]], template: function ToastaComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, ToastaComponent_ngx_toast_1_Template, 1, 1, "ngx-toast", 1);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(2, _c0, ctx.position));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.toasts);
    } }, directives: function () { return [ɵngcc1.NgClass, ɵngcc1.NgForOf, ToastComponent]; }, encapsulation: 2 });
/**
 * Set of constants defines position of Toasta on the page.
 */
ToastaComponent.POSITIONS = ['bottom-right', 'bottom-left', 'bottom-center', 'bottom-fullwidth', 'top-right', 'top-left', 'top-center', 'top-fullwidth', 'center-center'];
/** @nocollapse */
ToastaComponent.ctorParameters = () => [
    { type: ToastaConfig },
    { type: ToastaService }
];
ToastaComponent.propDecorators = {
    position: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ToastaComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-toasta',
                template: `
    <div id="toasta" [ngClass]="[position]">
        <ngx-toast *ngFor="let toast of toasts" [toast]="toast" (closeToast)="closeToast(toast)"></ngx-toast>
    </div>`
            }]
    }], function () { return [{ type: ToastaConfig }, { type: ToastaService }]; }, { position: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A Toast component shows message with title and close button.
 */
class ToastComponent {
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
ToastComponent.ɵfac = function ToastComponent_Factory(t) { return new (t || ToastComponent)(); };
ToastComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: ToastComponent, selectors: [["ngx-toast"]], inputs: { toast: "toast" }, outputs: { closeToastEvent: "closeToast" }, decls: 4, vars: 7, consts: [[1, "toast", 3, "ngClass"], ["class", "close-button", 3, "click", 4, "ngIf"], ["class", "toast-text", 4, "ngIf"], ["class", "durationbackground", 4, "ngIf"], [1, "close-button", 3, "click"], [1, "toast-text"], ["class", "toast-title", 3, "innerHTML", 4, "ngIf"], [4, "ngIf"], ["class", "toast-msg", 3, "innerHtml", 4, "ngIf"], [1, "toast-title", 3, "innerHTML"], [1, "toast-msg", 3, "innerHtml"], [1, "durationbackground"], [1, "durationbar"]], template: function ToastComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, ToastComponent_div_1_Template, 1, 0, "div", 1);
        ɵngcc0.ɵɵtemplate(2, ToastComponent_div_2_Template, 4, 3, "div", 2);
        ɵngcc0.ɵɵtemplate(3, ToastComponent_div_3_Template, 2, 2, "div", 3);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(4, _c1, ctx.toast.type, ctx.toast.theme));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.toast.showClose);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.toast.title || ctx.toast.msg);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.toast.showDuration && ctx.toast.timeout > 0);
    } }, directives: function () { return [ɵngcc1.NgClass, ɵngcc1.NgIf]; }, pipes: function () { return [SafeHtmlPipe]; }, encapsulation: 2 });
ToastComponent.propDecorators = {
    toast: [{ type: Input }],
    closeToastEvent: [{ type: Output, args: ['closeToast',] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ToastComponent, [{
        type: Component,
        args: [{
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
            }]
    }], function () { return []; }, { closeToastEvent: [{
            type: Output,
            args: ['closeToast']
        }], toast: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SafeHtmlPipe {
    /**
     * @param {?} domSanitized
     */
    constructor(domSanitized) {
        this.domSanitized = domSanitized;
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    transform(value, ...args) {
        return this.domSanitized.bypassSecurityTrustHtml(value);
    }
}
SafeHtmlPipe.ɵfac = function SafeHtmlPipe_Factory(t) { return new (t || SafeHtmlPipe)(ɵngcc0.ɵɵdirectiveInject(ɵngcc2.DomSanitizer)); };
SafeHtmlPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "safeHtml", type: SafeHtmlPipe, pure: true });
/** @nocollapse */
SafeHtmlPipe.ctorParameters = () => [
    { type: DomSanitizer }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SafeHtmlPipe, [{
        type: Pipe,
        args: [{ name: 'safeHtml' }]
    }], function () { return [{ type: ɵngcc2.DomSanitizer }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const ɵ0 = toastaServiceFactory;
/** @type {?} */
let providers = [
    ToastaConfig,
    { provide: ToastaService, useFactory: ɵ0, deps: [ToastaConfig] }
];
class ToastaModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: ToastaModule,
            providers
        };
    }
}
ToastaModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: ToastaModule });
ToastaModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function ToastaModule_Factory(t) { return new (t || ToastaModule)(); }, providers: providers, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(ToastaModule, { declarations: function () { return [ToastComponent, ToastaComponent, SafeHtmlPipe]; }, imports: function () { return [CommonModule]; }, exports: function () { return [ToastComponent, ToastaComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ToastaModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [ToastComponent, ToastaComponent, SafeHtmlPipe],
                exports: [ToastComponent, ToastaComponent],
                providers
            }]
    }], null, null); })();

export { SafeHtmlPipe, ToastComponent, ToastData, ToastOptions, ToastaComponent, ToastaConfig, ToastaEvent, ToastaEventType, ToastaModule, ToastaService, providers, toastaServiceFactory };

//# sourceMappingURL=ngx-toasta.js.map