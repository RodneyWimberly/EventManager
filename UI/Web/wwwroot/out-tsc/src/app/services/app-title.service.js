import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter, map, flatMap } from 'rxjs/operators';
import { Utilities } from '../helpers/utilities';
let AppTitleService = class AppTitleService {
    constructor(titleService, router) {
        this.titleService = titleService;
        this.router = router;
        this.sub = this.router.events.pipe(filter(event => event instanceof NavigationEnd), map(_ => this.router.routerState.root), map(route => {
            while (route.firstChild) {
                route = route.firstChild;
            }
            return route;
        }), flatMap(route => route.data))
            .subscribe(data => {
            let title = data.title;
            if (title) {
                const fragment = this.router.url.split('#')[1];
                if (fragment) {
                    title += ' | ' + Utilities.toTitleCase(fragment);
                }
            }
            if (title && this.appName) {
                title += ' - ' + this.appName;
            }
            else if (this.appName) {
                title = this.appName;
            }
            if (title) {
                this.titleService.setTitle(title);
            }
        });
    }
};
AppTitleService = __decorate([
    Injectable()
], AppTitleService);
export { AppTitleService };
//# sourceMappingURL=app-title.service.js.map