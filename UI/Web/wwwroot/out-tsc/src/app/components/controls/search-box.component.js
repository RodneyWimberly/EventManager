import { __decorate } from "tslib";
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
let SearchBoxComponent = class SearchBoxComponent {
    constructor() {
        this.placeholder = 'Search...';
        this.searchChange = new EventEmitter();
    }
    onValueChange(value) {
        setTimeout(() => this.searchChange.emit(value));
    }
    clear() {
        this.searchInput.nativeElement.value = '';
        this.onValueChange(this.searchInput.nativeElement.value);
    }
};
__decorate([
    Input()
], SearchBoxComponent.prototype, "placeholder", void 0);
__decorate([
    Output()
], SearchBoxComponent.prototype, "searchChange", void 0);
__decorate([
    ViewChild('searchInput', { static: true })
], SearchBoxComponent.prototype, "searchInput", void 0);
SearchBoxComponent = __decorate([
    Component({
        selector: 'search-box',
        templateUrl: './search-box.component.html',
        styleUrls: ['./search-box.component.scss']
    })
], SearchBoxComponent);
export { SearchBoxComponent };
//# sourceMappingURL=search-box.component.js.map