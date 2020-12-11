import { __decorate } from "tslib";
import { Injectable, ErrorHandler } from '@angular/core';
import { AlertService, MessageSeverity } from './services/alert.service';
import * as generated from './services/endpoint.services';
import { ExtendedLogService } from './services/extended-log.service';
let AppErrorHandler = class AppErrorHandler extends ErrorHandler {
    constructor(injector) {
        super();
        this.injector = injector;
    }
    handleError(error) {
        let message = error.message + '\r\n\r\nStack:\r\n' + error.stack;
        let extendedLog = new generated.ExtendedLogViewModel();
        extendedLog.eventId = 0;
        extendedLog.message = message;
        extendedLog.level = 4;
        extendedLog.name = error.name;
        extendedLog.timeStamp = new Date(Date.now());
        if (!this.extendedLogService)
            this.extendedLogService = this.injector.get(ExtendedLogService);
        this.extendedLogService.addExtendedLog(extendedLog);
        if (!this.alertService)
            this.alertService = this.injector.get(AlertService);
        this.alertService.showStickyMessage(error.name + " - Error", message, MessageSeverity.error, error);
        super.handleError(error);
    }
};
AppErrorHandler = __decorate([
    Injectable()
], AppErrorHandler);
export { AppErrorHandler };
//# sourceMappingURL=app-error.handler.js.map