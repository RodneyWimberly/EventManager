/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastaComponent } from './toasta.component';
import { ToastComponent } from './toast.component';
import { SafeHtmlPipe } from './shared';
import { ToastaService, ToastaConfig, toastaServiceFactory } from './toasta.service';
const ɵ0 = toastaServiceFactory;
/** @type {?} */
export let providers = [
    ToastaConfig,
    { provide: ToastaService, useFactory: ɵ0, deps: [ToastaConfig] }
];
export class ToastaModule {
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
ToastaModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [ToastComponent, ToastaComponent, SafeHtmlPipe],
                exports: [ToastComponent, ToastaComponent],
                providers
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RhLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10b2FzdGEvIiwic291cmNlcyI6WyJsaWIvdG9hc3RhLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO1dBSTdDLG9CQUFvQjs7QUFGNUQsTUFBTSxLQUFLLFNBQVMsR0FBRztJQUNyQixZQUFZO0lBQ1osRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsSUFBc0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRTtDQUNuRjtBQVFELE1BQU0sT0FBTyxZQUFZOzs7O0lBQ3ZCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVM7U0FDVixDQUFDO0lBQ0osQ0FBQzs7O1lBWkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFLENBQUMsY0FBYyxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUM7Z0JBQzdELE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUM7Z0JBQzFDLFNBQVM7YUFDViIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5cclxuaW1wb3J0IHsgVG9hc3RhQ29tcG9uZW50IH0gZnJvbSAnLi90b2FzdGEuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVG9hc3RDb21wb25lbnQgfSBmcm9tICcuL3RvYXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNhZmVIdG1sUGlwZSB9IGZyb20gJy4vc2hhcmVkJztcclxuaW1wb3J0IHsgVG9hc3RhU2VydmljZSwgVG9hc3RhQ29uZmlnLCB0b2FzdGFTZXJ2aWNlRmFjdG9yeSB9IGZyb20gJy4vdG9hc3RhLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGxldCBwcm92aWRlcnMgPSBbXHJcbiAgVG9hc3RhQ29uZmlnLFxyXG4gIHsgcHJvdmlkZTogVG9hc3RhU2VydmljZSwgdXNlRmFjdG9yeTogdG9hc3RhU2VydmljZUZhY3RvcnksIGRlcHM6IFtUb2FzdGFDb25maWddIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbVG9hc3RDb21wb25lbnQsIFRvYXN0YUNvbXBvbmVudCwgU2FmZUh0bWxQaXBlXSxcclxuICBleHBvcnRzOiBbVG9hc3RDb21wb25lbnQsIFRvYXN0YUNvbXBvbmVudF0sXHJcbiAgcHJvdmlkZXJzXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb2FzdGFNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IFRvYXN0YU1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=