import { Injectable, EventEmitter, Component, Renderer2, ElementRef, Directive, ViewContainerRef, Input, Output, forwardRef, Host, ChangeDetectorRef, ChangeDetectionStrategy, NgModule, ViewChild } from '@angular/core';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { getMonth, getFullYear, isFirstDayOfWeek, getDay, shiftDate, isBefore, endOf, isAfter, startOf, isArray, isSame, getFirstDayOfMonth, formatDate, getLocale, isSameMonth, isSameDay, isDisabledDay, isSameYear, isDateValid, setFullDate, isDate, parseDate, utcAsLocal } from 'ngx-bootstrap/chronos';
import { BehaviorSubject, Subject } from 'rxjs';
import { MiniStore, MiniState } from 'ngx-bootstrap/mini-ngrx';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isBs3 } from 'ngx-bootstrap/utils';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * For date range picker there are `BsDaterangepickerConfig` which inherits all properties,
 * except `displayMonths`, for range picker it default to `2`
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from 'ngx-bootstrap/positioning';
import * as ɵngcc2 from '@angular/common';
import * as ɵngcc3 from 'ngx-bootstrap/component-loader';

function BsDatepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "bs-days-calendar-view", 9);
    ɵngcc0.ɵɵlistener("onNavigate", function BsDatepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onNavigate_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r8 = ɵngcc0.ɵɵnextContext(3); return ctx_r8.navigateTo($event); })("onViewMode", function BsDatepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onViewMode_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r10 = ɵngcc0.ɵɵnextContext(3); return ctx_r10.setViewMode($event); })("onHover", function BsDatepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onHover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r11 = ɵngcc0.ɵɵnextContext(3); return ctx_r11.dayHoverHandler($event); })("onHoverWeek", function BsDatepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onHoverWeek_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r12 = ɵngcc0.ɵɵnextContext(3); return ctx_r12.weekHoverHandler($event); })("onSelect", function BsDatepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onSelect_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r13 = ɵngcc0.ɵɵnextContext(3); return ctx_r13.daySelectHandler($event); });
    ɵngcc0.ɵɵpipe(1, "async");
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const calendar_r7 = ctx.$implicit;
    const ctx_r6 = ɵngcc0.ɵɵnextContext(3);
    var tmp_0_0 = null;
    ɵngcc0.ɵɵclassProp("bs-datepicker-multiple", ((tmp_0_0 = ɵngcc0.ɵɵpipeBind1(1, 4, ctx_r6.daysCalendar)) == null ? null : tmp_0_0.length) > 1);
    ɵngcc0.ɵɵproperty("calendar", calendar_r7)("options", ɵngcc0.ɵɵpipeBind1(2, 6, ctx_r6.options));
} }
function BsDatepickerContainerComponent_div_0_div_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵtemplate(1, BsDatepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template, 3, 8, "bs-days-calendar-view", 8);
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(2, 1, ctx_r1.daysCalendar));
} }
function BsDatepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "bs-month-calendar-view", 11);
    ɵngcc0.ɵɵlistener("onNavigate", function BsDatepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onNavigate_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r16 = ɵngcc0.ɵɵnextContext(3); return ctx_r16.navigateTo($event); })("onViewMode", function BsDatepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onViewMode_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r18 = ɵngcc0.ɵɵnextContext(3); return ctx_r18.setViewMode($event); })("onHover", function BsDatepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onHover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r19 = ɵngcc0.ɵɵnextContext(3); return ctx_r19.monthHoverHandler($event); })("onSelect", function BsDatepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onSelect_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r20 = ɵngcc0.ɵɵnextContext(3); return ctx_r20.monthSelectHandler($event); });
    ɵngcc0.ɵɵpipe(1, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const calendar_r15 = ctx.$implicit;
    const ctx_r14 = ɵngcc0.ɵɵnextContext(3);
    var tmp_0_0 = null;
    ɵngcc0.ɵɵclassProp("bs-datepicker-multiple", ((tmp_0_0 = ɵngcc0.ɵɵpipeBind1(1, 3, ctx_r14.daysCalendar)) == null ? null : tmp_0_0.length) > 1);
    ɵngcc0.ɵɵproperty("calendar", calendar_r15);
} }
function BsDatepickerContainerComponent_div_0_div_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵtemplate(1, BsDatepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template, 2, 5, "bs-month-calendar-view", 10);
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(2, 1, ctx_r2.monthsCalendar));
} }
function BsDatepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template(rf, ctx) { if (rf & 1) {
    const _r24 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "bs-years-calendar-view", 11);
    ɵngcc0.ɵɵlistener("onNavigate", function BsDatepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onNavigate_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r23 = ɵngcc0.ɵɵnextContext(3); return ctx_r23.navigateTo($event); })("onViewMode", function BsDatepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onViewMode_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r25 = ɵngcc0.ɵɵnextContext(3); return ctx_r25.setViewMode($event); })("onHover", function BsDatepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onHover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r26 = ɵngcc0.ɵɵnextContext(3); return ctx_r26.yearHoverHandler($event); })("onSelect", function BsDatepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onSelect_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r27 = ɵngcc0.ɵɵnextContext(3); return ctx_r27.yearSelectHandler($event); });
    ɵngcc0.ɵɵpipe(1, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const calendar_r22 = ctx.$implicit;
    const ctx_r21 = ɵngcc0.ɵɵnextContext(3);
    var tmp_0_0 = null;
    ɵngcc0.ɵɵclassProp("bs-datepicker-multiple", ((tmp_0_0 = ɵngcc0.ɵɵpipeBind1(1, 3, ctx_r21.daysCalendar)) == null ? null : tmp_0_0.length) > 1);
    ɵngcc0.ɵɵproperty("calendar", calendar_r22);
} }
function BsDatepickerContainerComponent_div_0_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵtemplate(1, BsDatepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template, 2, 5, "bs-years-calendar-view", 10);
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(2, 1, ctx_r3.yearsCalendar));
} }
function BsDatepickerContainerComponent_div_0_div_7_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 12);
    ɵngcc0.ɵɵelementStart(1, "button", 13);
    ɵngcc0.ɵɵtext(2, "Apply");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "button", 14);
    ɵngcc0.ɵɵtext(4, "Cancel");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} }
function BsDatepickerContainerComponent_div_0_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r29 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 15);
    ɵngcc0.ɵɵelementStart(1, "bs-custom-date-view", 16);
    ɵngcc0.ɵɵlistener("onSelect", function BsDatepickerContainerComponent_div_0_div_8_Template_bs_custom_date_view_onSelect_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r29); const ctx_r28 = ɵngcc0.ɵɵnextContext(2); return ctx_r28.setRangeOnCalendar($event); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("selectedRange", ctx_r5.chosenRange)("ranges", ctx_r5.customRanges);
} }
function BsDatepickerContainerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r31 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵelementStart(1, "div", 2);
    ɵngcc0.ɵɵlistener("@datepickerAnimation.done", function BsDatepickerContainerComponent_div_0_Template_div_animation_datepickerAnimation_done_1_listener() { ɵngcc0.ɵɵrestoreView(_r31); const ctx_r30 = ɵngcc0.ɵɵnextContext(); return ctx_r30.positionServiceEnable(); });
    ɵngcc0.ɵɵelementStart(2, "div", 3);
    ɵngcc0.ɵɵpipe(3, "async");
    ɵngcc0.ɵɵtemplate(4, BsDatepickerContainerComponent_div_0_div_4_Template, 3, 3, "div", 4);
    ɵngcc0.ɵɵtemplate(5, BsDatepickerContainerComponent_div_0_div_5_Template, 3, 3, "div", 4);
    ɵngcc0.ɵɵtemplate(6, BsDatepickerContainerComponent_div_0_div_6_Template, 3, 3, "div", 4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(7, BsDatepickerContainerComponent_div_0_div_7_Template, 5, 0, "div", 5);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(8, BsDatepickerContainerComponent_div_0_div_8_Template, 2, 2, "div", 6);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ctx_r0.containerClass);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("@datepickerAnimation", ctx_r0.animationState);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitch", ɵngcc0.ɵɵpipeBind1(3, 8, ctx_r0.viewMode));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "day");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "month");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "year");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", false);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", (ctx_r0.customRanges == null ? null : ctx_r0.customRanges.length) > 0);
} }
function BsDatepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "bs-days-calendar-view", 9);
    ɵngcc0.ɵɵlistener("onNavigate", function BsDatepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onNavigate_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r8 = ɵngcc0.ɵɵnextContext(3); return ctx_r8.navigateTo($event); })("onViewMode", function BsDatepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onViewMode_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r10 = ɵngcc0.ɵɵnextContext(3); return ctx_r10.setViewMode($event); })("onHover", function BsDatepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onHover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r11 = ɵngcc0.ɵɵnextContext(3); return ctx_r11.dayHoverHandler($event); })("onHoverWeek", function BsDatepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onHoverWeek_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r12 = ɵngcc0.ɵɵnextContext(3); return ctx_r12.weekHoverHandler($event); })("onSelect", function BsDatepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onSelect_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r13 = ɵngcc0.ɵɵnextContext(3); return ctx_r13.daySelectHandler($event); });
    ɵngcc0.ɵɵpipe(1, "async");
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const calendar_r7 = ctx.$implicit;
    const ctx_r6 = ɵngcc0.ɵɵnextContext(3);
    var tmp_0_0 = null;
    ɵngcc0.ɵɵclassProp("bs-datepicker-multiple", ((tmp_0_0 = ɵngcc0.ɵɵpipeBind1(1, 4, ctx_r6.daysCalendar)) == null ? null : tmp_0_0.length) > 1);
    ɵngcc0.ɵɵproperty("calendar", calendar_r7)("options", ɵngcc0.ɵɵpipeBind1(2, 6, ctx_r6.options));
} }
function BsDatepickerInlineContainerComponent_div_0_div_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵtemplate(1, BsDatepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template, 3, 8, "bs-days-calendar-view", 8);
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(2, 1, ctx_r1.daysCalendar));
} }
function BsDatepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "bs-month-calendar-view", 11);
    ɵngcc0.ɵɵlistener("onNavigate", function BsDatepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onNavigate_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r16 = ɵngcc0.ɵɵnextContext(3); return ctx_r16.navigateTo($event); })("onViewMode", function BsDatepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onViewMode_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r18 = ɵngcc0.ɵɵnextContext(3); return ctx_r18.setViewMode($event); })("onHover", function BsDatepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onHover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r19 = ɵngcc0.ɵɵnextContext(3); return ctx_r19.monthHoverHandler($event); })("onSelect", function BsDatepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onSelect_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r20 = ɵngcc0.ɵɵnextContext(3); return ctx_r20.monthSelectHandler($event); });
    ɵngcc0.ɵɵpipe(1, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const calendar_r15 = ctx.$implicit;
    const ctx_r14 = ɵngcc0.ɵɵnextContext(3);
    var tmp_0_0 = null;
    ɵngcc0.ɵɵclassProp("bs-datepicker-multiple", ((tmp_0_0 = ɵngcc0.ɵɵpipeBind1(1, 3, ctx_r14.daysCalendar)) == null ? null : tmp_0_0.length) > 1);
    ɵngcc0.ɵɵproperty("calendar", calendar_r15);
} }
function BsDatepickerInlineContainerComponent_div_0_div_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵtemplate(1, BsDatepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template, 2, 5, "bs-month-calendar-view", 10);
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(2, 1, ctx_r2.monthsCalendar));
} }
function BsDatepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template(rf, ctx) { if (rf & 1) {
    const _r24 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "bs-years-calendar-view", 11);
    ɵngcc0.ɵɵlistener("onNavigate", function BsDatepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onNavigate_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r23 = ɵngcc0.ɵɵnextContext(3); return ctx_r23.navigateTo($event); })("onViewMode", function BsDatepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onViewMode_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r25 = ɵngcc0.ɵɵnextContext(3); return ctx_r25.setViewMode($event); })("onHover", function BsDatepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onHover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r26 = ɵngcc0.ɵɵnextContext(3); return ctx_r26.yearHoverHandler($event); })("onSelect", function BsDatepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onSelect_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r27 = ɵngcc0.ɵɵnextContext(3); return ctx_r27.yearSelectHandler($event); });
    ɵngcc0.ɵɵpipe(1, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const calendar_r22 = ctx.$implicit;
    const ctx_r21 = ɵngcc0.ɵɵnextContext(3);
    var tmp_0_0 = null;
    ɵngcc0.ɵɵclassProp("bs-datepicker-multiple", ((tmp_0_0 = ɵngcc0.ɵɵpipeBind1(1, 3, ctx_r21.daysCalendar)) == null ? null : tmp_0_0.length) > 1);
    ɵngcc0.ɵɵproperty("calendar", calendar_r22);
} }
function BsDatepickerInlineContainerComponent_div_0_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵtemplate(1, BsDatepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template, 2, 5, "bs-years-calendar-view", 10);
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(2, 1, ctx_r3.yearsCalendar));
} }
function BsDatepickerInlineContainerComponent_div_0_div_7_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 12);
    ɵngcc0.ɵɵelementStart(1, "button", 13);
    ɵngcc0.ɵɵtext(2, "Apply");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "button", 14);
    ɵngcc0.ɵɵtext(4, "Cancel");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} }
function BsDatepickerInlineContainerComponent_div_0_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r29 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 15);
    ɵngcc0.ɵɵelementStart(1, "bs-custom-date-view", 16);
    ɵngcc0.ɵɵlistener("onSelect", function BsDatepickerInlineContainerComponent_div_0_div_8_Template_bs_custom_date_view_onSelect_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r29); const ctx_r28 = ɵngcc0.ɵɵnextContext(2); return ctx_r28.setRangeOnCalendar($event); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("selectedRange", ctx_r5.chosenRange)("ranges", ctx_r5.customRanges);
} }
function BsDatepickerInlineContainerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r31 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵelementStart(1, "div", 2);
    ɵngcc0.ɵɵlistener("@datepickerAnimation.done", function BsDatepickerInlineContainerComponent_div_0_Template_div_animation_datepickerAnimation_done_1_listener() { ɵngcc0.ɵɵrestoreView(_r31); const ctx_r30 = ɵngcc0.ɵɵnextContext(); return ctx_r30.positionServiceEnable(); });
    ɵngcc0.ɵɵelementStart(2, "div", 3);
    ɵngcc0.ɵɵpipe(3, "async");
    ɵngcc0.ɵɵtemplate(4, BsDatepickerInlineContainerComponent_div_0_div_4_Template, 3, 3, "div", 4);
    ɵngcc0.ɵɵtemplate(5, BsDatepickerInlineContainerComponent_div_0_div_5_Template, 3, 3, "div", 4);
    ɵngcc0.ɵɵtemplate(6, BsDatepickerInlineContainerComponent_div_0_div_6_Template, 3, 3, "div", 4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(7, BsDatepickerInlineContainerComponent_div_0_div_7_Template, 5, 0, "div", 5);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(8, BsDatepickerInlineContainerComponent_div_0_div_8_Template, 2, 2, "div", 6);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ctx_r0.containerClass);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("@datepickerAnimation", ctx_r0.animationState);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitch", ɵngcc0.ɵɵpipeBind1(3, 8, ctx_r0.viewMode));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "day");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "month");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "year");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", false);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", (ctx_r0.customRanges == null ? null : ctx_r0.customRanges.length) > 0);
} }
function BsDaterangepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "bs-days-calendar-view", 9);
    ɵngcc0.ɵɵlistener("onNavigate", function BsDaterangepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onNavigate_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r8 = ɵngcc0.ɵɵnextContext(3); return ctx_r8.navigateTo($event); })("onViewMode", function BsDaterangepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onViewMode_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r10 = ɵngcc0.ɵɵnextContext(3); return ctx_r10.setViewMode($event); })("onHover", function BsDaterangepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onHover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r11 = ɵngcc0.ɵɵnextContext(3); return ctx_r11.dayHoverHandler($event); })("onHoverWeek", function BsDaterangepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onHoverWeek_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r12 = ɵngcc0.ɵɵnextContext(3); return ctx_r12.weekHoverHandler($event); })("onSelect", function BsDaterangepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onSelect_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r13 = ɵngcc0.ɵɵnextContext(3); return ctx_r13.daySelectHandler($event); });
    ɵngcc0.ɵɵpipe(1, "async");
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const calendar_r7 = ctx.$implicit;
    const ctx_r6 = ɵngcc0.ɵɵnextContext(3);
    var tmp_0_0 = null;
    ɵngcc0.ɵɵclassProp("bs-datepicker-multiple", ((tmp_0_0 = ɵngcc0.ɵɵpipeBind1(1, 4, ctx_r6.daysCalendar)) == null ? null : tmp_0_0.length) > 1);
    ɵngcc0.ɵɵproperty("calendar", calendar_r7)("options", ɵngcc0.ɵɵpipeBind1(2, 6, ctx_r6.options));
} }
function BsDaterangepickerContainerComponent_div_0_div_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵtemplate(1, BsDaterangepickerContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template, 3, 8, "bs-days-calendar-view", 8);
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(2, 1, ctx_r1.daysCalendar));
} }
function BsDaterangepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "bs-month-calendar-view", 11);
    ɵngcc0.ɵɵlistener("onNavigate", function BsDaterangepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onNavigate_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r16 = ɵngcc0.ɵɵnextContext(3); return ctx_r16.navigateTo($event); })("onViewMode", function BsDaterangepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onViewMode_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r18 = ɵngcc0.ɵɵnextContext(3); return ctx_r18.setViewMode($event); })("onHover", function BsDaterangepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onHover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r19 = ɵngcc0.ɵɵnextContext(3); return ctx_r19.monthHoverHandler($event); })("onSelect", function BsDaterangepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onSelect_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r20 = ɵngcc0.ɵɵnextContext(3); return ctx_r20.monthSelectHandler($event); });
    ɵngcc0.ɵɵpipe(1, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const calendar_r15 = ctx.$implicit;
    const ctx_r14 = ɵngcc0.ɵɵnextContext(3);
    var tmp_0_0 = null;
    ɵngcc0.ɵɵclassProp("bs-datepicker-multiple", ((tmp_0_0 = ɵngcc0.ɵɵpipeBind1(1, 3, ctx_r14.daysCalendar)) == null ? null : tmp_0_0.length) > 1);
    ɵngcc0.ɵɵproperty("calendar", calendar_r15);
} }
function BsDaterangepickerContainerComponent_div_0_div_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵtemplate(1, BsDaterangepickerContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template, 2, 5, "bs-month-calendar-view", 10);
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(2, 1, ctx_r2.monthsCalendar));
} }
function BsDaterangepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template(rf, ctx) { if (rf & 1) {
    const _r24 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "bs-years-calendar-view", 11);
    ɵngcc0.ɵɵlistener("onNavigate", function BsDaterangepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onNavigate_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r23 = ɵngcc0.ɵɵnextContext(3); return ctx_r23.navigateTo($event); })("onViewMode", function BsDaterangepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onViewMode_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r25 = ɵngcc0.ɵɵnextContext(3); return ctx_r25.setViewMode($event); })("onHover", function BsDaterangepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onHover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r26 = ɵngcc0.ɵɵnextContext(3); return ctx_r26.yearHoverHandler($event); })("onSelect", function BsDaterangepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onSelect_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r27 = ɵngcc0.ɵɵnextContext(3); return ctx_r27.yearSelectHandler($event); });
    ɵngcc0.ɵɵpipe(1, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const calendar_r22 = ctx.$implicit;
    const ctx_r21 = ɵngcc0.ɵɵnextContext(3);
    var tmp_0_0 = null;
    ɵngcc0.ɵɵclassProp("bs-datepicker-multiple", ((tmp_0_0 = ɵngcc0.ɵɵpipeBind1(1, 3, ctx_r21.daysCalendar)) == null ? null : tmp_0_0.length) > 1);
    ɵngcc0.ɵɵproperty("calendar", calendar_r22);
} }
function BsDaterangepickerContainerComponent_div_0_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵtemplate(1, BsDaterangepickerContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template, 2, 5, "bs-years-calendar-view", 10);
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(2, 1, ctx_r3.yearsCalendar));
} }
function BsDaterangepickerContainerComponent_div_0_div_7_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 12);
    ɵngcc0.ɵɵelementStart(1, "button", 13);
    ɵngcc0.ɵɵtext(2, "Apply");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "button", 14);
    ɵngcc0.ɵɵtext(4, "Cancel");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} }
function BsDaterangepickerContainerComponent_div_0_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r29 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 15);
    ɵngcc0.ɵɵelementStart(1, "bs-custom-date-view", 16);
    ɵngcc0.ɵɵlistener("onSelect", function BsDaterangepickerContainerComponent_div_0_div_8_Template_bs_custom_date_view_onSelect_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r29); const ctx_r28 = ɵngcc0.ɵɵnextContext(2); return ctx_r28.setRangeOnCalendar($event); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("selectedRange", ctx_r5.chosenRange)("ranges", ctx_r5.customRanges);
} }
function BsDaterangepickerContainerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r31 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵelementStart(1, "div", 2);
    ɵngcc0.ɵɵlistener("@datepickerAnimation.done", function BsDaterangepickerContainerComponent_div_0_Template_div_animation_datepickerAnimation_done_1_listener() { ɵngcc0.ɵɵrestoreView(_r31); const ctx_r30 = ɵngcc0.ɵɵnextContext(); return ctx_r30.positionServiceEnable(); });
    ɵngcc0.ɵɵelementStart(2, "div", 3);
    ɵngcc0.ɵɵpipe(3, "async");
    ɵngcc0.ɵɵtemplate(4, BsDaterangepickerContainerComponent_div_0_div_4_Template, 3, 3, "div", 4);
    ɵngcc0.ɵɵtemplate(5, BsDaterangepickerContainerComponent_div_0_div_5_Template, 3, 3, "div", 4);
    ɵngcc0.ɵɵtemplate(6, BsDaterangepickerContainerComponent_div_0_div_6_Template, 3, 3, "div", 4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(7, BsDaterangepickerContainerComponent_div_0_div_7_Template, 5, 0, "div", 5);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(8, BsDaterangepickerContainerComponent_div_0_div_8_Template, 2, 2, "div", 6);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ctx_r0.containerClass);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("@datepickerAnimation", ctx_r0.animationState);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitch", ɵngcc0.ɵɵpipeBind1(3, 8, ctx_r0.viewMode));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "day");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "month");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "year");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", false);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", (ctx_r0.customRanges == null ? null : ctx_r0.customRanges.length) > 0);
} }
function BsDaterangepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "bs-days-calendar-view", 9);
    ɵngcc0.ɵɵlistener("onNavigate", function BsDaterangepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onNavigate_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r8 = ɵngcc0.ɵɵnextContext(3); return ctx_r8.navigateTo($event); })("onViewMode", function BsDaterangepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onViewMode_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r10 = ɵngcc0.ɵɵnextContext(3); return ctx_r10.setViewMode($event); })("onHover", function BsDaterangepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onHover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r11 = ɵngcc0.ɵɵnextContext(3); return ctx_r11.dayHoverHandler($event); })("onHoverWeek", function BsDaterangepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onHoverWeek_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r12 = ɵngcc0.ɵɵnextContext(3); return ctx_r12.weekHoverHandler($event); })("onSelect", function BsDaterangepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template_bs_days_calendar_view_onSelect_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r13 = ɵngcc0.ɵɵnextContext(3); return ctx_r13.daySelectHandler($event); });
    ɵngcc0.ɵɵpipe(1, "async");
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const calendar_r7 = ctx.$implicit;
    const ctx_r6 = ɵngcc0.ɵɵnextContext(3);
    var tmp_0_0 = null;
    ɵngcc0.ɵɵclassProp("bs-datepicker-multiple", ((tmp_0_0 = ɵngcc0.ɵɵpipeBind1(1, 4, ctx_r6.daysCalendar)) == null ? null : tmp_0_0.length) > 1);
    ɵngcc0.ɵɵproperty("calendar", calendar_r7)("options", ɵngcc0.ɵɵpipeBind1(2, 6, ctx_r6.options));
} }
function BsDaterangepickerInlineContainerComponent_div_0_div_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵtemplate(1, BsDaterangepickerInlineContainerComponent_div_0_div_4_bs_days_calendar_view_1_Template, 3, 8, "bs-days-calendar-view", 8);
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(2, 1, ctx_r1.daysCalendar));
} }
function BsDaterangepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "bs-month-calendar-view", 11);
    ɵngcc0.ɵɵlistener("onNavigate", function BsDaterangepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onNavigate_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r16 = ɵngcc0.ɵɵnextContext(3); return ctx_r16.navigateTo($event); })("onViewMode", function BsDaterangepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onViewMode_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r18 = ɵngcc0.ɵɵnextContext(3); return ctx_r18.setViewMode($event); })("onHover", function BsDaterangepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onHover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r19 = ɵngcc0.ɵɵnextContext(3); return ctx_r19.monthHoverHandler($event); })("onSelect", function BsDaterangepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template_bs_month_calendar_view_onSelect_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r20 = ɵngcc0.ɵɵnextContext(3); return ctx_r20.monthSelectHandler($event); });
    ɵngcc0.ɵɵpipe(1, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const calendar_r15 = ctx.$implicit;
    const ctx_r14 = ɵngcc0.ɵɵnextContext(3);
    var tmp_0_0 = null;
    ɵngcc0.ɵɵclassProp("bs-datepicker-multiple", ((tmp_0_0 = ɵngcc0.ɵɵpipeBind1(1, 3, ctx_r14.daysCalendar)) == null ? null : tmp_0_0.length) > 1);
    ɵngcc0.ɵɵproperty("calendar", calendar_r15);
} }
function BsDaterangepickerInlineContainerComponent_div_0_div_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵtemplate(1, BsDaterangepickerInlineContainerComponent_div_0_div_5_bs_month_calendar_view_1_Template, 2, 5, "bs-month-calendar-view", 10);
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(2, 1, ctx_r2.monthsCalendar));
} }
function BsDaterangepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template(rf, ctx) { if (rf & 1) {
    const _r24 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "bs-years-calendar-view", 11);
    ɵngcc0.ɵɵlistener("onNavigate", function BsDaterangepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onNavigate_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r23 = ɵngcc0.ɵɵnextContext(3); return ctx_r23.navigateTo($event); })("onViewMode", function BsDaterangepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onViewMode_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r25 = ɵngcc0.ɵɵnextContext(3); return ctx_r25.setViewMode($event); })("onHover", function BsDaterangepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onHover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r26 = ɵngcc0.ɵɵnextContext(3); return ctx_r26.yearHoverHandler($event); })("onSelect", function BsDaterangepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template_bs_years_calendar_view_onSelect_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r27 = ɵngcc0.ɵɵnextContext(3); return ctx_r27.yearSelectHandler($event); });
    ɵngcc0.ɵɵpipe(1, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const calendar_r22 = ctx.$implicit;
    const ctx_r21 = ɵngcc0.ɵɵnextContext(3);
    var tmp_0_0 = null;
    ɵngcc0.ɵɵclassProp("bs-datepicker-multiple", ((tmp_0_0 = ɵngcc0.ɵɵpipeBind1(1, 3, ctx_r21.daysCalendar)) == null ? null : tmp_0_0.length) > 1);
    ɵngcc0.ɵɵproperty("calendar", calendar_r22);
} }
function BsDaterangepickerInlineContainerComponent_div_0_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵtemplate(1, BsDaterangepickerInlineContainerComponent_div_0_div_6_bs_years_calendar_view_1_Template, 2, 5, "bs-years-calendar-view", 10);
    ɵngcc0.ɵɵpipe(2, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(2, 1, ctx_r3.yearsCalendar));
} }
function BsDaterangepickerInlineContainerComponent_div_0_div_7_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 12);
    ɵngcc0.ɵɵelementStart(1, "button", 13);
    ɵngcc0.ɵɵtext(2, "Apply");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "button", 14);
    ɵngcc0.ɵɵtext(4, "Cancel");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} }
function BsDaterangepickerInlineContainerComponent_div_0_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r29 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 15);
    ɵngcc0.ɵɵelementStart(1, "bs-custom-date-view", 16);
    ɵngcc0.ɵɵlistener("onSelect", function BsDaterangepickerInlineContainerComponent_div_0_div_8_Template_bs_custom_date_view_onSelect_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r29); const ctx_r28 = ɵngcc0.ɵɵnextContext(2); return ctx_r28.setRangeOnCalendar($event); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("selectedRange", ctx_r5.chosenRange)("ranges", ctx_r5.customRanges);
} }
function BsDaterangepickerInlineContainerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r31 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵelementStart(1, "div", 2);
    ɵngcc0.ɵɵlistener("@datepickerAnimation.done", function BsDaterangepickerInlineContainerComponent_div_0_Template_div_animation_datepickerAnimation_done_1_listener() { ɵngcc0.ɵɵrestoreView(_r31); const ctx_r30 = ɵngcc0.ɵɵnextContext(); return ctx_r30.positionServiceEnable(); });
    ɵngcc0.ɵɵelementStart(2, "div", 3);
    ɵngcc0.ɵɵpipe(3, "async");
    ɵngcc0.ɵɵtemplate(4, BsDaterangepickerInlineContainerComponent_div_0_div_4_Template, 3, 3, "div", 4);
    ɵngcc0.ɵɵtemplate(5, BsDaterangepickerInlineContainerComponent_div_0_div_5_Template, 3, 3, "div", 4);
    ɵngcc0.ɵɵtemplate(6, BsDaterangepickerInlineContainerComponent_div_0_div_6_Template, 3, 3, "div", 4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(7, BsDaterangepickerInlineContainerComponent_div_0_div_7_Template, 5, 0, "div", 5);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(8, BsDaterangepickerInlineContainerComponent_div_0_div_8_Template, 2, 2, "div", 6);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ctx_r0.containerClass);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("@datepickerAnimation", ctx_r0.animationState);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitch", ɵngcc0.ɵɵpipeBind1(3, 8, ctx_r0.viewMode));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "day");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "month");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "year");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", false);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", (ctx_r0.customRanges == null ? null : ctx_r0.customRanges.length) > 0);
} }
function BsCalendarLayoutComponent_bs_current_date_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "bs-current-date", 4);
} }
function BsCalendarLayoutComponent_bs_timepicker_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "bs-timepicker");
} }
const _c0 = [[["bs-datepicker-navigation-view"]], "*"];
const _c1 = ["bs-datepicker-navigation-view", "*"];
function BsCustomDatesViewComponent_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 2);
    ɵngcc0.ɵɵlistener("click", function BsCustomDatesViewComponent_button_1_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r3); const range_r1 = ctx.$implicit; const ctx_r2 = ɵngcc0.ɵɵnextContext(); return ctx_r2.selectFromRanges(range_r1); });
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const range_r1 = ctx.$implicit;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassProp("selected", range_r1.value === ctx_r0.selectedRange);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", range_r1.label, " ");
} }
const _c2 = ["bsDatepickerDayDecorator", ""];
function BsDatepickerNavigationViewComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r2 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵtext(1, " \u200B ");
    ɵngcc0.ɵɵelementStart(2, "button", 2);
    ɵngcc0.ɵɵlistener("click", function BsDatepickerNavigationViewComponent_ng_container_3_Template_button_click_2_listener() { ɵngcc0.ɵɵrestoreView(_r2); const ctx_r1 = ɵngcc0.ɵɵnextContext(); return ctx_r1.view("month"); });
    ɵngcc0.ɵɵelementStart(3, "span");
    ɵngcc0.ɵɵtext(4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(4);
    ɵngcc0.ɵɵtextInterpolate(ctx_r0.calendar.monthTitle);
} }
function BsDaysCalendarViewComponent_th_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "th");
} }
function BsDaysCalendarViewComponent_th_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "th", 5);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r4 = ctx.index;
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1("", ctx_r1.calendar.weekdays[i_r4], " ");
} }
function BsDaysCalendarViewComponent_tr_8_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "td", 8);
    ɵngcc0.ɵɵelementStart(1, "span", 9);
    ɵngcc0.ɵɵlistener("click", function BsDaysCalendarViewComponent_tr_8_td_1_Template_span_click_1_listener() { ɵngcc0.ɵɵrestoreView(_r11); const week_r5 = ɵngcc0.ɵɵnextContext().$implicit; const ctx_r9 = ɵngcc0.ɵɵnextContext(); return ctx_r9.selectWeek(week_r5); })("mouseenter", function BsDaysCalendarViewComponent_tr_8_td_1_Template_span_mouseenter_1_listener() { ɵngcc0.ɵɵrestoreView(_r11); const week_r5 = ɵngcc0.ɵɵnextContext().$implicit; const ctx_r12 = ɵngcc0.ɵɵnextContext(); return ctx_r12.weekHoverHandler(week_r5, true); })("mouseleave", function BsDaysCalendarViewComponent_tr_8_td_1_Template_span_mouseleave_1_listener() { ɵngcc0.ɵɵrestoreView(_r11); const week_r5 = ɵngcc0.ɵɵnextContext().$implicit; const ctx_r14 = ɵngcc0.ɵɵnextContext(); return ctx_r14.weekHoverHandler(week_r5, false); });
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r6 = ɵngcc0.ɵɵnextContext().index;
    const ctx_r7 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassProp("active-week", ctx_r7.isWeekHovered);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r7.calendar.weekNumbers[i_r6]);
} }
function BsDaysCalendarViewComponent_tr_8_td_2_Template(rf, ctx) { if (rf & 1) {
    const _r19 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "td", 10);
    ɵngcc0.ɵɵelementStart(1, "span", 11);
    ɵngcc0.ɵɵlistener("click", function BsDaysCalendarViewComponent_tr_8_td_2_Template_span_click_1_listener() { ɵngcc0.ɵɵrestoreView(_r19); const day_r17 = ctx.$implicit; const ctx_r18 = ɵngcc0.ɵɵnextContext(2); return ctx_r18.selectDay(day_r17); })("mouseenter", function BsDaysCalendarViewComponent_tr_8_td_2_Template_span_mouseenter_1_listener() { ɵngcc0.ɵɵrestoreView(_r19); const day_r17 = ctx.$implicit; const ctx_r20 = ɵngcc0.ɵɵnextContext(2); return ctx_r20.hoverDay(day_r17, true); })("mouseleave", function BsDaysCalendarViewComponent_tr_8_td_2_Template_span_mouseleave_1_listener() { ɵngcc0.ɵɵrestoreView(_r19); const day_r17 = ctx.$implicit; const ctx_r21 = ɵngcc0.ɵɵnextContext(2); return ctx_r21.hoverDay(day_r17, false); });
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r17 = ctx.$implicit;
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("day", day_r17);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(day_r17.label);
} }
function BsDaysCalendarViewComponent_tr_8_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "tr");
    ɵngcc0.ɵɵtemplate(1, BsDaysCalendarViewComponent_tr_8_td_1_Template, 3, 3, "td", 6);
    ɵngcc0.ɵɵtemplate(2, BsDaysCalendarViewComponent_tr_8_td_2_Template, 3, 2, "td", 7);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const week_r5 = ctx.$implicit;
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r2.options.showWeekNumbers);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", week_r5.days);
} }
function BsMonthCalendarViewComponent_tr_4_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "td", 4);
    ɵngcc0.ɵɵlistener("click", function BsMonthCalendarViewComponent_tr_4_td_1_Template_td_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r5); const month_r3 = ctx.$implicit; const ctx_r4 = ɵngcc0.ɵɵnextContext(2); return ctx_r4.viewMonth(month_r3); })("mouseenter", function BsMonthCalendarViewComponent_tr_4_td_1_Template_td_mouseenter_0_listener() { ɵngcc0.ɵɵrestoreView(_r5); const month_r3 = ctx.$implicit; const ctx_r6 = ɵngcc0.ɵɵnextContext(2); return ctx_r6.hoverMonth(month_r3, true); })("mouseleave", function BsMonthCalendarViewComponent_tr_4_td_1_Template_td_mouseleave_0_listener() { ɵngcc0.ɵɵrestoreView(_r5); const month_r3 = ctx.$implicit; const ctx_r7 = ɵngcc0.ɵɵnextContext(2); return ctx_r7.hoverMonth(month_r3, false); });
    ɵngcc0.ɵɵelementStart(1, "span");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const month_r3 = ctx.$implicit;
    ɵngcc0.ɵɵclassProp("disabled", month_r3.isDisabled)("is-highlighted", month_r3.isHovered);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵclassProp("selected", month_r3.isSelected);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(month_r3.label);
} }
function BsMonthCalendarViewComponent_tr_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "tr");
    ɵngcc0.ɵɵtemplate(1, BsMonthCalendarViewComponent_tr_4_td_1_Template, 3, 7, "td", 3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r1 = ctx.$implicit;
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", row_r1);
} }
function BsYearsCalendarViewComponent_tr_4_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "td", 4);
    ɵngcc0.ɵɵlistener("click", function BsYearsCalendarViewComponent_tr_4_td_1_Template_td_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r5); const year_r3 = ctx.$implicit; const ctx_r4 = ɵngcc0.ɵɵnextContext(2); return ctx_r4.viewYear(year_r3); })("mouseenter", function BsYearsCalendarViewComponent_tr_4_td_1_Template_td_mouseenter_0_listener() { ɵngcc0.ɵɵrestoreView(_r5); const year_r3 = ctx.$implicit; const ctx_r6 = ɵngcc0.ɵɵnextContext(2); return ctx_r6.hoverYear(year_r3, true); })("mouseleave", function BsYearsCalendarViewComponent_tr_4_td_1_Template_td_mouseleave_0_listener() { ɵngcc0.ɵɵrestoreView(_r5); const year_r3 = ctx.$implicit; const ctx_r7 = ɵngcc0.ɵɵnextContext(2); return ctx_r7.hoverYear(year_r3, false); });
    ɵngcc0.ɵɵelementStart(1, "span");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const year_r3 = ctx.$implicit;
    ɵngcc0.ɵɵclassProp("disabled", year_r3.isDisabled)("is-highlighted", year_r3.isHovered);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵclassProp("selected", year_r3.isSelected);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(year_r3.label);
} }
function BsYearsCalendarViewComponent_tr_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "tr");
    ɵngcc0.ɵɵtemplate(1, BsYearsCalendarViewComponent_tr_4_td_1_Template, 3, 7, "td", 3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r1 = ctx.$implicit;
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", row_r1);
} }
function DatePickerInnerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵprojection(1);
    ɵngcc0.ɵɵelementEnd();
} }
const _c3 = ["*"];
function DayPickerComponent_table_0_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 8);
    ɵngcc0.ɵɵlistener("click", function DayPickerComponent_table_0_button_4_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r8 = ɵngcc0.ɵɵnextContext(2); return ctx_r8.datePicker.move(0 - 1); });
    ɵngcc0.ɵɵtext(1, "\u2039");
    ɵngcc0.ɵɵelementEnd();
} }
function DayPickerComponent_table_0_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r11 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 8);
    ɵngcc0.ɵɵlistener("click", function DayPickerComponent_table_0_button_5_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r11); const ctx_r10 = ɵngcc0.ɵɵnextContext(2); return ctx_r10.datePicker.move(0 - 1); });
    ɵngcc0.ɵɵtext(1, "<");
    ɵngcc0.ɵɵelementEnd();
} }
function DayPickerComponent_table_0_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 9);
    ɵngcc0.ɵɵlistener("click", function DayPickerComponent_table_0_button_11_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r13); const ctx_r12 = ɵngcc0.ɵɵnextContext(2); return ctx_r12.datePicker.move(1); });
    ɵngcc0.ɵɵtext(1, "\u203A");
    ɵngcc0.ɵɵelementEnd();
} }
function DayPickerComponent_table_0_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r15 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 9);
    ɵngcc0.ɵɵlistener("click", function DayPickerComponent_table_0_button_12_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r15); const ctx_r14 = ɵngcc0.ɵɵnextContext(2); return ctx_r14.datePicker.move(1); });
    ɵngcc0.ɵɵtext(1, "> ");
    ɵngcc0.ɵɵelementEnd();
} }
function DayPickerComponent_table_0_th_14_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "th");
} }
function DayPickerComponent_table_0_th_15_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "th", 10);
    ɵngcc0.ɵɵelementStart(1, "small", 11);
    ɵngcc0.ɵɵelementStart(2, "b");
    ɵngcc0.ɵɵtext(3);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const labelz_r16 = ctx.$implicit;
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵtextInterpolate(labelz_r16.abbr);
} }
function DayPickerComponent_table_0_ng_template_17_tr_0_td_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "td", 10);
    ɵngcc0.ɵɵelementStart(1, "em");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const index_r18 = ɵngcc0.ɵɵnextContext(2).index;
    const ctx_r20 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r20.weekNumbers[index_r18]);
} }
const _c4 = function (a0, a1, a2, a3, a4) { return { "btn-secondary": a0, "btn-info": a1, disabled: a2, active: a3, "btn-default": a4 }; };
const _c5 = function (a0, a1) { return { "text-muted": a0, "text-info": a1 }; };
function DayPickerComponent_table_0_ng_template_17_tr_0_td_2_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r27 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 16);
    ɵngcc0.ɵɵlistener("click", function DayPickerComponent_table_0_ng_template_17_tr_0_td_2_button_1_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r27); const dtz_r23 = ɵngcc0.ɵɵnextContext().$implicit; const ctx_r25 = ɵngcc0.ɵɵnextContext(4); return ctx_r25.datePicker.select(dtz_r23.date); });
    ɵngcc0.ɵɵelementStart(1, "span", 17);
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const dtz_r23 = ɵngcc0.ɵɵnextContext().$implicit;
    const ctx_r24 = ɵngcc0.ɵɵnextContext(4);
    ɵngcc0.ɵɵclassMapInterpolate1("btn btn-sm ", dtz_r23.customClass, "");
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction5(7, _c4, ctx_r24.isBs4 && !dtz_r23.selected && !ctx_r24.datePicker.isActive(dtz_r23), dtz_r23.selected, dtz_r23.disabled, !ctx_r24.isBs4 && ctx_r24.datePicker.isActive(dtz_r23), !ctx_r24.isBs4))("disabled", dtz_r23.disabled);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(13, _c5, dtz_r23.secondary || dtz_r23.current, !ctx_r24.isBs4 && dtz_r23.current));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(dtz_r23.label);
} }
function DayPickerComponent_table_0_ng_template_17_tr_0_td_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "td", 14);
    ɵngcc0.ɵɵtemplate(1, DayPickerComponent_table_0_ng_template_17_tr_0_td_2_button_1_Template, 3, 16, "button", 15);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const dtz_r23 = ctx.$implicit;
    const ctx_r21 = ɵngcc0.ɵɵnextContext(4);
    ɵngcc0.ɵɵproperty("id", dtz_r23.uid);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !(ctx_r21.datePicker.onlyCurrentMonth && dtz_r23.secondary));
} }
function DayPickerComponent_table_0_ng_template_17_tr_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "tr");
    ɵngcc0.ɵɵtemplate(1, DayPickerComponent_table_0_ng_template_17_tr_0_td_1_Template, 3, 1, "td", 12);
    ɵngcc0.ɵɵtemplate(2, DayPickerComponent_table_0_ng_template_17_tr_0_td_2_Template, 2, 2, "td", 13);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const rowz_r17 = ɵngcc0.ɵɵnextContext().$implicit;
    const ctx_r19 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r19.datePicker.showWeeks);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", rowz_r17);
} }
function DayPickerComponent_table_0_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, DayPickerComponent_table_0_ng_template_17_tr_0_Template, 3, 2, "tr", 5);
} if (rf & 2) {
    const rowz_r17 = ctx.$implicit;
    const ctx_r7 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("ngIf", !(ctx_r7.datePicker.onlyCurrentMonth && rowz_r17[0].secondary && rowz_r17[6].secondary));
} }
const _c6 = function (a0) { return { disabled: a0 }; };
function DayPickerComponent_table_0_Template(rf, ctx) { if (rf & 1) {
    const _r31 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "table", 1);
    ɵngcc0.ɵɵelementStart(1, "thead");
    ɵngcc0.ɵɵelementStart(2, "tr");
    ɵngcc0.ɵɵelementStart(3, "th");
    ɵngcc0.ɵɵtemplate(4, DayPickerComponent_table_0_button_4_Template, 2, 0, "button", 2);
    ɵngcc0.ɵɵtemplate(5, DayPickerComponent_table_0_button_5_Template, 2, 0, "button", 2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(6, "th");
    ɵngcc0.ɵɵelementStart(7, "button", 3);
    ɵngcc0.ɵɵlistener("click", function DayPickerComponent_table_0_Template_button_click_7_listener() { ɵngcc0.ɵɵrestoreView(_r31); const ctx_r30 = ɵngcc0.ɵɵnextContext(); return ctx_r30.datePicker.toggleMode(0); });
    ɵngcc0.ɵɵelementStart(8, "strong");
    ɵngcc0.ɵɵtext(9);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(10, "th");
    ɵngcc0.ɵɵtemplate(11, DayPickerComponent_table_0_button_11_Template, 2, 0, "button", 4);
    ɵngcc0.ɵɵtemplate(12, DayPickerComponent_table_0_button_12_Template, 2, 0, "button", 4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(13, "tr");
    ɵngcc0.ɵɵtemplate(14, DayPickerComponent_table_0_th_14_Template, 1, 0, "th", 5);
    ɵngcc0.ɵɵtemplate(15, DayPickerComponent_table_0_th_15_Template, 4, 1, "th", 6);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(16, "tbody");
    ɵngcc0.ɵɵtemplate(17, DayPickerComponent_table_0_ng_template_17_Template, 1, 1, "ng-template", 7);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵattribute("aria-labelledby", ctx_r0.datePicker.uniqueId + "-title");
    ɵngcc0.ɵɵadvance(4);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.isBs4);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.isBs4);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵattribute("colspan", 5 + (ctx_r0.datePicker.showWeeks ? 1 : 0));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("id", ctx_r0.datePicker.uniqueId + "-title")("disabled", ctx_r0.datePicker.datepickerMode === ctx_r0.datePicker.maxMode)("ngClass", ɵngcc0.ɵɵpureFunction1(13, _c6, ctx_r0.datePicker.datepickerMode === ctx_r0.datePicker.maxMode));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r0.title);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.isBs4);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.isBs4);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.datePicker.showWeeks);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r0.labels);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r0.rows);
} }
const _c7 = function (a0, a1, a2, a3) { return { "btn-link": a0, "btn-info": a1, disabled: a2, active: a3 }; };
const _c8 = function (a0, a1) { return { "text-success": a0, "text-info": a1 }; };
function MonthPickerComponent_table_0_tr_14_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "td", 7);
    ɵngcc0.ɵɵelementStart(1, "button", 8);
    ɵngcc0.ɵɵlistener("click", function MonthPickerComponent_table_0_tr_14_td_1_Template_button_click_1_listener() { ɵngcc0.ɵɵrestoreView(_r6); const dtz_r4 = ctx.$implicit; const ctx_r5 = ɵngcc0.ɵɵnextContext(3); return ctx_r5.datePicker.select(dtz_r4.date); });
    ɵngcc0.ɵɵelementStart(2, "span", 9);
    ɵngcc0.ɵɵtext(3);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const dtz_r4 = ctx.$implicit;
    const ctx_r3 = ɵngcc0.ɵɵnextContext(3);
    ɵngcc0.ɵɵproperty("ngClass", dtz_r4.customClass);
    ɵngcc0.ɵɵattribute("id", dtz_r4.uid);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction4(6, _c7, ctx_r3.isBs4 && !dtz_r4.selected && !ctx_r3.datePicker.isActive(dtz_r4), dtz_r4.selected || ctx_r3.isBs4 && !dtz_r4.selected && ctx_r3.datePicker.isActive(dtz_r4), dtz_r4.disabled, !ctx_r3.isBs4 && ctx_r3.datePicker.isActive(dtz_r4)))("disabled", dtz_r4.disabled);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(11, _c8, ctx_r3.isBs4 && dtz_r4.current, !ctx_r3.isBs4 && dtz_r4.current));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(dtz_r4.label);
} }
function MonthPickerComponent_table_0_tr_14_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "tr");
    ɵngcc0.ɵɵtemplate(1, MonthPickerComponent_table_0_tr_14_td_1_Template, 4, 14, "td", 6);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const rowz_r2 = ctx.$implicit;
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", rowz_r2);
} }
function MonthPickerComponent_table_0_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "table", 1);
    ɵngcc0.ɵɵelementStart(1, "thead");
    ɵngcc0.ɵɵelementStart(2, "tr");
    ɵngcc0.ɵɵelementStart(3, "th");
    ɵngcc0.ɵɵelementStart(4, "button", 2);
    ɵngcc0.ɵɵlistener("click", function MonthPickerComponent_table_0_Template_button_click_4_listener() { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r7 = ɵngcc0.ɵɵnextContext(); return ctx_r7.datePicker.move(0 - 1); });
    ɵngcc0.ɵɵtext(5, "\u2039");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(6, "th");
    ɵngcc0.ɵɵelementStart(7, "button", 3);
    ɵngcc0.ɵɵlistener("click", function MonthPickerComponent_table_0_Template_button_click_7_listener() { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r9 = ɵngcc0.ɵɵnextContext(); return ctx_r9.datePicker.toggleMode(0); });
    ɵngcc0.ɵɵelementStart(8, "strong");
    ɵngcc0.ɵɵtext(9);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(10, "th");
    ɵngcc0.ɵɵelementStart(11, "button", 4);
    ɵngcc0.ɵɵlistener("click", function MonthPickerComponent_table_0_Template_button_click_11_listener() { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r10 = ɵngcc0.ɵɵnextContext(); return ctx_r10.datePicker.move(1); });
    ɵngcc0.ɵɵtext(12, "\u203A");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(13, "tbody");
    ɵngcc0.ɵɵtemplate(14, MonthPickerComponent_table_0_tr_14_Template, 2, 1, "tr", 5);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(6);
    ɵngcc0.ɵɵattribute("colspan", ctx_r0.datePicker.monthColLimit - 2 <= 0 ? 1 : ctx_r0.datePicker.monthColLimit - 2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("id", ctx_r0.datePicker.uniqueId + "-title")("disabled", ctx_r0.datePicker.datepickerMode === ctx_r0.maxMode)("ngClass", ɵngcc0.ɵɵpureFunction1(6, _c6, ctx_r0.datePicker.datepickerMode === ctx_r0.maxMode));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r0.title);
    ɵngcc0.ɵɵadvance(5);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r0.rows);
} }
function YearPickerComponent_table_0_tr_14_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "td", 7);
    ɵngcc0.ɵɵelementStart(1, "button", 8);
    ɵngcc0.ɵɵlistener("click", function YearPickerComponent_table_0_tr_14_td_1_Template_button_click_1_listener() { ɵngcc0.ɵɵrestoreView(_r6); const dtz_r4 = ctx.$implicit; const ctx_r5 = ɵngcc0.ɵɵnextContext(3); return ctx_r5.datePicker.select(dtz_r4.date); });
    ɵngcc0.ɵɵelementStart(2, "span", 9);
    ɵngcc0.ɵɵtext(3);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const dtz_r4 = ctx.$implicit;
    const ctx_r3 = ɵngcc0.ɵɵnextContext(3);
    ɵngcc0.ɵɵattribute("id", dtz_r4.uid);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction4(5, _c7, ctx_r3.isBs4 && !dtz_r4.selected && !ctx_r3.datePicker.isActive(dtz_r4), dtz_r4.selected || ctx_r3.isBs4 && !dtz_r4.selected && ctx_r3.datePicker.isActive(dtz_r4), dtz_r4.disabled, !ctx_r3.isBs4 && ctx_r3.datePicker.isActive(dtz_r4)))("disabled", dtz_r4.disabled);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(10, _c8, ctx_r3.isBs4 && dtz_r4.current, !ctx_r3.isBs4 && dtz_r4.current));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(dtz_r4.label);
} }
function YearPickerComponent_table_0_tr_14_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "tr");
    ɵngcc0.ɵɵtemplate(1, YearPickerComponent_table_0_tr_14_td_1_Template, 4, 13, "td", 6);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const rowz_r2 = ctx.$implicit;
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", rowz_r2);
} }
function YearPickerComponent_table_0_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "table", 1);
    ɵngcc0.ɵɵelementStart(1, "thead");
    ɵngcc0.ɵɵelementStart(2, "tr");
    ɵngcc0.ɵɵelementStart(3, "th");
    ɵngcc0.ɵɵelementStart(4, "button", 2);
    ɵngcc0.ɵɵlistener("click", function YearPickerComponent_table_0_Template_button_click_4_listener() { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r7 = ɵngcc0.ɵɵnextContext(); return ctx_r7.datePicker.move(0 - 1); });
    ɵngcc0.ɵɵtext(5, "\u2039");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(6, "th");
    ɵngcc0.ɵɵelementStart(7, "button", 3);
    ɵngcc0.ɵɵlistener("click", function YearPickerComponent_table_0_Template_button_click_7_listener() { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r9 = ɵngcc0.ɵɵnextContext(); return ctx_r9.datePicker.toggleMode(0); });
    ɵngcc0.ɵɵelementStart(8, "strong");
    ɵngcc0.ɵɵtext(9);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(10, "th");
    ɵngcc0.ɵɵelementStart(11, "button", 4);
    ɵngcc0.ɵɵlistener("click", function YearPickerComponent_table_0_Template_button_click_11_listener() { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r10 = ɵngcc0.ɵɵnextContext(); return ctx_r10.datePicker.move(1); });
    ɵngcc0.ɵɵtext(12, "\u203A");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(13, "tbody");
    ɵngcc0.ɵɵtemplate(14, YearPickerComponent_table_0_tr_14_Template, 2, 1, "tr", 5);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(6);
    ɵngcc0.ɵɵattribute("colspan", ctx_r0.datePicker.yearColLimit - 2 <= 0 ? 1 : ctx_r0.datePicker.yearColLimit - 2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("id", ctx_r0.datePicker.uniqueId + "-title")("disabled", ctx_r0.datePicker.datepickerMode === ctx_r0.datePicker.maxMode)("ngClass", ɵngcc0.ɵɵpureFunction1(6, _c6, ctx_r0.datePicker.datepickerMode === ctx_r0.datePicker.maxMode));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r0.title);
    ɵngcc0.ɵɵadvance(5);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r0.rows);
} }
const _c9 = "[_nghost-%COMP%]   .btn-info[_ngcontent-%COMP%]   .text-success[_ngcontent-%COMP%] {\n      color: #fff !important;\n    }";
class BsDatepickerConfig {
    constructor() {
        /**
         * sets use adaptive position
         */
        this.adaptivePosition = false;
        /**
         * sets use UTC date time format
         */
        this.useUtc = false;
        /**
         * turn on/off animation
         */
        this.isAnimated = false;
        /**
         * If true, returns focus to the datepicker / daterangepicker input after date selection
         */
        this.returnFocusToInput = false;
        /**
         * CSS class which will be applied to datepicker container,
         * usually used to set color theme
         */
        this.containerClass = 'theme-green';
        // DatepickerRenderOptions
        this.displayMonths = 1;
        /**
         * Allows to hide week numbers in datepicker
         */
        this.showWeekNumbers = true;
        this.dateInputFormat = 'L';
        // range picker
        this.rangeSeparator = ' - ';
        /**
         * Date format for date range input field
         */
        this.rangeInputFormat = 'L';
        // DatepickerFormatOptions
        this.monthTitle = 'MMMM';
        this.yearTitle = 'YYYY';
        this.dayLabel = 'D';
        this.monthLabel = 'MMMM';
        this.yearLabel = 'YYYY';
        this.weekNumbers = 'w';
    }
}
BsDatepickerConfig.ɵfac = function BsDatepickerConfig_Factory(t) { return new (t || BsDatepickerConfig)(); };
BsDatepickerConfig.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: BsDatepickerConfig, factory: BsDatepickerConfig.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDatepickerConfig, [{
        type: Injectable
    }], function () { return []; }, null); })();
if (false) {
    /**
     * sets use adaptive position
     * @type {?}
     */
    BsDatepickerConfig.prototype.adaptivePosition;
    /**
     * sets use UTC date time format
     * @type {?}
     */
    BsDatepickerConfig.prototype.useUtc;
    /**
     * turn on/off animation
     * @type {?}
     */
    BsDatepickerConfig.prototype.isAnimated;
    /** @type {?} */
    BsDatepickerConfig.prototype.value;
    /** @type {?} */
    BsDatepickerConfig.prototype.isDisabled;
    /**
     * Default min date for all date/range pickers
     * @type {?}
     */
    BsDatepickerConfig.prototype.minDate;
    /**
     * Default max date for all date/range pickers
     * @type {?}
     */
    BsDatepickerConfig.prototype.maxDate;
    /**
     * Default date custom classes for all date/range pickers
     * @type {?}
     */
    BsDatepickerConfig.prototype.dateCustomClasses;
    /**
     * Disable specific days, e.g. [0,6] will disable all Saturdays and Sundays
     * @type {?}
     */
    BsDatepickerConfig.prototype.daysDisabled;
    /**
     * Disable specific dates
     * @type {?}
     */
    BsDatepickerConfig.prototype.datesDisabled;
    /**
     * Show one months for special cases (only for dateRangePicker)
     * 1. maxDate is equal to today's date
     * 2. minDate's month is equal to maxDate's month
     * @type {?}
     */
    BsDatepickerConfig.prototype.displayOneMonthRange;
    /**
     * Enable specific dates
     * @type {?}
     */
    BsDatepickerConfig.prototype.datesEnabled;
    /**
     * Makes dates from other months active
     * @type {?}
     */
    BsDatepickerConfig.prototype.selectFromOtherMonth;
    /**
     * Allows select first date of the week by click on week number
     * @type {?}
     */
    BsDatepickerConfig.prototype.selectWeek;
    /**
     * Allows select daterange as first and last day of week by click on week number (dateRangePicker only)
     * @type {?}
     */
    BsDatepickerConfig.prototype.selectWeekDateRange;
    /**
     * Shows previous and current month, instead of current and next (dateRangePicker only)
     * @type {?}
     */
    BsDatepickerConfig.prototype.showPreviousMonth;
    /**
     * Add class to current day
     * @type {?}
     */
    BsDatepickerConfig.prototype.customTodayClass;
    /**
     * Default mode for all date pickers
     * @type {?}
     */
    BsDatepickerConfig.prototype.minMode;
    /**
     * If true, returns focus to the datepicker / daterangepicker input after date selection
     * @type {?}
     */
    BsDatepickerConfig.prototype.returnFocusToInput;
    /**
     * CSS class which will be applied to datepicker container,
     * usually used to set color theme
     * @type {?}
     */
    BsDatepickerConfig.prototype.containerClass;
    /** @type {?} */
    BsDatepickerConfig.prototype.displayMonths;
    /**
     * Allows to hide week numbers in datepicker
     * @type {?}
     */
    BsDatepickerConfig.prototype.showWeekNumbers;
    /** @type {?} */
    BsDatepickerConfig.prototype.dateInputFormat;
    /** @type {?} */
    BsDatepickerConfig.prototype.rangeSeparator;
    /**
     * Date format for date range input field
     * @type {?}
     */
    BsDatepickerConfig.prototype.rangeInputFormat;
    /**
     * Predefined ranges
     * @type {?}
     */
    BsDatepickerConfig.prototype.ranges;
    /** @type {?} */
    BsDatepickerConfig.prototype.monthTitle;
    /** @type {?} */
    BsDatepickerConfig.prototype.yearTitle;
    /** @type {?} */
    BsDatepickerConfig.prototype.dayLabel;
    /** @type {?} */
    BsDatepickerConfig.prototype.monthLabel;
    /** @type {?} */
    BsDatepickerConfig.prototype.yearLabel;
    /** @type {?} */
    BsDatepickerConfig.prototype.weekNumbers;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class BsDatepickerAbstractComponent {
    constructor() {
        this.customRanges = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDate(value) {
        this._effects.setMinDate(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDate(value) {
        this._effects.setMaxDate(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set daysDisabled(value) {
        this._effects.setDaysDisabled(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set datesDisabled(value) {
        this._effects.setDatesDisabled(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set datesEnabled(value) {
        this._effects.setDatesEnabled(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isDisabled(value) {
        this._effects.setDisabled(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set dateCustomClasses(value) {
        this._effects.setDateCustomClasses(value);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setViewMode(event) { }
    /**
     * @param {?} event
     * @return {?}
     */
    navigateTo(event) { }
    /**
     * @param {?} event
     * @return {?}
     */
    dayHoverHandler(event) { }
    /**
     * @param {?} event
     * @return {?}
     */
    weekHoverHandler(event) { }
    /**
     * @param {?} event
     * @return {?}
     */
    monthHoverHandler(event) { }
    /**
     * @param {?} event
     * @return {?}
     */
    yearHoverHandler(event) { }
    /**
     * @param {?} day
     * @return {?}
     */
    daySelectHandler(day) { }
    /**
     * @param {?} event
     * @return {?}
     */
    monthSelectHandler(event) { }
    /**
     * @param {?} event
     * @return {?}
     */
    yearSelectHandler(event) { }
    /* tslint:disable-next-line: no-any */
    /**
     * @param {?} event
     * @return {?}
     */
    _stopPropagation(event) {
        event.stopPropagation();
    }
}
if (false) {
    /** @type {?} */
    BsDatepickerAbstractComponent.prototype.containerClass;
    /** @type {?} */
    BsDatepickerAbstractComponent.prototype.isOtherMonthsActive;
    /** @type {?} */
    BsDatepickerAbstractComponent.prototype._effects;
    /** @type {?} */
    BsDatepickerAbstractComponent.prototype.customRanges;
    /** @type {?} */
    BsDatepickerAbstractComponent.prototype.viewMode;
    /** @type {?} */
    BsDatepickerAbstractComponent.prototype.daysCalendar;
    /** @type {?} */
    BsDatepickerAbstractComponent.prototype.monthsCalendar;
    /** @type {?} */
    BsDatepickerAbstractComponent.prototype.yearsCalendar;
    /** @type {?} */
    BsDatepickerAbstractComponent.prototype.options;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDatepickerActions {
    /**
     * @return {?}
     */
    calculate() {
        return { type: BsDatepickerActions.CALCULATE };
    }
    /**
     * @return {?}
     */
    format() {
        return { type: BsDatepickerActions.FORMAT };
    }
    /**
     * @return {?}
     */
    flag() {
        return { type: BsDatepickerActions.FLAG };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    select(date) {
        return {
            type: BsDatepickerActions.SELECT,
            payload: date
        };
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeViewMode(event) {
        return {
            type: BsDatepickerActions.CHANGE_VIEWMODE,
            payload: event
        };
    }
    /**
     * @param {?} event
     * @return {?}
     */
    navigateTo(event) {
        return {
            type: BsDatepickerActions.NAVIGATE_TO,
            payload: event
        };
    }
    /**
     * @param {?} step
     * @return {?}
     */
    navigateStep(step) {
        return {
            type: BsDatepickerActions.NAVIGATE_OFFSET,
            payload: step
        };
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setOptions(options) {
        return {
            type: BsDatepickerActions.SET_OPTIONS,
            payload: options
        };
    }
    // date range picker
    /**
     * @param {?} value
     * @return {?}
     */
    selectRange(value) {
        return {
            type: BsDatepickerActions.SELECT_RANGE,
            payload: value
        };
    }
    /**
     * @param {?} event
     * @return {?}
     */
    hoverDay(event) {
        return {
            type: BsDatepickerActions.HOVER,
            payload: event.isHovered ? event.cell.date : null
        };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    minDate(date) {
        return {
            type: BsDatepickerActions.SET_MIN_DATE,
            payload: date
        };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    maxDate(date) {
        return {
            type: BsDatepickerActions.SET_MAX_DATE,
            payload: date
        };
    }
    /**
     * @param {?} days
     * @return {?}
     */
    daysDisabled(days) {
        return {
            type: BsDatepickerActions.SET_DAYSDISABLED,
            payload: days
        };
    }
    /**
     * @param {?} dates
     * @return {?}
     */
    datesDisabled(dates) {
        return {
            type: BsDatepickerActions.SET_DATESDISABLED,
            payload: dates
        };
    }
    /**
     * @param {?} dates
     * @return {?}
     */
    datesEnabled(dates) {
        return {
            type: BsDatepickerActions.SET_DATESENABLED,
            payload: dates
        };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isDisabled(value) {
        return {
            type: BsDatepickerActions.SET_IS_DISABLED,
            payload: value
        };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setDateCustomClasses(value) {
        return {
            type: BsDatepickerActions.SET_DATE_CUSTOM_CLASSES,
            payload: value
        };
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    setLocale(locale) {
        return {
            type: BsDatepickerActions.SET_LOCALE,
            payload: locale
        };
    }
}
BsDatepickerActions.ɵfac = function BsDatepickerActions_Factory(t) { return new (t || BsDatepickerActions)(); };
BsDatepickerActions.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: BsDatepickerActions, factory: BsDatepickerActions.ɵfac });
BsDatepickerActions.CALCULATE = '[datepicker] calculate dates matrix';
BsDatepickerActions.FORMAT = '[datepicker] format datepicker values';
BsDatepickerActions.FLAG = '[datepicker] set flags';
BsDatepickerActions.SELECT = '[datepicker] select date';
BsDatepickerActions.NAVIGATE_OFFSET = '[datepicker] shift view date';
BsDatepickerActions.NAVIGATE_TO = '[datepicker] change view date';
BsDatepickerActions.SET_OPTIONS = '[datepicker] update render options';
BsDatepickerActions.HOVER = '[datepicker] hover date';
BsDatepickerActions.CHANGE_VIEWMODE = '[datepicker] switch view mode';
BsDatepickerActions.SET_MIN_DATE = '[datepicker] set min date';
BsDatepickerActions.SET_MAX_DATE = '[datepicker] set max date';
BsDatepickerActions.SET_DAYSDISABLED = '[datepicker] set days disabled';
BsDatepickerActions.SET_DATESDISABLED = '[datepicker] set dates disabled';
BsDatepickerActions.SET_DATESENABLED = '[datepicker] set dates enabled';
BsDatepickerActions.SET_IS_DISABLED = '[datepicker] set is disabled';
BsDatepickerActions.SET_DATE_CUSTOM_CLASSES = '[datepicker] set date custom classes';
BsDatepickerActions.SET_LOCALE = '[datepicker] set datepicker locale';
BsDatepickerActions.SELECT_RANGE = '[daterangepicker] select dates range';
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDatepickerActions, [{
        type: Injectable
    }], null, null); })();
if (false) {
    /** @type {?} */
    BsDatepickerActions.CALCULATE;
    /** @type {?} */
    BsDatepickerActions.FORMAT;
    /** @type {?} */
    BsDatepickerActions.FLAG;
    /** @type {?} */
    BsDatepickerActions.SELECT;
    /** @type {?} */
    BsDatepickerActions.NAVIGATE_OFFSET;
    /** @type {?} */
    BsDatepickerActions.NAVIGATE_TO;
    /** @type {?} */
    BsDatepickerActions.SET_OPTIONS;
    /** @type {?} */
    BsDatepickerActions.HOVER;
    /** @type {?} */
    BsDatepickerActions.CHANGE_VIEWMODE;
    /** @type {?} */
    BsDatepickerActions.SET_MIN_DATE;
    /** @type {?} */
    BsDatepickerActions.SET_MAX_DATE;
    /** @type {?} */
    BsDatepickerActions.SET_DAYSDISABLED;
    /** @type {?} */
    BsDatepickerActions.SET_DATESDISABLED;
    /** @type {?} */
    BsDatepickerActions.SET_DATESENABLED;
    /** @type {?} */
    BsDatepickerActions.SET_IS_DISABLED;
    /** @type {?} */
    BsDatepickerActions.SET_DATE_CUSTOM_CLASSES;
    /** @type {?} */
    BsDatepickerActions.SET_LOCALE;
    /** @type {?} */
    BsDatepickerActions.SELECT_RANGE;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsLocaleService {
    constructor() {
        this._defaultLocale = 'en';
        this._locale = new BehaviorSubject(this._defaultLocale);
        this._localeChange = this._locale.asObservable();
    }
    /**
     * @return {?}
     */
    get locale() {
        return this._locale;
    }
    /**
     * @return {?}
     */
    get localeChange() {
        return this._localeChange;
    }
    /**
     * @return {?}
     */
    get currentLocale() {
        return this._locale.getValue();
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    use(locale) {
        if (locale === this.currentLocale) {
            return;
        }
        this._locale.next(locale);
    }
}
BsLocaleService.ɵfac = function BsLocaleService_Factory(t) { return new (t || BsLocaleService)(); };
BsLocaleService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: BsLocaleService, factory: BsLocaleService.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsLocaleService, [{
        type: Injectable
    }], function () { return []; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    BsLocaleService.prototype._defaultLocale;
    /**
     * @type {?}
     * @private
     */
    BsLocaleService.prototype._locale;
    /**
     * @type {?}
     * @private
     */
    BsLocaleService.prototype._localeChange;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDatepickerEffects {
    /**
     * @param {?} _actions
     * @param {?} _localeService
     */
    constructor(_actions, _localeService) {
        this._actions = _actions;
        this._localeService = _localeService;
        this._subs = [];
    }
    /**
     * @param {?} _bsDatepickerStore
     * @return {?}
     */
    init(_bsDatepickerStore) {
        this._store = _bsDatepickerStore;
        return this;
    }
    /**
     * setters
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        this._store.dispatch(this._actions.select(value));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setRangeValue(value) {
        this._store.dispatch(this._actions.selectRange(value));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setMinDate(value) {
        this._store.dispatch(this._actions.minDate(value));
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setMaxDate(value) {
        this._store.dispatch(this._actions.maxDate(value));
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setDaysDisabled(value) {
        this._store.dispatch(this._actions.daysDisabled(value));
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setDatesDisabled(value) {
        this._store.dispatch(this._actions.datesDisabled(value));
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setDatesEnabled(value) {
        this._store.dispatch(this._actions.datesEnabled(value));
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setDisabled(value) {
        this._store.dispatch(this._actions.isDisabled(value));
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setDateCustomClasses(value) {
        this._store.dispatch(this._actions.setDateCustomClasses(value));
        return this;
    }
    /* Set rendering options */
    /**
     * @param {?} _config
     * @return {?}
     */
    setOptions(_config) {
        /** @type {?} */
        const _options = Object.assign({ locale: this._localeService.currentLocale }, _config);
        this._store.dispatch(this._actions.setOptions(_options));
        return this;
    }
    /**
     * view to mode bindings
     * @param {?} container
     * @return {?}
     */
    setBindings(container) {
        container.daysCalendar = this._store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.flaggedMonths))
            .pipe(filter((/**
         * @param {?} months
         * @return {?}
         */
        months => !!months)));
        // month calendar
        container.monthsCalendar = this._store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.flaggedMonthsCalendar))
            .pipe(filter((/**
         * @param {?} months
         * @return {?}
         */
        months => !!months)));
        // year calendar
        container.yearsCalendar = this._store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.yearsCalendarFlagged))
            .pipe(filter((/**
         * @param {?} years
         * @return {?}
         */
        years => !!years)));
        container.viewMode = this._store.select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.view.mode));
        container.options = this._store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.showWeekNumbers))
            .pipe(map((/**
         * @param {?} showWeekNumbers
         * @return {?}
         */
        showWeekNumbers => ({ showWeekNumbers }))));
        return this;
    }
    /**
     * event handlers
     * @param {?} container
     * @return {?}
     */
    setEventHandlers(container) {
        container.setViewMode = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this._store.dispatch(this._actions.changeViewMode(event));
        });
        container.navigateTo = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this._store.dispatch(this._actions.navigateStep(event.step));
        });
        container.dayHoverHandler = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const _cell = (/** @type {?} */ (event.cell));
            if (_cell.isOtherMonth || _cell.isDisabled) {
                return;
            }
            this._store.dispatch(this._actions.hoverDay(event));
            _cell.isHovered = event.isHovered;
        });
        container.monthHoverHandler = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            event.cell.isHovered = event.isHovered;
        });
        container.yearHoverHandler = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            event.cell.isHovered = event.isHovered;
        });
        container.monthSelectHandler = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event.isDisabled) {
                return;
            }
            this._store.dispatch(this._actions.navigateTo({
                unit: {
                    month: getMonth(event.date),
                    year: getFullYear(event.date)
                },
                viewMode: 'day'
            }));
        });
        container.yearSelectHandler = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event.isDisabled) {
                return;
            }
            this._store.dispatch(this._actions.navigateTo({
                unit: {
                    year: getFullYear(event.date)
                },
                viewMode: 'month'
            }));
        });
        return this;
    }
    /**
     * @return {?}
     */
    registerDatepickerSideEffects() {
        this._subs.push(this._store.select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.view)).subscribe((/**
         * @param {?} view
         * @return {?}
         */
        view => {
            this._store.dispatch(this._actions.calculate());
        })));
        // format calendar values on month model change
        this._subs.push(this._store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.monthsModel))
            .pipe(filter((/**
         * @param {?} monthModel
         * @return {?}
         */
        monthModel => !!monthModel)))
            .subscribe((/**
         * @param {?} month
         * @return {?}
         */
        month => this._store.dispatch(this._actions.format()))));
        // flag day values
        this._subs.push(this._store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.formattedMonths))
            .pipe(filter((/**
         * @param {?} month
         * @return {?}
         */
        month => !!month)))
            .subscribe((/**
         * @param {?} month
         * @return {?}
         */
        month => this._store.dispatch(this._actions.flag()))));
        // flag day values
        this._subs.push(this._store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.selectedDate))
            .pipe(filter((/**
         * @param {?} selectedDate
         * @return {?}
         */
        selectedDate => !!selectedDate)))
            .subscribe((/**
         * @param {?} selectedDate
         * @return {?}
         */
        selectedDate => this._store.dispatch(this._actions.flag()))));
        // flag for date range picker
        this._subs.push(this._store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.selectedRange))
            .pipe(filter((/**
         * @param {?} selectedRange
         * @return {?}
         */
        selectedRange => !!selectedRange)))
            .subscribe((/**
         * @param {?} selectedRange
         * @return {?}
         */
        selectedRange => this._store.dispatch(this._actions.flag()))));
        // monthsCalendar
        this._subs.push(this._store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.monthsCalendar))
            .subscribe((/**
         * @return {?}
         */
        () => this._store.dispatch(this._actions.flag()))));
        // years calendar
        this._subs.push(this._store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.yearsCalendarModel))
            .pipe(filter((/**
         * @param {?} state
         * @return {?}
         */
        state => !!state)))
            .subscribe((/**
         * @return {?}
         */
        () => this._store.dispatch(this._actions.flag()))));
        // on hover
        this._subs.push(this._store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.hoveredDate))
            .pipe(filter((/**
         * @param {?} hoveredDate
         * @return {?}
         */
        hoveredDate => !!hoveredDate)))
            .subscribe((/**
         * @param {?} hoveredDate
         * @return {?}
         */
        hoveredDate => this._store.dispatch(this._actions.flag()))));
        // date custom classes
        this._subs.push(this._store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.dateCustomClasses))
            .pipe(filter((/**
         * @param {?} dateCustomClasses
         * @return {?}
         */
        dateCustomClasses => !!dateCustomClasses)))
            .subscribe((/**
         * @param {?} dateCustomClasses
         * @return {?}
         */
        dateCustomClasses => this._store.dispatch(this._actions.flag()))));
        // on locale change
        this._subs.push(this._localeService.localeChange
            .subscribe((/**
         * @param {?} locale
         * @return {?}
         */
        locale => this._store.dispatch(this._actions.setLocale(locale)))));
        return this;
    }
    /**
     * @return {?}
     */
    destroy() {
        for (const sub of this._subs) {
            sub.unsubscribe();
        }
    }
}
BsDatepickerEffects.ɵfac = function BsDatepickerEffects_Factory(t) { return new (t || BsDatepickerEffects)(ɵngcc0.ɵɵinject(BsDatepickerActions), ɵngcc0.ɵɵinject(BsLocaleService)); };
BsDatepickerEffects.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: BsDatepickerEffects, factory: BsDatepickerEffects.ɵfac });
/** @nocollapse */
BsDatepickerEffects.ctorParameters = () => [
    { type: BsDatepickerActions },
    { type: BsLocaleService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDatepickerEffects, [{
        type: Injectable
    }], function () { return [{ type: BsDatepickerActions }, { type: BsLocaleService }]; }, null); })();
if (false) {
    /** @type {?} */
    BsDatepickerEffects.prototype.viewMode;
    /** @type {?} */
    BsDatepickerEffects.prototype.daysCalendar;
    /** @type {?} */
    BsDatepickerEffects.prototype.monthsCalendar;
    /** @type {?} */
    BsDatepickerEffects.prototype.yearsCalendar;
    /** @type {?} */
    BsDatepickerEffects.prototype.options;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerEffects.prototype._store;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerEffects.prototype._subs;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerEffects.prototype._actions;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerEffects.prototype._localeService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const defaultMonthOptions = {
    width: 7,
    height: 6
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function BsDatepickerViewState() { }
if (false) {
    /** @type {?} */
    BsDatepickerViewState.prototype.date;
    /** @type {?} */
    BsDatepickerViewState.prototype.mode;
}
class BsDatepickerState {
}
if (false) {
    /** @type {?} */
    BsDatepickerState.prototype.selectedDate;
    /** @type {?} */
    BsDatepickerState.prototype.selectedRange;
    /** @type {?} */
    BsDatepickerState.prototype.view;
    /** @type {?} */
    BsDatepickerState.prototype.isDisabled;
    /** @type {?} */
    BsDatepickerState.prototype.minDate;
    /** @type {?} */
    BsDatepickerState.prototype.maxDate;
    /** @type {?} */
    BsDatepickerState.prototype.daysDisabled;
    /** @type {?} */
    BsDatepickerState.prototype.datesDisabled;
    /** @type {?} */
    BsDatepickerState.prototype.datesEnabled;
    /** @type {?} */
    BsDatepickerState.prototype.minMode;
    /** @type {?} */
    BsDatepickerState.prototype.dateCustomClasses;
    /** @type {?} */
    BsDatepickerState.prototype.hoveredDate;
    /** @type {?} */
    BsDatepickerState.prototype.hoveredMonth;
    /** @type {?} */
    BsDatepickerState.prototype.hoveredYear;
    /** @type {?} */
    BsDatepickerState.prototype.monthsModel;
    /** @type {?} */
    BsDatepickerState.prototype.formattedMonths;
    /** @type {?} */
    BsDatepickerState.prototype.flaggedMonths;
    /** @type {?} */
    BsDatepickerState.prototype.selectFromOtherMonth;
    /** @type {?} */
    BsDatepickerState.prototype.showPreviousMonth;
    /** @type {?} */
    BsDatepickerState.prototype.displayOneMonthRange;
    /** @type {?} */
    BsDatepickerState.prototype.monthsCalendar;
    /** @type {?} */
    BsDatepickerState.prototype.flaggedMonthsCalendar;
    /** @type {?} */
    BsDatepickerState.prototype.yearsCalendarModel;
    /** @type {?} */
    BsDatepickerState.prototype.yearsCalendarFlagged;
    /** @type {?} */
    BsDatepickerState.prototype.monthViewOptions;
    /** @type {?} */
    BsDatepickerState.prototype.showWeekNumbers;
    /** @type {?} */
    BsDatepickerState.prototype.displayMonths;
    /** @type {?} */
    BsDatepickerState.prototype.locale;
    /** @type {?} */
    BsDatepickerState.prototype.monthTitle;
    /** @type {?} */
    BsDatepickerState.prototype.yearTitle;
    /** @type {?} */
    BsDatepickerState.prototype.dayLabel;
    /** @type {?} */
    BsDatepickerState.prototype.monthLabel;
    /** @type {?} */
    BsDatepickerState.prototype.yearLabel;
    /** @type {?} */
    BsDatepickerState.prototype.weekNumbers;
}
/** @type {?} */
const _initialView = { date: new Date(), mode: 'day' };
/** @type {?} */
const initialDatepickerState = Object.assign(new BsDatepickerConfig(), {
    locale: 'en',
    view: _initialView,
    selectedRange: [],
    monthViewOptions: defaultMonthOptions
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} date
 * @param {?} options
 * @return {?}
 */
function getStartingDayOfCalendar(date, options) {
    if (isFirstDayOfWeek(date, options.firstDayOfWeek)) {
        return date;
    }
    /** @type {?} */
    const weekDay = getDay(date);
    /** @type {?} */
    const offset = calculateDateOffset(weekDay, options.firstDayOfWeek);
    return shiftDate(date, { day: -offset });
}
/**
 * @param {?} weekday
 * @param {?} startingDayOffset
 * @return {?}
 */
function calculateDateOffset(weekday, startingDayOffset) {
    if (startingDayOffset === 0) {
        return weekday;
    }
    /** @type {?} */
    const offset = weekday - startingDayOffset % 7;
    return offset < 0 ? offset + 7 : offset;
}
/**
 * @param {?} date
 * @param {?} min
 * @param {?} max
 * @return {?}
 */
function isMonthDisabled(date, min, max) {
    /** @type {?} */
    const minBound = min && isBefore(endOf(date, 'month'), min, 'day');
    /** @type {?} */
    const maxBound = max && isAfter(startOf(date, 'month'), max, 'day');
    return minBound || maxBound;
}
/**
 * @param {?} date
 * @param {?} min
 * @param {?} max
 * @return {?}
 */
function isYearDisabled(date, min, max) {
    /** @type {?} */
    const minBound = min && isBefore(endOf(date, 'year'), min, 'day');
    /** @type {?} */
    const maxBound = max && isAfter(startOf(date, 'year'), max, 'day');
    return minBound || maxBound;
}
/**
 * @param {?} date
 * @param {?} datesDisabled
 * @return {?}
 */
function isDisabledDate(date, datesDisabled) {
    if (!datesDisabled || !isArray(datesDisabled) || !datesDisabled.length) {
        return false;
    }
    return datesDisabled.some((/**
     * @param {?} dateDisabled
     * @return {?}
     */
    (dateDisabled) => isSame(date, dateDisabled, 'date')));
}
/**
 * @param {?} date
 * @param {?} datesEnabled
 * @return {?}
 */
function isEnabledDate(date, datesEnabled) {
    if (!datesEnabled || !isArray(datesEnabled) || !datesEnabled.length) {
        return false;
    }
    return !datesEnabled.some((/**
     * @param {?} enabledDate
     * @return {?}
     */
    (enabledDate) => isSame(date, enabledDate, 'date')));
}
/**
 * @param {?} state
 * @param {?=} calendarIndex
 * @return {?}
 */
function getYearsCalendarInitialDate(state, calendarIndex = 0) {
    /** @type {?} */
    const model = state && state.yearsCalendarModel && state.yearsCalendarModel[calendarIndex];
    return model && model.years && model.years[0] && model.years[0][0] && model.years[0][0].date;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function MatrixOptions() { }
if (false) {
    /** @type {?} */
    MatrixOptions.prototype.height;
    /** @type {?} */
    MatrixOptions.prototype.width;
    /** @type {?} */
    MatrixOptions.prototype.initialDate;
    /** @type {?} */
    MatrixOptions.prototype.shift;
}
/**
 * @template T
 * @param {?} options
 * @param {?} fn
 * @return {?}
 */
function createMatrix(options, fn) {
    /** @type {?} */
    let prevValue = options.initialDate;
    /** @type {?} */
    const matrix = new Array(options.height);
    for (let i = 0; i < options.height; i++) {
        matrix[i] = new Array(options.width);
        for (let j = 0; j < options.width; j++) {
            matrix[i][j] = fn(prevValue);
            prevValue = shiftDate(prevValue, options.shift);
        }
    }
    return matrix;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} startingDate
 * @param {?} options
 * @return {?}
 */
function calcDaysCalendar(startingDate, options) {
    /** @type {?} */
    const firstDay = getFirstDayOfMonth(startingDate);
    /** @type {?} */
    const initialDate = getStartingDayOfCalendar(firstDay, options);
    /** @type {?} */
    const matrixOptions = {
        width: options.width,
        height: options.height,
        initialDate,
        shift: { day: 1 }
    };
    /** @type {?} */
    const daysMatrix = createMatrix(matrixOptions, (/**
     * @param {?} date
     * @return {?}
     */
    date => date));
    return {
        daysMatrix,
        month: firstDay
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} daysCalendar
 * @param {?} formatOptions
 * @param {?} monthIndex
 * @return {?}
 */
function formatDaysCalendar(daysCalendar, formatOptions, monthIndex) {
    return {
        month: daysCalendar.month,
        monthTitle: formatDate(daysCalendar.month, formatOptions.monthTitle, formatOptions.locale),
        yearTitle: formatDate(daysCalendar.month, formatOptions.yearTitle, formatOptions.locale),
        weekNumbers: getWeekNumbers(daysCalendar.daysMatrix, formatOptions.weekNumbers, formatOptions.locale),
        weekdays: getShiftedWeekdays(formatOptions.locale),
        weeks: daysCalendar.daysMatrix.map((/**
         * @param {?} week
         * @param {?} weekIndex
         * @return {?}
         */
        (week, weekIndex) => ({
            days: week.map((/**
             * @param {?} date
             * @param {?} dayIndex
             * @return {?}
             */
            (date, dayIndex) => ({
                date,
                label: formatDate(date, formatOptions.dayLabel, formatOptions.locale),
                monthIndex,
                weekIndex,
                dayIndex
            })))
        })))
    };
}
/**
 * @param {?} daysMatrix
 * @param {?} format
 * @param {?} locale
 * @return {?}
 */
function getWeekNumbers(daysMatrix, format, locale) {
    return daysMatrix.map((/**
     * @param {?} days
     * @return {?}
     */
    (days) => (days[0] ? formatDate(days[0], format, locale) : '')));
}
/**
 * @param {?} locale
 * @return {?}
 */
function getShiftedWeekdays(locale) {
    /** @type {?} */
    const _locale = getLocale(locale);
    /** @type {?} */
    const weekdays = (/** @type {?} */ (_locale.weekdaysShort()));
    /** @type {?} */
    const firstDayOfWeek = _locale.firstDayOfWeek();
    return [...weekdays.slice(firstDayOfWeek), ...weekdays.slice(0, firstDayOfWeek)];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function FlagDaysCalendarOptions() { }
if (false) {
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.isDisabled;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.minDate;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.maxDate;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.daysDisabled;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.datesDisabled;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.datesEnabled;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.hoveredDate;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.selectedDate;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.selectedRange;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.displayMonths;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.monthIndex;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.dateCustomClasses;
}
/**
 * @param {?} formattedMonth
 * @param {?} options
 * @return {?}
 */
function flagDaysCalendar(formattedMonth, options) {
    formattedMonth.weeks.forEach((/**
     * @param {?} week
     * @return {?}
     */
    (week) => {
        /* tslint:disable-next-line: cyclomatic-complexity */
        week.days.forEach((/**
         * @param {?} day
         * @param {?} dayIndex
         * @return {?}
         */
        (day, dayIndex) => {
            // datepicker
            /** @type {?} */
            const isOtherMonth = !isSameMonth(day.date, formattedMonth.month);
            /** @type {?} */
            const isHovered = !isOtherMonth && isSameDay(day.date, options.hoveredDate);
            // date range picker
            /** @type {?} */
            const isSelectionStart = !isOtherMonth &&
                options.selectedRange &&
                isSameDay(day.date, options.selectedRange[0]);
            /** @type {?} */
            const isSelectionEnd = !isOtherMonth &&
                options.selectedRange &&
                isSameDay(day.date, options.selectedRange[1]);
            /** @type {?} */
            const isSelected = (!isOtherMonth && isSameDay(day.date, options.selectedDate)) ||
                isSelectionStart ||
                isSelectionEnd;
            /** @type {?} */
            const isInRange = !isOtherMonth &&
                options.selectedRange &&
                isDateInRange(day.date, options.selectedRange, options.hoveredDate);
            /** @type {?} */
            const isDisabled = options.isDisabled ||
                isBefore(day.date, options.minDate, 'day') ||
                isAfter(day.date, options.maxDate, 'day') ||
                isDisabledDay(day.date, options.daysDisabled) ||
                isDisabledDate(day.date, options.datesDisabled) ||
                isEnabledDate(day.date, options.datesEnabled);
            /** @type {?} */
            const currentDate = new Date();
            /** @type {?} */
            const isToday = !isOtherMonth && isSameDay(day.date, currentDate);
            /** @type {?} */
            const customClasses = options.dateCustomClasses && options.dateCustomClasses
                .map((/**
             * @param {?} dcc
             * @return {?}
             */
            dcc => isSameDay(day.date, dcc.date) ? dcc.classes : []))
                .reduce((/**
             * @param {?} previousValue
             * @param {?} currentValue
             * @return {?}
             */
            (previousValue, currentValue) => previousValue.concat(currentValue)), [])
                .join(' ')
                || '';
            // decide update or not
            /** @type {?} */
            const newDay = Object.assign({}, day, {
                isOtherMonth,
                isHovered,
                isSelected,
                isSelectionStart,
                isSelectionEnd,
                isInRange,
                isDisabled,
                isToday,
                customClasses
            });
            if (day.isOtherMonth !== newDay.isOtherMonth ||
                day.isHovered !== newDay.isHovered ||
                day.isSelected !== newDay.isSelected ||
                day.isSelectionStart !== newDay.isSelectionStart ||
                day.isSelectionEnd !== newDay.isSelectionEnd ||
                day.isDisabled !== newDay.isDisabled ||
                day.isInRange !== newDay.isInRange ||
                day.customClasses !== newDay.customClasses) {
                week.days[dayIndex] = newDay;
            }
        }));
    }));
    // todo: add check for linked calendars
    formattedMonth.hideLeftArrow =
        options.isDisabled ||
            (options.monthIndex > 0 && options.monthIndex !== options.displayMonths);
    formattedMonth.hideRightArrow =
        options.isDisabled ||
            (options.monthIndex < options.displayMonths &&
                options.monthIndex + 1 !== options.displayMonths);
    formattedMonth.disableLeftArrow = isMonthDisabled(shiftDate(formattedMonth.month, { month: -1 }), options.minDate, options.maxDate);
    formattedMonth.disableRightArrow = isMonthDisabled(shiftDate(formattedMonth.month, { month: 1 }), options.minDate, options.maxDate);
    return formattedMonth;
}
/**
 * @param {?} date
 * @param {?} selectedRange
 * @param {?} hoveredDate
 * @return {?}
 */
function isDateInRange(date, selectedRange, hoveredDate) {
    if (!date || !selectedRange[0]) {
        return false;
    }
    if (selectedRange[1]) {
        return date > selectedRange[0] && date <= selectedRange[1];
    }
    if (hoveredDate) {
        return date > selectedRange[0] && date <= hoveredDate;
    }
    return false;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} mode
 * @param {?=} minMode
 * @return {?}
 */
function canSwitchMode(mode, minMode) {
    return minMode ? mode >= minMode : true;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const height = 4;
/** @type {?} */
const width = 3;
/** @type {?} */
const shift = { month: 1 };
/**
 * @param {?} viewDate
 * @param {?} formatOptions
 * @return {?}
 */
function formatMonthsCalendar(viewDate, formatOptions) {
    /** @type {?} */
    const initialDate = startOf(viewDate, 'year');
    /** @type {?} */
    const matrixOptions = { width, height, initialDate, shift };
    /** @type {?} */
    const monthMatrix = createMatrix(matrixOptions, (/**
     * @param {?} date
     * @return {?}
     */
    date => ({
        date,
        label: formatDate(date, formatOptions.monthLabel, formatOptions.locale)
    })));
    return {
        months: monthMatrix,
        monthTitle: '',
        yearTitle: formatDate(viewDate, formatOptions.yearTitle, formatOptions.locale)
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function FlagMonthCalendarOptions() { }
if (false) {
    /** @type {?} */
    FlagMonthCalendarOptions.prototype.isDisabled;
    /** @type {?} */
    FlagMonthCalendarOptions.prototype.minDate;
    /** @type {?} */
    FlagMonthCalendarOptions.prototype.maxDate;
    /** @type {?} */
    FlagMonthCalendarOptions.prototype.hoveredMonth;
    /** @type {?} */
    FlagMonthCalendarOptions.prototype.selectedDate;
    /** @type {?} */
    FlagMonthCalendarOptions.prototype.displayMonths;
    /** @type {?} */
    FlagMonthCalendarOptions.prototype.monthIndex;
}
/**
 * @param {?} monthCalendar
 * @param {?} options
 * @return {?}
 */
function flagMonthsCalendar(monthCalendar, options) {
    monthCalendar.months.forEach((/**
     * @param {?} months
     * @param {?} rowIndex
     * @return {?}
     */
    (months, rowIndex) => {
        months.forEach((/**
         * @param {?} month
         * @param {?} monthIndex
         * @return {?}
         */
        (month, monthIndex) => {
            /** @type {?} */
            const isHovered = isSameMonth(month.date, options.hoveredMonth);
            /** @type {?} */
            const isDisabled = options.isDisabled ||
                isMonthDisabled(month.date, options.minDate, options.maxDate);
            /** @type {?} */
            const isSelected = isSameMonth(month.date, options.selectedDate);
            /** @type {?} */
            const newMonth = Object.assign(/*{},*/ month, {
                isHovered,
                isDisabled,
                isSelected
            });
            if (month.isHovered !== newMonth.isHovered ||
                month.isDisabled !== newMonth.isDisabled ||
                month.isSelected !== newMonth.isSelected) {
                monthCalendar.months[rowIndex][monthIndex] = newMonth;
            }
        }));
    }));
    // todo: add check for linked calendars
    monthCalendar.hideLeftArrow =
        options.monthIndex > 0 && options.monthIndex !== options.displayMonths;
    monthCalendar.hideRightArrow =
        options.monthIndex < options.displayMonths &&
            options.monthIndex + 1 !== options.displayMonths;
    monthCalendar.disableLeftArrow = isYearDisabled(shiftDate(monthCalendar.months[0][0].date, { year: -1 }), options.minDate, options.maxDate);
    monthCalendar.disableRightArrow = isYearDisabled(shiftDate(monthCalendar.months[0][0].date, { year: 1 }), options.minDate, options.maxDate);
    return monthCalendar;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const height$1 = 4;
/** @type {?} */
const width$1 = 4;
/** @type {?} */
const yearsPerCalendar = height$1 * width$1;
/** @type {?} */
const initialYearShift = (Math.floor(yearsPerCalendar / 2) - 1) * -1;
/** @type {?} */
const shift$1 = { year: 1 };
/**
 * @param {?} viewDate
 * @param {?} formatOptions
 * @param {?=} previousInitialDate
 * @return {?}
 */
function formatYearsCalendar(viewDate, formatOptions, previousInitialDate) {
    /** @type {?} */
    const initialDate = calculateInitialDate(viewDate, previousInitialDate);
    /** @type {?} */
    const matrixOptions = { width: width$1, height: height$1, initialDate, shift: shift$1 };
    /** @type {?} */
    const yearsMatrix = createMatrix(matrixOptions, (/**
     * @param {?} date
     * @return {?}
     */
    date => ({
        date,
        label: formatDate(date, formatOptions.yearLabel, formatOptions.locale)
    })));
    /** @type {?} */
    const yearTitle = formatYearRangeTitle(yearsMatrix, formatOptions);
    return {
        years: yearsMatrix,
        monthTitle: '',
        yearTitle
    };
}
/**
 * @param {?} viewDate
 * @param {?=} previousInitialDate
 * @return {?}
 */
function calculateInitialDate(viewDate, previousInitialDate) {
    if (previousInitialDate
        && viewDate.getFullYear() >= previousInitialDate.getFullYear()
        && viewDate.getFullYear() < previousInitialDate.getFullYear() + yearsPerCalendar) {
        return previousInitialDate;
    }
    return shiftDate(viewDate, { year: initialYearShift });
}
/**
 * @param {?} yearsMatrix
 * @param {?} formatOptions
 * @return {?}
 */
function formatYearRangeTitle(yearsMatrix, formatOptions) {
    /** @type {?} */
    const from = formatDate(yearsMatrix[0][0].date, formatOptions.yearTitle, formatOptions.locale);
    /** @type {?} */
    const to = formatDate(yearsMatrix[height$1 - 1][width$1 - 1].date, formatOptions.yearTitle, formatOptions.locale);
    return `${from} - ${to}`;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function FlagYearsCalendarOptions() { }
if (false) {
    /** @type {?} */
    FlagYearsCalendarOptions.prototype.isDisabled;
    /** @type {?} */
    FlagYearsCalendarOptions.prototype.minDate;
    /** @type {?} */
    FlagYearsCalendarOptions.prototype.maxDate;
    /** @type {?} */
    FlagYearsCalendarOptions.prototype.hoveredYear;
    /** @type {?} */
    FlagYearsCalendarOptions.prototype.selectedDate;
    /** @type {?} */
    FlagYearsCalendarOptions.prototype.displayMonths;
    /** @type {?} */
    FlagYearsCalendarOptions.prototype.yearIndex;
}
/**
 * @param {?} yearsCalendar
 * @param {?} options
 * @return {?}
 */
function flagYearsCalendar(yearsCalendar, options) {
    yearsCalendar.years.forEach((/**
     * @param {?} years
     * @param {?} rowIndex
     * @return {?}
     */
    (years, rowIndex) => {
        years.forEach((/**
         * @param {?} year
         * @param {?} yearIndex
         * @return {?}
         */
        (year, yearIndex) => {
            /** @type {?} */
            const isHovered = isSameYear(year.date, options.hoveredYear);
            /** @type {?} */
            const isDisabled = options.isDisabled ||
                isYearDisabled(year.date, options.minDate, options.maxDate);
            /** @type {?} */
            const isSelected = isSameYear(year.date, options.selectedDate);
            /** @type {?} */
            const newMonth = Object.assign(/*{},*/ year, { isHovered, isDisabled, isSelected });
            if (year.isHovered !== newMonth.isHovered ||
                year.isDisabled !== newMonth.isDisabled ||
                year.isSelected !== newMonth.isSelected) {
                yearsCalendar.years[rowIndex][yearIndex] = newMonth;
            }
        }));
    }));
    // todo: add check for linked calendars
    yearsCalendar.hideLeftArrow =
        options.yearIndex > 0 && options.yearIndex !== options.displayMonths;
    yearsCalendar.hideRightArrow =
        options.yearIndex < options.displayMonths &&
            options.yearIndex + 1 !== options.displayMonths;
    yearsCalendar.disableLeftArrow = isYearDisabled(shiftDate(yearsCalendar.years[0][0].date, { year: -1 }), options.minDate, options.maxDate);
    /** @type {?} */
    const i = yearsCalendar.years.length - 1;
    /** @type {?} */
    const j = yearsCalendar.years[i].length - 1;
    yearsCalendar.disableRightArrow = isYearDisabled(shiftDate(yearsCalendar.years[i][j].date, { year: 1 }), options.minDate, options.maxDate);
    return yearsCalendar;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable-next-line: cyclomatic-complexity */
/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function bsDatepickerReducer(state = initialDatepickerState, action) {
    switch (action.type) {
        case BsDatepickerActions.CALCULATE: {
            return calculateReducer(state);
        }
        case BsDatepickerActions.FORMAT: {
            return formatReducer(state, action);
        }
        case BsDatepickerActions.FLAG: {
            return flagReducer(state, action);
        }
        case BsDatepickerActions.NAVIGATE_OFFSET: {
            return navigateOffsetReducer(state, action);
        }
        case BsDatepickerActions.NAVIGATE_TO: {
            /** @type {?} */
            const payload = action.payload;
            /** @type {?} */
            const date = setFullDate(state.view.date, payload.unit);
            /** @type {?} */
            let newState;
            /** @type {?} */
            let mode;
            if (canSwitchMode(payload.viewMode, state.minMode)) {
                mode = payload.viewMode;
                newState = { view: { date, mode } };
            }
            else {
                mode = state.view.mode;
                newState = { selectedDate: date, view: { date, mode } };
            }
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.CHANGE_VIEWMODE: {
            if (!canSwitchMode(action.payload, state.minMode)) {
                return state;
            }
            /** @type {?} */
            const date = state.view.date;
            /** @type {?} */
            const mode = action.payload;
            /** @type {?} */
            const newState = { view: { date, mode } };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.HOVER: {
            return Object.assign({}, state, { hoveredDate: action.payload });
        }
        case BsDatepickerActions.SELECT: {
            /** @type {?} */
            const newState = {
                selectedDate: action.payload,
                view: state.view
            };
            /** @type {?} */
            const mode = state.view.mode;
            /** @type {?} */
            const _date = action.payload || state.view.date;
            /** @type {?} */
            const date = getViewDate(_date, state.minDate, state.maxDate);
            newState.view = { mode, date };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.SET_OPTIONS: {
            /** @type {?} */
            const newState = action.payload;
            // preserve view mode
            /** @type {?} */
            const mode = newState.minMode ? newState.minMode : state.view.mode;
            /** @type {?} */
            const _viewDate = isDateValid(newState.value) && newState.value
                || isArray(newState.value) && isDateValid(newState.value[0]) && newState.value[0]
                || state.view.date;
            /** @type {?} */
            const date = getViewDate(_viewDate, newState.minDate, newState.maxDate);
            newState.view = { mode, date };
            // update selected value
            if (newState.value) {
                // if new value is array we work with date range
                if (isArray(newState.value)) {
                    newState.selectedRange = newState.value;
                }
                // if new value is a date -> datepicker
                if (newState.value instanceof Date) {
                    newState.selectedDate = newState.value;
                }
                // provided value is not supported :)
                // need to report it somehow
            }
            return Object.assign({}, state, newState);
        }
        // date range picker
        case BsDatepickerActions.SELECT_RANGE: {
            /** @type {?} */
            const newState = {
                selectedRange: action.payload,
                view: state.view
            };
            /** @type {?} */
            const mode = state.view.mode;
            /** @type {?} */
            const _date = action.payload && action.payload[0] || state.view.date;
            /** @type {?} */
            const date = getViewDate(_date, state.minDate, state.maxDate);
            newState.view = { mode, date };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.SET_MIN_DATE: {
            return Object.assign({}, state, {
                minDate: action.payload
            });
        }
        case BsDatepickerActions.SET_MAX_DATE: {
            return Object.assign({}, state, {
                maxDate: action.payload
            });
        }
        case BsDatepickerActions.SET_IS_DISABLED: {
            return Object.assign({}, state, {
                isDisabled: action.payload
            });
        }
        case BsDatepickerActions.SET_DATE_CUSTOM_CLASSES: {
            return Object.assign({}, state, {
                dateCustomClasses: action.payload
            });
        }
        default:
            return state;
    }
}
/**
 * @param {?} state
 * @return {?}
 */
function calculateReducer(state) {
    // how many calendars
    /** @type {?} */
    const displayMonths = (state.displayOneMonthRange &&
        isDisplayOneMonth(state.view.date, state.minDate, state.maxDate)) ? 1 : state.displayMonths;
    // use selected date on initial rendering if set
    /** @type {?} */
    let viewDate = state.view.date;
    if (state.view.mode === 'day') {
        if (state.showPreviousMonth && state.selectedRange.length === 0) {
            viewDate = shiftDate(viewDate, { month: -1 });
        }
        state.monthViewOptions.firstDayOfWeek = getLocale(state.locale).firstDayOfWeek();
        /** @type {?} */
        const monthsModel = new Array(displayMonths);
        for (let monthIndex = 0; monthIndex < displayMonths; monthIndex++) {
            // todo: for unlinked calendars it will be harder
            monthsModel[monthIndex] = calcDaysCalendar(viewDate, state.monthViewOptions);
            viewDate = shiftDate(viewDate, { month: 1 });
        }
        return Object.assign({}, state, { monthsModel });
    }
    if (state.view.mode === 'month') {
        /** @type {?} */
        const monthsCalendar = new Array(displayMonths);
        for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            monthsCalendar[calendarIndex] = formatMonthsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: 1 });
        }
        return Object.assign({}, state, { monthsCalendar });
    }
    if (state.view.mode === 'year') {
        /** @type {?} */
        const yearsCalendarModel = new Array(displayMonths);
        for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            yearsCalendarModel[calendarIndex] = formatYearsCalendar(viewDate, getFormatOptions(state), state.minMode === 'year' ? getYearsCalendarInitialDate(state, calendarIndex) : undefined);
            viewDate = shiftDate(viewDate, { year: yearsPerCalendar });
        }
        return Object.assign({}, state, { yearsCalendarModel });
    }
    return state;
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function formatReducer(state, action) {
    if (state.view.mode === 'day') {
        /** @type {?} */
        const formattedMonths = state.monthsModel.map((/**
         * @param {?} month
         * @param {?} monthIndex
         * @return {?}
         */
        (month, monthIndex) => formatDaysCalendar(month, getFormatOptions(state), monthIndex)));
        return Object.assign({}, state, { formattedMonths });
    }
    // how many calendars
    /** @type {?} */
    const displayMonths = state.displayMonths;
    // check initial rendering
    // use selected date on initial rendering if set
    /** @type {?} */
    let viewDate = state.view.date;
    if (state.view.mode === 'month') {
        /** @type {?} */
        const monthsCalendar = new Array(displayMonths);
        for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            monthsCalendar[calendarIndex] = formatMonthsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: 1 });
        }
        return Object.assign({}, state, { monthsCalendar });
    }
    if (state.view.mode === 'year') {
        /** @type {?} */
        const yearsCalendarModel = new Array(displayMonths);
        for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            yearsCalendarModel[calendarIndex] = formatYearsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: 16 });
        }
        return Object.assign({}, state, { yearsCalendarModel });
    }
    return state;
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function flagReducer(state, action) {
    /** @type {?} */
    const displayMonths = isDisplayOneMonth(state.view.date, state.minDate, state.maxDate) ? 1 : state.displayMonths;
    if (state.view.mode === 'day') {
        /** @type {?} */
        const flaggedMonths = state.formattedMonths.map((/**
         * @param {?} formattedMonth
         * @param {?} monthIndex
         * @return {?}
         */
        (formattedMonth, monthIndex) => flagDaysCalendar(formattedMonth, {
            isDisabled: state.isDisabled,
            minDate: state.minDate,
            maxDate: state.maxDate,
            daysDisabled: state.daysDisabled,
            datesDisabled: state.datesDisabled,
            datesEnabled: state.datesEnabled,
            hoveredDate: state.hoveredDate,
            selectedDate: state.selectedDate,
            selectedRange: state.selectedRange,
            displayMonths,
            dateCustomClasses: state.dateCustomClasses,
            monthIndex
        })));
        return Object.assign({}, state, { flaggedMonths });
    }
    if (state.view.mode === 'month') {
        /** @type {?} */
        const flaggedMonthsCalendar = state.monthsCalendar.map((/**
         * @param {?} formattedMonth
         * @param {?} monthIndex
         * @return {?}
         */
        (formattedMonth, monthIndex) => flagMonthsCalendar(formattedMonth, {
            isDisabled: state.isDisabled,
            minDate: state.minDate,
            maxDate: state.maxDate,
            hoveredMonth: state.hoveredMonth,
            selectedDate: state.selectedDate,
            displayMonths,
            monthIndex
        })));
        return Object.assign({}, state, { flaggedMonthsCalendar });
    }
    if (state.view.mode === 'year') {
        /** @type {?} */
        const yearsCalendarFlagged = state.yearsCalendarModel.map((/**
         * @param {?} formattedMonth
         * @param {?} yearIndex
         * @return {?}
         */
        (formattedMonth, yearIndex) => flagYearsCalendar(formattedMonth, {
            isDisabled: state.isDisabled,
            minDate: state.minDate,
            maxDate: state.maxDate,
            hoveredYear: state.hoveredYear,
            selectedDate: state.selectedDate,
            displayMonths,
            yearIndex
        })));
        return Object.assign({}, state, { yearsCalendarFlagged });
    }
    return state;
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function navigateOffsetReducer(state, action) {
    /** @type {?} */
    const newState = {
        view: {
            mode: state.view.mode,
            date: shiftViewDate(state, action)
        }
    };
    return Object.assign({}, state, newState);
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function shiftViewDate(state, action) {
    if (state.view.mode === 'year' && state.minMode === 'year') {
        /** @type {?} */
        const initialDate = getYearsCalendarInitialDate(state, 0);
        /** @type {?} */
        const middleDate = shiftDate(initialDate, { year: -initialYearShift });
        return shiftDate(middleDate, action.payload);
    }
    return shiftDate(startOf(state.view.date, 'month'), action.payload);
}
/**
 * @param {?} state
 * @return {?}
 */
function getFormatOptions(state) {
    return {
        locale: state.locale,
        monthTitle: state.monthTitle,
        yearTitle: state.yearTitle,
        dayLabel: state.dayLabel,
        monthLabel: state.monthLabel,
        yearLabel: state.yearLabel,
        weekNumbers: state.weekNumbers
    };
}
/**
 * if view date is provided (bsValue|ngModel) it should be shown
 * if view date is not provider:
 * if minDate>currentDate (default view value), show minDate
 * if maxDate<currentDate(default view value) show maxDate
 * @param {?} viewDate
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function getViewDate(viewDate, minDate, maxDate) {
    /** @type {?} */
    const _date = Array.isArray(viewDate) ? viewDate[0] : viewDate;
    if (minDate && isAfter(minDate, _date, 'day')) {
        return minDate;
    }
    if (maxDate && isBefore(maxDate, _date, 'day')) {
        return maxDate;
    }
    return _date;
}
/**
 * @param {?} viewDate
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function isDisplayOneMonth(viewDate, minDate, maxDate) {
    if (maxDate && isSame(maxDate, viewDate, 'day')) {
        return true;
    }
    if (minDate && maxDate && minDate.getMonth() === maxDate.getMonth()) {
        return true;
    }
    return false;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDatepickerStore extends MiniStore {
    constructor() {
        /** @type {?} */
        const _dispatcher = new BehaviorSubject({
            type: '[datepicker] dispatcher init'
        });
        /** @type {?} */
        const state = new MiniState(initialDatepickerState, _dispatcher, bsDatepickerReducer);
        super(_dispatcher, bsDatepickerReducer, state);
    }
}
BsDatepickerStore.ɵfac = function BsDatepickerStore_Factory(t) { return new (t || BsDatepickerStore)(); };
BsDatepickerStore.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: BsDatepickerStore, factory: BsDatepickerStore.ɵfac });
/** @nocollapse */
BsDatepickerStore.ctorParameters = () => [];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDatepickerStore, [{
        type: Injectable
    }], function () { return []; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DATEPICKER_ANIMATION_TIMING = '220ms cubic-bezier(0, 0, 0.2, 1)';
/** @type {?} */
const datepickerAnimation = trigger('datepickerAnimation', [
    state('animated-down', style({ height: '*', overflow: 'hidden' })),
    transition('* => animated-down', [
        style({ height: 0, overflow: 'hidden' }),
        animate(DATEPICKER_ANIMATION_TIMING)
    ]),
    state('animated-up', style({ height: '*', overflow: 'hidden' })),
    transition('* => animated-up', [
        style({ height: '*', overflow: 'hidden' }),
        animate(DATEPICKER_ANIMATION_TIMING)
    ]),
    transition('* => unanimated', animate('0s'))
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDatepickerContainerComponent extends BsDatepickerAbstractComponent {
    /**
     * @param {?} _renderer
     * @param {?} _config
     * @param {?} _store
     * @param {?} _element
     * @param {?} _actions
     * @param {?} _effects
     * @param {?} _positionService
     */
    constructor(_renderer, _config, _store, _element, _actions, _effects, _positionService) {
        super();
        this._config = _config;
        this._store = _store;
        this._element = _element;
        this._actions = _actions;
        this._positionService = _positionService;
        this.valueChange = new EventEmitter();
        this.animationState = 'void';
        this._subs = [];
        this._effects = _effects;
        _renderer.setStyle(_element.nativeElement, 'display', 'block');
        _renderer.setStyle(_element.nativeElement, 'position', 'absolute');
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._effects.setValue(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._positionService.setOptions({
            modifiers: { flip: { enabled: this._config.adaptivePosition } },
            allowedPositions: ['top', 'bottom']
        });
        this._positionService.event$
            .pipe(take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._positionService.disable();
            if (this._config.isAnimated) {
                this.animationState = this.isTopPosition ? 'animated-up' : 'animated-down';
                return;
            }
            this.animationState = 'unanimated';
        }));
        this.isOtherMonthsActive = this._config.selectFromOtherMonth;
        this.containerClass = this._config.containerClass;
        this._effects
            .init(this._store)
            // intial state options
            .setOptions(this._config)
            // data binding view --> model
            .setBindings(this)
            // set event handlers
            .setEventHandlers(this)
            .registerDatepickerSideEffects();
        // todo: move it somewhere else
        // on selected date change
        this._subs.push(this._store
            /* tslint:disable-next-line: no-any */
            .select((/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.selectedDate))
            /* tslint:disable-next-line: no-any */
            .subscribe((/**
         * @param {?} date
         * @return {?}
         */
        (date) => this.valueChange.emit(date))));
    }
    /**
     * @return {?}
     */
    get isTopPosition() {
        return this._element.nativeElement.classList.contains('top');
    }
    /**
     * @return {?}
     */
    positionServiceEnable() {
        this._positionService.enable();
    }
    /**
     * @param {?} day
     * @return {?}
     */
    daySelectHandler(day) {
        if (!day) {
            return;
        }
        /** @type {?} */
        const isDisabled = this.isOtherMonthsActive ? day.isDisabled : (day.isOtherMonth || day.isDisabled);
        if (isDisabled) {
            return;
        }
        this._store.dispatch(this._actions.select(day.date));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        for (const sub of this._subs) {
            sub.unsubscribe();
        }
        this._effects.destroy();
    }
}
BsDatepickerContainerComponent.ɵfac = function BsDatepickerContainerComponent_Factory(t) { return new (t || BsDatepickerContainerComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(BsDatepickerConfig), ɵngcc0.ɵɵdirectiveInject(BsDatepickerStore), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(BsDatepickerActions), ɵngcc0.ɵɵdirectiveInject(BsDatepickerEffects), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.PositioningService)); };
BsDatepickerContainerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BsDatepickerContainerComponent, selectors: [["bs-datepicker-container"]], hostAttrs: ["role", "dialog", "aria-label", "calendar", 1, "bottom"], hostBindings: function BsDatepickerContainerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function BsDatepickerContainerComponent_click_HostBindingHandler($event) { return ctx._stopPropagation($event); });
    } }, features: [ɵngcc0.ɵɵProvidersFeature([BsDatepickerStore, BsDatepickerEffects]), ɵngcc0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["class", "bs-datepicker", 3, "ngClass", 4, "ngIf"], [1, "bs-datepicker", 3, "ngClass"], [1, "bs-datepicker-container"], ["role", "application", 1, "bs-calendar-container", 3, "ngSwitch"], ["class", "bs-media-container", 4, "ngSwitchCase"], ["class", "bs-datepicker-buttons", 4, "ngIf"], ["class", "bs-datepicker-custom-range", 4, "ngIf"], [1, "bs-media-container"], [3, "bs-datepicker-multiple", "calendar", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", 4, "ngFor", "ngForOf"], [3, "calendar", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect"], [3, "bs-datepicker-multiple", "calendar", "onNavigate", "onViewMode", "onHover", "onSelect", 4, "ngFor", "ngForOf"], [3, "calendar", "onNavigate", "onViewMode", "onHover", "onSelect"], [1, "bs-datepicker-buttons"], ["type", "button", 1, "btn", "btn-success"], ["type", "button", 1, "btn", "btn-default"], [1, "bs-datepicker-custom-range"], [3, "selectedRange", "ranges", "onSelect"]], template: function BsDatepickerContainerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, BsDatepickerContainerComponent_div_0_Template, 9, 10, "div", 0);
        ɵngcc0.ɵɵpipe(1, "async");
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ɵngcc0.ɵɵpipeBind1(1, 1, ctx.viewMode));
    } }, directives: function () { return [ɵngcc2.NgIf, ɵngcc2.NgClass, ɵngcc2.NgSwitch, ɵngcc2.NgSwitchCase, ɵngcc2.NgForOf, BsDaysCalendarViewComponent, BsMonthCalendarViewComponent, BsYearsCalendarViewComponent, BsCustomDatesViewComponent]; }, pipes: function () { return [ɵngcc2.AsyncPipe]; }, encapsulation: 2, data: { animation: [datepickerAnimation] } });
/** @nocollapse */
BsDatepickerContainerComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: BsDatepickerConfig },
    { type: BsDatepickerStore },
    { type: ElementRef },
    { type: BsDatepickerActions },
    { type: BsDatepickerEffects },
    { type: PositioningService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDatepickerContainerComponent, [{
        type: Component,
        args: [{
                selector: 'bs-datepicker-container',
                providers: [BsDatepickerStore, BsDatepickerEffects],
                template: "<!-- days calendar view mode -->\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\n  <div class=\"bs-datepicker-container\"\n    [@datepickerAnimation]=\"animationState\"\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\n    <!--calendars-->\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\n      <!--days calendar-->\n      <div *ngSwitchCase=\"'day'\" class=\"bs-media-container\">\n        <bs-days-calendar-view\n          *ngFor=\"let calendar of daysCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          [options]=\"options | async\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"dayHoverHandler($event)\"\n          (onHoverWeek)=\"weekHoverHandler($event)\"\n          (onSelect)=\"daySelectHandler($event)\">\n        </bs-days-calendar-view>\n      </div>\n\n      <!--months calendar-->\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\n        <bs-month-calendar-view\n          *ngFor=\"let calendar of monthsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"monthHoverHandler($event)\"\n          (onSelect)=\"monthSelectHandler($event)\">\n        </bs-month-calendar-view>\n      </div>\n\n      <!--years calendar-->\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\n        <bs-years-calendar-view\n          *ngFor=\"let calendar of yearsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"yearHoverHandler($event)\"\n          (onSelect)=\"yearSelectHandler($event)\">\n        </bs-years-calendar-view>\n      </div>\n    </div>\n\n    <!--applycancel buttons-->\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\n      <button class=\"btn btn-success\" type=\"button\">Apply</button>\n      <button class=\"btn btn-default\" type=\"button\">Cancel</button>\n    </div>\n  </div>\n\n  <!--custom dates or date ranges picker-->\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"customRanges?.length > 0\">\n    <bs-custom-date-view \n      [selectedRange]=\"chosenRange\" \n      [ranges]=\"customRanges\"\n      (onSelect)=\"setRangeOnCalendar($event)\">\n    </bs-custom-date-view>\n  </div>\n</div>\n",
                host: {
                    class: 'bottom',
                    '(click)': '_stopPropagation($event)',
                    role: 'dialog',
                    'aria-label': 'calendar'
                },
                animations: [datepickerAnimation]
            }]
    }], function () { return [{ type: ɵngcc0.Renderer2 }, { type: BsDatepickerConfig }, { type: BsDatepickerStore }, { type: ɵngcc0.ElementRef }, { type: BsDatepickerActions }, { type: BsDatepickerEffects }, { type: ɵngcc1.PositioningService }]; }, null); })();
if (false) {
    /** @type {?} */
    BsDatepickerContainerComponent.prototype.valueChange;
    /** @type {?} */
    BsDatepickerContainerComponent.prototype.animationState;
    /** @type {?} */
    BsDatepickerContainerComponent.prototype._subs;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._config;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._store;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._element;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._actions;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._positionService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDatepickerDirective {
    /**
     * @param {?} _config
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _viewContainerRef
     * @param {?} cis
     */
    constructor(_config, _elementRef, _renderer, _viewContainerRef, cis) {
        this._config = _config;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         * Placement of a datepicker. Accepts: "top", "bottom", "left", "right"
         */
        this.placement = 'bottom';
        /**
         * Specifies events that should trigger. Supports a space separated list of
         * event names.
         */
        this.triggers = 'click';
        /**
         * Close datepicker on outside click
         */
        this.outsideClick = true;
        /**
         * A selector specifying the element the datepicker should be appended to.
         */
        this.container = 'body';
        this.outsideEsc = true;
        /**
         * Emits when datepicker value has been changed
         */
        this.bsValueChange = new EventEmitter();
        this._subs = [];
        // todo: assign only subset of fields
        Object.assign(this, this._config);
        this._datepicker = cis.createLoader(_elementRef, _viewContainerRef, _renderer);
        this.onShown = this._datepicker.onShown;
        this.onHidden = this._datepicker.onHidden;
        this.isOpen$ = new BehaviorSubject(this.isOpen);
    }
    /**
     * Returns whether or not the datepicker is currently being shown
     * @return {?}
     */
    get isOpen() {
        return this._datepicker.isShown;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) {
        this.isOpen$.next(value);
    }
    /**
     * Initial value of datepicker
     * @param {?} value
     * @return {?}
     */
    set bsValue(value) {
        if (this._bsValue && value && this._bsValue.getTime() === value.getTime()) {
            return;
        }
        this._bsValue = value;
        this.bsValueChange.emit(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isDestroy$ = new Subject();
        this._datepicker.listen({
            outsideClick: this.outsideClick,
            outsideEsc: this.outsideEsc,
            triggers: this.triggers,
            show: (/**
             * @return {?}
             */
            () => this.show())
        });
        this.setConfig();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._datepickerRef || !this._datepickerRef.instance) {
            return;
        }
        if (changes.minDate) {
            this._datepickerRef.instance.minDate = this.minDate;
        }
        if (changes.maxDate) {
            this._datepickerRef.instance.maxDate = this.maxDate;
        }
        if (changes.daysDisabled) {
            this._datepickerRef.instance.daysDisabled = this.daysDisabled;
        }
        if (changes.datesDisabled) {
            this._datepickerRef.instance.datesDisabled = this.datesDisabled;
        }
        if (changes.datesEnabled) {
            this._datepickerRef.instance.datesEnabled = this.datesEnabled;
        }
        if (changes.isDisabled) {
            this._datepickerRef.instance.isDisabled = this.isDisabled;
        }
        if (changes.dateCustomClasses) {
            this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.isOpen$.pipe(filter((/**
         * @param {?} isOpen
         * @return {?}
         */
        isOpen => isOpen !== this.isOpen)), takeUntil(this.isDestroy$))
            .subscribe((/**
         * @return {?}
         */
        () => this.toggle()));
    }
    /**
     * Opens an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     * @return {?}
     */
    show() {
        if (this._datepicker.isShown) {
            return;
        }
        this.setConfig();
        this._datepickerRef = this._datepicker
            .provide({ provide: BsDatepickerConfig, useValue: this._config })
            .attach(BsDatepickerContainerComponent)
            .to(this.container)
            .position({ attachment: this.placement })
            .show({ placement: this.placement });
        // if date changes from external source (model -> view)
        this._subs.push(this.bsValueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this._datepickerRef.instance.value = value;
        })));
        // if date changes from picker (view -> model)
        this._subs.push(this._datepickerRef.instance.valueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this.bsValue = value;
            this.hide();
        })));
    }
    /**
     * Closes an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     * @return {?}
     */
    hide() {
        if (this.isOpen) {
            this._datepicker.hide();
        }
        for (const sub of this._subs) {
            sub.unsubscribe();
        }
        if (this._config.returnFocusToInput) {
            this._renderer.selectRootElement(this._elementRef.nativeElement).focus();
        }
    }
    /**
     * Toggles an element’s datepicker. This is considered a “manual” triggering
     * of the datepicker.
     * @return {?}
     */
    toggle() {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    }
    /**
     * Set config for datepicker
     * @return {?}
     */
    setConfig() {
        this._config = Object.assign({}, this._config, this.bsConfig, {
            value: this._bsValue,
            isDisabled: this.isDisabled,
            minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
            maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
            daysDisabled: this.daysDisabled || this.bsConfig && this.bsConfig.daysDisabled,
            dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
            datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
            datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled,
            minMode: this.minMode || this.bsConfig && this.bsConfig.minMode
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._datepicker.dispose();
        this.isOpen$.next(false);
        if (this.isDestroy$) {
            this.isDestroy$.next();
            this.isDestroy$.complete();
        }
    }
}
BsDatepickerDirective.ɵfac = function BsDatepickerDirective_Factory(t) { return new (t || BsDatepickerDirective)(ɵngcc0.ɵɵdirectiveInject(BsDatepickerConfig), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ViewContainerRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc3.ComponentLoaderFactory)); };
BsDatepickerDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: BsDatepickerDirective, selectors: [["", "bsDatepicker", ""]], inputs: { placement: "placement", triggers: "triggers", outsideClick: "outsideClick", container: "container", outsideEsc: "outsideEsc", isOpen: "isOpen", bsValue: "bsValue", bsConfig: "bsConfig", isDisabled: "isDisabled", minDate: "minDate", maxDate: "maxDate", minMode: "minMode", daysDisabled: "daysDisabled", datesDisabled: "datesDisabled", datesEnabled: "datesEnabled", dateCustomClasses: "dateCustomClasses" }, outputs: { bsValueChange: "bsValueChange", onShown: "onShown", onHidden: "onHidden" }, exportAs: ["bsDatepicker"], features: [ɵngcc0.ɵɵNgOnChangesFeature] });
/** @nocollapse */
BsDatepickerDirective.ctorParameters = () => [
    { type: BsDatepickerConfig },
    { type: ElementRef },
    { type: Renderer2 },
    { type: ViewContainerRef },
    { type: ComponentLoaderFactory }
];
BsDatepickerDirective.propDecorators = {
    placement: [{ type: Input }],
    triggers: [{ type: Input }],
    outsideClick: [{ type: Input }],
    container: [{ type: Input }],
    outsideEsc: [{ type: Input }],
    isOpen: [{ type: Input }],
    onShown: [{ type: Output }],
    onHidden: [{ type: Output }],
    bsValue: [{ type: Input }],
    bsConfig: [{ type: Input }],
    isDisabled: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    minMode: [{ type: Input }],
    daysDisabled: [{ type: Input }],
    datesDisabled: [{ type: Input }],
    datesEnabled: [{ type: Input }],
    dateCustomClasses: [{ type: Input }],
    bsValueChange: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDatepickerDirective, [{
        type: Directive,
        args: [{
                selector: '[bsDatepicker]',
                exportAs: 'bsDatepicker'
            }]
    }], function () { return [{ type: BsDatepickerConfig }, { type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ViewContainerRef }, { type: ɵngcc3.ComponentLoaderFactory }]; }, { placement: [{
            type: Input
        }], triggers: [{
            type: Input
        }], outsideClick: [{
            type: Input
        }], container: [{
            type: Input
        }], outsideEsc: [{
            type: Input
        }], bsValueChange: [{
            type: Output
        }], onShown: [{
            type: Output
        }], onHidden: [{
            type: Output
        }], isOpen: [{
            type: Input
        }], bsValue: [{
            type: Input
        }], bsConfig: [{
            type: Input
        }], isDisabled: [{
            type: Input
        }], minDate: [{
            type: Input
        }], maxDate: [{
            type: Input
        }], minMode: [{
            type: Input
        }], daysDisabled: [{
            type: Input
        }], datesDisabled: [{
            type: Input
        }], datesEnabled: [{
            type: Input
        }], dateCustomClasses: [{
            type: Input
        }] }); })();
if (false) {
    /**
     * Placement of a datepicker. Accepts: "top", "bottom", "left", "right"
     * @type {?}
     */
    BsDatepickerDirective.prototype.placement;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     * @type {?}
     */
    BsDatepickerDirective.prototype.triggers;
    /**
     * Close datepicker on outside click
     * @type {?}
     */
    BsDatepickerDirective.prototype.outsideClick;
    /**
     * A selector specifying the element the datepicker should be appended to.
     * @type {?}
     */
    BsDatepickerDirective.prototype.container;
    /** @type {?} */
    BsDatepickerDirective.prototype.outsideEsc;
    /**
     * Emits an event when the datepicker is shown
     * @type {?}
     */
    BsDatepickerDirective.prototype.onShown;
    /**
     * Emits an event when the datepicker is hidden
     * @type {?}
     */
    BsDatepickerDirective.prototype.onHidden;
    /** @type {?} */
    BsDatepickerDirective.prototype._bsValue;
    /** @type {?} */
    BsDatepickerDirective.prototype.isOpen$;
    /** @type {?} */
    BsDatepickerDirective.prototype.isDestroy$;
    /**
     * Config object for datepicker
     * @type {?}
     */
    BsDatepickerDirective.prototype.bsConfig;
    /**
     * Indicates whether datepicker's content is enabled or not
     * @type {?}
     */
    BsDatepickerDirective.prototype.isDisabled;
    /**
     * Minimum date which is available for selection
     * @type {?}
     */
    BsDatepickerDirective.prototype.minDate;
    /**
     * Maximum date which is available for selection
     * @type {?}
     */
    BsDatepickerDirective.prototype.maxDate;
    /**
     * Minimum view mode : day, month, or year
     * @type {?}
     */
    BsDatepickerDirective.prototype.minMode;
    /**
     * Disable Certain days in the week
     * @type {?}
     */
    BsDatepickerDirective.prototype.daysDisabled;
    /**
     * Disable specific dates
     * @type {?}
     */
    BsDatepickerDirective.prototype.datesDisabled;
    /**
     * Enable specific dates
     * @type {?}
     */
    BsDatepickerDirective.prototype.datesEnabled;
    /**
     * Date custom classes
     * @type {?}
     */
    BsDatepickerDirective.prototype.dateCustomClasses;
    /**
     * Emits when datepicker value has been changed
     * @type {?}
     */
    BsDatepickerDirective.prototype.bsValueChange;
    /**
     * @type {?}
     * @protected
     */
    BsDatepickerDirective.prototype._subs;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerDirective.prototype._datepicker;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerDirective.prototype._datepickerRef;
    /** @type {?} */
    BsDatepickerDirective.prototype._config;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerDirective.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerDirective.prototype._renderer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDatepickerInlineConfig extends BsDatepickerConfig {
}
BsDatepickerInlineConfig.ɵfac = function BsDatepickerInlineConfig_Factory(t) { return ɵBsDatepickerInlineConfig_BaseFactory(t || BsDatepickerInlineConfig); };
BsDatepickerInlineConfig.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: BsDatepickerInlineConfig, factory: BsDatepickerInlineConfig.ɵfac });
const ɵBsDatepickerInlineConfig_BaseFactory = /*@__PURE__*/ ɵngcc0.ɵɵgetInheritedFactory(BsDatepickerInlineConfig);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDatepickerInlineConfig, [{
        type: Injectable
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDatepickerInlineContainerComponent extends BsDatepickerContainerComponent {
    /**
     * @param {?} _renderer
     * @param {?} _config
     * @param {?} _store
     * @param {?} _element
     * @param {?} _actions
     * @param {?} _effects
     * @param {?} _positioningService
     */
    constructor(_renderer, _config, _store, _element, _actions, _effects, _positioningService) {
        super(_renderer, _config, _store, _element, _actions, _effects, _positioningService);
        _renderer.setStyle(_element.nativeElement, 'display', 'inline-block');
        _renderer.setStyle(_element.nativeElement, 'position', 'static');
    }
}
BsDatepickerInlineContainerComponent.ɵfac = function BsDatepickerInlineContainerComponent_Factory(t) { return new (t || BsDatepickerInlineContainerComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(BsDatepickerConfig), ɵngcc0.ɵɵdirectiveInject(BsDatepickerStore), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(BsDatepickerActions), ɵngcc0.ɵɵdirectiveInject(BsDatepickerEffects), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.PositioningService)); };
BsDatepickerInlineContainerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BsDatepickerInlineContainerComponent, selectors: [["bs-datepicker-inline-container"]], hostBindings: function BsDatepickerInlineContainerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function BsDatepickerInlineContainerComponent_click_HostBindingHandler($event) { return ctx._stopPropagation($event); });
    } }, features: [ɵngcc0.ɵɵProvidersFeature([BsDatepickerStore, BsDatepickerEffects]), ɵngcc0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["class", "bs-datepicker", 3, "ngClass", 4, "ngIf"], [1, "bs-datepicker", 3, "ngClass"], [1, "bs-datepicker-container"], ["role", "application", 1, "bs-calendar-container", 3, "ngSwitch"], ["class", "bs-media-container", 4, "ngSwitchCase"], ["class", "bs-datepicker-buttons", 4, "ngIf"], ["class", "bs-datepicker-custom-range", 4, "ngIf"], [1, "bs-media-container"], [3, "bs-datepicker-multiple", "calendar", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", 4, "ngFor", "ngForOf"], [3, "calendar", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect"], [3, "bs-datepicker-multiple", "calendar", "onNavigate", "onViewMode", "onHover", "onSelect", 4, "ngFor", "ngForOf"], [3, "calendar", "onNavigate", "onViewMode", "onHover", "onSelect"], [1, "bs-datepicker-buttons"], ["type", "button", 1, "btn", "btn-success"], ["type", "button", 1, "btn", "btn-default"], [1, "bs-datepicker-custom-range"], [3, "selectedRange", "ranges", "onSelect"]], template: function BsDatepickerInlineContainerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, BsDatepickerInlineContainerComponent_div_0_Template, 9, 10, "div", 0);
        ɵngcc0.ɵɵpipe(1, "async");
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ɵngcc0.ɵɵpipeBind1(1, 1, ctx.viewMode));
    } }, directives: function () { return [ɵngcc2.NgIf, ɵngcc2.NgClass, ɵngcc2.NgSwitch, ɵngcc2.NgSwitchCase, ɵngcc2.NgForOf, BsDaysCalendarViewComponent, BsMonthCalendarViewComponent, BsYearsCalendarViewComponent, BsCustomDatesViewComponent]; }, pipes: function () { return [ɵngcc2.AsyncPipe]; }, encapsulation: 2, data: { animation: [datepickerAnimation] } });
/** @nocollapse */
BsDatepickerInlineContainerComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: BsDatepickerConfig },
    { type: BsDatepickerStore },
    { type: ElementRef },
    { type: BsDatepickerActions },
    { type: BsDatepickerEffects },
    { type: PositioningService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDatepickerInlineContainerComponent, [{
        type: Component,
        args: [{
                selector: 'bs-datepicker-inline-container',
                providers: [BsDatepickerStore, BsDatepickerEffects],
                template: "<!-- days calendar view mode -->\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\n  <div class=\"bs-datepicker-container\"\n    [@datepickerAnimation]=\"animationState\"\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\n    <!--calendars-->\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\n      <!--days calendar-->\n      <div *ngSwitchCase=\"'day'\" class=\"bs-media-container\">\n        <bs-days-calendar-view\n          *ngFor=\"let calendar of daysCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          [options]=\"options | async\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"dayHoverHandler($event)\"\n          (onHoverWeek)=\"weekHoverHandler($event)\"\n          (onSelect)=\"daySelectHandler($event)\">\n        </bs-days-calendar-view>\n      </div>\n\n      <!--months calendar-->\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\n        <bs-month-calendar-view\n          *ngFor=\"let calendar of monthsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"monthHoverHandler($event)\"\n          (onSelect)=\"monthSelectHandler($event)\">\n        </bs-month-calendar-view>\n      </div>\n\n      <!--years calendar-->\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\n        <bs-years-calendar-view\n          *ngFor=\"let calendar of yearsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"yearHoverHandler($event)\"\n          (onSelect)=\"yearSelectHandler($event)\">\n        </bs-years-calendar-view>\n      </div>\n    </div>\n\n    <!--applycancel buttons-->\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\n      <button class=\"btn btn-success\" type=\"button\">Apply</button>\n      <button class=\"btn btn-default\" type=\"button\">Cancel</button>\n    </div>\n  </div>\n\n  <!--custom dates or date ranges picker-->\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"customRanges?.length > 0\">\n    <bs-custom-date-view \n      [selectedRange]=\"chosenRange\" \n      [ranges]=\"customRanges\"\n      (onSelect)=\"setRangeOnCalendar($event)\">\n    </bs-custom-date-view>\n  </div>\n</div>\n",
                host: {
                    '(click)': '_stopPropagation($event)'
                },
                animations: [datepickerAnimation]
            }]
    }], function () { return [{ type: ɵngcc0.Renderer2 }, { type: BsDatepickerConfig }, { type: BsDatepickerStore }, { type: ɵngcc0.ElementRef }, { type: BsDatepickerActions }, { type: BsDatepickerEffects }, { type: ɵngcc1.PositioningService }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDatepickerInlineDirective {
    /**
     * @param {?} _config
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _viewContainerRef
     * @param {?} cis
     */
    constructor(_config, _elementRef, _renderer, _viewContainerRef, cis) {
        this._config = _config;
        this._elementRef = _elementRef;
        /**
         * Emits when datepicker value has been changed
         */
        this.bsValueChange = new EventEmitter();
        this._subs = [];
        // todo: assign only subset of fields
        Object.assign(this, this._config);
        this._datepicker = cis.createLoader(_elementRef, _viewContainerRef, _renderer);
    }
    /**
     * Initial value of datepicker
     * @param {?} value
     * @return {?}
     */
    set bsValue(value) {
        if (this._bsValue === value) {
            return;
        }
        this._bsValue = value;
        this.bsValueChange.emit(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setConfig();
        // if date changes from external source (model -> view)
        this._subs.push(this.bsValueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this._datepickerRef.instance.value = value;
        })));
        // if date changes from picker (view -> model)
        this._subs.push(this._datepickerRef.instance.valueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this.bsValue = value;
        })));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._datepickerRef || !this._datepickerRef.instance) {
            return;
        }
        if (changes.minDate) {
            this._datepickerRef.instance.minDate = this.minDate;
            this.setConfig();
        }
        if (changes.maxDate) {
            this._datepickerRef.instance.maxDate = this.maxDate;
            this.setConfig();
        }
        if (changes.datesDisabled) {
            this._datepickerRef.instance.datesDisabled = this.datesDisabled;
            this.setConfig();
        }
        if (changes.datesEnabled) {
            this._datepickerRef.instance.datesEnabled = this.datesEnabled;
            this._datepickerRef.instance.value = this._bsValue;
        }
        if (changes.isDisabled) {
            this._datepickerRef.instance.isDisabled = this.isDisabled;
            this.setConfig();
        }
        if (changes.dateCustomClasses) {
            this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
            this.setConfig();
        }
    }
    /**
     * Set config for datepicker
     * @return {?}
     */
    setConfig() {
        if (this._datepicker) {
            this._datepicker.hide();
        }
        this._config = Object.assign({}, this._config, this.bsConfig, {
            value: this._bsValue,
            isDisabled: this.isDisabled,
            minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
            maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
            dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
            datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
            datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled
        });
        this._datepickerRef = this._datepicker
            .provide({ provide: BsDatepickerConfig, useValue: this._config })
            .attach(BsDatepickerInlineContainerComponent)
            .to(this._elementRef)
            .show();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._datepicker.dispose();
    }
}
BsDatepickerInlineDirective.ɵfac = function BsDatepickerInlineDirective_Factory(t) { return new (t || BsDatepickerInlineDirective)(ɵngcc0.ɵɵdirectiveInject(BsDatepickerInlineConfig), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ViewContainerRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc3.ComponentLoaderFactory)); };
BsDatepickerInlineDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: BsDatepickerInlineDirective, selectors: [["bs-datepicker-inline"]], inputs: { bsValue: "bsValue", bsConfig: "bsConfig", isDisabled: "isDisabled", minDate: "minDate", maxDate: "maxDate", dateCustomClasses: "dateCustomClasses", datesEnabled: "datesEnabled", datesDisabled: "datesDisabled" }, outputs: { bsValueChange: "bsValueChange" }, exportAs: ["bsDatepickerInline"], features: [ɵngcc0.ɵɵNgOnChangesFeature] });
/** @nocollapse */
BsDatepickerInlineDirective.ctorParameters = () => [
    { type: BsDatepickerInlineConfig },
    { type: ElementRef },
    { type: Renderer2 },
    { type: ViewContainerRef },
    { type: ComponentLoaderFactory }
];
BsDatepickerInlineDirective.propDecorators = {
    bsValue: [{ type: Input }],
    bsConfig: [{ type: Input }],
    isDisabled: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    dateCustomClasses: [{ type: Input }],
    datesEnabled: [{ type: Input }],
    datesDisabled: [{ type: Input }],
    bsValueChange: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDatepickerInlineDirective, [{
        type: Directive,
        args: [{
                selector: 'bs-datepicker-inline',
                exportAs: 'bsDatepickerInline'
            }]
    }], function () { return [{ type: BsDatepickerInlineConfig }, { type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ViewContainerRef }, { type: ɵngcc3.ComponentLoaderFactory }]; }, { bsValueChange: [{
            type: Output
        }], bsValue: [{
            type: Input
        }], bsConfig: [{
            type: Input
        }], isDisabled: [{
            type: Input
        }], minDate: [{
            type: Input
        }], maxDate: [{
            type: Input
        }], dateCustomClasses: [{
            type: Input
        }], datesEnabled: [{
            type: Input
        }], datesDisabled: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    BsDatepickerInlineDirective.prototype._bsValue;
    /**
     * Config object for datepicker
     * @type {?}
     */
    BsDatepickerInlineDirective.prototype.bsConfig;
    /**
     * Indicates whether datepicker is enabled or not
     * @type {?}
     */
    BsDatepickerInlineDirective.prototype.isDisabled;
    /**
     * Minimum date which is available for selection
     * @type {?}
     */
    BsDatepickerInlineDirective.prototype.minDate;
    /**
     * Maximum date which is available for selection
     * @type {?}
     */
    BsDatepickerInlineDirective.prototype.maxDate;
    /**
     * Date custom classes
     * @type {?}
     */
    BsDatepickerInlineDirective.prototype.dateCustomClasses;
    /**
     * Disable specific dates
     * @type {?}
     */
    BsDatepickerInlineDirective.prototype.datesEnabled;
    /**
     * Enable specific dates
     * @type {?}
     */
    BsDatepickerInlineDirective.prototype.datesDisabled;
    /**
     * Emits when datepicker value has been changed
     * @type {?}
     */
    BsDatepickerInlineDirective.prototype.bsValueChange;
    /**
     * @type {?}
     * @protected
     */
    BsDatepickerInlineDirective.prototype._subs;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerInlineDirective.prototype._datepicker;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerInlineDirective.prototype._datepickerRef;
    /** @type {?} */
    BsDatepickerInlineDirective.prototype._config;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerInlineDirective.prototype._elementRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDaterangepickerInlineConfig extends BsDatepickerConfig {
    constructor() {
        super(...arguments);
        // DatepickerRenderOptions
        this.displayMonths = 2;
        /**
         * turn on/off animation
         */
        this.isAnimated = false;
    }
}
BsDaterangepickerInlineConfig.ɵfac = function BsDaterangepickerInlineConfig_Factory(t) { return ɵBsDaterangepickerInlineConfig_BaseFactory(t || BsDaterangepickerInlineConfig); };
BsDaterangepickerInlineConfig.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: BsDaterangepickerInlineConfig, factory: BsDaterangepickerInlineConfig.ɵfac });
const ɵBsDaterangepickerInlineConfig_BaseFactory = /*@__PURE__*/ ɵngcc0.ɵɵgetInheritedFactory(BsDaterangepickerInlineConfig);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDaterangepickerInlineConfig, [{
        type: Injectable
    }], null, null); })();
if (false) {
    /** @type {?} */
    BsDaterangepickerInlineConfig.prototype.displayMonths;
    /**
     * turn on/off animation
     * @type {?}
     */
    BsDaterangepickerInlineConfig.prototype.isAnimated;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDaterangepickerContainerComponent extends BsDatepickerAbstractComponent {
    /**
     * @param {?} _renderer
     * @param {?} _config
     * @param {?} _store
     * @param {?} _element
     * @param {?} _actions
     * @param {?} _effects
     * @param {?} _positionService
     */
    constructor(_renderer, _config, _store, _element, _actions, _effects, _positionService) {
        super();
        this._config = _config;
        this._store = _store;
        this._element = _element;
        this._actions = _actions;
        this._positionService = _positionService;
        this.valueChange = new EventEmitter();
        this.animationState = 'void';
        this._rangeStack = [];
        this.chosenRange = [];
        this._subs = [];
        this._effects = _effects;
        this.customRanges = this._config.ranges;
        _renderer.setStyle(_element.nativeElement, 'display', 'block');
        _renderer.setStyle(_element.nativeElement, 'position', 'absolute');
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._effects.setRangeValue(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._positionService.setOptions({
            modifiers: { flip: { enabled: this._config.adaptivePosition } },
            allowedPositions: ['top', 'bottom']
        });
        this._positionService.event$
            .pipe(take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._positionService.disable();
            if (this._config.isAnimated) {
                this.animationState = this.isTopPosition ? 'animated-up' : 'animated-down';
                return;
            }
            this.animationState = 'unanimated';
        }));
        this.containerClass = this._config.containerClass;
        this.isOtherMonthsActive = this._config.selectFromOtherMonth;
        this._effects
            .init(this._store)
            // intial state options
            // todo: fix this, split configs
            .setOptions(this._config)
            // data binding view --> model
            .setBindings(this)
            // set event handlers
            .setEventHandlers(this)
            .registerDatepickerSideEffects();
        // todo: move it somewhere else
        // on selected date change
        this._subs.push(this._store
            .select((/**
         * @param {?} state
         * @return {?}
         */
        state => state.selectedRange))
            .subscribe((/**
         * @param {?} date
         * @return {?}
         */
        date => {
            this.valueChange.emit(date);
            this.chosenRange = date;
        })));
    }
    /**
     * @return {?}
     */
    get isTopPosition() {
        return this._element.nativeElement.classList.contains('top');
    }
    /**
     * @return {?}
     */
    positionServiceEnable() {
        this._positionService.enable();
    }
    /**
     * @param {?} day
     * @return {?}
     */
    daySelectHandler(day) {
        if (!day) {
            return;
        }
        /** @type {?} */
        const isDisabled = this.isOtherMonthsActive ? day.isDisabled : (day.isOtherMonth || day.isDisabled);
        if (isDisabled) {
            return;
        }
        // if only one date is already selected
        // and user clicks on previous date
        // start selection from new date
        // but if new date is after initial one
        // than finish selection
        if (this._rangeStack.length === 1) {
            this._rangeStack =
                day.date >= this._rangeStack[0]
                    ? [this._rangeStack[0], day.date]
                    : [day.date];
        }
        if (this._rangeStack.length === 0) {
            this._rangeStack = [day.date];
        }
        this._store.dispatch(this._actions.selectRange(this._rangeStack));
        if (this._rangeStack.length === 2) {
            this._rangeStack = [];
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        for (const sub of this._subs) {
            sub.unsubscribe();
        }
        this._effects.destroy();
    }
    /**
     * @param {?} dates
     * @return {?}
     */
    setRangeOnCalendar(dates) {
        this._rangeStack = (dates === null) ? [] : (dates.value instanceof Date ? [dates.value] : dates.value);
        this._store.dispatch(this._actions.selectRange(this._rangeStack));
    }
}
BsDaterangepickerContainerComponent.ɵfac = function BsDaterangepickerContainerComponent_Factory(t) { return new (t || BsDaterangepickerContainerComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(BsDatepickerConfig), ɵngcc0.ɵɵdirectiveInject(BsDatepickerStore), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(BsDatepickerActions), ɵngcc0.ɵɵdirectiveInject(BsDatepickerEffects), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.PositioningService)); };
BsDaterangepickerContainerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BsDaterangepickerContainerComponent, selectors: [["bs-daterangepicker-container"]], hostAttrs: ["role", "dialog", "aria-label", "calendar", 1, "bottom"], hostBindings: function BsDaterangepickerContainerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function BsDaterangepickerContainerComponent_click_HostBindingHandler($event) { return ctx._stopPropagation($event); });
    } }, features: [ɵngcc0.ɵɵProvidersFeature([BsDatepickerStore, BsDatepickerEffects]), ɵngcc0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["class", "bs-datepicker", 3, "ngClass", 4, "ngIf"], [1, "bs-datepicker", 3, "ngClass"], [1, "bs-datepicker-container"], ["role", "application", 1, "bs-calendar-container", 3, "ngSwitch"], ["class", "bs-media-container", 4, "ngSwitchCase"], ["class", "bs-datepicker-buttons", 4, "ngIf"], ["class", "bs-datepicker-custom-range", 4, "ngIf"], [1, "bs-media-container"], [3, "bs-datepicker-multiple", "calendar", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", 4, "ngFor", "ngForOf"], [3, "calendar", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect"], [3, "bs-datepicker-multiple", "calendar", "onNavigate", "onViewMode", "onHover", "onSelect", 4, "ngFor", "ngForOf"], [3, "calendar", "onNavigate", "onViewMode", "onHover", "onSelect"], [1, "bs-datepicker-buttons"], ["type", "button", 1, "btn", "btn-success"], ["type", "button", 1, "btn", "btn-default"], [1, "bs-datepicker-custom-range"], [3, "selectedRange", "ranges", "onSelect"]], template: function BsDaterangepickerContainerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, BsDaterangepickerContainerComponent_div_0_Template, 9, 10, "div", 0);
        ɵngcc0.ɵɵpipe(1, "async");
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ɵngcc0.ɵɵpipeBind1(1, 1, ctx.viewMode));
    } }, directives: function () { return [ɵngcc2.NgIf, ɵngcc2.NgClass, ɵngcc2.NgSwitch, ɵngcc2.NgSwitchCase, ɵngcc2.NgForOf, BsDaysCalendarViewComponent, BsMonthCalendarViewComponent, BsYearsCalendarViewComponent, BsCustomDatesViewComponent]; }, pipes: function () { return [ɵngcc2.AsyncPipe]; }, encapsulation: 2, data: { animation: [datepickerAnimation] } });
/** @nocollapse */
BsDaterangepickerContainerComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: BsDatepickerConfig },
    { type: BsDatepickerStore },
    { type: ElementRef },
    { type: BsDatepickerActions },
    { type: BsDatepickerEffects },
    { type: PositioningService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDaterangepickerContainerComponent, [{
        type: Component,
        args: [{
                selector: 'bs-daterangepicker-container',
                providers: [BsDatepickerStore, BsDatepickerEffects],
                template: "<!-- days calendar view mode -->\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\n  <div class=\"bs-datepicker-container\"\n    [@datepickerAnimation]=\"animationState\"\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\n    <!--calendars-->\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\n      <!--days calendar-->\n      <div *ngSwitchCase=\"'day'\" class=\"bs-media-container\">\n        <bs-days-calendar-view\n          *ngFor=\"let calendar of daysCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          [options]=\"options | async\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"dayHoverHandler($event)\"\n          (onHoverWeek)=\"weekHoverHandler($event)\"\n          (onSelect)=\"daySelectHandler($event)\">\n        </bs-days-calendar-view>\n      </div>\n\n      <!--months calendar-->\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\n        <bs-month-calendar-view\n          *ngFor=\"let calendar of monthsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"monthHoverHandler($event)\"\n          (onSelect)=\"monthSelectHandler($event)\">\n        </bs-month-calendar-view>\n      </div>\n\n      <!--years calendar-->\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\n        <bs-years-calendar-view\n          *ngFor=\"let calendar of yearsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"yearHoverHandler($event)\"\n          (onSelect)=\"yearSelectHandler($event)\">\n        </bs-years-calendar-view>\n      </div>\n    </div>\n\n    <!--applycancel buttons-->\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\n      <button class=\"btn btn-success\" type=\"button\">Apply</button>\n      <button class=\"btn btn-default\" type=\"button\">Cancel</button>\n    </div>\n  </div>\n\n  <!--custom dates or date ranges picker-->\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"customRanges?.length > 0\">\n    <bs-custom-date-view \n      [selectedRange]=\"chosenRange\" \n      [ranges]=\"customRanges\"\n      (onSelect)=\"setRangeOnCalendar($event)\">\n    </bs-custom-date-view>\n  </div>\n</div>\n",
                host: {
                    class: 'bottom',
                    '(click)': '_stopPropagation($event)',
                    role: 'dialog',
                    'aria-label': 'calendar'
                },
                animations: [datepickerAnimation]
            }]
    }], function () { return [{ type: ɵngcc0.Renderer2 }, { type: BsDatepickerConfig }, { type: BsDatepickerStore }, { type: ɵngcc0.ElementRef }, { type: BsDatepickerActions }, { type: BsDatepickerEffects }, { type: ɵngcc1.PositioningService }]; }, null); })();
if (false) {
    /** @type {?} */
    BsDaterangepickerContainerComponent.prototype.valueChange;
    /** @type {?} */
    BsDaterangepickerContainerComponent.prototype.animationState;
    /** @type {?} */
    BsDaterangepickerContainerComponent.prototype._rangeStack;
    /** @type {?} */
    BsDaterangepickerContainerComponent.prototype.chosenRange;
    /** @type {?} */
    BsDaterangepickerContainerComponent.prototype._subs;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerContainerComponent.prototype._config;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerContainerComponent.prototype._store;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerContainerComponent.prototype._element;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerContainerComponent.prototype._actions;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerContainerComponent.prototype._positionService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDaterangepickerInlineContainerComponent extends BsDaterangepickerContainerComponent {
    /**
     * @param {?} _renderer
     * @param {?} _config
     * @param {?} _store
     * @param {?} _element
     * @param {?} _actions
     * @param {?} _effects
     * @param {?} _positioningService
     */
    constructor(_renderer, _config, _store, _element, _actions, _effects, _positioningService) {
        super(_renderer, _config, _store, _element, _actions, _effects, _positioningService);
        _renderer.setStyle(_element.nativeElement, 'display', 'inline-block');
        _renderer.setStyle(_element.nativeElement, 'position', 'static');
    }
}
BsDaterangepickerInlineContainerComponent.ɵfac = function BsDaterangepickerInlineContainerComponent_Factory(t) { return new (t || BsDaterangepickerInlineContainerComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(BsDatepickerConfig), ɵngcc0.ɵɵdirectiveInject(BsDatepickerStore), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(BsDatepickerActions), ɵngcc0.ɵɵdirectiveInject(BsDatepickerEffects), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.PositioningService)); };
BsDaterangepickerInlineContainerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BsDaterangepickerInlineContainerComponent, selectors: [["bs-daterangepicker-inline-container"]], hostBindings: function BsDaterangepickerInlineContainerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function BsDaterangepickerInlineContainerComponent_click_HostBindingHandler($event) { return ctx._stopPropagation($event); });
    } }, features: [ɵngcc0.ɵɵProvidersFeature([BsDatepickerStore, BsDatepickerEffects]), ɵngcc0.ɵɵInheritDefinitionFeature], decls: 2, vars: 3, consts: [["class", "bs-datepicker", 3, "ngClass", 4, "ngIf"], [1, "bs-datepicker", 3, "ngClass"], [1, "bs-datepicker-container"], ["role", "application", 1, "bs-calendar-container", 3, "ngSwitch"], ["class", "bs-media-container", 4, "ngSwitchCase"], ["class", "bs-datepicker-buttons", 4, "ngIf"], ["class", "bs-datepicker-custom-range", 4, "ngIf"], [1, "bs-media-container"], [3, "bs-datepicker-multiple", "calendar", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect", 4, "ngFor", "ngForOf"], [3, "calendar", "options", "onNavigate", "onViewMode", "onHover", "onHoverWeek", "onSelect"], [3, "bs-datepicker-multiple", "calendar", "onNavigate", "onViewMode", "onHover", "onSelect", 4, "ngFor", "ngForOf"], [3, "calendar", "onNavigate", "onViewMode", "onHover", "onSelect"], [1, "bs-datepicker-buttons"], ["type", "button", 1, "btn", "btn-success"], ["type", "button", 1, "btn", "btn-default"], [1, "bs-datepicker-custom-range"], [3, "selectedRange", "ranges", "onSelect"]], template: function BsDaterangepickerInlineContainerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, BsDaterangepickerInlineContainerComponent_div_0_Template, 9, 10, "div", 0);
        ɵngcc0.ɵɵpipe(1, "async");
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ɵngcc0.ɵɵpipeBind1(1, 1, ctx.viewMode));
    } }, directives: function () { return [ɵngcc2.NgIf, ɵngcc2.NgClass, ɵngcc2.NgSwitch, ɵngcc2.NgSwitchCase, ɵngcc2.NgForOf, BsDaysCalendarViewComponent, BsMonthCalendarViewComponent, BsYearsCalendarViewComponent, BsCustomDatesViewComponent]; }, pipes: function () { return [ɵngcc2.AsyncPipe]; }, encapsulation: 2, data: { animation: [datepickerAnimation] } });
/** @nocollapse */
BsDaterangepickerInlineContainerComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: BsDatepickerConfig },
    { type: BsDatepickerStore },
    { type: ElementRef },
    { type: BsDatepickerActions },
    { type: BsDatepickerEffects },
    { type: PositioningService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDaterangepickerInlineContainerComponent, [{
        type: Component,
        args: [{
                selector: 'bs-daterangepicker-inline-container',
                providers: [BsDatepickerStore, BsDatepickerEffects],
                template: "<!-- days calendar view mode -->\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\n  <div class=\"bs-datepicker-container\"\n    [@datepickerAnimation]=\"animationState\"\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\n    <!--calendars-->\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\n      <!--days calendar-->\n      <div *ngSwitchCase=\"'day'\" class=\"bs-media-container\">\n        <bs-days-calendar-view\n          *ngFor=\"let calendar of daysCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          [options]=\"options | async\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"dayHoverHandler($event)\"\n          (onHoverWeek)=\"weekHoverHandler($event)\"\n          (onSelect)=\"daySelectHandler($event)\">\n        </bs-days-calendar-view>\n      </div>\n\n      <!--months calendar-->\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\n        <bs-month-calendar-view\n          *ngFor=\"let calendar of monthsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"monthHoverHandler($event)\"\n          (onSelect)=\"monthSelectHandler($event)\">\n        </bs-month-calendar-view>\n      </div>\n\n      <!--years calendar-->\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\n        <bs-years-calendar-view\n          *ngFor=\"let calendar of yearsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"yearHoverHandler($event)\"\n          (onSelect)=\"yearSelectHandler($event)\">\n        </bs-years-calendar-view>\n      </div>\n    </div>\n\n    <!--applycancel buttons-->\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\n      <button class=\"btn btn-success\" type=\"button\">Apply</button>\n      <button class=\"btn btn-default\" type=\"button\">Cancel</button>\n    </div>\n  </div>\n\n  <!--custom dates or date ranges picker-->\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"customRanges?.length > 0\">\n    <bs-custom-date-view \n      [selectedRange]=\"chosenRange\" \n      [ranges]=\"customRanges\"\n      (onSelect)=\"setRangeOnCalendar($event)\">\n    </bs-custom-date-view>\n  </div>\n</div>\n",
                host: {
                    '(click)': '_stopPropagation($event)'
                },
                animations: [datepickerAnimation]
            }]
    }], function () { return [{ type: ɵngcc0.Renderer2 }, { type: BsDatepickerConfig }, { type: BsDatepickerStore }, { type: ɵngcc0.ElementRef }, { type: BsDatepickerActions }, { type: BsDatepickerEffects }, { type: ɵngcc1.PositioningService }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDaterangepickerInlineDirective {
    /**
     * @param {?} _config
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _viewContainerRef
     * @param {?} cis
     */
    constructor(_config, _elementRef, _renderer, _viewContainerRef, cis) {
        this._config = _config;
        this._elementRef = _elementRef;
        /**
         * Emits when daterangepicker value has been changed
         */
        this.bsValueChange = new EventEmitter();
        this._subs = [];
        // todo: assign only subset of fields
        Object.assign(this, this._config);
        this._datepicker = cis.createLoader(_elementRef, _viewContainerRef, _renderer);
    }
    /**
     * Initial value of datepicker
     * @param {?} value
     * @return {?}
     */
    set bsValue(value) {
        if (this._bsValue === value) {
            return;
        }
        this._bsValue = value;
        this.bsValueChange.emit(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setConfig();
        // if date changes from external source (model -> view)
        this._subs.push(this.bsValueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this._datepickerRef.instance.value = value;
        })));
        // if date changes from picker (view -> model)
        this._subs.push(this._datepickerRef.instance.valueChange
            .pipe(filter((/**
         * @param {?} range
         * @return {?}
         */
        (range) => range && range[0] && !!range[1])))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this.bsValue = value;
        })));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._datepickerRef || !this._datepickerRef.instance) {
            return;
        }
        if (changes.minDate) {
            this._datepickerRef.instance.minDate = this.minDate;
            this.setConfig();
        }
        if (changes.maxDate) {
            this._datepickerRef.instance.maxDate = this.maxDate;
            this.setConfig();
        }
        if (changes.datesEnabled) {
            this._datepickerRef.instance.datesEnabled = this.datesEnabled;
        }
        if (changes.datesDisabled) {
            this._datepickerRef.instance.datesDisabled = this.datesDisabled;
            this.setConfig();
        }
        if (changes.daysDisabled) {
            this._datepickerRef.instance.daysDisabled = this.daysDisabled;
            this.setConfig();
        }
        if (changes.isDisabled) {
            this._datepickerRef.instance.isDisabled = this.isDisabled;
            this.setConfig();
        }
        if (changes.dateCustomClasses) {
            this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
            this.setConfig();
        }
    }
    /**
     * Set config for datepicker
     * @return {?}
     */
    setConfig() {
        if (this._datepicker) {
            this._datepicker.hide();
        }
        this._config = Object.assign({}, this._config, this.bsConfig, {
            value: this._bsValue,
            isDisabled: this.isDisabled,
            minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
            maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
            daysDisabled: this.daysDisabled || this.bsConfig && this.bsConfig.daysDisabled,
            dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
            datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
            datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled,
            ranges: this.bsConfig && this.bsConfig.ranges
        });
        this._datepickerRef = this._datepicker
            .provide({ provide: BsDatepickerConfig, useValue: this._config })
            .attach(BsDaterangepickerInlineContainerComponent)
            .to(this._elementRef)
            .show();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._datepicker.dispose();
    }
}
BsDaterangepickerInlineDirective.ɵfac = function BsDaterangepickerInlineDirective_Factory(t) { return new (t || BsDaterangepickerInlineDirective)(ɵngcc0.ɵɵdirectiveInject(BsDaterangepickerInlineConfig), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ViewContainerRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc3.ComponentLoaderFactory)); };
BsDaterangepickerInlineDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: BsDaterangepickerInlineDirective, selectors: [["bs-daterangepicker-inline"]], inputs: { bsValue: "bsValue", bsConfig: "bsConfig", isDisabled: "isDisabled", minDate: "minDate", maxDate: "maxDate", dateCustomClasses: "dateCustomClasses", daysDisabled: "daysDisabled", datesDisabled: "datesDisabled", datesEnabled: "datesEnabled" }, outputs: { bsValueChange: "bsValueChange" }, exportAs: ["bsDaterangepickerInline"], features: [ɵngcc0.ɵɵNgOnChangesFeature] });
/** @nocollapse */
BsDaterangepickerInlineDirective.ctorParameters = () => [
    { type: BsDaterangepickerInlineConfig },
    { type: ElementRef },
    { type: Renderer2 },
    { type: ViewContainerRef },
    { type: ComponentLoaderFactory }
];
BsDaterangepickerInlineDirective.propDecorators = {
    bsValue: [{ type: Input }],
    bsConfig: [{ type: Input }],
    isDisabled: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    dateCustomClasses: [{ type: Input }],
    daysDisabled: [{ type: Input }],
    datesDisabled: [{ type: Input }],
    datesEnabled: [{ type: Input }],
    bsValueChange: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDaterangepickerInlineDirective, [{
        type: Directive,
        args: [{
                selector: 'bs-daterangepicker-inline',
                exportAs: 'bsDaterangepickerInline'
            }]
    }], function () { return [{ type: BsDaterangepickerInlineConfig }, { type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ViewContainerRef }, { type: ɵngcc3.ComponentLoaderFactory }]; }, { bsValueChange: [{
            type: Output
        }], bsValue: [{
            type: Input
        }], bsConfig: [{
            type: Input
        }], isDisabled: [{
            type: Input
        }], minDate: [{
            type: Input
        }], maxDate: [{
            type: Input
        }], dateCustomClasses: [{
            type: Input
        }], daysDisabled: [{
            type: Input
        }], datesDisabled: [{
            type: Input
        }], datesEnabled: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    BsDaterangepickerInlineDirective.prototype._bsValue;
    /**
     * Config object for datepicker
     * @type {?}
     */
    BsDaterangepickerInlineDirective.prototype.bsConfig;
    /**
     * Indicates whether datepicker is enabled or not
     * @type {?}
     */
    BsDaterangepickerInlineDirective.prototype.isDisabled;
    /**
     * Minimum date which is available for selection
     * @type {?}
     */
    BsDaterangepickerInlineDirective.prototype.minDate;
    /**
     * Maximum date which is available for selection
     * @type {?}
     */
    BsDaterangepickerInlineDirective.prototype.maxDate;
    /**
     * Date custom classes
     * @type {?}
     */
    BsDaterangepickerInlineDirective.prototype.dateCustomClasses;
    /**
     * Disable specific days, e.g. [0,6] will disable all Saturdays and Sundays
     * @type {?}
     */
    BsDaterangepickerInlineDirective.prototype.daysDisabled;
    /**
     * Disable specific dates
     * @type {?}
     */
    BsDaterangepickerInlineDirective.prototype.datesDisabled;
    /**
     * Disable specific dates
     * @type {?}
     */
    BsDaterangepickerInlineDirective.prototype.datesEnabled;
    /**
     * Emits when daterangepicker value has been changed
     * @type {?}
     */
    BsDaterangepickerInlineDirective.prototype.bsValueChange;
    /**
     * @type {?}
     * @protected
     */
    BsDaterangepickerInlineDirective.prototype._subs;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerInlineDirective.prototype._datepicker;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerInlineDirective.prototype._datepickerRef;
    /** @type {?} */
    BsDaterangepickerInlineDirective.prototype._config;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerInlineDirective.prototype._elementRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const BS_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable-next-line: no-use-before-declare */
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => BsDatepickerInputDirective)),
    multi: true
};
/** @type {?} */
const BS_DATEPICKER_VALIDATOR = {
    provide: NG_VALIDATORS,
    /* tslint:disable-next-line: no-use-before-declare */
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => BsDatepickerInputDirective)),
    multi: true
};
class BsDatepickerInputDirective {
    /**
     * @param {?} _picker
     * @param {?} _localeService
     * @param {?} _renderer
     * @param {?} _elRef
     * @param {?} changeDetection
     */
    constructor(_picker, _localeService, _renderer, _elRef, changeDetection) {
        this._picker = _picker;
        this._localeService = _localeService;
        this._renderer = _renderer;
        this._elRef = _elRef;
        this.changeDetection = changeDetection;
        this._onChange = Function.prototype;
        this._onTouched = Function.prototype;
        /* tslint:disable-next-line: no-unused-variable */
        this._validatorChange = Function.prototype;
        // update input value on datepicker value update
        this._picker.bsValueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this._setInputValue(value);
            if (this._value !== value) {
                this._value = value;
                this._onChange(value);
                this._onTouched();
            }
            this.changeDetection.markForCheck();
        }));
        // update input value on locale change
        this._localeService.localeChange.subscribe((/**
         * @return {?}
         */
        () => {
            this._setInputValue(this._value);
        }));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydownEvent(event) {
        if (event.keyCode === 13 || event.code === 'Enter') {
            this.hide();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _setInputValue(value) {
        /** @type {?} */
        const initialDate = !value ? ''
            : formatDate(value, this._picker._config.dateInputFormat, this._localeService.currentLocale);
        this._renderer.setProperty(this._elRef.nativeElement, 'value', initialDate);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        /* tslint:disable-next-line: no-any*/
        this.writeValue(((/** @type {?} */ (event.target))).value);
        this._onChange(this._value);
        if (this._picker._config.returnFocusToInput) {
            this._renderer.selectRootElement(this._elRef.nativeElement).focus();
        }
        this._onTouched();
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        /** @type {?} */
        const _value = c.value;
        /* tslint:disable-next-line: prefer-switch */
        if (_value === null || _value === undefined || _value === '') {
            return null;
        }
        if (isDate(_value)) {
            /** @type {?} */
            const _isDateValid = isDateValid(_value);
            if (!_isDateValid) {
                return { bsDate: { invalid: _value } };
            }
            if (this._picker && this._picker.minDate && isBefore(_value, this._picker.minDate, 'date')) {
                this.writeValue(this._picker.minDate);
                return { bsDate: { minDate: this._picker.minDate } };
            }
            if (this._picker && this._picker.maxDate && isAfter(_value, this._picker.maxDate, 'date')) {
                this.writeValue(this._picker.maxDate);
                return { bsDate: { maxDate: this._picker.maxDate } };
            }
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) {
        this._validatorChange = fn;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (!value) {
            this._value = null;
        }
        else {
            /** @type {?} */
            const _localeKey = this._localeService.currentLocale;
            /** @type {?} */
            const _locale = getLocale(_localeKey);
            if (!_locale) {
                throw new Error(`Locale "${_localeKey}" is not defined, please add it with "defineLocale(...)"`);
            }
            this._value = parseDate(value, this._picker._config.dateInputFormat, this._localeService.currentLocale);
            if (this._picker._config.useUtc) {
                this._value = utcAsLocal(this._value);
            }
        }
        this._picker.bsValue = this._value;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._picker.isDisabled = isDisabled;
        if (isDisabled) {
            this._renderer.setAttribute(this._elRef.nativeElement, 'disabled', 'disabled');
            return;
        }
        this._renderer.removeAttribute(this._elRef.nativeElement, 'disabled');
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * @return {?}
     */
    onBlur() {
        this._onTouched();
    }
    /**
     * @return {?}
     */
    hide() {
        this._picker.hide();
        this._renderer.selectRootElement(this._elRef.nativeElement).blur();
        if (this._picker._config.returnFocusToInput) {
            this._renderer.selectRootElement(this._elRef.nativeElement).focus();
        }
    }
}
BsDatepickerInputDirective.ɵfac = function BsDatepickerInputDirective_Factory(t) { return new (t || BsDatepickerInputDirective)(ɵngcc0.ɵɵdirectiveInject(BsDatepickerDirective, 1), ɵngcc0.ɵɵdirectiveInject(BsLocaleService), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
BsDatepickerInputDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: BsDatepickerInputDirective, selectors: [["input", "bsDatepicker", ""]], hostBindings: function BsDatepickerInputDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("change", function BsDatepickerInputDirective_change_HostBindingHandler($event) { return ctx.onChange($event); })("keyup.esc", function BsDatepickerInputDirective_keyup_esc_HostBindingHandler() { return ctx.hide(); })("keydown", function BsDatepickerInputDirective_keydown_HostBindingHandler($event) { return ctx.onKeydownEvent($event); })("blur", function BsDatepickerInputDirective_blur_HostBindingHandler() { return ctx.onBlur(); });
    } }, features: [ɵngcc0.ɵɵProvidersFeature([BS_DATEPICKER_VALUE_ACCESSOR, BS_DATEPICKER_VALIDATOR])] });
/** @nocollapse */
BsDatepickerInputDirective.ctorParameters = () => [
    { type: BsDatepickerDirective, decorators: [{ type: Host }] },
    { type: BsLocaleService },
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDatepickerInputDirective, [{
        type: Directive,
        args: [{
                selector: `input[bsDatepicker]`,
                host: {
                    '(change)': 'onChange($event)',
                    '(keyup.esc)': 'hide()',
                    '(keydown)': 'onKeydownEvent($event)',
                    '(blur)': 'onBlur()'
                },
                providers: [BS_DATEPICKER_VALUE_ACCESSOR, BS_DATEPICKER_VALIDATOR]
            }]
    }], function () { return [{ type: BsDatepickerDirective, decorators: [{
                type: Host
            }] }, { type: BsLocaleService }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ElementRef }, { type: ɵngcc0.ChangeDetectorRef }]; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    BsDatepickerInputDirective.prototype._onChange;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerInputDirective.prototype._onTouched;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerInputDirective.prototype._validatorChange;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerInputDirective.prototype._value;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerInputDirective.prototype._picker;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerInputDirective.prototype._localeService;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerInputDirective.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerInputDirective.prototype._elRef;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerInputDirective.prototype.changeDetection;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDaterangepickerConfig extends BsDatepickerConfig {
    constructor() {
        super(...arguments);
        // DatepickerRenderOptions
        this.displayMonths = 2;
    }
}
BsDaterangepickerConfig.ɵfac = function BsDaterangepickerConfig_Factory(t) { return ɵBsDaterangepickerConfig_BaseFactory(t || BsDaterangepickerConfig); };
BsDaterangepickerConfig.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: BsDaterangepickerConfig, factory: BsDaterangepickerConfig.ɵfac });
const ɵBsDaterangepickerConfig_BaseFactory = /*@__PURE__*/ ɵngcc0.ɵɵgetInheritedFactory(BsDaterangepickerConfig);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDaterangepickerConfig, [{
        type: Injectable
    }], null, null); })();
if (false) {
    /** @type {?} */
    BsDaterangepickerConfig.prototype.displayMonths;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDaterangepickerDirective {
    /**
     * @param {?} _config
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _viewContainerRef
     * @param {?} cis
     */
    constructor(_config, _elementRef, _renderer, _viewContainerRef, cis) {
        this._config = _config;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         * Placement of a daterangepicker. Accepts: "top", "bottom", "left", "right"
         */
        this.placement = 'bottom';
        /**
         * Specifies events that should trigger. Supports a space separated list of
         * event names.
         */
        this.triggers = 'click';
        /**
         * Close daterangepicker on outside click
         */
        this.outsideClick = true;
        /**
         * A selector specifying the element the daterangepicker should be appended to.
         */
        this.container = 'body';
        this.outsideEsc = true;
        /**
         * Emits when daterangepicker value has been changed
         */
        this.bsValueChange = new EventEmitter();
        this._subs = [];
        this._datepicker = cis.createLoader(_elementRef, _viewContainerRef, _renderer);
        Object.assign(this, _config);
        this.onShown = this._datepicker.onShown;
        this.onHidden = this._datepicker.onHidden;
        this.isOpen$ = new BehaviorSubject(this.isOpen);
    }
    /**
     * Returns whether or not the daterangepicker is currently being shown
     * @return {?}
     */
    get isOpen() {
        return this._datepicker.isShown;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) {
        this.isOpen$.next(value);
    }
    /**
     * Initial value of daterangepicker
     * @param {?} value
     * @return {?}
     */
    set bsValue(value) {
        if (this._bsValue === value) {
            return;
        }
        this._bsValue = value;
        this.bsValueChange.emit(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isDestroy$ = new Subject();
        this._datepicker.listen({
            outsideClick: this.outsideClick,
            outsideEsc: this.outsideEsc,
            triggers: this.triggers,
            show: (/**
             * @return {?}
             */
            () => this.show())
        });
        this.setConfig();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._datepickerRef || !this._datepickerRef.instance) {
            return;
        }
        if (changes.minDate) {
            this._datepickerRef.instance.minDate = this.minDate;
        }
        if (changes.maxDate) {
            this._datepickerRef.instance.maxDate = this.maxDate;
        }
        if (changes.datesDisabled) {
            this._datepickerRef.instance.datesDisabled = this.datesDisabled;
        }
        if (changes.datesEnabled) {
            this._datepickerRef.instance.datesEnabled = this.datesEnabled;
        }
        if (changes.daysDisabled) {
            this._datepickerRef.instance.daysDisabled = this.daysDisabled;
        }
        if (changes.isDisabled) {
            this._datepickerRef.instance.isDisabled = this.isDisabled;
        }
        if (changes.dateCustomClasses) {
            this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.isOpen$.pipe(filter((/**
         * @param {?} isOpen
         * @return {?}
         */
        isOpen => isOpen !== this.isOpen)), takeUntil(this.isDestroy$))
            .subscribe((/**
         * @return {?}
         */
        () => this.toggle()));
    }
    /**
     * Opens an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     * @return {?}
     */
    show() {
        if (this._datepicker.isShown) {
            return;
        }
        this.setConfig();
        this._datepickerRef = this._datepicker
            .provide({ provide: BsDatepickerConfig, useValue: this._config })
            .attach(BsDaterangepickerContainerComponent)
            .to(this.container)
            .position({ attachment: this.placement })
            .show({ placement: this.placement });
        // if date changes from external source (model -> view)
        this._subs.push(this.bsValueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this._datepickerRef.instance.value = value;
        })));
        // if date changes from picker (view -> model)
        this._subs.push(this._datepickerRef.instance.valueChange
            .pipe(filter((/**
         * @param {?} range
         * @return {?}
         */
        (range) => range && range[0] && !!range[1])))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this.bsValue = value;
            this.hide();
        })));
    }
    /**
     * Set config for daterangepicker
     * @return {?}
     */
    setConfig() {
        this._config = Object.assign({}, this._config, this.bsConfig, {
            value: this._bsValue,
            isDisabled: this.isDisabled,
            minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
            maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
            daysDisabled: this.daysDisabled || this.bsConfig && this.bsConfig.daysDisabled,
            dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
            datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
            datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled,
            ranges: this.bsConfig && this.bsConfig.ranges
        });
    }
    /**
     * Closes an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     * @return {?}
     */
    hide() {
        if (this.isOpen) {
            this._datepicker.hide();
        }
        for (const sub of this._subs) {
            sub.unsubscribe();
        }
        if (this._config.returnFocusToInput) {
            this._renderer.selectRootElement(this._elementRef.nativeElement).focus();
        }
    }
    /**
     * Toggles an element’s datepicker. This is considered a “manual” triggering
     * of the datepicker.
     * @return {?}
     */
    toggle() {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._datepicker.dispose();
        this.isOpen$.next(false);
        if (this.isDestroy$) {
            this.isDestroy$.next();
            this.isDestroy$.complete();
        }
    }
}
BsDaterangepickerDirective.ɵfac = function BsDaterangepickerDirective_Factory(t) { return new (t || BsDaterangepickerDirective)(ɵngcc0.ɵɵdirectiveInject(BsDaterangepickerConfig), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ViewContainerRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc3.ComponentLoaderFactory)); };
BsDaterangepickerDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: BsDaterangepickerDirective, selectors: [["", "bsDaterangepicker", ""]], inputs: { placement: "placement", triggers: "triggers", outsideClick: "outsideClick", container: "container", outsideEsc: "outsideEsc", isOpen: "isOpen", bsValue: "bsValue", bsConfig: "bsConfig", isDisabled: "isDisabled", minDate: "minDate", maxDate: "maxDate", dateCustomClasses: "dateCustomClasses", daysDisabled: "daysDisabled", datesDisabled: "datesDisabled", datesEnabled: "datesEnabled" }, outputs: { bsValueChange: "bsValueChange", onShown: "onShown", onHidden: "onHidden" }, exportAs: ["bsDaterangepicker"], features: [ɵngcc0.ɵɵNgOnChangesFeature] });
/** @nocollapse */
BsDaterangepickerDirective.ctorParameters = () => [
    { type: BsDaterangepickerConfig },
    { type: ElementRef },
    { type: Renderer2 },
    { type: ViewContainerRef },
    { type: ComponentLoaderFactory }
];
BsDaterangepickerDirective.propDecorators = {
    placement: [{ type: Input }],
    triggers: [{ type: Input }],
    outsideClick: [{ type: Input }],
    container: [{ type: Input }],
    outsideEsc: [{ type: Input }],
    isOpen: [{ type: Input }],
    onShown: [{ type: Output }],
    onHidden: [{ type: Output }],
    bsValue: [{ type: Input }],
    bsConfig: [{ type: Input }],
    isDisabled: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    dateCustomClasses: [{ type: Input }],
    daysDisabled: [{ type: Input }],
    datesDisabled: [{ type: Input }],
    datesEnabled: [{ type: Input }],
    bsValueChange: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDaterangepickerDirective, [{
        type: Directive,
        args: [{
                selector: '[bsDaterangepicker]',
                exportAs: 'bsDaterangepicker'
            }]
    }], function () { return [{ type: BsDaterangepickerConfig }, { type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ViewContainerRef }, { type: ɵngcc3.ComponentLoaderFactory }]; }, { placement: [{
            type: Input
        }], triggers: [{
            type: Input
        }], outsideClick: [{
            type: Input
        }], container: [{
            type: Input
        }], outsideEsc: [{
            type: Input
        }], bsValueChange: [{
            type: Output
        }], onShown: [{
            type: Output
        }], onHidden: [{
            type: Output
        }], isOpen: [{
            type: Input
        }], bsValue: [{
            type: Input
        }], bsConfig: [{
            type: Input
        }], isDisabled: [{
            type: Input
        }], minDate: [{
            type: Input
        }], maxDate: [{
            type: Input
        }], dateCustomClasses: [{
            type: Input
        }], daysDisabled: [{
            type: Input
        }], datesDisabled: [{
            type: Input
        }], datesEnabled: [{
            type: Input
        }] }); })();
if (false) {
    /**
     * Placement of a daterangepicker. Accepts: "top", "bottom", "left", "right"
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.placement;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.triggers;
    /**
     * Close daterangepicker on outside click
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.outsideClick;
    /**
     * A selector specifying the element the daterangepicker should be appended to.
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.container;
    /** @type {?} */
    BsDaterangepickerDirective.prototype.outsideEsc;
    /**
     * Emits an event when the daterangepicker is shown
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.onShown;
    /**
     * Emits an event when the daterangepicker is hidden
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.onHidden;
    /** @type {?} */
    BsDaterangepickerDirective.prototype._bsValue;
    /** @type {?} */
    BsDaterangepickerDirective.prototype.isOpen$;
    /** @type {?} */
    BsDaterangepickerDirective.prototype.isDestroy$;
    /**
     * Config object for daterangepicker
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.bsConfig;
    /**
     * Indicates whether daterangepicker's content is enabled or not
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.isDisabled;
    /**
     * Minimum date which is available for selection
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.minDate;
    /**
     * Maximum date which is available for selection
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.maxDate;
    /**
     * Date custom classes
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.dateCustomClasses;
    /**
     * Disable specific days, e.g. [0,6] will disable all Saturdays and Sundays
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.daysDisabled;
    /**
     * Disable specific dates
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.datesDisabled;
    /**
     * Enable specific dates
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.datesEnabled;
    /**
     * Emits when daterangepicker value has been changed
     * @type {?}
     */
    BsDaterangepickerDirective.prototype.bsValueChange;
    /**
     * @type {?}
     * @protected
     */
    BsDaterangepickerDirective.prototype._subs;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerDirective.prototype._datepicker;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerDirective.prototype._datepickerRef;
    /** @type {?} */
    BsDaterangepickerDirective.prototype._config;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerDirective.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerDirective.prototype._renderer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const BS_DATERANGEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable-next-line: no-use-before-declare */
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => BsDaterangepickerInputDirective)),
    multi: true
};
/** @type {?} */
const BS_DATERANGEPICKER_VALIDATOR = {
    provide: NG_VALIDATORS,
    /* tslint:disable-next-line: no-use-before-declare */
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => BsDaterangepickerInputDirective)),
    multi: true
};
class BsDaterangepickerInputDirective {
    /**
     * @param {?} _picker
     * @param {?} _localeService
     * @param {?} _renderer
     * @param {?} _elRef
     * @param {?} changeDetection
     */
    constructor(_picker, _localeService, _renderer, _elRef, changeDetection) {
        this._picker = _picker;
        this._localeService = _localeService;
        this._renderer = _renderer;
        this._elRef = _elRef;
        this.changeDetection = changeDetection;
        this._onChange = Function.prototype;
        this._onTouched = Function.prototype;
        /* tslint:disable-next-line: no-unused-variable */
        this._validatorChange = Function.prototype;
        // update input value on datepicker value update
        this._picker.bsValueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this._setInputValue(value);
            if (this._value !== value) {
                this._value = value;
                this._onChange(value);
                this._onTouched();
            }
            this.changeDetection.markForCheck();
        }));
        // update input value on locale change
        this._localeService.localeChange.subscribe((/**
         * @return {?}
         */
        () => {
            this._setInputValue(this._value);
        }));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydownEvent(event) {
        if (event.keyCode === 13 || event.code === 'Enter') {
            this.hide();
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _setInputValue(date) {
        /** @type {?} */
        let range = '';
        if (date) {
            /** @type {?} */
            const start = !date[0] ? ''
                : formatDate(date[0], this._picker._config.rangeInputFormat, this._localeService.currentLocale);
            /** @type {?} */
            const end = !date[1] ? ''
                : formatDate(date[1], this._picker._config.rangeInputFormat, this._localeService.currentLocale);
            range = (start && end) ? start + this._picker._config.rangeSeparator + end : '';
        }
        this._renderer.setProperty(this._elRef.nativeElement, 'value', range);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        /* tslint:disable-next-line: no-any*/
        this.writeValue(((/** @type {?} */ (event.target))).value);
        this._onChange(this._value);
        if (this._picker._config.returnFocusToInput) {
            this._renderer.selectRootElement(this._elRef.nativeElement).focus();
        }
        this._onTouched();
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        /** @type {?} */
        const _value = c.value;
        /** @type {?} */
        const errors = [];
        if (_value === null || _value === undefined || !isArray(_value)) {
            return null;
        }
        // @ts-ignore
        _value.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a - b));
        /** @type {?} */
        const _isFirstDateValid = isDateValid(_value[0]);
        /** @type {?} */
        const _isSecondDateValid = isDateValid(_value[1]);
        if (!_isFirstDateValid) {
            return { bsDate: { invalid: _value[0] } };
        }
        if (!_isSecondDateValid) {
            return { bsDate: { invalid: _value[1] } };
        }
        if (this._picker && this._picker.minDate && isBefore(_value[0], this._picker.minDate, 'date')) {
            _value[0] = this._picker.minDate;
            errors.push({ bsDate: { minDate: this._picker.minDate } });
        }
        if (this._picker && this._picker.maxDate && isAfter(_value[1], this._picker.maxDate, 'date')) {
            _value[1] = this._picker.maxDate;
            errors.push({ bsDate: { maxDate: this._picker.maxDate } });
        }
        if (errors.length > 0) {
            this.writeValue(_value);
            return errors;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) {
        this._validatorChange = fn;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (!value) {
            this._value = null;
        }
        else {
            /** @type {?} */
            const _localeKey = this._localeService.currentLocale;
            /** @type {?} */
            const _locale = getLocale(_localeKey);
            if (!_locale) {
                throw new Error(`Locale "${_localeKey}" is not defined, please add it with "defineLocale(...)"`);
            }
            /** @type {?} */
            let _input = [];
            if (typeof value === 'string') {
                _input = value.split(this._picker._config.rangeSeparator);
            }
            if (Array.isArray(value)) {
                _input = value;
            }
            this._value = ((/** @type {?} */ (_input)))
                .map((/**
             * @param {?} _val
             * @return {?}
             */
            (_val) => {
                if (this._picker._config.useUtc) {
                    return utcAsLocal(parseDate(_val, this._picker._config.dateInputFormat, this._localeService.currentLocale));
                }
                return parseDate(_val, this._picker._config.dateInputFormat, this._localeService.currentLocale);
            }))
                .map((/**
             * @param {?} date
             * @return {?}
             */
            (date) => (isNaN(date.valueOf()) ? null : date)));
        }
        this._picker.bsValue = this._value;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._picker.isDisabled = isDisabled;
        if (isDisabled) {
            this._renderer.setAttribute(this._elRef.nativeElement, 'disabled', 'disabled');
            return;
        }
        this._renderer.removeAttribute(this._elRef.nativeElement, 'disabled');
    }
    /* tslint:disable-next-line: no-any*/
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /* tslint:disable-next-line: no-any*/
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * @return {?}
     */
    onBlur() {
        this._onTouched();
    }
    /**
     * @return {?}
     */
    hide() {
        this._picker.hide();
        this._renderer.selectRootElement(this._elRef.nativeElement).blur();
        if (this._picker._config.returnFocusToInput) {
            this._renderer.selectRootElement(this._elRef.nativeElement).focus();
        }
    }
}
BsDaterangepickerInputDirective.ɵfac = function BsDaterangepickerInputDirective_Factory(t) { return new (t || BsDaterangepickerInputDirective)(ɵngcc0.ɵɵdirectiveInject(BsDaterangepickerDirective, 1), ɵngcc0.ɵɵdirectiveInject(BsLocaleService), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
BsDaterangepickerInputDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: BsDaterangepickerInputDirective, selectors: [["input", "bsDaterangepicker", ""]], hostBindings: function BsDaterangepickerInputDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("change", function BsDaterangepickerInputDirective_change_HostBindingHandler($event) { return ctx.onChange($event); })("keyup.esc", function BsDaterangepickerInputDirective_keyup_esc_HostBindingHandler() { return ctx.hide(); })("keydown", function BsDaterangepickerInputDirective_keydown_HostBindingHandler($event) { return ctx.onKeydownEvent($event); })("blur", function BsDaterangepickerInputDirective_blur_HostBindingHandler() { return ctx.onBlur(); });
    } }, features: [ɵngcc0.ɵɵProvidersFeature([BS_DATERANGEPICKER_VALUE_ACCESSOR, BS_DATERANGEPICKER_VALIDATOR])] });
/** @nocollapse */
BsDaterangepickerInputDirective.ctorParameters = () => [
    { type: BsDaterangepickerDirective, decorators: [{ type: Host }] },
    { type: BsLocaleService },
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDaterangepickerInputDirective, [{
        type: Directive,
        args: [{
                selector: `input[bsDaterangepicker]`,
                host: {
                    '(change)': 'onChange($event)',
                    '(keyup.esc)': 'hide()',
                    '(keydown)': 'onKeydownEvent($event)',
                    '(blur)': 'onBlur()'
                },
                providers: [BS_DATERANGEPICKER_VALUE_ACCESSOR, BS_DATERANGEPICKER_VALIDATOR]
            }]
    }], function () { return [{ type: BsDaterangepickerDirective, decorators: [{
                type: Host
            }] }, { type: BsLocaleService }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ElementRef }, { type: ɵngcc0.ChangeDetectorRef }]; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerInputDirective.prototype._onChange;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerInputDirective.prototype._onTouched;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerInputDirective.prototype._validatorChange;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerInputDirective.prototype._value;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerInputDirective.prototype._picker;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerInputDirective.prototype._localeService;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerInputDirective.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerInputDirective.prototype._elRef;
    /**
     * @type {?}
     * @private
     */
    BsDaterangepickerInputDirective.prototype.changeDetection;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsCalendarLayoutComponent {
}
BsCalendarLayoutComponent.ɵfac = function BsCalendarLayoutComponent_Factory(t) { return new (t || BsCalendarLayoutComponent)(); };
BsCalendarLayoutComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BsCalendarLayoutComponent, selectors: [["bs-calendar-layout"]], ngContentSelectors: _c1, decls: 6, vars: 2, consts: [["title", "hey there", 4, "ngIf"], [1, "bs-datepicker-head"], [1, "bs-datepicker-body"], [4, "ngIf"], ["title", "hey there"]], template: function BsCalendarLayoutComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef(_c0);
        ɵngcc0.ɵɵtemplate(0, BsCalendarLayoutComponent_bs_current_date_0_Template, 1, 0, "bs-current-date", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵprojection(2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "div", 2);
        ɵngcc0.ɵɵprojection(4, 1);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(5, BsCalendarLayoutComponent_bs_timepicker_5_Template, 1, 0, "bs-timepicker", 3);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", false);
        ɵngcc0.ɵɵadvance(5);
        ɵngcc0.ɵɵproperty("ngIf", false);
    } }, directives: function () { return [ɵngcc2.NgIf, BsCurrentDateViewComponent, BsTimepickerViewComponent]; }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsCalendarLayoutComponent, [{
        type: Component,
        args: [{
                selector: 'bs-calendar-layout',
                template: `
    <!-- current date, will be added in nearest releases -->
    <bs-current-date title="hey there" *ngIf="false"></bs-current-date>

    <!--navigation-->
    <div class="bs-datepicker-head">
      <ng-content select="bs-datepicker-navigation-view"></ng-content>
    </div>

    <div class="bs-datepicker-body">
      <ng-content></ng-content>
    </div>

    <!--timepicker-->
    <bs-timepicker *ngIf="false"></bs-timepicker>
  `
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsCurrentDateViewComponent {
}
BsCurrentDateViewComponent.ɵfac = function BsCurrentDateViewComponent_Factory(t) { return new (t || BsCurrentDateViewComponent)(); };
BsCurrentDateViewComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BsCurrentDateViewComponent, selectors: [["bs-current-date"]], inputs: { title: "title" }, decls: 3, vars: 1, consts: [[1, "current-timedate"]], template: function BsCurrentDateViewComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "span");
        ɵngcc0.ɵɵtext(2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵtextInterpolate(ctx.title);
    } }, encapsulation: 2 });
BsCurrentDateViewComponent.propDecorators = {
    title: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsCurrentDateViewComponent, [{
        type: Component,
        args: [{
                selector: 'bs-current-date',
                template: `<div class="current-timedate"><span>{{ title }}</span></div>`
            }]
    }], null, { title: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    BsCurrentDateViewComponent.prototype.title;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function BsCustomDates() { }
if (false) {
    /** @type {?} */
    BsCustomDates.prototype.label;
    /** @type {?} */
    BsCustomDates.prototype.value;
}
class BsCustomDatesViewComponent {
    constructor() {
        this.onSelect = new EventEmitter();
        this.customRange = null;
    }
    /**
     * @param {?} range
     * @return {?}
     */
    selectFromRanges(range) {
        this.onSelect.emit(range);
    }
    /**
     * @return {?}
     */
    checkRange() {
        return this.ranges ? this.ranges.filter((/**
         * @param {?} range
         * @return {?}
         */
        range => range.value === this.selectedRange)).length > 0 : false;
    }
}
BsCustomDatesViewComponent.ɵfac = function BsCustomDatesViewComponent_Factory(t) { return new (t || BsCustomDatesViewComponent)(); };
BsCustomDatesViewComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BsCustomDatesViewComponent, selectors: [["bs-custom-date-view"]], inputs: { ranges: "ranges", selectedRange: "selectedRange" }, outputs: { onSelect: "onSelect" }, decls: 4, vars: 3, consts: [[1, "bs-datepicker-predefined-btns"], ["type", "button", "class", "btn", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", 3, "click"]], template: function BsCustomDatesViewComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, BsCustomDatesViewComponent_button_1_Template, 2, 3, "button", 1);
        ɵngcc0.ɵɵelementStart(2, "button", 2);
        ɵngcc0.ɵɵlistener("click", function BsCustomDatesViewComponent_Template_button_click_2_listener() { return ctx.selectFromRanges(ctx.customRange); });
        ɵngcc0.ɵɵtext(3, " Custom Range ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.ranges);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵclassProp("selected", !ctx.checkRange());
    } }, directives: [ɵngcc2.NgForOf], encapsulation: 2, changeDetection: 0 });
BsCustomDatesViewComponent.propDecorators = {
    ranges: [{ type: Input }],
    selectedRange: [{ type: Input }],
    onSelect: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsCustomDatesViewComponent, [{
        type: Component,
        args: [{
                selector: 'bs-custom-date-view',
                template: `
    <div class="bs-datepicker-predefined-btns">
      <button *ngFor="let range of ranges"
        type="button"
        class="btn"
        (click)="selectFromRanges(range)"
        [class.selected]="range.value === selectedRange">
        {{ range.label }}
      </button>
      <button
        type="button"
        class="btn"
        (click)="selectFromRanges(customRange)"
        [class.selected]="!checkRange()">
        Custom Range
      </button>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return []; }, { onSelect: [{
            type: Output
        }], ranges: [{
            type: Input
        }], selectedRange: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    BsCustomDatesViewComponent.prototype.ranges;
    /** @type {?} */
    BsCustomDatesViewComponent.prototype.selectedRange;
    /** @type {?} */
    BsCustomDatesViewComponent.prototype.onSelect;
    /** @type {?} */
    BsCustomDatesViewComponent.prototype.customRange;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDatepickerDayDecoratorComponent {
    /**
     * @param {?} _config
     * @param {?} _elRef
     * @param {?} _renderer
     */
    constructor(_config, _elRef, _renderer) {
        this._config = _config;
        this._elRef = _elRef;
        this._renderer = _renderer;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.day.isToday && this._config && this._config.customTodayClass) {
            this._renderer.addClass(this._elRef.nativeElement, this._config.customTodayClass);
        }
        if (typeof this.day.customClasses === 'string') {
            this.day.customClasses.split(' ')
                .filter((/**
             * @param {?} className
             * @return {?}
             */
            (className) => className))
                .forEach((/**
             * @param {?} className
             * @return {?}
             */
            (className) => {
                this._renderer.addClass(this._elRef.nativeElement, className);
            }));
        }
    }
}
BsDatepickerDayDecoratorComponent.ɵfac = function BsDatepickerDayDecoratorComponent_Factory(t) { return new (t || BsDatepickerDayDecoratorComponent)(ɵngcc0.ɵɵdirectiveInject(BsDatepickerConfig), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
BsDatepickerDayDecoratorComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BsDatepickerDayDecoratorComponent, selectors: [["", "bsDatepickerDayDecorator", ""]], hostVars: 16, hostBindings: function BsDatepickerDayDecoratorComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("disabled", ctx.day.isDisabled)("is-highlighted", ctx.day.isHovered)("is-other-month", ctx.day.isOtherMonth)("is-active-other-month", ctx.day.isOtherMonthHovered)("in-range", ctx.day.isInRange)("select-start", ctx.day.isSelectionStart)("select-end", ctx.day.isSelectionEnd)("selected", ctx.day.isSelected);
    } }, inputs: { day: "day" }, attrs: _c2, decls: 1, vars: 1, template: function BsDatepickerDayDecoratorComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtext(0);
    } if (rf & 2) {
        ɵngcc0.ɵɵtextInterpolate(ctx.day.label);
    } }, encapsulation: 2, changeDetection: 0 });
/** @nocollapse */
BsDatepickerDayDecoratorComponent.ctorParameters = () => [
    { type: BsDatepickerConfig },
    { type: ElementRef },
    { type: Renderer2 }
];
BsDatepickerDayDecoratorComponent.propDecorators = {
    day: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDatepickerDayDecoratorComponent, [{
        type: Component,
        args: [{
                selector: '[bsDatepickerDayDecorator]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.disabled]': 'day.isDisabled',
                    '[class.is-highlighted]': 'day.isHovered',
                    '[class.is-other-month]': 'day.isOtherMonth',
                    '[class.is-active-other-month]': 'day.isOtherMonthHovered',
                    '[class.in-range]': 'day.isInRange',
                    '[class.select-start]': 'day.isSelectionStart',
                    '[class.select-end]': 'day.isSelectionEnd',
                    '[class.selected]': 'day.isSelected'
                },
                template: `{{ day.label }}`
            }]
    }], function () { return [{ type: BsDatepickerConfig }, { type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }]; }, { day: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    BsDatepickerDayDecoratorComponent.prototype.day;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerDayDecoratorComponent.prototype._config;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerDayDecoratorComponent.prototype._elRef;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerDayDecoratorComponent.prototype._renderer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * **************
 * @record
 */
function NavigationViewModel() { }
if (false) {
    /** @type {?} */
    NavigationViewModel.prototype.monthTitle;
    /** @type {?} */
    NavigationViewModel.prototype.yearTitle;
    /** @type {?|undefined} */
    NavigationViewModel.prototype.hideLeftArrow;
    /** @type {?|undefined} */
    NavigationViewModel.prototype.hideRightArrow;
    /** @type {?|undefined} */
    NavigationViewModel.prototype.disableLeftArrow;
    /** @type {?|undefined} */
    NavigationViewModel.prototype.disableRightArrow;
}
/**
 * @record
 */
function CalendarCellViewModel() { }
if (false) {
    /** @type {?} */
    CalendarCellViewModel.prototype.date;
    /** @type {?} */
    CalendarCellViewModel.prototype.label;
    /** @type {?|undefined} */
    CalendarCellViewModel.prototype.isDisabled;
    /** @type {?|undefined} */
    CalendarCellViewModel.prototype.isHovered;
    /** @type {?|undefined} */
    CalendarCellViewModel.prototype.isSelected;
}
/**
 * **************
 * @record
 */
function DayViewModel() { }
if (false) {
    /** @type {?|undefined} */
    DayViewModel.prototype.isOtherMonthHovered;
    /** @type {?|undefined} */
    DayViewModel.prototype.isOtherMonth;
    /** @type {?|undefined} */
    DayViewModel.prototype.isInRange;
    /** @type {?|undefined} */
    DayViewModel.prototype.isSelectionStart;
    /** @type {?|undefined} */
    DayViewModel.prototype.isSelectionEnd;
    /** @type {?|undefined} */
    DayViewModel.prototype.isToday;
    /** @type {?|undefined} */
    DayViewModel.prototype.customClasses;
    /** @type {?|undefined} */
    DayViewModel.prototype.monthIndex;
    /** @type {?|undefined} */
    DayViewModel.prototype.weekIndex;
    /** @type {?|undefined} */
    DayViewModel.prototype.dayIndex;
}
/**
 * @record
 */
function WeekViewModel() { }
if (false) {
    /** @type {?} */
    WeekViewModel.prototype.days;
    /** @type {?|undefined} */
    WeekViewModel.prototype.isHovered;
}
/**
 * @record
 */
function DaysCalendarViewModel() { }
if (false) {
    /** @type {?} */
    DaysCalendarViewModel.prototype.weeks;
    /** @type {?} */
    DaysCalendarViewModel.prototype.month;
    /** @type {?} */
    DaysCalendarViewModel.prototype.weekNumbers;
    /** @type {?} */
    DaysCalendarViewModel.prototype.weekdays;
}
/**
 * **************
 * @record
 */
function MonthsCalendarViewModel() { }
if (false) {
    /** @type {?} */
    MonthsCalendarViewModel.prototype.months;
}
/**
 * **************
 * @record
 */
function YearsCalendarViewModel() { }
if (false) {
    /** @type {?} */
    YearsCalendarViewModel.prototype.years;
}
/**
 * **************
 * @record
 */
function DaysCalendarModel() { }
if (false) {
    /** @type {?} */
    DaysCalendarModel.prototype.daysMatrix;
    /** @type {?} */
    DaysCalendarModel.prototype.month;
}
/**
 * **************
 * @record
 */
function MonthViewOptions() { }
if (false) {
    /** @type {?|undefined} */
    MonthViewOptions.prototype.width;
    /** @type {?|undefined} */
    MonthViewOptions.prototype.height;
    /** @type {?|undefined} */
    MonthViewOptions.prototype.firstDayOfWeek;
}
/**
 * **************
 * @record
 */
function DatepickerFormatOptions() { }
if (false) {
    /** @type {?} */
    DatepickerFormatOptions.prototype.locale;
    /** @type {?} */
    DatepickerFormatOptions.prototype.monthTitle;
    /** @type {?} */
    DatepickerFormatOptions.prototype.yearTitle;
    /** @type {?} */
    DatepickerFormatOptions.prototype.dayLabel;
    /** @type {?} */
    DatepickerFormatOptions.prototype.monthLabel;
    /** @type {?} */
    DatepickerFormatOptions.prototype.yearLabel;
    /** @type {?} */
    DatepickerFormatOptions.prototype.weekNumbers;
}
/**
 * @record
 */
function DatepickerRenderOptions() { }
if (false) {
    /** @type {?|undefined} */
    DatepickerRenderOptions.prototype.showWeekNumbers;
    /** @type {?|undefined} */
    DatepickerRenderOptions.prototype.displayMonths;
}
/**
 * @record
 */
function DatepickerDateCustomClasses() { }
if (false) {
    /** @type {?} */
    DatepickerDateCustomClasses.prototype.date;
    /** @type {?} */
    DatepickerDateCustomClasses.prototype.classes;
}
/** @enum {number} */
const BsNavigationDirection = {
    UP: 0,
    DOWN: 1,
};
BsNavigationDirection[BsNavigationDirection.UP] = 'UP';
BsNavigationDirection[BsNavigationDirection.DOWN] = 'DOWN';
/**
 * @record
 */
function BsNavigationEvent() { }
if (false) {
    /** @type {?|undefined} */
    BsNavigationEvent.prototype.direction;
    /** @type {?|undefined} */
    BsNavigationEvent.prototype.step;
}
/**
 * @record
 */
function BsViewNavigationEvent() { }
if (false) {
    /** @type {?|undefined} */
    BsViewNavigationEvent.prototype.unit;
    /** @type {?} */
    BsViewNavigationEvent.prototype.viewMode;
}
/**
 * @record
 */
function CellHoverEvent() { }
if (false) {
    /** @type {?} */
    CellHoverEvent.prototype.cell;
    /** @type {?} */
    CellHoverEvent.prototype.isHovered;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDatepickerNavigationViewComponent {
    constructor() {
        this.onNavigate = new EventEmitter();
        this.onViewMode = new EventEmitter();
    }
    /**
     * @param {?} down
     * @return {?}
     */
    navTo(down) {
        this.onNavigate.emit(down ? BsNavigationDirection.DOWN : BsNavigationDirection.UP);
    }
    /**
     * @param {?} viewMode
     * @return {?}
     */
    view(viewMode) {
        this.onViewMode.emit(viewMode);
    }
}
BsDatepickerNavigationViewComponent.ɵfac = function BsDatepickerNavigationViewComponent_Factory(t) { return new (t || BsDatepickerNavigationViewComponent)(); };
BsDatepickerNavigationViewComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BsDatepickerNavigationViewComponent, selectors: [["bs-datepicker-navigation-view"]], inputs: { calendar: "calendar" }, outputs: { onNavigate: "onNavigate", onViewMode: "onViewMode" }, decls: 12, vars: 8, consts: [["type", "button", 1, "previous", 3, "disabled", "click"], [4, "ngIf"], ["type", "button", 1, "current", 3, "click"], ["type", "button", 1, "next", 3, "disabled", "click"]], template: function BsDatepickerNavigationViewComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "button", 0);
        ɵngcc0.ɵɵlistener("click", function BsDatepickerNavigationViewComponent_Template_button_click_0_listener() { return ctx.navTo(true); });
        ɵngcc0.ɵɵelementStart(1, "span");
        ɵngcc0.ɵɵtext(2, "\u2039");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(3, BsDatepickerNavigationViewComponent_ng_container_3_Template, 5, 1, "ng-container", 1);
        ɵngcc0.ɵɵtext(4, " \u200B ");
        ɵngcc0.ɵɵelementStart(5, "button", 2);
        ɵngcc0.ɵɵlistener("click", function BsDatepickerNavigationViewComponent_Template_button_click_5_listener() { return ctx.view("year"); });
        ɵngcc0.ɵɵelementStart(6, "span");
        ɵngcc0.ɵɵtext(7);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtext(8, " \u200B ");
        ɵngcc0.ɵɵelementStart(9, "button", 3);
        ɵngcc0.ɵɵlistener("click", function BsDatepickerNavigationViewComponent_Template_button_click_9_listener() { return ctx.navTo(false); });
        ɵngcc0.ɵɵelementStart(10, "span");
        ɵngcc0.ɵɵtext(11, "\u203A");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("visibility", ctx.calendar.hideLeftArrow ? "hidden" : "visible");
        ɵngcc0.ɵɵproperty("disabled", ctx.calendar.disableLeftArrow);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngIf", ctx.calendar.monthTitle);
        ɵngcc0.ɵɵadvance(4);
        ɵngcc0.ɵɵtextInterpolate(ctx.calendar.yearTitle);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵstyleProp("visibility", ctx.calendar.hideRightArrow ? "hidden" : "visible");
        ɵngcc0.ɵɵproperty("disabled", ctx.calendar.disableRightArrow);
    } }, directives: [ɵngcc2.NgIf], encapsulation: 2, changeDetection: 0 });
BsDatepickerNavigationViewComponent.propDecorators = {
    calendar: [{ type: Input }],
    onNavigate: [{ type: Output }],
    onViewMode: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDatepickerNavigationViewComponent, [{
        type: Component,
        args: [{
                selector: 'bs-datepicker-navigation-view',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <button class="previous"
            [disabled]="calendar.disableLeftArrow"
            [style.visibility]="calendar.hideLeftArrow ? 'hidden' : 'visible'"
            type="button"
            (click)="navTo(true)">
      <span>&lsaquo;</span>
    </button>

    <ng-container *ngIf="calendar.monthTitle">
      &#8203;  <!-- zero-width space needed for correct alignement
                  with preserveWhitespaces: false in Angular -->

      <button class="current"
            type="button"
            (click)="view('month')"
      ><span>{{ calendar.monthTitle }}</span>
      </button>
    </ng-container>

    &#8203;  <!-- zero-width space needed for correct alignement
                  with preserveWhitespaces: false in Angular -->

    <button class="current" (click)="view('year')" type="button">
      <span>{{ calendar.yearTitle }}</span>
    </button>

    &#8203;  <!-- zero-width space needed for correct alignement
                  with preserveWhitespaces: false in Angular -->

    <button class="next"
            [disabled]="calendar.disableRightArrow"
            [style.visibility]="calendar.hideRightArrow ? 'hidden' : 'visible'"
            type="button"
            (click)="navTo(false)"><span>&rsaquo;</span>
    </button>
  `
            }]
    }], function () { return []; }, { onNavigate: [{
            type: Output
        }], onViewMode: [{
            type: Output
        }], calendar: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    BsDatepickerNavigationViewComponent.prototype.calendar;
    /** @type {?} */
    BsDatepickerNavigationViewComponent.prototype.onNavigate;
    /** @type {?} */
    BsDatepickerNavigationViewComponent.prototype.onViewMode;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDaysCalendarViewComponent {
    /**
     * @param {?} _config
     */
    constructor(_config) {
        this._config = _config;
        this.onNavigate = new EventEmitter();
        this.onViewMode = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onHover = new EventEmitter();
        this.onHoverWeek = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    navigateTo(event) {
        /** @type {?} */
        const step = BsNavigationDirection.DOWN === event ? -1 : 1;
        this.onNavigate.emit({ step: { month: step } });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeViewMode(event) {
        this.onViewMode.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    selectDay(event) {
        this.onSelect.emit(event);
    }
    /**
     * @param {?} week
     * @return {?}
     */
    selectWeek(week) {
        if (!this._config.selectWeek && !this._config.selectWeekDateRange) {
            return;
        }
        if (week.days.length === 0) {
            return;
        }
        if (this._config.selectWeek && week.days[0]
            && !week.days[0].isDisabled
            && this._config.selectFromOtherMonth) {
            this.onSelect.emit(week.days[0]);
            return;
        }
        /** @type {?} */
        const selectedDay = week.days.find((/**
         * @param {?} day
         * @return {?}
         */
        (day) => {
            return this._config.selectFromOtherMonth
                ? !day.isDisabled
                : !day.isOtherMonth && !day.isDisabled;
        }));
        this.onSelect.emit(selectedDay);
        if (this._config.selectWeekDateRange) {
            /** @type {?} */
            const days = week.days.slice(0);
            /** @type {?} */
            const lastDayOfRange = days.reverse().find((/**
             * @param {?} day
             * @return {?}
             */
            (day) => {
                return this._config.selectFromOtherMonth
                    ? !day.isDisabled
                    : !day.isOtherMonth && !day.isDisabled;
            }));
            this.onSelect.emit(lastDayOfRange);
        }
    }
    /**
     * @param {?} cell
     * @param {?} isHovered
     * @return {?}
     */
    weekHoverHandler(cell, isHovered) {
        if (!this._config.selectWeek && !this._config.selectWeekDateRange) {
            return;
        }
        /** @type {?} */
        const hasActiveDays = cell.days.find((/**
         * @param {?} day
         * @return {?}
         */
        (day) => {
            return this._config.selectFromOtherMonth
                ? !day.isDisabled
                : !day.isOtherMonth && !day.isDisabled;
        }));
        if (hasActiveDays) {
            cell.isHovered = isHovered;
            this.isWeekHovered = isHovered;
            this.onHoverWeek.emit(cell);
        }
    }
    /**
     * @param {?} cell
     * @param {?} isHovered
     * @return {?}
     */
    hoverDay(cell, isHovered) {
        if (this._config.selectFromOtherMonth && cell.isOtherMonth) {
            cell.isOtherMonthHovered = isHovered;
        }
        this.onHover.emit({ cell, isHovered });
    }
}
BsDaysCalendarViewComponent.ɵfac = function BsDaysCalendarViewComponent_Factory(t) { return new (t || BsDaysCalendarViewComponent)(ɵngcc0.ɵɵdirectiveInject(BsDatepickerConfig)); };
BsDaysCalendarViewComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BsDaysCalendarViewComponent, selectors: [["bs-days-calendar-view"]], inputs: { calendar: "calendar", options: "options" }, outputs: { onNavigate: "onNavigate", onViewMode: "onViewMode", onSelect: "onSelect", onHover: "onHover", onHoverWeek: "onHoverWeek" }, decls: 9, vars: 4, consts: [[3, "calendar", "onNavigate", "onViewMode"], ["role", "grid", 1, "days", "weeks"], [4, "ngIf"], ["aria-label", "weekday", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], ["aria-label", "weekday"], ["class", "week", 3, "active-week", 4, "ngIf"], ["role", "gridcell", 4, "ngFor", "ngForOf"], [1, "week"], [3, "click", "mouseenter", "mouseleave"], ["role", "gridcell"], ["bsDatepickerDayDecorator", "", 3, "day", "click", "mouseenter", "mouseleave"]], template: function BsDaysCalendarViewComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "bs-calendar-layout");
        ɵngcc0.ɵɵelementStart(1, "bs-datepicker-navigation-view", 0);
        ɵngcc0.ɵɵlistener("onNavigate", function BsDaysCalendarViewComponent_Template_bs_datepicker_navigation_view_onNavigate_1_listener($event) { return ctx.navigateTo($event); })("onViewMode", function BsDaysCalendarViewComponent_Template_bs_datepicker_navigation_view_onViewMode_1_listener($event) { return ctx.changeViewMode($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(2, "table", 1);
        ɵngcc0.ɵɵelementStart(3, "thead");
        ɵngcc0.ɵɵelementStart(4, "tr");
        ɵngcc0.ɵɵtemplate(5, BsDaysCalendarViewComponent_th_5_Template, 1, 0, "th", 2);
        ɵngcc0.ɵɵtemplate(6, BsDaysCalendarViewComponent_th_6_Template, 2, 1, "th", 3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(7, "tbody");
        ɵngcc0.ɵɵtemplate(8, BsDaysCalendarViewComponent_tr_8_Template, 3, 2, "tr", 4);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("calendar", ctx.calendar);
        ɵngcc0.ɵɵadvance(4);
        ɵngcc0.ɵɵproperty("ngIf", ctx.options.showWeekNumbers);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.calendar.weekdays);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.calendar.weeks);
    } }, directives: [BsCalendarLayoutComponent, BsDatepickerNavigationViewComponent, ɵngcc2.NgIf, ɵngcc2.NgForOf, BsDatepickerDayDecoratorComponent], encapsulation: 2 });
/** @nocollapse */
BsDaysCalendarViewComponent.ctorParameters = () => [
    { type: BsDatepickerConfig }
];
BsDaysCalendarViewComponent.propDecorators = {
    calendar: [{ type: Input }],
    options: [{ type: Input }],
    onNavigate: [{ type: Output }],
    onViewMode: [{ type: Output }],
    onSelect: [{ type: Output }],
    onHover: [{ type: Output }],
    onHoverWeek: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDaysCalendarViewComponent, [{
        type: Component,
        args: [{
                selector: 'bs-days-calendar-view',
                // changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <bs-calendar-layout>
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>

      <!--days matrix-->
      <table role="grid" class="days weeks">
        <thead>
        <tr>
          <!--if show weeks-->
          <th *ngIf="options.showWeekNumbers"></th>
          <th *ngFor="let weekday of calendar.weekdays; let i = index"
              aria-label="weekday">{{ calendar.weekdays[i] }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let week of calendar.weeks; let i = index">
          <td class="week" [class.active-week]="isWeekHovered"  *ngIf="options.showWeekNumbers">
            <span
                (click)="selectWeek(week)"
                (mouseenter)="weekHoverHandler(week, true)"
                (mouseleave)="weekHoverHandler(week, false)">{{ calendar.weekNumbers[i] }}</span>
          </td>
          <td *ngFor="let day of week.days" role="gridcell">
          <span bsDatepickerDayDecorator
                [day]="day"
                (click)="selectDay(day)"
                (mouseenter)="hoverDay(day, true)"
                (mouseleave)="hoverDay(day, false)">{{ day.label }}</span>
          </td>
        </tr>
        </tbody>
      </table>

    </bs-calendar-layout>
  `
            }]
    }], function () { return [{ type: BsDatepickerConfig }]; }, { onNavigate: [{
            type: Output
        }], onViewMode: [{
            type: Output
        }], onSelect: [{
            type: Output
        }], onHover: [{
            type: Output
        }], onHoverWeek: [{
            type: Output
        }], calendar: [{
            type: Input
        }], options: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    BsDaysCalendarViewComponent.prototype.calendar;
    /** @type {?} */
    BsDaysCalendarViewComponent.prototype.options;
    /** @type {?} */
    BsDaysCalendarViewComponent.prototype.onNavigate;
    /** @type {?} */
    BsDaysCalendarViewComponent.prototype.onViewMode;
    /** @type {?} */
    BsDaysCalendarViewComponent.prototype.onSelect;
    /** @type {?} */
    BsDaysCalendarViewComponent.prototype.onHover;
    /** @type {?} */
    BsDaysCalendarViewComponent.prototype.onHoverWeek;
    /** @type {?} */
    BsDaysCalendarViewComponent.prototype.isWeekHovered;
    /**
     * @type {?}
     * @private
     */
    BsDaysCalendarViewComponent.prototype._config;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsMonthCalendarViewComponent {
    constructor() {
        this.onNavigate = new EventEmitter();
        this.onViewMode = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onHover = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    navigateTo(event) {
        /** @type {?} */
        const step = BsNavigationDirection.DOWN === event ? -1 : 1;
        this.onNavigate.emit({ step: { year: step } });
    }
    /**
     * @param {?} month
     * @return {?}
     */
    viewMonth(month) {
        this.onSelect.emit(month);
    }
    /**
     * @param {?} cell
     * @param {?} isHovered
     * @return {?}
     */
    hoverMonth(cell, isHovered) {
        this.onHover.emit({ cell, isHovered });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeViewMode(event) {
        this.onViewMode.emit(event);
    }
}
BsMonthCalendarViewComponent.ɵfac = function BsMonthCalendarViewComponent_Factory(t) { return new (t || BsMonthCalendarViewComponent)(); };
BsMonthCalendarViewComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BsMonthCalendarViewComponent, selectors: [["bs-month-calendar-view"]], inputs: { calendar: "calendar" }, outputs: { onNavigate: "onNavigate", onViewMode: "onViewMode", onSelect: "onSelect", onHover: "onHover" }, decls: 5, vars: 2, consts: [[3, "calendar", "onNavigate", "onViewMode"], ["role", "grid", 1, "months"], [4, "ngFor", "ngForOf"], ["role", "gridcell", 3, "disabled", "is-highlighted", "click", "mouseenter", "mouseleave", 4, "ngFor", "ngForOf"], ["role", "gridcell", 3, "click", "mouseenter", "mouseleave"]], template: function BsMonthCalendarViewComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "bs-calendar-layout");
        ɵngcc0.ɵɵelementStart(1, "bs-datepicker-navigation-view", 0);
        ɵngcc0.ɵɵlistener("onNavigate", function BsMonthCalendarViewComponent_Template_bs_datepicker_navigation_view_onNavigate_1_listener($event) { return ctx.navigateTo($event); })("onViewMode", function BsMonthCalendarViewComponent_Template_bs_datepicker_navigation_view_onViewMode_1_listener($event) { return ctx.changeViewMode($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(2, "table", 1);
        ɵngcc0.ɵɵelementStart(3, "tbody");
        ɵngcc0.ɵɵtemplate(4, BsMonthCalendarViewComponent_tr_4_Template, 2, 1, "tr", 2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("calendar", ctx.calendar);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.calendar.months);
    } }, directives: [BsCalendarLayoutComponent, BsDatepickerNavigationViewComponent, ɵngcc2.NgForOf], encapsulation: 2 });
BsMonthCalendarViewComponent.propDecorators = {
    calendar: [{ type: Input }],
    onNavigate: [{ type: Output }],
    onViewMode: [{ type: Output }],
    onSelect: [{ type: Output }],
    onHover: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsMonthCalendarViewComponent, [{
        type: Component,
        args: [{
                selector: 'bs-month-calendar-view',
                template: `
    <bs-calendar-layout>
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>

      <table role="grid" class="months">
        <tbody>
        <tr *ngFor="let row of calendar.months">
          <td *ngFor="let month of row" role="gridcell"
              (click)="viewMonth(month)"
              (mouseenter)="hoverMonth(month, true)"
              (mouseleave)="hoverMonth(month, false)"
              [class.disabled]="month.isDisabled"
              [class.is-highlighted]="month.isHovered">
            <span [class.selected]="month.isSelected">{{ month.label }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </bs-calendar-layout>
  `
            }]
    }], function () { return []; }, { onNavigate: [{
            type: Output
        }], onViewMode: [{
            type: Output
        }], onSelect: [{
            type: Output
        }], onHover: [{
            type: Output
        }], calendar: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    BsMonthCalendarViewComponent.prototype.calendar;
    /** @type {?} */
    BsMonthCalendarViewComponent.prototype.onNavigate;
    /** @type {?} */
    BsMonthCalendarViewComponent.prototype.onViewMode;
    /** @type {?} */
    BsMonthCalendarViewComponent.prototype.onSelect;
    /** @type {?} */
    BsMonthCalendarViewComponent.prototype.onHover;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsTimepickerViewComponent {
    constructor() {
        this.ampm = 'ok';
        this.hours = 0;
        this.minutes = 0;
    }
}
BsTimepickerViewComponent.ɵfac = function BsTimepickerViewComponent_Factory(t) { return new (t || BsTimepickerViewComponent)(); };
BsTimepickerViewComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BsTimepickerViewComponent, selectors: [["bs-timepicker"]], decls: 16, vars: 3, consts: [[1, "bs-timepicker-container"], [1, "bs-timepicker-controls"], ["type", "button", 1, "bs-decrease"], ["type", "text", "placeholder", "00", 3, "value"], ["type", "button", 1, "bs-increase"], ["type", "button", 1, "switch-time-format"], ["src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAABSElEQVQYV3XQPUvDUBQG4HNuagtVqc6KgouCv6GIuIntYBLB9hcIQpLStCAIV7DYmpTcRWcXqZio3Vwc/UCc/QEqfgyKGbr0I7nS1EiHeqYzPO/h5SD0jaxUZjmSLCB+OFb+UFINFwASAEAdpu9gaGXVyAHHFQBkHpKHc6a9dzECvADyY9sqlAMsK9W0jzxDXqeytr3mhQckxSji27TJJ5/rPmIpwJJq3HrtduriYOurv1a4i1p5HnhkG9OFymi0ReoO05cGwb+ayv4dysVygjeFmsP05f8wpZQ8fsdvfmuY9zjWSNqUtgYFVnOVReILYoBFzdQI5/GGFzNHhGbeZnopDGU29sZbscgldmC99w35VOATTycIMMcBXIfpSVGzZhA6C8hh00conln6VQ9TGgV32OEAKQC4DrBq7CJwd0ggR7Vq/rPrfgB+C3sGypY5DAAAAABJRU5ErkJggg==", "alt", ""]], template: function BsTimepickerViewComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "button", 2);
        ɵngcc0.ɵɵtext(3, "-");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(4, "input", 3);
        ɵngcc0.ɵɵelementStart(5, "button", 4);
        ɵngcc0.ɵɵtext(6, "+");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(7, "div", 1);
        ɵngcc0.ɵɵelementStart(8, "button", 2);
        ɵngcc0.ɵɵtext(9, "-");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(10, "input", 3);
        ɵngcc0.ɵɵelementStart(11, "button", 4);
        ɵngcc0.ɵɵtext(12, "+");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(13, "button", 5);
        ɵngcc0.ɵɵtext(14);
        ɵngcc0.ɵɵelement(15, "img", 6);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(4);
        ɵngcc0.ɵɵproperty("value", ctx.hours);
        ɵngcc0.ɵɵadvance(6);
        ɵngcc0.ɵɵproperty("value", ctx.minutes);
        ɵngcc0.ɵɵadvance(4);
        ɵngcc0.ɵɵtextInterpolate1("", ctx.ampm, " ");
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsTimepickerViewComponent, [{
        type: Component,
        args: [{
                selector: 'bs-timepicker',
                template: `
    <div class="bs-timepicker-container">
      <div class="bs-timepicker-controls">
        <button class="bs-decrease" type="button">-</button>
        <input type="text" [value]="hours" placeholder="00">
        <button class="bs-increase" type="button">+</button>
      </div>
      <div class="bs-timepicker-controls">
        <button class="bs-decrease" type="button">-</button>
        <input type="text" [value]="minutes" placeholder="00">
        <button class="bs-increase" type="button">+</button>
      </div>
      <button class="switch-time-format" type="button">{{ ampm }}
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAABSElEQVQYV3XQPUvDUBQG4HNuagtVqc6KgouCv6GIuIntYBLB9hcIQpLStCAIV7DYmpTcRWcXqZio3Vwc/UCc/QEqfgyKGbr0I7nS1EiHeqYzPO/h5SD0jaxUZjmSLCB+OFb+UFINFwASAEAdpu9gaGXVyAHHFQBkHpKHc6a9dzECvADyY9sqlAMsK9W0jzxDXqeytr3mhQckxSji27TJJ5/rPmIpwJJq3HrtduriYOurv1a4i1p5HnhkG9OFymi0ReoO05cGwb+ayv4dysVygjeFmsP05f8wpZQ8fsdvfmuY9zjWSNqUtgYFVnOVReILYoBFzdQI5/GGFzNHhGbeZnopDGU29sZbscgldmC99w35VOATTycIMMcBXIfpSVGzZhA6C8hh00conln6VQ9TGgV32OEAKQC4DrBq7CJwd0ggR7Vq/rPrfgB+C3sGypY5DAAAAABJRU5ErkJggg=="
          alt="">
      </button>
    </div>
  `
            }]
    }], function () { return []; }, null); })();
if (false) {
    /** @type {?} */
    BsTimepickerViewComponent.prototype.ampm;
    /** @type {?} */
    BsTimepickerViewComponent.prototype.hours;
    /** @type {?} */
    BsTimepickerViewComponent.prototype.minutes;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsYearsCalendarViewComponent {
    constructor() {
        this.onNavigate = new EventEmitter();
        this.onViewMode = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onHover = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    navigateTo(event) {
        /** @type {?} */
        const step = BsNavigationDirection.DOWN === event ? -1 : 1;
        this.onNavigate.emit({ step: { year: step * yearsPerCalendar } });
    }
    /**
     * @param {?} year
     * @return {?}
     */
    viewYear(year) {
        this.onSelect.emit(year);
    }
    /**
     * @param {?} cell
     * @param {?} isHovered
     * @return {?}
     */
    hoverYear(cell, isHovered) {
        this.onHover.emit({ cell, isHovered });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeViewMode(event) {
        this.onViewMode.emit(event);
    }
}
BsYearsCalendarViewComponent.ɵfac = function BsYearsCalendarViewComponent_Factory(t) { return new (t || BsYearsCalendarViewComponent)(); };
BsYearsCalendarViewComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BsYearsCalendarViewComponent, selectors: [["bs-years-calendar-view"]], inputs: { calendar: "calendar" }, outputs: { onNavigate: "onNavigate", onViewMode: "onViewMode", onSelect: "onSelect", onHover: "onHover" }, decls: 5, vars: 2, consts: [[3, "calendar", "onNavigate", "onViewMode"], ["role", "grid", 1, "years"], [4, "ngFor", "ngForOf"], ["role", "gridcell", 3, "disabled", "is-highlighted", "click", "mouseenter", "mouseleave", 4, "ngFor", "ngForOf"], ["role", "gridcell", 3, "click", "mouseenter", "mouseleave"]], template: function BsYearsCalendarViewComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "bs-calendar-layout");
        ɵngcc0.ɵɵelementStart(1, "bs-datepicker-navigation-view", 0);
        ɵngcc0.ɵɵlistener("onNavigate", function BsYearsCalendarViewComponent_Template_bs_datepicker_navigation_view_onNavigate_1_listener($event) { return ctx.navigateTo($event); })("onViewMode", function BsYearsCalendarViewComponent_Template_bs_datepicker_navigation_view_onViewMode_1_listener($event) { return ctx.changeViewMode($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(2, "table", 1);
        ɵngcc0.ɵɵelementStart(3, "tbody");
        ɵngcc0.ɵɵtemplate(4, BsYearsCalendarViewComponent_tr_4_Template, 2, 1, "tr", 2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("calendar", ctx.calendar);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.calendar.years);
    } }, directives: [BsCalendarLayoutComponent, BsDatepickerNavigationViewComponent, ɵngcc2.NgForOf], encapsulation: 2 });
BsYearsCalendarViewComponent.propDecorators = {
    calendar: [{ type: Input }],
    onNavigate: [{ type: Output }],
    onViewMode: [{ type: Output }],
    onSelect: [{ type: Output }],
    onHover: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsYearsCalendarViewComponent, [{
        type: Component,
        args: [{
                selector: 'bs-years-calendar-view',
                template: `
    <bs-calendar-layout>
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>

      <table role="grid" class="years">
        <tbody>
        <tr *ngFor="let row of calendar.years">
          <td *ngFor="let year of row" role="gridcell"
              (click)="viewYear(year)"
              (mouseenter)="hoverYear(year, true)"
              (mouseleave)="hoverYear(year, false)"
              [class.disabled]="year.isDisabled"
              [class.is-highlighted]="year.isHovered">
            <span [class.selected]="year.isSelected">{{ year.label }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </bs-calendar-layout>
  `
            }]
    }], function () { return []; }, { onNavigate: [{
            type: Output
        }], onViewMode: [{
            type: Output
        }], onSelect: [{
            type: Output
        }], onHover: [{
            type: Output
        }], calendar: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    BsYearsCalendarViewComponent.prototype.calendar;
    /** @type {?} */
    BsYearsCalendarViewComponent.prototype.onNavigate;
    /** @type {?} */
    BsYearsCalendarViewComponent.prototype.onViewMode;
    /** @type {?} */
    BsYearsCalendarViewComponent.prototype.onSelect;
    /** @type {?} */
    BsYearsCalendarViewComponent.prototype.onHover;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BsDatepickerModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: BsDatepickerModule,
            providers: [
                ComponentLoaderFactory,
                PositioningService,
                BsDatepickerStore,
                BsDatepickerActions,
                BsDatepickerConfig,
                BsDaterangepickerConfig,
                BsDatepickerInlineConfig,
                BsDaterangepickerInlineConfig,
                BsDatepickerEffects,
                BsLocaleService
            ]
        };
    }
}
BsDatepickerModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: BsDatepickerModule });
BsDatepickerModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function BsDatepickerModule_Factory(t) { return new (t || BsDatepickerModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(BsDatepickerModule, { declarations: function () { return [BsCalendarLayoutComponent, BsCurrentDateViewComponent, BsCustomDatesViewComponent, BsDatepickerDayDecoratorComponent, BsDatepickerNavigationViewComponent, BsDaysCalendarViewComponent, BsMonthCalendarViewComponent, BsTimepickerViewComponent, BsYearsCalendarViewComponent, BsDatepickerContainerComponent, BsDatepickerDirective, BsDatepickerInlineContainerComponent, BsDatepickerInlineDirective, BsDatepickerInputDirective, BsDaterangepickerContainerComponent, BsDaterangepickerDirective, BsDaterangepickerInlineContainerComponent, BsDaterangepickerInlineDirective, BsDaterangepickerInputDirective]; }, imports: function () { return [CommonModule]; }, exports: function () { return [BsDatepickerContainerComponent, BsDatepickerDirective, BsDatepickerInlineContainerComponent, BsDatepickerInlineDirective, BsDatepickerInputDirective, BsDaterangepickerContainerComponent, BsDaterangepickerDirective, BsDaterangepickerInlineContainerComponent, BsDaterangepickerInlineDirective, BsDaterangepickerInputDirective]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BsDatepickerModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [
                    BsCalendarLayoutComponent,
                    BsCurrentDateViewComponent,
                    BsCustomDatesViewComponent,
                    BsDatepickerDayDecoratorComponent,
                    BsDatepickerNavigationViewComponent,
                    BsDaysCalendarViewComponent,
                    BsMonthCalendarViewComponent,
                    BsTimepickerViewComponent,
                    BsYearsCalendarViewComponent,
                    BsDatepickerContainerComponent,
                    BsDatepickerDirective,
                    BsDatepickerInlineContainerComponent,
                    BsDatepickerInlineDirective,
                    BsDatepickerInputDirective,
                    BsDaterangepickerContainerComponent,
                    BsDaterangepickerDirective,
                    BsDaterangepickerInlineContainerComponent,
                    BsDaterangepickerInlineDirective,
                    BsDaterangepickerInputDirective
                ],
                entryComponents: [
                    BsDatepickerContainerComponent,
                    BsDaterangepickerContainerComponent,
                    BsDatepickerInlineContainerComponent,
                    BsDaterangepickerInlineContainerComponent
                ],
                exports: [
                    BsDatepickerContainerComponent,
                    BsDatepickerDirective,
                    BsDatepickerInlineContainerComponent,
                    BsDatepickerInlineDirective,
                    BsDatepickerInputDirective,
                    BsDaterangepickerContainerComponent,
                    BsDaterangepickerDirective,
                    BsDaterangepickerInlineContainerComponent,
                    BsDaterangepickerInlineDirective,
                    BsDaterangepickerInputDirective
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DateFormatter {
    /**
     * @param {?} date
     * @param {?} format
     * @param {?} locale
     * @return {?}
     */
    format(date, format, locale) {
        return formatDate(date, format, locale);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatePickerInnerComponent {
    constructor() {
        this.selectionDone = new EventEmitter(undefined);
        this.update = new EventEmitter(false);
        this.activeDateChange = new EventEmitter(undefined);
        /* tslint:disable-next-line: no-any*/
        this.stepDay = {};
        /* tslint:disable-next-line: no-any*/
        this.stepMonth = {};
        /* tslint:disable-next-line: no-any*/
        this.stepYear = {};
        this.modes = ['day', 'month', 'year'];
        this.dateFormatter = new DateFormatter();
    }
    /**
     * @return {?}
     */
    get activeDate() {
        return this._activeDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        this._activeDate = value;
    }
    // todo: add formatter value to Date object
    /**
     * @return {?}
     */
    ngOnInit() {
        // todo: use date for unique value
        this.uniqueId = `datepicker--${Math.floor(Math.random() * 10000)}`;
        if (this.initDate) {
            this.activeDate = this.initDate;
            this.selectedDate = new Date(this.activeDate.valueOf());
            this.update.emit(this.activeDate);
        }
        else if (this.activeDate === undefined) {
            this.activeDate = new Date();
        }
    }
    // this.refreshView should be called here to reflect the changes on the fly
    // tslint:disable-next-line:no-unused-variable
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.refreshView();
        this.checkIfActiveDateGotUpdated(changes.activeDate);
    }
    // Check if activeDate has been update and then emit the activeDateChange with the new date
    /* tslint:disable-next-line: no-any */
    /**
     * @param {?} activeDate
     * @return {?}
     */
    checkIfActiveDateGotUpdated(activeDate) {
        if (activeDate && !activeDate.firstChange) {
            /** @type {?} */
            const previousValue = activeDate.previousValue;
            if (previousValue &&
                previousValue instanceof Date &&
                previousValue.getTime() !== activeDate.currentValue.getTime()) {
                this.activeDateChange.emit(this.activeDate);
            }
        }
    }
    /**
     * @param {?} handler
     * @param {?} type
     * @return {?}
     */
    setCompareHandler(handler, type) {
        if (type === 'day') {
            this.compareHandlerDay = handler;
        }
        if (type === 'month') {
            this.compareHandlerMonth = handler;
        }
        if (type === 'year') {
            this.compareHandlerYear = handler;
        }
    }
    /**
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    compare(date1, date2) {
        if (date1 === undefined || date2 === undefined) {
            return undefined;
        }
        if (this.datepickerMode === 'day' && this.compareHandlerDay) {
            return this.compareHandlerDay(date1, date2);
        }
        if (this.datepickerMode === 'month' && this.compareHandlerMonth) {
            return this.compareHandlerMonth(date1, date2);
        }
        if (this.datepickerMode === 'year' && this.compareHandlerYear) {
            return this.compareHandlerYear(date1, date2);
        }
        return void 0;
    }
    /**
     * @param {?} handler
     * @param {?} type
     * @return {?}
     */
    setRefreshViewHandler(handler, type) {
        if (type === 'day') {
            this.refreshViewHandlerDay = handler;
        }
        if (type === 'month') {
            this.refreshViewHandlerMonth = handler;
        }
        if (type === 'year') {
            this.refreshViewHandlerYear = handler;
        }
    }
    /**
     * @return {?}
     */
    refreshView() {
        if (this.datepickerMode === 'day' && this.refreshViewHandlerDay) {
            this.refreshViewHandlerDay();
        }
        if (this.datepickerMode === 'month' && this.refreshViewHandlerMonth) {
            this.refreshViewHandlerMonth();
        }
        if (this.datepickerMode === 'year' && this.refreshViewHandlerYear) {
            this.refreshViewHandlerYear();
        }
    }
    /**
     * @param {?} date
     * @param {?} format
     * @return {?}
     */
    dateFilter(date, format) {
        return this.dateFormatter.format(date, format, this.locale);
    }
    /* tslint:disable-next-line: no-any*/
    /**
     * @param {?} dateObject
     * @return {?}
     */
    isActive(dateObject) {
        if (this.compare(dateObject.date, this.activeDate) === 0) {
            this.activeDateId = dateObject.uid;
            return true;
        }
        return false;
    }
    /* tslint:disable-next-line: no-any*/
    /**
     * @param {?} date
     * @param {?} format
     * @return {?}
     */
    createDateObject(date, format) {
        /* tslint:disable-next-line: no-any*/
        /** @type {?} */
        const dateObject = {};
        dateObject.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        dateObject.date = this.fixTimeZone(dateObject.date);
        dateObject.label = this.dateFilter(date, format);
        dateObject.selected = this.compare(date, this.selectedDate) === 0;
        dateObject.disabled = this.isDisabled(date);
        dateObject.current = this.compare(date, new Date()) === 0;
        dateObject.customClass = this.getCustomClassForDate(dateObject.date);
        return dateObject;
    }
    /* tslint:disable-next-line: no-any*/
    /**
     * @param {?} arr
     * @param {?} size
     * @return {?}
     */
    split(arr, size) {
        /* tslint:disable-next-line: no-any*/
        /** @type {?} */
        const arrays = [];
        while (arr.length > 0) {
            arrays.push(arr.splice(0, size));
        }
        return arrays;
    }
    // Fix a hard-reproducible bug with timezones
    // The bug depends on OS, browser, current timezone and current date
    // i.e.
    // var date = new Date(2014, 0, 1);
    // console.log(date.getFullYear(), date.getMonth(), date.getDate(),
    // date.getHours()); can result in "2013 11 31 23" because of the bug.
    /**
     * @param {?} date
     * @return {?}
     */
    fixTimeZone(date) {
        /** @type {?} */
        const hours = date.getHours();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours === 23 ? hours + 2 : 0);
    }
    /**
     * @param {?} date
     * @param {?=} isManual
     * @return {?}
     */
    select(date, isManual = true) {
        if (this.datepickerMode === this.minMode) {
            if (!this.activeDate) {
                this.activeDate = new Date(0, 0, 0, 0, 0, 0, 0);
            }
            this.activeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            this.activeDate = this.fixTimeZone(this.activeDate);
            if (isManual) {
                this.selectionDone.emit(this.activeDate);
            }
        }
        else {
            this.activeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            this.activeDate = this.fixTimeZone(this.activeDate);
            if (isManual) {
                this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) - 1];
            }
        }
        this.selectedDate = new Date(this.activeDate.valueOf());
        this.update.emit(this.activeDate);
        this.refreshView();
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    move(direction) {
        /* tslint:disable-next-line: no-any*/
        /** @type {?} */
        let expectedStep;
        if (this.datepickerMode === 'day') {
            expectedStep = this.stepDay;
        }
        if (this.datepickerMode === 'month') {
            expectedStep = this.stepMonth;
        }
        if (this.datepickerMode === 'year') {
            expectedStep = this.stepYear;
        }
        if (expectedStep) {
            /** @type {?} */
            const year = this.activeDate.getFullYear() + direction * (expectedStep.years || 0);
            /** @type {?} */
            const month = this.activeDate.getMonth() + direction * (expectedStep.months || 0);
            this.activeDate = new Date(year, month, 1);
            this.refreshView();
            this.activeDateChange.emit(this.activeDate);
        }
    }
    /**
     * @param {?} _direction
     * @return {?}
     */
    toggleMode(_direction) {
        /** @type {?} */
        const direction = _direction || 1;
        if ((this.datepickerMode === this.maxMode && direction === 1) ||
            (this.datepickerMode === this.minMode && direction === -1)) {
            return;
        }
        this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) + direction];
        this.refreshView();
    }
    /**
     * @protected
     * @param {?} date
     * @return {?}
     */
    getCustomClassForDate(date) {
        if (!this.customClass) {
            return '';
        }
        // todo: build a hash of custom classes, it will work faster
        /** @type {?} */
        const customClassObject = this.customClass.find((/**
         * @param {?} customClass
         * @return {?}
         */
        (customClass) => {
            return (customClass.date.valueOf() === date.valueOf() &&
                customClass.mode === this.datepickerMode);
        }), this);
        return customClassObject === undefined ? '' : customClassObject.clazz;
    }
    /**
     * @protected
     * @param {?} date1Disabled
     * @param {?} date2
     * @return {?}
     */
    compareDateDisabled(date1Disabled, date2) {
        if (date1Disabled === undefined || date2 === undefined) {
            return undefined;
        }
        if (date1Disabled.mode === 'day' && this.compareHandlerDay) {
            return this.compareHandlerDay(date1Disabled.date, date2);
        }
        if (date1Disabled.mode === 'month' && this.compareHandlerMonth) {
            return this.compareHandlerMonth(date1Disabled.date, date2);
        }
        if (date1Disabled.mode === 'year' && this.compareHandlerYear) {
            return this.compareHandlerYear(date1Disabled.date, date2);
        }
        return undefined;
    }
    /**
     * @protected
     * @param {?} date
     * @return {?}
     */
    isDisabled(date) {
        /** @type {?} */
        let isDateDisabled = false;
        if (this.dateDisabled) {
            this.dateDisabled.forEach((/**
             * @param {?} disabledDate
             * @return {?}
             */
            (disabledDate) => {
                if (this.compareDateDisabled(disabledDate, date) === 0) {
                    isDateDisabled = true;
                }
            }));
        }
        if (this.dayDisabled) {
            isDateDisabled =
                isDateDisabled ||
                    this.dayDisabled.indexOf(date.getDay()) > -1;
        }
        return (isDateDisabled ||
            (this.minDate && this.compare(date, this.minDate) < 0) ||
            (this.maxDate && this.compare(date, this.maxDate) > 0));
    }
}
DatePickerInnerComponent.ɵfac = function DatePickerInnerComponent_Factory(t) { return new (t || DatePickerInnerComponent)(); };
DatePickerInnerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DatePickerInnerComponent, selectors: [["datepicker-inner"]], inputs: { activeDate: "activeDate", datepickerMode: "datepickerMode", locale: "locale", startingDay: "startingDay", yearRange: "yearRange", minDate: "minDate", maxDate: "maxDate", minMode: "minMode", maxMode: "maxMode", showWeeks: "showWeeks", formatDay: "formatDay", formatMonth: "formatMonth", formatYear: "formatYear", formatDayHeader: "formatDayHeader", formatDayTitle: "formatDayTitle", formatMonthTitle: "formatMonthTitle", onlyCurrentMonth: "onlyCurrentMonth", shortcutPropagation: "shortcutPropagation", customClass: "customClass", monthColLimit: "monthColLimit", yearColLimit: "yearColLimit", dateDisabled: "dateDisabled", dayDisabled: "dayDisabled", initDate: "initDate" }, outputs: { selectionDone: "selectionDone", update: "update", activeDateChange: "activeDateChange" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], ngContentSelectors: _c3, decls: 1, vars: 1, consts: [["class", "well well-sm bg-faded p-a card", "role", "application", 4, "ngIf"], ["role", "application", 1, "well", "well-sm", "bg-faded", "p-a", "card"]], template: function DatePickerInnerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵtemplate(0, DatePickerInnerComponent_div_0_Template, 2, 0, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.datepickerMode);
    } }, directives: [ɵngcc2.NgIf], encapsulation: 2 });
DatePickerInnerComponent.propDecorators = {
    locale: [{ type: Input }],
    datepickerMode: [{ type: Input }],
    startingDay: [{ type: Input }],
    yearRange: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    minMode: [{ type: Input }],
    maxMode: [{ type: Input }],
    showWeeks: [{ type: Input }],
    formatDay: [{ type: Input }],
    formatMonth: [{ type: Input }],
    formatYear: [{ type: Input }],
    formatDayHeader: [{ type: Input }],
    formatDayTitle: [{ type: Input }],
    formatMonthTitle: [{ type: Input }],
    onlyCurrentMonth: [{ type: Input }],
    shortcutPropagation: [{ type: Input }],
    customClass: [{ type: Input }],
    monthColLimit: [{ type: Input }],
    yearColLimit: [{ type: Input }],
    dateDisabled: [{ type: Input }],
    dayDisabled: [{ type: Input }],
    initDate: [{ type: Input }],
    selectionDone: [{ type: Output }],
    update: [{ type: Output }],
    activeDateChange: [{ type: Output }],
    activeDate: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DatePickerInnerComponent, [{
        type: Component,
        args: [{
                selector: 'datepicker-inner',
                template: `
    <!--&lt;!&ndash;ng-keydown="keydown($event)"&ndash;&gt;-->
    <div *ngIf="datepickerMode" class="well well-sm bg-faded p-a card" role="application" >
      <ng-content></ng-content>
    </div>
  `
            }]
    }], function () { return []; }, { selectionDone: [{
            type: Output
        }], update: [{
            type: Output
        }], activeDateChange: [{
            type: Output
        }], activeDate: [{
            type: Input
        }], datepickerMode: [{
            type: Input
        }], locale: [{
            type: Input
        }], startingDay: [{
            type: Input
        }], yearRange: [{
            type: Input
        }], minDate: [{
            type: Input
        }], maxDate: [{
            type: Input
        }], minMode: [{
            type: Input
        }], maxMode: [{
            type: Input
        }], showWeeks: [{
            type: Input
        }], formatDay: [{
            type: Input
        }], formatMonth: [{
            type: Input
        }], formatYear: [{
            type: Input
        }], formatDayHeader: [{
            type: Input
        }], formatDayTitle: [{
            type: Input
        }], formatMonthTitle: [{
            type: Input
        }], onlyCurrentMonth: [{
            type: Input
        }], shortcutPropagation: [{
            type: Input
        }], customClass: [{
            type: Input
        }], monthColLimit: [{
            type: Input
        }], yearColLimit: [{
            type: Input
        }], dateDisabled: [{
            type: Input
        }], dayDisabled: [{
            type: Input
        }], initDate: [{
            type: Input
        }] }); })();
if (false) {
    /** @type {?} */
    DatePickerInnerComponent.prototype.locale;
    /** @type {?} */
    DatePickerInnerComponent.prototype.datepickerMode;
    /** @type {?} */
    DatePickerInnerComponent.prototype.startingDay;
    /** @type {?} */
    DatePickerInnerComponent.prototype.yearRange;
    /** @type {?} */
    DatePickerInnerComponent.prototype.minDate;
    /** @type {?} */
    DatePickerInnerComponent.prototype.maxDate;
    /** @type {?} */
    DatePickerInnerComponent.prototype.minMode;
    /** @type {?} */
    DatePickerInnerComponent.prototype.maxMode;
    /** @type {?} */
    DatePickerInnerComponent.prototype.showWeeks;
    /** @type {?} */
    DatePickerInnerComponent.prototype.formatDay;
    /** @type {?} */
    DatePickerInnerComponent.prototype.formatMonth;
    /** @type {?} */
    DatePickerInnerComponent.prototype.formatYear;
    /** @type {?} */
    DatePickerInnerComponent.prototype.formatDayHeader;
    /** @type {?} */
    DatePickerInnerComponent.prototype.formatDayTitle;
    /** @type {?} */
    DatePickerInnerComponent.prototype.formatMonthTitle;
    /** @type {?} */
    DatePickerInnerComponent.prototype.onlyCurrentMonth;
    /** @type {?} */
    DatePickerInnerComponent.prototype.shortcutPropagation;
    /** @type {?} */
    DatePickerInnerComponent.prototype.customClass;
    /** @type {?} */
    DatePickerInnerComponent.prototype.monthColLimit;
    /** @type {?} */
    DatePickerInnerComponent.prototype.yearColLimit;
    /** @type {?} */
    DatePickerInnerComponent.prototype.dateDisabled;
    /** @type {?} */
    DatePickerInnerComponent.prototype.dayDisabled;
    /** @type {?} */
    DatePickerInnerComponent.prototype.initDate;
    /** @type {?} */
    DatePickerInnerComponent.prototype.selectionDone;
    /** @type {?} */
    DatePickerInnerComponent.prototype.update;
    /** @type {?} */
    DatePickerInnerComponent.prototype.activeDateChange;
    /** @type {?} */
    DatePickerInnerComponent.prototype.stepDay;
    /** @type {?} */
    DatePickerInnerComponent.prototype.stepMonth;
    /** @type {?} */
    DatePickerInnerComponent.prototype.stepYear;
    /** @type {?} */
    DatePickerInnerComponent.prototype.uniqueId;
    /**
     * @type {?}
     * @protected
     */
    DatePickerInnerComponent.prototype.modes;
    /**
     * @type {?}
     * @protected
     */
    DatePickerInnerComponent.prototype.dateFormatter;
    /**
     * @type {?}
     * @protected
     */
    DatePickerInnerComponent.prototype._activeDate;
    /**
     * @type {?}
     * @protected
     */
    DatePickerInnerComponent.prototype.selectedDate;
    /**
     * @type {?}
     * @protected
     */
    DatePickerInnerComponent.prototype.activeDateId;
    /**
     * @type {?}
     * @protected
     */
    DatePickerInnerComponent.prototype.refreshViewHandlerDay;
    /**
     * @type {?}
     * @protected
     */
    DatePickerInnerComponent.prototype.compareHandlerDay;
    /**
     * @type {?}
     * @protected
     */
    DatePickerInnerComponent.prototype.refreshViewHandlerMonth;
    /**
     * @type {?}
     * @protected
     */
    DatePickerInnerComponent.prototype.compareHandlerMonth;
    /**
     * @type {?}
     * @protected
     */
    DatePickerInnerComponent.prototype.refreshViewHandlerYear;
    /**
     * @type {?}
     * @protected
     */
    DatePickerInnerComponent.prototype.compareHandlerYear;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatepickerConfig {
    constructor() {
        this.locale = 'en';
        this.datepickerMode = 'day';
        this.startingDay = 0;
        this.yearRange = 20;
        this.minMode = 'day';
        this.maxMode = 'year';
        this.showWeeks = true;
        this.formatDay = 'DD';
        this.formatMonth = 'MMMM';
        this.formatYear = 'YYYY';
        this.formatDayHeader = 'dd';
        this.formatDayTitle = 'MMMM YYYY';
        this.formatMonthTitle = 'YYYY';
        this.onlyCurrentMonth = false;
        this.monthColLimit = 3;
        this.yearColLimit = 5;
        this.shortcutPropagation = false;
    }
}
DatepickerConfig.ɵfac = function DatepickerConfig_Factory(t) { return new (t || DatepickerConfig)(); };
DatepickerConfig.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: DatepickerConfig, factory: DatepickerConfig.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DatepickerConfig, [{
        type: Injectable
    }], function () { return []; }, null); })();
if (false) {
    /** @type {?} */
    DatepickerConfig.prototype.locale;
    /** @type {?} */
    DatepickerConfig.prototype.datepickerMode;
    /** @type {?} */
    DatepickerConfig.prototype.startingDay;
    /** @type {?} */
    DatepickerConfig.prototype.yearRange;
    /** @type {?} */
    DatepickerConfig.prototype.minMode;
    /** @type {?} */
    DatepickerConfig.prototype.maxMode;
    /** @type {?} */
    DatepickerConfig.prototype.showWeeks;
    /** @type {?} */
    DatepickerConfig.prototype.formatDay;
    /** @type {?} */
    DatepickerConfig.prototype.formatMonth;
    /** @type {?} */
    DatepickerConfig.prototype.formatYear;
    /** @type {?} */
    DatepickerConfig.prototype.formatDayHeader;
    /** @type {?} */
    DatepickerConfig.prototype.formatDayTitle;
    /** @type {?} */
    DatepickerConfig.prototype.formatMonthTitle;
    /** @type {?} */
    DatepickerConfig.prototype.onlyCurrentMonth;
    /** @type {?} */
    DatepickerConfig.prototype.monthColLimit;
    /** @type {?} */
    DatepickerConfig.prototype.yearColLimit;
    /** @type {?} */
    DatepickerConfig.prototype.shortcutPropagation;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DATEPICKER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable-next-line: no-use-before-declare */
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => DatePickerComponent)),
    multi: true
};
/* tslint:disable:component-selector-name component-selector-type */
/* tslint:enable:component-selector-name component-selector-type */
class DatePickerComponent {
    /**
     * @param {?} config
     */
    constructor(config) {
        /**
         * sets datepicker mode, supports: `day`, `month`, `year`
         */
        this.datepickerMode = 'day';
        /**
         * if false week numbers will be hidden
         */
        this.showWeeks = true;
        this.selectionDone = new EventEmitter(undefined);
        /**
         * callback to invoke when the activeDate is changed.
         */
        this.activeDateChange = new EventEmitter(undefined);
        /* tslint:disable-next-line: no-any*/
        this.onChange = Function.prototype;
        /* tslint:disable-next-line: no-any*/
        this.onTouched = Function.prototype;
        this._now = new Date();
        this.config = config;
        this.configureOptions();
    }
    /**
     * currently active date
     * @return {?}
     */
    get activeDate() {
        return this._activeDate || this._now;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        this._activeDate = value;
    }
    /**
     * @return {?}
     */
    configureOptions() {
        Object.assign(this, this.config);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onUpdate(event) {
        this.activeDate = event;
        this.onChange(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSelectionDone(event) {
        this.selectionDone.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onActiveDateChange(event) {
        this.activeDateChange.emit(event);
    }
    // todo: support null value
    /* tslint:disable-next-line: no-any*/
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this._datePicker.compare(value, this._activeDate) === 0) {
            return;
        }
        if (value && value instanceof Date) {
            this.activeDate = value;
            this._datePicker.select(value, false);
            return;
        }
        this.activeDate = value ? new Date(value) : void 0;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
DatePickerComponent.ɵfac = function DatePickerComponent_Factory(t) { return new (t || DatePickerComponent)(ɵngcc0.ɵɵdirectiveInject(DatepickerConfig)); };
DatePickerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DatePickerComponent, selectors: [["datepicker"]], viewQuery: function DatePickerComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵstaticViewQuery(DatePickerInnerComponent, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx._datePicker = _t.first);
    } }, inputs: { datepickerMode: "datepickerMode", showWeeks: "showWeeks", activeDate: "activeDate", initDate: "initDate", minDate: "minDate", maxDate: "maxDate", minMode: "minMode", maxMode: "maxMode", formatDay: "formatDay", formatMonth: "formatMonth", formatYear: "formatYear", formatDayHeader: "formatDayHeader", formatDayTitle: "formatDayTitle", formatMonthTitle: "formatMonthTitle", startingDay: "startingDay", yearRange: "yearRange", onlyCurrentMonth: "onlyCurrentMonth", shortcutPropagation: "shortcutPropagation", monthColLimit: "monthColLimit", yearColLimit: "yearColLimit", customClass: "customClass", dateDisabled: "dateDisabled", dayDisabled: "dayDisabled" }, outputs: { selectionDone: "selectionDone", activeDateChange: "activeDateChange" }, features: [ɵngcc0.ɵɵProvidersFeature([DATEPICKER_CONTROL_VALUE_ACCESSOR])], decls: 4, vars: 24, consts: [[3, "activeDate", "locale", "datepickerMode", "initDate", "minDate", "maxDate", "minMode", "maxMode", "showWeeks", "formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "startingDay", "yearRange", "customClass", "dateDisabled", "dayDisabled", "onlyCurrentMonth", "shortcutPropagation", "monthColLimit", "yearColLimit", "update", "selectionDone", "activeDateChange"], ["tabindex", "0"]], template: function DatePickerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "datepicker-inner", 0);
        ɵngcc0.ɵɵlistener("update", function DatePickerComponent_Template_datepicker_inner_update_0_listener($event) { return ctx.onUpdate($event); })("selectionDone", function DatePickerComponent_Template_datepicker_inner_selectionDone_0_listener($event) { return ctx.onSelectionDone($event); })("activeDateChange", function DatePickerComponent_Template_datepicker_inner_activeDateChange_0_listener($event) { return ctx.onActiveDateChange($event); });
        ɵngcc0.ɵɵelement(1, "daypicker", 1);
        ɵngcc0.ɵɵelement(2, "monthpicker", 1);
        ɵngcc0.ɵɵelement(3, "yearpicker", 1);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("activeDate", ctx.activeDate)("locale", ctx.config.locale)("datepickerMode", ctx.datepickerMode)("initDate", ctx.initDate)("minDate", ctx.minDate)("maxDate", ctx.maxDate)("minMode", ctx.minMode)("maxMode", ctx.maxMode)("showWeeks", ctx.showWeeks)("formatDay", ctx.formatDay)("formatMonth", ctx.formatMonth)("formatYear", ctx.formatYear)("formatDayHeader", ctx.formatDayHeader)("formatDayTitle", ctx.formatDayTitle)("formatMonthTitle", ctx.formatMonthTitle)("startingDay", ctx.startingDay)("yearRange", ctx.yearRange)("customClass", ctx.customClass)("dateDisabled", ctx.dateDisabled)("dayDisabled", ctx.dayDisabled)("onlyCurrentMonth", ctx.onlyCurrentMonth)("shortcutPropagation", ctx.shortcutPropagation)("monthColLimit", ctx.monthColLimit)("yearColLimit", ctx.yearColLimit);
    } }, directives: function () { return [DatePickerInnerComponent, DayPickerComponent, MonthPickerComponent, YearPickerComponent]; }, encapsulation: 2 });
/** @nocollapse */
DatePickerComponent.ctorParameters = () => [
    { type: DatepickerConfig }
];
DatePickerComponent.propDecorators = {
    datepickerMode: [{ type: Input }],
    initDate: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    minMode: [{ type: Input }],
    maxMode: [{ type: Input }],
    showWeeks: [{ type: Input }],
    formatDay: [{ type: Input }],
    formatMonth: [{ type: Input }],
    formatYear: [{ type: Input }],
    formatDayHeader: [{ type: Input }],
    formatDayTitle: [{ type: Input }],
    formatMonthTitle: [{ type: Input }],
    startingDay: [{ type: Input }],
    yearRange: [{ type: Input }],
    onlyCurrentMonth: [{ type: Input }],
    shortcutPropagation: [{ type: Input }],
    monthColLimit: [{ type: Input }],
    yearColLimit: [{ type: Input }],
    customClass: [{ type: Input }],
    dateDisabled: [{ type: Input }],
    dayDisabled: [{ type: Input }],
    activeDate: [{ type: Input }],
    selectionDone: [{ type: Output }],
    activeDateChange: [{ type: Output }],
    _datePicker: [{ type: ViewChild, args: [DatePickerInnerComponent, { static: true },] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DatePickerComponent, [{
        type: Component,
        args: [{
                selector: 'datepicker',
                template: `
    <datepicker-inner [activeDate]="activeDate"
                      (update)="onUpdate($event)"
                      [locale]="config.locale"
                      [datepickerMode]="datepickerMode"
                      [initDate]="initDate"
                      [minDate]="minDate"
                      [maxDate]="maxDate"
                      [minMode]="minMode"
                      [maxMode]="maxMode"
                      [showWeeks]="showWeeks"
                      [formatDay]="formatDay"
                      [formatMonth]="formatMonth"
                      [formatYear]="formatYear"
                      [formatDayHeader]="formatDayHeader"
                      [formatDayTitle]="formatDayTitle"
                      [formatMonthTitle]="formatMonthTitle"
                      [startingDay]="startingDay"
                      [yearRange]="yearRange"
                      [customClass]="customClass"
                      [dateDisabled]="dateDisabled"
                      [dayDisabled]="dayDisabled"
                      [onlyCurrentMonth]="onlyCurrentMonth"
                      [shortcutPropagation]="shortcutPropagation"
                      [monthColLimit]="monthColLimit"
                      [yearColLimit]="yearColLimit"
                      (selectionDone)="onSelectionDone($event)"
                      (activeDateChange)="onActiveDateChange($event)">
      <daypicker tabindex="0"></daypicker>
      <monthpicker tabindex="0"></monthpicker>
      <yearpicker tabindex="0"></yearpicker>
    </datepicker-inner>
    `,
                providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR]
            }]
    }], function () { return [{ type: DatepickerConfig }]; }, { datepickerMode: [{
            type: Input
        }], showWeeks: [{
            type: Input
        }], selectionDone: [{
            type: Output
        }], activeDateChange: [{
            type: Output
        }], activeDate: [{
            type: Input
        }], initDate: [{
            type: Input
        }], minDate: [{
            type: Input
        }], maxDate: [{
            type: Input
        }], minMode: [{
            type: Input
        }], maxMode: [{
            type: Input
        }], formatDay: [{
            type: Input
        }], formatMonth: [{
            type: Input
        }], formatYear: [{
            type: Input
        }], formatDayHeader: [{
            type: Input
        }], formatDayTitle: [{
            type: Input
        }], formatMonthTitle: [{
            type: Input
        }], startingDay: [{
            type: Input
        }], yearRange: [{
            type: Input
        }], onlyCurrentMonth: [{
            type: Input
        }], shortcutPropagation: [{
            type: Input
        }], monthColLimit: [{
            type: Input
        }], yearColLimit: [{
            type: Input
        }], customClass: [{
            type: Input
        }], dateDisabled: [{
            type: Input
        }], dayDisabled: [{
            type: Input
        }], _datePicker: [{
            type: ViewChild,
            args: [DatePickerInnerComponent, { static: true }]
        }] }); })();
if (false) {
    /**
     * sets datepicker mode, supports: `day`, `month`, `year`
     * @type {?}
     */
    DatePickerComponent.prototype.datepickerMode;
    /**
     * default date to show if `ng-model` value is not specified
     * @type {?}
     */
    DatePickerComponent.prototype.initDate;
    /**
     * oldest selectable date
     * @type {?}
     */
    DatePickerComponent.prototype.minDate;
    /**
     * latest selectable date
     * @type {?}
     */
    DatePickerComponent.prototype.maxDate;
    /**
     * set lower datepicker mode, supports: `day`, `month`, `year`
     * @type {?}
     */
    DatePickerComponent.prototype.minMode;
    /**
     * sets upper datepicker mode, supports: `day`, `month`, `year`
     * @type {?}
     */
    DatePickerComponent.prototype.maxMode;
    /**
     * if false week numbers will be hidden
     * @type {?}
     */
    DatePickerComponent.prototype.showWeeks;
    /**
     * format of day in month
     * @type {?}
     */
    DatePickerComponent.prototype.formatDay;
    /**
     * format of month in year
     * @type {?}
     */
    DatePickerComponent.prototype.formatMonth;
    /**
     * format of year in year range
     * @type {?}
     */
    DatePickerComponent.prototype.formatYear;
    /**
     * format of day in week header
     * @type {?}
     */
    DatePickerComponent.prototype.formatDayHeader;
    /**
     * format of title when selecting day
     * @type {?}
     */
    DatePickerComponent.prototype.formatDayTitle;
    /**
     * format of title when selecting month
     * @type {?}
     */
    DatePickerComponent.prototype.formatMonthTitle;
    /**
     * starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday)
     * @type {?}
     */
    DatePickerComponent.prototype.startingDay;
    /**
     * number of years displayed in year selection
     * @type {?}
     */
    DatePickerComponent.prototype.yearRange;
    /**
     * if true only dates from the currently displayed month will be shown
     * @type {?}
     */
    DatePickerComponent.prototype.onlyCurrentMonth;
    /**
     * if true shortcut`s event propagation will be disabled
     * @type {?}
     */
    DatePickerComponent.prototype.shortcutPropagation;
    /**
     * number of months displayed in a single row of month picker
     * @type {?}
     */
    DatePickerComponent.prototype.monthColLimit;
    /**
     * number of years displayed in a single row of year picker
     * @type {?}
     */
    DatePickerComponent.prototype.yearColLimit;
    /**
     * array of custom css classes to be applied to targeted dates
     * @type {?}
     */
    DatePickerComponent.prototype.customClass;
    /**
     * array of disabled dates
     * @type {?}
     */
    DatePickerComponent.prototype.dateDisabled;
    /**
     * disabled days of the week from 0-6 (0=Sunday, ..., 6=Saturday)
     * @type {?}
     */
    DatePickerComponent.prototype.dayDisabled;
    /** @type {?} */
    DatePickerComponent.prototype.selectionDone;
    /**
     * callback to invoke when the activeDate is changed.
     * @type {?}
     */
    DatePickerComponent.prototype.activeDateChange;
    /** @type {?} */
    DatePickerComponent.prototype._datePicker;
    /** @type {?} */
    DatePickerComponent.prototype.onChange;
    /** @type {?} */
    DatePickerComponent.prototype.onTouched;
    /** @type {?} */
    DatePickerComponent.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    DatePickerComponent.prototype._now;
    /**
     * @type {?}
     * @protected
     */
    DatePickerComponent.prototype._activeDate;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DayPickerComponent {
    /**
     * @param {?} datePicker
     */
    constructor(datePicker) {
        this.labels = [];
        this.rows = [];
        this.weekNumbers = [];
        this.datePicker = datePicker;
    }
    /**
     * @return {?}
     */
    get isBs4() {
        return !isBs3();
    }
    /*protected getDaysInMonth(year:number, month:number) {
       return ((month === 1) && (year % 4 === 0) &&
       ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
       }*/
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const self = this;
        this.datePicker.stepDay = { months: 1 };
        this.datePicker.setRefreshViewHandler((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const year = this.activeDate.getFullYear();
            /** @type {?} */
            const month = this.activeDate.getMonth();
            /** @type {?} */
            const firstDayOfMonth = new Date(year, month, 1);
            /** @type {?} */
            const difference = this.startingDay - firstDayOfMonth.getDay();
            /** @type {?} */
            const numDisplayedFromPreviousMonth = difference > 0 ? 7 - difference : -difference;
            /** @type {?} */
            const firstDate = new Date(firstDayOfMonth.getTime());
            if (numDisplayedFromPreviousMonth > 0) {
                firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
            }
            // 42 is the number of days on a six-week calendar
            /** @type {?} */
            const _days = self.getDates(firstDate, 42);
            /** @type {?} */
            const days = [];
            for (let i = 0; i < 42; i++) {
                /** @type {?} */
                const _dateObject = this.createDateObject(_days[i], this.formatDay);
                _dateObject.secondary = _days[i].getMonth() !== month;
                _dateObject.uid = this.uniqueId + '-' + i;
                days[i] = _dateObject;
            }
            self.labels = [];
            for (let j = 0; j < 7; j++) {
                self.labels[j] = {};
                self.labels[j].abbr = this.dateFilter(days[j].date, this.formatDayHeader);
                self.labels[j].full = this.dateFilter(days[j].date, 'EEEE');
            }
            self.title = this.dateFilter(this.activeDate, this.formatDayTitle);
            self.rows = this.split(days, 7);
            if (this.showWeeks) {
                self.weekNumbers = [];
                /** @type {?} */
                const thursdayIndex = (4 + 7 - this.startingDay) % 7;
                /** @type {?} */
                const numWeeks = self.rows.length;
                for (let curWeek = 0; curWeek < numWeeks; curWeek++) {
                    self.weekNumbers.push(self.getISO8601WeekNumber(self.rows[curWeek][thursdayIndex].date));
                }
            }
        }), 'day');
        this.datePicker.setCompareHandler((/**
         * @param {?} date1
         * @param {?} date2
         * @return {?}
         */
        function (date1, date2) {
            /** @type {?} */
            const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
            /** @type {?} */
            const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
            return d1.getTime() - d2.getTime();
        }), 'day');
        this.datePicker.refreshView();
    }
    /**
     * @protected
     * @param {?} startDate
     * @param {?} n
     * @return {?}
     */
    getDates(startDate, n) {
        /** @type {?} */
        const dates = new Array(n);
        /** @type {?} */
        let current = new Date(startDate.getTime());
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        let date;
        while (i < n) {
            date = new Date(current.getTime());
            date = this.datePicker.fixTimeZone(date);
            dates[i++] = date;
            current = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        }
        return dates;
    }
    /**
     * @protected
     * @param {?} date
     * @return {?}
     */
    getISO8601WeekNumber(date) {
        /** @type {?} */
        const checkDate = new Date(date.getTime());
        // Thursday
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        /** @type {?} */
        const time = checkDate.getTime();
        // Compare with Jan 1
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return (Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1);
    }
}
DayPickerComponent.ɵfac = function DayPickerComponent_Factory(t) { return new (t || DayPickerComponent)(ɵngcc0.ɵɵdirectiveInject(DatePickerInnerComponent)); };
DayPickerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DayPickerComponent, selectors: [["daypicker"]], decls: 1, vars: 1, consts: [["role", "grid", "aria-activedescendant", "activeDateId", 4, "ngIf"], ["role", "grid", "aria-activedescendant", "activeDateId"], ["type", "button", "class", "btn btn-default btn-secondary btn-sm pull-left float-left", "tabindex", "-1", 3, "click", 4, "ngIf"], ["type", "button", "tabindex", "-1", 1, "btn", "btn-default", "btn-secondary", "btn-sm", 2, "width", "100%", 3, "id", "disabled", "ngClass", "click"], ["type", "button", "class", "btn btn-default btn-secondary btn-sm pull-right float-right", "tabindex", "-1", 3, "click", 4, "ngIf"], [4, "ngIf"], ["class", "text-center", 4, "ngFor", "ngForOf"], ["ngFor", "", 3, "ngForOf"], ["type", "button", "tabindex", "-1", 1, "btn", "btn-default", "btn-secondary", "btn-sm", "pull-left", "float-left", 3, "click"], ["type", "button", "tabindex", "-1", 1, "btn", "btn-default", "btn-secondary", "btn-sm", "pull-right", "float-right", 3, "click"], [1, "text-center"], ["aria-label", "labelz.full"], ["class", "h6", "class", "text-center", 4, "ngIf"], ["class", "text-center", "role", "gridcell", 3, "id", 4, "ngFor", "ngForOf"], ["role", "gridcell", 1, "text-center", 3, "id"], ["type", "button", "style", "min-width:100%;", "tabindex", "-1", 3, "class", "ngClass", "disabled", "click", 4, "ngIf"], ["type", "button", "tabindex", "-1", 2, "min-width", "100%", 3, "ngClass", "disabled", "click"], [3, "ngClass"]], template: function DayPickerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, DayPickerComponent_table_0_Template, 18, 15, "table", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.datePicker.datepickerMode === "day");
    } }, directives: [ɵngcc2.NgIf, ɵngcc2.NgClass, ɵngcc2.NgForOf], styles: ["[_nghost-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n      color: #292b2c;\n      background-color: #fff;\n      border-color: #ccc;\n    }\n    [_nghost-%COMP%]   .btn-info[_ngcontent-%COMP%]   .text-muted[_ngcontent-%COMP%] {\n      color: #292b2c !important;\n    }"] });
/** @nocollapse */
DayPickerComponent.ctorParameters = () => [
    { type: DatePickerInnerComponent }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DayPickerComponent, [{
        type: Component,
        args: [{
                selector: 'daypicker',
                template: `
<table *ngIf="datePicker.datepickerMode === 'day'" role="grid" [attr.aria-labelledby]="datePicker.uniqueId + '-title'" aria-activedescendant="activeDateId">
  <thead>
    <tr>
      <th>
        <button *ngIf="!isBs4"
                type="button"
                class="btn btn-default btn-secondary btn-sm pull-left float-left"
                (click)="datePicker.move(-1)"
                tabindex="-1">‹</button>
        <button *ngIf="isBs4"
                type="button"
                class="btn btn-default btn-secondary btn-sm pull-left float-left"
                (click)="datePicker.move(-1)"
                tabindex="-1">&lt;</button>
      </th>
      <th [attr.colspan]="5 + (datePicker.showWeeks ? 1 : 0)">
        <button [id]="datePicker.uniqueId + '-title'"
                type="button" class="btn btn-default btn-secondary btn-sm"
                (click)="datePicker.toggleMode(0)"
                [disabled]="datePicker.datepickerMode === datePicker.maxMode"
                [ngClass]="{disabled: datePicker.datepickerMode === datePicker.maxMode}" tabindex="-1" style="width:100%;">
          <strong>{{ title }}</strong>
        </button>
      </th>
      <th>
        <button *ngIf="!isBs4"
                type="button"
                class="btn btn-default btn-secondary btn-sm pull-right float-right"
                (click)="datePicker.move(1)"
                tabindex="-1">›</button>
        <button *ngIf="isBs4"
                type="button"
                class="btn btn-default btn-secondary btn-sm pull-right float-right"
                (click)="datePicker.move(1)"
                tabindex="-1">&gt;
        </button>
      </th>
    </tr>
    <tr>
      <th *ngIf="datePicker.showWeeks"></th>
      <th *ngFor="let labelz of labels" class="text-center">
        <small aria-label="labelz.full"><b>{{ labelz.abbr }}</b></small>
      </th>
    </tr>
  </thead>
  <tbody>
    <ng-template ngFor [ngForOf]="rows" let-rowz="$implicit" let-index="index">
      <tr *ngIf="!(datePicker.onlyCurrentMonth && rowz[0].secondary && rowz[6].secondary)">
        <td *ngIf="datePicker.showWeeks" class="h6" class="text-center">
          <em>{{ weekNumbers[index] }}</em>
        </td>
        <td *ngFor="let dtz of rowz" class="text-center" role="gridcell" [id]="dtz.uid">
          <button type="button" style="min-width:100%;" class="btn btn-sm {{dtz.customClass}}"
                  *ngIf="!(datePicker.onlyCurrentMonth && dtz.secondary)"
                  [ngClass]="{'btn-secondary': isBs4 && !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected, disabled: dtz.disabled, active: !isBs4 && datePicker.isActive(dtz), 'btn-default': !isBs4}"
                  [disabled]="dtz.disabled"
                  (click)="datePicker.select(dtz.date)" tabindex="-1">
            <span [ngClass]="{'text-muted': dtz.secondary || dtz.current, 'text-info': !isBs4 && dtz.current}">{{ dtz.label }}</span>
          </button>
        </td>
      </tr>
    </ng-template>
  </tbody>
</table>
  `,
                styles: [`
    :host .btn-secondary {
      color: #292b2c;
      background-color: #fff;
      border-color: #ccc;
    }
    :host .btn-info .text-muted {
      color: #292b2c !important;
    }
  `]
            }]
    }], function () { return [{ type: DatePickerInnerComponent }]; }, null); })();
if (false) {
    /** @type {?} */
    DayPickerComponent.prototype.labels;
    /** @type {?} */
    DayPickerComponent.prototype.title;
    /** @type {?} */
    DayPickerComponent.prototype.rows;
    /** @type {?} */
    DayPickerComponent.prototype.weekNumbers;
    /** @type {?} */
    DayPickerComponent.prototype.datePicker;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MonthPickerComponent {
    /**
     * @param {?} datePicker
     */
    constructor(datePicker) {
        this.rows = [];
        this.datePicker = datePicker;
    }
    /**
     * @return {?}
     */
    get isBs4() {
        return !isBs3();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const self = this;
        this.datePicker.stepMonth = { years: 1 };
        this.datePicker.setRefreshViewHandler((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const months = new Array(12);
            /** @type {?} */
            const year = this.activeDate.getFullYear();
            /** @type {?} */
            let date;
            for (let i = 0; i < 12; i++) {
                date = new Date(year, i, 1);
                date = this.fixTimeZone(date);
                months[i] = this.createDateObject(date, this.formatMonth);
                months[i].uid = this.uniqueId + '-' + i;
            }
            self.title = this.dateFilter(this.activeDate, this.formatMonthTitle);
            self.rows = this.split(months, self.datePicker.monthColLimit);
        }), 'month');
        this.datePicker.setCompareHandler((/**
         * @param {?} date1
         * @param {?} date2
         * @return {?}
         */
        function (date1, date2) {
            /** @type {?} */
            const d1 = new Date(date1.getFullYear(), date1.getMonth());
            /** @type {?} */
            const d2 = new Date(date2.getFullYear(), date2.getMonth());
            return d1.getTime() - d2.getTime();
        }), 'month');
        this.datePicker.refreshView();
    }
}
MonthPickerComponent.ɵfac = function MonthPickerComponent_Factory(t) { return new (t || MonthPickerComponent)(ɵngcc0.ɵɵdirectiveInject(DatePickerInnerComponent)); };
MonthPickerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: MonthPickerComponent, selectors: [["monthpicker"]], decls: 1, vars: 1, consts: [["role", "grid", 4, "ngIf"], ["role", "grid"], ["type", "button", "tabindex", "-1", 1, "btn", "btn-default", "btn-sm", "pull-left", "float-left", 3, "click"], ["type", "button", "tabindex", "-1", 1, "btn", "btn-default", "btn-sm", 2, "width", "100%", 3, "id", "disabled", "ngClass", "click"], ["type", "button", "tabindex", "-1", 1, "btn", "btn-default", "btn-sm", "pull-right", "float-right", 3, "click"], [4, "ngFor", "ngForOf"], ["class", "text-center", "role", "gridcell", 3, "ngClass", 4, "ngFor", "ngForOf"], ["role", "gridcell", 1, "text-center", 3, "ngClass"], ["type", "button", "tabindex", "-1", 1, "btn", "btn-default", 2, "min-width", "100%", 3, "ngClass", "disabled", "click"], [3, "ngClass"]], template: function MonthPickerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, MonthPickerComponent_table_0_Template, 15, 8, "table", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.datePicker.datepickerMode === "month");
    } }, directives: [ɵngcc2.NgIf, ɵngcc2.NgClass, ɵngcc2.NgForOf], styles: [_c9] });
/** @nocollapse */
MonthPickerComponent.ctorParameters = () => [
    { type: DatePickerInnerComponent }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(MonthPickerComponent, [{
        type: Component,
        args: [{
                selector: 'monthpicker',
                template: `
<table *ngIf="datePicker.datepickerMode==='month'" role="grid">
  <thead>
    <tr>
      <th>
        <button type="button" class="btn btn-default btn-sm pull-left float-left"
                (click)="datePicker.move(-1)" tabindex="-1">‹</button></th>
      <th [attr.colspan]="((datePicker.monthColLimit - 2) <= 0) ? 1 : datePicker.monthColLimit - 2">
        <button [id]="datePicker.uniqueId + '-title'"
                type="button" class="btn btn-default btn-sm"
                (click)="datePicker.toggleMode(0)"
                [disabled]="datePicker.datepickerMode === maxMode"
                [ngClass]="{disabled: datePicker.datepickerMode === maxMode}" tabindex="-1" style="width:100%;">
          <strong>{{ title }}</strong> 
        </button>
      </th>
      <th>
        <button type="button" class="btn btn-default btn-sm pull-right float-right"
                (click)="datePicker.move(1)" tabindex="-1">›</button>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let rowz of rows">
      <td *ngFor="let dtz of rowz" class="text-center" role="gridcell" [attr.id]="dtz.uid" [ngClass]="dtz.customClass">
        <button type="button" style="min-width:100%;" class="btn btn-default"
                [ngClass]="{'btn-link': isBs4 && !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected || (isBs4 && !dtz.selected && datePicker.isActive(dtz)), disabled: dtz.disabled, active: !isBs4 && datePicker.isActive(dtz)}"
                [disabled]="dtz.disabled"
                (click)="datePicker.select(dtz.date)" tabindex="-1">
          <span [ngClass]="{'text-success': isBs4 && dtz.current, 'text-info': !isBs4 && dtz.current}">{{ dtz.label }}</span>
        </button>
      </td>
    </tr>
  </tbody>
</table>
  `,
                styles: [`
    :host .btn-info .text-success {
      color: #fff !important;
    }
  `]
            }]
    }], function () { return [{ type: DatePickerInnerComponent }]; }, null); })();
if (false) {
    /** @type {?} */
    MonthPickerComponent.prototype.title;
    /** @type {?} */
    MonthPickerComponent.prototype.rows;
    /** @type {?} */
    MonthPickerComponent.prototype.datePicker;
    /** @type {?} */
    MonthPickerComponent.prototype.maxMode;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class YearPickerComponent {
    /**
     * @param {?} datePicker
     */
    constructor(datePicker) {
        this.rows = [];
        this.datePicker = datePicker;
    }
    /**
     * @return {?}
     */
    get isBs4() {
        return !isBs3();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const self = this;
        this.datePicker.stepYear = { years: this.datePicker.yearRange };
        this.datePicker.setRefreshViewHandler((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const years = new Array(this.yearRange);
            /** @type {?} */
            let date;
            /** @type {?} */
            const start = self.getStartingYear(this.activeDate.getFullYear());
            for (let i = 0; i < this.yearRange; i++) {
                date = new Date(start + i, 0, 1);
                date = this.fixTimeZone(date);
                years[i] = this.createDateObject(date, this.formatYear);
                years[i].uid = this.uniqueId + '-' + i;
            }
            self.title = [years[0].label, years[this.yearRange - 1].label].join(' - ');
            self.rows = this.split(years, self.datePicker.yearColLimit);
        }), 'year');
        this.datePicker.setCompareHandler((/**
         * @param {?} date1
         * @param {?} date2
         * @return {?}
         */
        function (date1, date2) {
            return date1.getFullYear() - date2.getFullYear();
        }), 'year');
        this.datePicker.refreshView();
    }
    /**
     * @protected
     * @param {?} year
     * @return {?}
     */
    getStartingYear(year) {
        // todo: parseInt
        return ((year - 1) / this.datePicker.yearRange * this.datePicker.yearRange + 1);
    }
}
YearPickerComponent.ɵfac = function YearPickerComponent_Factory(t) { return new (t || YearPickerComponent)(ɵngcc0.ɵɵdirectiveInject(DatePickerInnerComponent)); };
YearPickerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: YearPickerComponent, selectors: [["yearpicker"]], decls: 1, vars: 1, consts: [["role", "grid", 4, "ngIf"], ["role", "grid"], ["type", "button", "tabindex", "-1", 1, "btn", "btn-default", "btn-sm", "pull-left", "float-left", 3, "click"], ["role", "heading", "type", "button", "tabindex", "-1", 1, "btn", "btn-default", "btn-sm", 2, "width", "100%", 3, "id", "disabled", "ngClass", "click"], ["type", "button", "tabindex", "-1", 1, "btn", "btn-default", "btn-sm", "pull-right", "float-right", 3, "click"], [4, "ngFor", "ngForOf"], ["class", "text-center", "role", "gridcell", 4, "ngFor", "ngForOf"], ["role", "gridcell", 1, "text-center"], ["type", "button", "tabindex", "-1", 1, "btn", "btn-default", 2, "min-width", "100%", 3, "ngClass", "disabled", "click"], [3, "ngClass"]], template: function YearPickerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, YearPickerComponent_table_0_Template, 15, 8, "table", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.datePicker.datepickerMode === "year");
    } }, directives: [ɵngcc2.NgIf, ɵngcc2.NgClass, ɵngcc2.NgForOf], styles: [_c9] });
/** @nocollapse */
YearPickerComponent.ctorParameters = () => [
    { type: DatePickerInnerComponent }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(YearPickerComponent, [{
        type: Component,
        args: [{
                selector: 'yearpicker',
                template: `
<table *ngIf="datePicker.datepickerMode==='year'" role="grid">
  <thead>
    <tr>
      <th>
        <button type="button" class="btn btn-default btn-sm pull-left float-left"
                (click)="datePicker.move(-1)" tabindex="-1">‹</button>
      </th>
      <th [attr.colspan]="((datePicker.yearColLimit - 2) <= 0) ? 1 : datePicker.yearColLimit - 2">
        <button [id]="datePicker.uniqueId + '-title'" role="heading"
                type="button" class="btn btn-default btn-sm"
                (click)="datePicker.toggleMode(0)"
                [disabled]="datePicker.datepickerMode === datePicker.maxMode"
                [ngClass]="{disabled: datePicker.datepickerMode === datePicker.maxMode}" tabindex="-1" style="width:100%;">
          <strong>{{ title }}</strong>
        </button>
      </th>
      <th>
        <button type="button" class="btn btn-default btn-sm pull-right float-right"
                (click)="datePicker.move(1)" tabindex="-1">›</button>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let rowz of rows">
      <td *ngFor="let dtz of rowz" class="text-center" role="gridcell" [attr.id]="dtz.uid">
        <button type="button" style="min-width:100%;" class="btn btn-default"
                [ngClass]="{'btn-link': isBs4 && !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected || (isBs4 && !dtz.selected && datePicker.isActive(dtz)), disabled: dtz.disabled, active: !isBs4 && datePicker.isActive(dtz)}"
                [disabled]="dtz.disabled"
                (click)="datePicker.select(dtz.date)" tabindex="-1">
          <span [ngClass]="{'text-success': isBs4 && dtz.current, 'text-info': !isBs4 && dtz.current}">{{ dtz.label }}</span>
        </button>
      </td>
    </tr>
  </tbody>
</table>
  `,
                styles: [`
    :host .btn-info .text-success {
      color: #fff !important;
    }
  `]
            }]
    }], function () { return [{ type: DatePickerInnerComponent }]; }, null); })();
if (false) {
    /** @type {?} */
    YearPickerComponent.prototype.datePicker;
    /** @type {?} */
    YearPickerComponent.prototype.title;
    /** @type {?} */
    YearPickerComponent.prototype.rows;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatepickerModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: DatepickerModule, providers: [DatepickerConfig] };
    }
}
DatepickerModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DatepickerModule });
DatepickerModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DatepickerModule_Factory(t) { return new (t || DatepickerModule)(); }, imports: [[CommonModule, FormsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DatepickerModule, { declarations: function () { return [DatePickerComponent, DatePickerInnerComponent, DayPickerComponent, MonthPickerComponent, YearPickerComponent]; }, imports: function () { return [CommonModule, FormsModule]; }, exports: function () { return [DatePickerComponent, DatePickerInnerComponent, DayPickerComponent, MonthPickerComponent, YearPickerComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DatepickerModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule],
                declarations: [
                    DatePickerComponent,
                    DatePickerInnerComponent,
                    DayPickerComponent,
                    MonthPickerComponent,
                    YearPickerComponent
                ],
                exports: [
                    DatePickerComponent,
                    DatePickerInnerComponent,
                    DayPickerComponent,
                    MonthPickerComponent,
                    YearPickerComponent
                ],
                entryComponents: [DatePickerComponent]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { BsDatepickerConfig, BsDatepickerContainerComponent, BsDatepickerDirective, BsDatepickerInlineConfig, BsDatepickerInlineContainerComponent, BsDatepickerInlineDirective, BsDatepickerInputDirective, BsDatepickerModule, BsDaterangepickerConfig, BsDaterangepickerContainerComponent, BsDaterangepickerDirective, BsDaterangepickerInlineConfig, BsDaterangepickerInlineContainerComponent, BsDaterangepickerInlineDirective, BsDaterangepickerInputDirective, BsLocaleService, DateFormatter, DatePickerComponent, DatePickerInnerComponent, DatepickerConfig, DatepickerModule, DayPickerComponent, MonthPickerComponent, YearPickerComponent, DATEPICKER_CONTROL_VALUE_ACCESSOR as ɵa, BsDatepickerAbstractComponent as ɵb, BsDatepickerStore as ɵc, BsDatepickerEffects as ɵd, BsDatepickerActions as ɵe, datepickerAnimation as ɵf, BsCalendarLayoutComponent as ɵg, BsCurrentDateViewComponent as ɵh, BsCustomDatesViewComponent as ɵi, BsDatepickerDayDecoratorComponent as ɵj, BsDatepickerNavigationViewComponent as ɵk, BsDaysCalendarViewComponent as ɵl, BsMonthCalendarViewComponent as ɵm, BsTimepickerViewComponent as ɵn, BsYearsCalendarViewComponent as ɵo };

//# sourceMappingURL=ngx-bootstrap-datepicker.js.map