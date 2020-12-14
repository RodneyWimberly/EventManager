import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let NavsearchComponent = class NavsearchComponent {
    constructor(elem) {
        this.elem = elem;
        this.onclose = new EventEmitter();
    }
    ngOnInit() {
        $(document)
            .on('keyup', event => {
            if (event.keyCode === 27) { // ESC
                this.closeNavSearch();
            }
        })
            .on('click', event => {
            if (!$.contains(this.elem.nativeElement, event.target)) {
                this.closeNavSearch();
            }
        });
    }
    closeNavSearch() {
        this.visible = false;
        this.onclose.emit();
    }
    ngOnChanges(changes) {
        // console.log(changes['visible'].currentValue)
        if (changes['visible'].currentValue === true) {
            this.elem.nativeElement.querySelector('input').focus();
        }
    }
    handleForm() {
        console.log('Form submit: ' + this.term);
    }
};
__decorate([
    Input()
], NavsearchComponent.prototype, "visible", void 0);
__decorate([
    Output()
], NavsearchComponent.prototype, "onclose", void 0);
NavsearchComponent = __decorate([
    Component({
        selector: 'app-navsearch',
        templateUrl: './navsearch.component.html',
        styleUrls: ['./navsearch.component.scss']
    })
], NavsearchComponent);
export { NavsearchComponent };
//# sourceMappingURL=navsearch.component.js.map