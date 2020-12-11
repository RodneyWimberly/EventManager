import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ExtendedLogService = class ExtendedLogService {
    constructor(extendedLogEndpointService) {
        this.extendedLogEndpointService = extendedLogEndpointService;
    }
    addExtendedLog(extendedLog) {
        return this.extendedLogEndpointService.post(extendedLog);
    }
    getExtendedLogs(pageNumber, pageSize) {
        return pageNumber && pageSize ? this.extendedLogEndpointService.getAllPaged(pageNumber, pageSize) :
            this.extendedLogEndpointService.getAll();
    }
    getExtendedLogsByLevel(level, pageNumber, pageSize) {
        return pageNumber && pageSize ? this.extendedLogEndpointService.getByLevelPaged(level, pageNumber, pageSize) :
            this.extendedLogEndpointService.getByLevel(level);
    }
    clearExtendedLogs() {
        return this.extendedLogEndpointService.deleteAll();
    }
};
ExtendedLogService = __decorate([
    Injectable()
], ExtendedLogService);
export { ExtendedLogService };
//# sourceMappingURL=extended-log.service.js.map