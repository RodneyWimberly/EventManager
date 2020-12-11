import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponseBase } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Utilities } from '../helpers/utilities';
let AlertService = class AlertService {
    constructor() {
        this.messages = new Subject();
        this.dialogs = new Subject();
    }
    showDialog(message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue) {
        if (!type) {
            type = DialogType.alert;
        }
        this.dialogs.next({ message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue });
    }
    showMessage(data, separatorOrDetail, severity) {
        if (!severity) {
            severity = MessageSeverity.default;
        }
        if (data instanceof HttpResponseBase) {
            data = Utilities.getHttpResponseMessages(data);
            separatorOrDetail = Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            for (const message of data) {
                const msgObject = Utilities.splitInTwo(message, separatorOrDetail);
                this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, false);
            }
        }
        else {
            this.showMessageHelper(data, separatorOrDetail, severity, false);
        }
    }
    showStickyMessage(data, separatorOrDetail, severity, error, onRemove) {
        if (!severity) {
            severity = MessageSeverity.default;
        }
        if (data instanceof HttpResponseBase) {
            data = Utilities.getHttpResponseMessages(data);
            separatorOrDetail = Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            for (const message of data) {
                const msgObject = Utilities.splitInTwo(message, separatorOrDetail);
                this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, true);
            }
        }
        else {
            if (error) {
                const msg = `Severity: "${MessageSeverity[severity]}", Summary: "${data}", Detail: "${separatorOrDetail}", Error: "${Utilities.safeStringify(error)}"`;
                switch (severity) {
                    case MessageSeverity.default:
                        this.logInfo(msg);
                        break;
                    case MessageSeverity.info:
                        this.logInfo(msg);
                        break;
                    case MessageSeverity.success:
                        this.logMessage(msg);
                        break;
                    case MessageSeverity.error:
                        this.logError(msg);
                        break;
                    case MessageSeverity.warn:
                        this.logWarning(msg);
                        break;
                    case MessageSeverity.wait:
                        this.logTrace(msg);
                        break;
                }
            }
            this.showMessageHelper(data, separatorOrDetail, severity, true, onRemove);
        }
    }
    showErrorMessage(error) {
        this.showStickyMessage("Application Error", "An application error has occurred!", MessageSeverity.error, error);
    }
    showMessageHelper(summary, detail, severity, isSticky, onRemove) {
        const alertCommand = {
            operation: isSticky ? 'add_sticky' : 'add',
            message: { severity, summary, detail },
            onRemove
        };
        this.messages.next(alertCommand);
    }
    resetStickyMessage() {
        this.messages.next({ operation: 'clear' });
    }
    startLoadingMessage(message = 'Loading...', caption = '') {
        clearTimeout(this.loadingMessageTimeoutId);
        this.loadingMessageTimeoutId = setTimeout(() => {
            this.showStickyMessage(caption, message, MessageSeverity.wait);
        }, 1000);
    }
    stopLoadingMessage() {
        clearTimeout(this.loadingMessageTimeoutId);
        this.resetStickyMessage();
    }
    logDebug(msg) {
        console.debug(msg);
    }
    logError(msg) {
        console.error(msg);
    }
    logInfo(msg) {
        console.info(msg);
    }
    logMessage(msg) {
        console.log(msg);
    }
    logTrace(msg) {
        console.trace(msg);
    }
    logWarning(msg) {
        console.warn(msg);
    }
    getDialogEvent() {
        return this.dialogs.asObservable();
    }
    getMessageEvent() {
        return this.messages.asObservable();
    }
};
AlertService = __decorate([
    Injectable()
], AlertService);
export { AlertService };
// ******************** Dialog ********************//
export class AlertDialog {
    constructor(message, type, okCallback, cancelCallback, defaultValue, okLabel, cancelLabel) {
        this.message = message;
        this.type = type;
        this.okCallback = okCallback;
        this.cancelCallback = cancelCallback;
        this.defaultValue = defaultValue;
        this.okLabel = okLabel;
        this.cancelLabel = cancelLabel;
    }
}
export var DialogType;
(function (DialogType) {
    DialogType[DialogType["alert"] = 0] = "alert";
    DialogType[DialogType["confirm"] = 1] = "confirm";
    DialogType[DialogType["prompt"] = 2] = "prompt";
})(DialogType || (DialogType = {}));
// ******************** End ********************//
// ******************** Growls ********************//
export class AlertCommand {
    constructor(operation, message, onRemove) {
        this.operation = operation;
        this.message = message;
        this.onRemove = onRemove;
    }
}
export class AlertMessage {
    constructor(severity, summary, detail) {
        this.severity = severity;
        this.summary = summary;
        this.detail = detail;
    }
}
export var MessageSeverity;
(function (MessageSeverity) {
    MessageSeverity[MessageSeverity["default"] = 0] = "default";
    MessageSeverity[MessageSeverity["info"] = 1] = "info";
    MessageSeverity[MessageSeverity["success"] = 2] = "success";
    MessageSeverity[MessageSeverity["error"] = 3] = "error";
    MessageSeverity[MessageSeverity["warn"] = 4] = "warn";
    MessageSeverity[MessageSeverity["wait"] = 5] = "wait";
})(MessageSeverity || (MessageSeverity = {}));
// ******************** End ********************//
//# sourceMappingURL=alert.service.js.map