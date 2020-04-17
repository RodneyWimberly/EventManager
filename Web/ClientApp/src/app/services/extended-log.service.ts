import { Injectable } from '@angular/core';
import * as generated from './endpoint.services';

@Injectable()
export class ExtendedLogService {
    constructor(private extendedLogEndpointService: generated.ExtendedLogEndpointService) {

    }

    addExtendedLog(extendedLog: generated.ExtendedLog) {
      return this.extendedLogEndpointService.postExtendedLog(extendedLog);
    }

    getExtendedLogs(pageNumber?: number, pageSize?: number) {
      return pageNumber && pageSize ? this.extendedLogEndpointService.getAllExtendedLogsPaged(pageNumber, pageSize) :
        this.extendedLogEndpointService.getAllExtendedLogs();
    }

    getExtendedLogsByLevel(level: number, pageNumber?: number, pageSize?: number) {
      return pageNumber && pageSize ? this.extendedLogEndpointService.getExtendedLogsByLevelPaged(level, pageNumber, pageSize) :
        this.extendedLogEndpointService.getExtendedLogsByLevel(level);
    }

    clearExtendedLogs() {
        return this.extendedLogEndpointService.deleteAllExtendedLogs();
    }
}
