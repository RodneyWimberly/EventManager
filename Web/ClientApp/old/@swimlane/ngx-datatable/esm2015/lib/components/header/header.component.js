import { __decorate } from "tslib";
import { Component, Output, EventEmitter, Input, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { columnsByPin, columnGroupWidths, columnsByPinArr } from '../../utils/column';
import { SortType } from '../../types/sort.type';
import { translateXY } from '../../utils/translate';
let DataTableHeaderComponent = class DataTableHeaderComponent {
    constructor(cd) {
        this.cd = cd;
        this.sort = new EventEmitter();
        this.reorder = new EventEmitter();
        this.resize = new EventEmitter();
        this.select = new EventEmitter();
        this.columnContextmenu = new EventEmitter(false);
        this._columnGroupWidths = {
            total: 100
        };
        this._styleByGroup = {
            left: {},
            center: {},
            right: {}
        };
        this.destroyed = false;
    }
    set innerWidth(val) {
        this._innerWidth = val;
        setTimeout(() => {
            if (this._columns) {
                const colByPin = columnsByPin(this._columns);
                this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
                this.setStylesByGroup();
            }
        });
    }
    get innerWidth() {
        return this._innerWidth;
    }
    set headerHeight(val) {
        if (val !== 'auto') {
            this._headerHeight = `${val}px`;
        }
        else {
            this._headerHeight = val;
        }
    }
    get headerHeight() {
        return this._headerHeight;
    }
    set columns(val) {
        this._columns = val;
        const colsByPin = columnsByPin(val);
        this._columnsByPin = columnsByPinArr(val);
        setTimeout(() => {
            this._columnGroupWidths = columnGroupWidths(colsByPin, val);
            this.setStylesByGroup();
        });
    }
    get columns() {
        return this._columns;
    }
    set offsetX(val) {
        this._offsetX = val;
        this.setStylesByGroup();
    }
    get offsetX() {
        return this._offsetX;
    }
    ngOnDestroy() {
        this.destroyed = true;
    }
    onLongPressStart({ event, model }) {
        model.dragging = true;
        this.dragEventTarget = event;
    }
    onLongPressEnd({ event, model }) {
        this.dragEventTarget = event;
        // delay resetting so sort can be
        // prevented if we were dragging
        setTimeout(() => {
            // datatable component creates copies from columns on reorder
            // set dragging to false on new objects
            const column = this._columns.find(c => c.$$id === model.$$id);
            if (column) {
                column.dragging = false;
            }
        }, 5);
    }
    get headerWidth() {
        if (this.scrollbarH) {
            return this.innerWidth + 'px';
        }
        return '100%';
    }
    trackByGroups(index, colGroup) {
        return colGroup.type;
    }
    columnTrackingFn(index, column) {
        return column.$$id;
    }
    onColumnResized(width, column) {
        if (width <= column.minWidth) {
            width = column.minWidth;
        }
        else if (width >= column.maxWidth) {
            width = column.maxWidth;
        }
        this.resize.emit({
            column,
            prevValue: column.width,
            newValue: width
        });
    }
    onColumnReordered({ prevIndex, newIndex, model }) {
        const column = this.getColumn(newIndex);
        column.isTarget = false;
        column.targetMarkerContext = undefined;
        this.reorder.emit({
            column: model,
            prevValue: prevIndex,
            newValue: newIndex
        });
    }
    onTargetChanged({ prevIndex, newIndex, initialIndex }) {
        if (prevIndex || prevIndex === 0) {
            const oldColumn = this.getColumn(prevIndex);
            oldColumn.isTarget = false;
            oldColumn.targetMarkerContext = undefined;
        }
        if (newIndex || newIndex === 0) {
            const newColumn = this.getColumn(newIndex);
            newColumn.isTarget = true;
            if (initialIndex !== newIndex) {
                newColumn.targetMarkerContext = {
                    class: 'targetMarker '.concat(initialIndex > newIndex ? 'dragFromRight' : 'dragFromLeft')
                };
            }
        }
    }
    getColumn(index) {
        const leftColumnCount = this._columnsByPin[0].columns.length;
        if (index < leftColumnCount) {
            return this._columnsByPin[0].columns[index];
        }
        const centerColumnCount = this._columnsByPin[1].columns.length;
        if (index < leftColumnCount + centerColumnCount) {
            return this._columnsByPin[1].columns[index - leftColumnCount];
        }
        return this._columnsByPin[2].columns[index - leftColumnCount - centerColumnCount];
    }
    onSort({ column, prevValue, newValue }) {
        // if we are dragging don't sort!
        if (column.dragging) {
            return;
        }
        const sorts = this.calcNewSorts(column, prevValue, newValue);
        this.sort.emit({
            sorts,
            column,
            prevValue,
            newValue
        });
    }
    calcNewSorts(column, prevValue, newValue) {
        let idx = 0;
        if (!this.sorts) {
            this.sorts = [];
        }
        const sorts = this.sorts.map((s, i) => {
            s = Object.assign({}, s);
            if (s.prop === column.prop) {
                idx = i;
            }
            return s;
        });
        if (newValue === undefined) {
            sorts.splice(idx, 1);
        }
        else if (prevValue) {
            sorts[idx].dir = newValue;
        }
        else {
            if (this.sortType === SortType.single) {
                sorts.splice(0, this.sorts.length);
            }
            sorts.push({ dir: newValue, prop: column.prop });
        }
        return sorts;
    }
    setStylesByGroup() {
        this._styleByGroup.left = this.calcStylesByGroup('left');
        this._styleByGroup.center = this.calcStylesByGroup('center');
        this._styleByGroup.right = this.calcStylesByGroup('right');
        if (!this.destroyed) {
            this.cd.detectChanges();
        }
    }
    calcStylesByGroup(group) {
        const widths = this._columnGroupWidths;
        const offsetX = this.offsetX;
        const styles = {
            width: `${widths[group]}px`
        };
        if (group === 'center') {
            translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            const totalDiff = widths.total - this.innerWidth;
            const offset = totalDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    }
};
DataTableHeaderComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "sortAscendingIcon", void 0);
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "sortDescendingIcon", void 0);
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "sortUnsetIcon", void 0);
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "scrollbarH", void 0);
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "dealsWithGroup", void 0);
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "targetMarkerTemplate", void 0);
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "innerWidth", null);
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "sorts", void 0);
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "sortType", void 0);
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "allRowsSelected", void 0);
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "selectionType", void 0);
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "reorderable", void 0);
__decorate([
    HostBinding('style.height'),
    Input()
], DataTableHeaderComponent.prototype, "headerHeight", null);
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "columns", null);
__decorate([
    Input()
], DataTableHeaderComponent.prototype, "offsetX", null);
__decorate([
    Output()
], DataTableHeaderComponent.prototype, "sort", void 0);
__decorate([
    Output()
], DataTableHeaderComponent.prototype, "reorder", void 0);
__decorate([
    Output()
], DataTableHeaderComponent.prototype, "resize", void 0);
__decorate([
    Output()
], DataTableHeaderComponent.prototype, "select", void 0);
__decorate([
    Output()
], DataTableHeaderComponent.prototype, "columnContextmenu", void 0);
__decorate([
    HostBinding('style.width')
], DataTableHeaderComponent.prototype, "headerWidth", null);
DataTableHeaderComponent = __decorate([
    Component({
        selector: 'datatable-header',
        template: `
    <div
      orderable
      (reorder)="onColumnReordered($event)"
      (targetChanged)="onTargetChanged($event)"
      [style.width.px]="_columnGroupWidths.total"
      class="datatable-header-inner"
    >
      <div
        *ngFor="let colGroup of _columnsByPin; trackBy: trackByGroups"
        [class]="'datatable-row-' + colGroup.type"
        [ngStyle]="_styleByGroup[colGroup.type]"
      >
        <datatable-header-cell
          *ngFor="let column of colGroup.columns; trackBy: columnTrackingFn"
          resizeable
          [resizeEnabled]="column.resizeable"
          (resize)="onColumnResized($event, column)"
          long-press
          [pressModel]="column"
          [pressEnabled]="reorderable && column.draggable"
          (longPressStart)="onLongPressStart($event)"
          (longPressEnd)="onLongPressEnd($event)"
          draggable
          [dragX]="reorderable && column.draggable && column.dragging"
          [dragY]="false"
          [dragModel]="column"
          [dragEventTarget]="dragEventTarget"
          [headerHeight]="headerHeight"
          [isTarget]="column.isTarget"
          [targetMarkerTemplate]="targetMarkerTemplate"
          [targetMarkerContext]="column.targetMarkerContext"
          [column]="column"
          [sortType]="sortType"
          [sorts]="sorts"
          [selectionType]="selectionType"
          [sortAscendingIcon]="sortAscendingIcon"
          [sortDescendingIcon]="sortDescendingIcon"
          [sortUnsetIcon]="sortUnsetIcon"
          [allRowsSelected]="allRowsSelected"
          (sort)="onSort($event)"
          (select)="select.emit($event)"
          (columnContextmenu)="columnContextmenu.emit($event)"
        >
        </datatable-header-cell>
      </div>
    </div>
  `,
        host: {
            class: 'datatable-header'
        },
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], DataTableHeaderComponent);
export { DataTableHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWixLQUFLLEVBQ0wsV0FBVyxFQUNYLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQXlEcEQsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUE2Rm5DLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBdEIvQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLENBQXFDLEtBQUssQ0FBQyxDQUFDO1FBRzFGLHVCQUFrQixHQUFRO1lBQ3hCLEtBQUssRUFBRSxHQUFHO1NBQ1gsQ0FBQztRQUtGLGtCQUFhLEdBQTJCO1lBQ3RDLElBQUksRUFBRSxFQUFFO1lBQ1IsTUFBTSxFQUFFLEVBQUU7WUFDVixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFFTSxjQUFTLEdBQUcsS0FBSyxDQUFDO0lBRWtCLENBQUM7SUFuRnBDLElBQUks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Ozs7Ozs7O0dBK0NUO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLGtCQUFrQjtTQUMxQjtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyx3QkFBd0IsQ0F5UXBDO1NBelFZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBIb3N0QmluZGluZyxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2x1bW5zQnlQaW4sIGNvbHVtbkdyb3VwV2lkdGhzLCBjb2x1bW5zQnlQaW5BcnIgfSBmcm9tICcuLi8uLi91dGlscy9jb2x1bW4nO1xuaW1wb3J0IHsgU29ydFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LnR5cGUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NlbGVjdGlvbi50eXBlJztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyB0cmFuc2xhdGVYWSB9IGZyb20gJy4uLy4uL3V0aWxzL3RyYW5zbGF0ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIG9yZGVyYWJsZVxuICAgICAgKHJlb3JkZXIpPVwib25Db2x1bW5SZW9yZGVyZWQoJGV2ZW50KVwiXG4gICAgICAodGFyZ2V0Q2hhbmdlZCk9XCJvblRhcmdldENoYW5nZWQoJGV2ZW50KVwiXG4gICAgICBbc3R5bGUud2lkdGgucHhdPVwiX2NvbHVtbkdyb3VwV2lkdGhzLnRvdGFsXCJcbiAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLWhlYWRlci1pbm5lclwiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICAqbmdGb3I9XCJsZXQgY29sR3JvdXAgb2YgX2NvbHVtbnNCeVBpbjsgdHJhY2tCeTogdHJhY2tCeUdyb3Vwc1wiXG4gICAgICAgIFtjbGFzc109XCInZGF0YXRhYmxlLXJvdy0nICsgY29sR3JvdXAudHlwZVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIl9zdHlsZUJ5R3JvdXBbY29sR3JvdXAudHlwZV1cIlxuICAgICAgPlxuICAgICAgICA8ZGF0YXRhYmxlLWhlYWRlci1jZWxsXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2xHcm91cC5jb2x1bW5zOyB0cmFja0J5OiBjb2x1bW5UcmFja2luZ0ZuXCJcbiAgICAgICAgICByZXNpemVhYmxlXG4gICAgICAgICAgW3Jlc2l6ZUVuYWJsZWRdPVwiY29sdW1uLnJlc2l6ZWFibGVcIlxuICAgICAgICAgIChyZXNpemUpPVwib25Db2x1bW5SZXNpemVkKCRldmVudCwgY29sdW1uKVwiXG4gICAgICAgICAgbG9uZy1wcmVzc1xuICAgICAgICAgIFtwcmVzc01vZGVsXT1cImNvbHVtblwiXG4gICAgICAgICAgW3ByZXNzRW5hYmxlZF09XCJyZW9yZGVyYWJsZSAmJiBjb2x1bW4uZHJhZ2dhYmxlXCJcbiAgICAgICAgICAobG9uZ1ByZXNzU3RhcnQpPVwib25Mb25nUHJlc3NTdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAobG9uZ1ByZXNzRW5kKT1cIm9uTG9uZ1ByZXNzRW5kKCRldmVudClcIlxuICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICAgIFtkcmFnWF09XCJyZW9yZGVyYWJsZSAmJiBjb2x1bW4uZHJhZ2dhYmxlICYmIGNvbHVtbi5kcmFnZ2luZ1wiXG4gICAgICAgICAgW2RyYWdZXT1cImZhbHNlXCJcbiAgICAgICAgICBbZHJhZ01vZGVsXT1cImNvbHVtblwiXG4gICAgICAgICAgW2RyYWdFdmVudFRhcmdldF09XCJkcmFnRXZlbnRUYXJnZXRcIlxuICAgICAgICAgIFtoZWFkZXJIZWlnaHRdPVwiaGVhZGVySGVpZ2h0XCJcbiAgICAgICAgICBbaXNUYXJnZXRdPVwiY29sdW1uLmlzVGFyZ2V0XCJcbiAgICAgICAgICBbdGFyZ2V0TWFya2VyVGVtcGxhdGVdPVwidGFyZ2V0TWFya2VyVGVtcGxhdGVcIlxuICAgICAgICAgIFt0YXJnZXRNYXJrZXJDb250ZXh0XT1cImNvbHVtbi50YXJnZXRNYXJrZXJDb250ZXh0XCJcbiAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXG4gICAgICAgICAgW3NvcnRUeXBlXT1cInNvcnRUeXBlXCJcbiAgICAgICAgICBbc29ydHNdPVwic29ydHNcIlxuICAgICAgICAgIFtzZWxlY3Rpb25UeXBlXT1cInNlbGVjdGlvblR5cGVcIlxuICAgICAgICAgIFtzb3J0QXNjZW5kaW5nSWNvbl09XCJzb3J0QXNjZW5kaW5nSWNvblwiXG4gICAgICAgICAgW3NvcnREZXNjZW5kaW5nSWNvbl09XCJzb3J0RGVzY2VuZGluZ0ljb25cIlxuICAgICAgICAgIFtzb3J0VW5zZXRJY29uXT1cInNvcnRVbnNldEljb25cIlxuICAgICAgICAgIFthbGxSb3dzU2VsZWN0ZWRdPVwiYWxsUm93c1NlbGVjdGVkXCJcbiAgICAgICAgICAoc29ydCk9XCJvblNvcnQoJGV2ZW50KVwiXG4gICAgICAgICAgKHNlbGVjdCk9XCJzZWxlY3QuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAoY29sdW1uQ29udGV4dG1lbnUpPVwiY29sdW1uQ29udGV4dG1lbnUuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICA8L2RhdGF0YWJsZS1oZWFkZXItY2VsbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdkYXRhdGFibGUtaGVhZGVyJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBzb3J0QXNjZW5kaW5nSWNvbjogYW55O1xuICBASW5wdXQoKSBzb3J0RGVzY2VuZGluZ0ljb246IGFueTtcbiAgQElucHV0KCkgc29ydFVuc2V0SWNvbjogYW55O1xuICBASW5wdXQoKSBzY3JvbGxiYXJIOiBib29sZWFuO1xuICBASW5wdXQoKSBkZWFsc1dpdGhHcm91cDogYm9vbGVhbjtcbiAgQElucHV0KCkgdGFyZ2V0TWFya2VyVGVtcGxhdGU6IGFueTtcblxuICB0YXJnZXRNYXJrZXJDb250ZXh0OiBhbnk7XG5cbiAgQElucHV0KCkgc2V0IGlubmVyV2lkdGgodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9pbm5lcldpZHRoID0gdmFsO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2NvbHVtbnMpIHtcbiAgICAgICAgY29uc3QgY29sQnlQaW4gPSBjb2x1bW5zQnlQaW4odGhpcy5fY29sdW1ucyk7XG4gICAgICAgIHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzID0gY29sdW1uR3JvdXBXaWR0aHMoY29sQnlQaW4sIHRoaXMuX2NvbHVtbnMpO1xuICAgICAgICB0aGlzLnNldFN0eWxlc0J5R3JvdXAoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldCBpbm5lcldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2lubmVyV2lkdGg7XG4gIH1cblxuICBASW5wdXQoKSBzb3J0czogYW55W107XG4gIEBJbnB1dCgpIHNvcnRUeXBlOiBTb3J0VHlwZTtcbiAgQElucHV0KCkgYWxsUm93c1NlbGVjdGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlO1xuICBASW5wdXQoKSByZW9yZGVyYWJsZTogYm9vbGVhbjtcblxuICBkcmFnRXZlbnRUYXJnZXQ6IGFueTtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpXG4gIEBJbnB1dCgpXG4gIHNldCBoZWFkZXJIZWlnaHQodmFsOiBhbnkpIHtcbiAgICBpZiAodmFsICE9PSAnYXV0bycpIHtcbiAgICAgIHRoaXMuX2hlYWRlckhlaWdodCA9IGAke3ZhbH1weGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hlYWRlckhlaWdodCA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBnZXQgaGVhZGVySGVpZ2h0KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlckhlaWdodDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBjb2x1bW5zKHZhbDogYW55W10pIHtcbiAgICB0aGlzLl9jb2x1bW5zID0gdmFsO1xuXG4gICAgY29uc3QgY29sc0J5UGluID0gY29sdW1uc0J5UGluKHZhbCk7XG4gICAgdGhpcy5fY29sdW1uc0J5UGluID0gY29sdW1uc0J5UGluQXJyKHZhbCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9jb2x1bW5Hcm91cFdpZHRocyA9IGNvbHVtbkdyb3VwV2lkdGhzKGNvbHNCeVBpbiwgdmFsKTtcbiAgICAgIHRoaXMuc2V0U3R5bGVzQnlHcm91cCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGNvbHVtbnMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG9mZnNldFgodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9vZmZzZXRYID0gdmFsO1xuICAgIHRoaXMuc2V0U3R5bGVzQnlHcm91cCgpO1xuICB9XG4gIGdldCBvZmZzZXRYKCkge1xuICAgIHJldHVybiB0aGlzLl9vZmZzZXRYO1xuICB9XG5cbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVvcmRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZXNpemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNvbHVtbkNvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50OyBjb2x1bW46IGFueSB9PihmYWxzZSk7XG5cbiAgX2NvbHVtbnNCeVBpbjogYW55O1xuICBfY29sdW1uR3JvdXBXaWR0aHM6IGFueSA9IHtcbiAgICB0b3RhbDogMTAwXG4gIH07XG4gIF9pbm5lcldpZHRoOiBudW1iZXI7XG4gIF9vZmZzZXRYOiBudW1iZXI7XG4gIF9jb2x1bW5zOiBhbnlbXTtcbiAgX2hlYWRlckhlaWdodDogc3RyaW5nO1xuICBfc3R5bGVCeUdyb3VwOiB7IFtwcm9wOiBzdHJpbmddOiB7fSB9ID0ge1xuICAgIGxlZnQ6IHt9LFxuICAgIGNlbnRlcjoge30sXG4gICAgcmlnaHQ6IHt9XG4gIH07XG5cbiAgcHJpdmF0ZSBkZXN0cm95ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gIH1cblxuICBvbkxvbmdQcmVzc1N0YXJ0KHsgZXZlbnQsIG1vZGVsIH06IHsgZXZlbnQ6IGFueTsgbW9kZWw6IGFueSB9KSB7XG4gICAgbW9kZWwuZHJhZ2dpbmcgPSB0cnVlO1xuICAgIHRoaXMuZHJhZ0V2ZW50VGFyZ2V0ID0gZXZlbnQ7XG4gIH1cblxuICBvbkxvbmdQcmVzc0VuZCh7IGV2ZW50LCBtb2RlbCB9OiB7IGV2ZW50OiBhbnk7IG1vZGVsOiBhbnkgfSkge1xuICAgIHRoaXMuZHJhZ0V2ZW50VGFyZ2V0ID0gZXZlbnQ7XG5cbiAgICAvLyBkZWxheSByZXNldHRpbmcgc28gc29ydCBjYW4gYmVcbiAgICAvLyBwcmV2ZW50ZWQgaWYgd2Ugd2VyZSBkcmFnZ2luZ1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gZGF0YXRhYmxlIGNvbXBvbmVudCBjcmVhdGVzIGNvcGllcyBmcm9tIGNvbHVtbnMgb24gcmVvcmRlclxuICAgICAgLy8gc2V0IGRyYWdnaW5nIHRvIGZhbHNlIG9uIG5ldyBvYmplY3RzXG4gICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLl9jb2x1bW5zLmZpbmQoYyA9PiBjLiQkaWQgPT09IG1vZGVsLiQkaWQpO1xuICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICBjb2x1bW4uZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LCA1KTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxuICBnZXQgaGVhZGVyV2lkdGgoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJIKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lcldpZHRoICsgJ3B4JztcbiAgICB9XG5cbiAgICByZXR1cm4gJzEwMCUnO1xuICB9XG5cbiAgdHJhY2tCeUdyb3VwcyhpbmRleDogbnVtYmVyLCBjb2xHcm91cDogYW55KTogYW55IHtcbiAgICByZXR1cm4gY29sR3JvdXAudHlwZTtcbiAgfVxuXG4gIGNvbHVtblRyYWNraW5nRm4oaW5kZXg6IG51bWJlciwgY29sdW1uOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBjb2x1bW4uJCRpZDtcbiAgfVxuXG4gIG9uQ29sdW1uUmVzaXplZCh3aWR0aDogbnVtYmVyLCBjb2x1bW46IERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSk6IHZvaWQge1xuICAgIGlmICh3aWR0aCA8PSBjb2x1bW4ubWluV2lkdGgpIHtcbiAgICAgIHdpZHRoID0gY29sdW1uLm1pbldpZHRoO1xuICAgIH0gZWxzZSBpZiAod2lkdGggPj0gY29sdW1uLm1heFdpZHRoKSB7XG4gICAgICB3aWR0aCA9IGNvbHVtbi5tYXhXaWR0aDtcbiAgICB9XG5cbiAgICB0aGlzLnJlc2l6ZS5lbWl0KHtcbiAgICAgIGNvbHVtbixcbiAgICAgIHByZXZWYWx1ZTogY29sdW1uLndpZHRoLFxuICAgICAgbmV3VmFsdWU6IHdpZHRoXG4gICAgfSk7XG4gIH1cblxuICBvbkNvbHVtblJlb3JkZXJlZCh7IHByZXZJbmRleCwgbmV3SW5kZXgsIG1vZGVsIH06IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uKG5ld0luZGV4KTtcbiAgICBjb2x1bW4uaXNUYXJnZXQgPSBmYWxzZTtcbiAgICBjb2x1bW4udGFyZ2V0TWFya2VyQ29udGV4dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnJlb3JkZXIuZW1pdCh7XG4gICAgICBjb2x1bW46IG1vZGVsLFxuICAgICAgcHJldlZhbHVlOiBwcmV2SW5kZXgsXG4gICAgICBuZXdWYWx1ZTogbmV3SW5kZXhcbiAgICB9KTtcbiAgfVxuXG4gIG9uVGFyZ2V0Q2hhbmdlZCh7IHByZXZJbmRleCwgbmV3SW5kZXgsIGluaXRpYWxJbmRleCB9OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAocHJldkluZGV4IHx8IHByZXZJbmRleCA9PT0gMCkge1xuICAgICAgY29uc3Qgb2xkQ29sdW1uID0gdGhpcy5nZXRDb2x1bW4ocHJldkluZGV4KTtcbiAgICAgIG9sZENvbHVtbi5pc1RhcmdldCA9IGZhbHNlO1xuICAgICAgb2xkQ29sdW1uLnRhcmdldE1hcmtlckNvbnRleHQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChuZXdJbmRleCB8fCBuZXdJbmRleCA9PT0gMCkge1xuICAgICAgY29uc3QgbmV3Q29sdW1uID0gdGhpcy5nZXRDb2x1bW4obmV3SW5kZXgpO1xuICAgICAgbmV3Q29sdW1uLmlzVGFyZ2V0ID0gdHJ1ZTtcblxuICAgICAgaWYgKGluaXRpYWxJbmRleCAhPT0gbmV3SW5kZXgpIHtcbiAgICAgICAgbmV3Q29sdW1uLnRhcmdldE1hcmtlckNvbnRleHQgPSB7XG4gICAgICAgICAgY2xhc3M6ICd0YXJnZXRNYXJrZXIgJy5jb25jYXQoaW5pdGlhbEluZGV4ID4gbmV3SW5kZXggPyAnZHJhZ0Zyb21SaWdodCcgOiAnZHJhZ0Zyb21MZWZ0JylcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRDb2x1bW4oaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgY29uc3QgbGVmdENvbHVtbkNvdW50ID0gdGhpcy5fY29sdW1uc0J5UGluWzBdLmNvbHVtbnMubGVuZ3RoO1xuICAgIGlmIChpbmRleCA8IGxlZnRDb2x1bW5Db3VudCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbnNCeVBpblswXS5jb2x1bW5zW2luZGV4XTtcbiAgICB9XG5cbiAgICBjb25zdCBjZW50ZXJDb2x1bW5Db3VudCA9IHRoaXMuX2NvbHVtbnNCeVBpblsxXS5jb2x1bW5zLmxlbmd0aDtcbiAgICBpZiAoaW5kZXggPCBsZWZ0Q29sdW1uQ291bnQgKyBjZW50ZXJDb2x1bW5Db3VudCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbnNCeVBpblsxXS5jb2x1bW5zW2luZGV4IC0gbGVmdENvbHVtbkNvdW50XTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY29sdW1uc0J5UGluWzJdLmNvbHVtbnNbaW5kZXggLSBsZWZ0Q29sdW1uQ291bnQgLSBjZW50ZXJDb2x1bW5Db3VudF07XG4gIH1cblxuICBvblNvcnQoeyBjb2x1bW4sIHByZXZWYWx1ZSwgbmV3VmFsdWUgfTogYW55KTogdm9pZCB7XG4gICAgLy8gaWYgd2UgYXJlIGRyYWdnaW5nIGRvbid0IHNvcnQhXG4gICAgaWYgKGNvbHVtbi5kcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNvcnRzID0gdGhpcy5jYWxjTmV3U29ydHMoY29sdW1uLCBwcmV2VmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB0aGlzLnNvcnQuZW1pdCh7XG4gICAgICBzb3J0cyxcbiAgICAgIGNvbHVtbixcbiAgICAgIHByZXZWYWx1ZSxcbiAgICAgIG5ld1ZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBjYWxjTmV3U29ydHMoY29sdW1uOiBhbnksIHByZXZWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKTogYW55W10ge1xuICAgIGxldCBpZHggPSAwO1xuXG4gICAgaWYgKCF0aGlzLnNvcnRzKSB7XG4gICAgICB0aGlzLnNvcnRzID0gW107XG4gICAgfVxuXG4gICAgY29uc3Qgc29ydHMgPSB0aGlzLnNvcnRzLm1hcCgocywgaSkgPT4ge1xuICAgICAgcyA9IHsgLi4ucyB9O1xuICAgICAgaWYgKHMucHJvcCA9PT0gY29sdW1uLnByb3ApIHtcbiAgICAgICAgaWR4ID0gaTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzO1xuICAgIH0pO1xuXG4gICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNvcnRzLnNwbGljZShpZHgsIDEpO1xuICAgIH0gZWxzZSBpZiAocHJldlZhbHVlKSB7XG4gICAgICBzb3J0c1tpZHhdLmRpciA9IG5ld1ZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5zb3J0VHlwZSA9PT0gU29ydFR5cGUuc2luZ2xlKSB7XG4gICAgICAgIHNvcnRzLnNwbGljZSgwLCB0aGlzLnNvcnRzLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIHNvcnRzLnB1c2goeyBkaXI6IG5ld1ZhbHVlLCBwcm9wOiBjb2x1bW4ucHJvcCB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc29ydHM7XG4gIH1cblxuICBzZXRTdHlsZXNCeUdyb3VwKCkge1xuICAgIHRoaXMuX3N0eWxlQnlHcm91cC5sZWZ0ID0gdGhpcy5jYWxjU3R5bGVzQnlHcm91cCgnbGVmdCcpO1xuICAgIHRoaXMuX3N0eWxlQnlHcm91cC5jZW50ZXIgPSB0aGlzLmNhbGNTdHlsZXNCeUdyb3VwKCdjZW50ZXInKTtcbiAgICB0aGlzLl9zdHlsZUJ5R3JvdXAucmlnaHQgPSB0aGlzLmNhbGNTdHlsZXNCeUdyb3VwKCdyaWdodCcpO1xuICAgIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGNhbGNTdHlsZXNCeUdyb3VwKGdyb3VwOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHdpZHRocyA9IHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzO1xuICAgIGNvbnN0IG9mZnNldFggPSB0aGlzLm9mZnNldFg7XG5cbiAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICB3aWR0aDogYCR7d2lkdGhzW2dyb3VwXX1weGBcbiAgICB9O1xuXG4gICAgaWYgKGdyb3VwID09PSAnY2VudGVyJykge1xuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXRYICogLTEsIDApO1xuICAgIH0gZWxzZSBpZiAoZ3JvdXAgPT09ICdyaWdodCcpIHtcbiAgICAgIGNvbnN0IHRvdGFsRGlmZiA9IHdpZHRocy50b3RhbCAtIHRoaXMuaW5uZXJXaWR0aDtcbiAgICAgIGNvbnN0IG9mZnNldCA9IHRvdGFsRGlmZiAqIC0xO1xuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXQsIDApO1xuICAgIH1cblxuICAgIHJldHVybiBzdHlsZXM7XG4gIH1cbn1cbiJdfQ==