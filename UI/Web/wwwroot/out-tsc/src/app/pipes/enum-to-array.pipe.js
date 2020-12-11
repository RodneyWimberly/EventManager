import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let EnumToArrayPipe = class EnumToArrayPipe {
    transform(value) {
        return Object.keys(value).filter(e => !isNaN(+e)).map(o => { return { index: +o, name: value[o] }; });
    }
};
EnumToArrayPipe = __decorate([
    Pipe({ name: 'enumToArray' })
], EnumToArrayPipe);
export { EnumToArrayPipe };
//# sourceMappingURL=enum-to-array.pipe.js.map