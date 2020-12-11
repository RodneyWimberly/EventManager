import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let GroupByPipe = class GroupByPipe {
    transform(value, field) {
        if (!value) {
            return value;
        }
        const groupedObj = value.reduce((prev, cur) => {
            if (!prev[cur[field]]) {
                prev[cur[field]] = [cur];
            }
            else {
                prev[cur[field]].push(cur);
            }
            return prev;
        }, {});
        return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
    }
};
GroupByPipe = __decorate([
    Pipe({ name: 'groupBy' })
], GroupByPipe);
export { GroupByPipe };
//# sourceMappingURL=group-by.pipe.js.map