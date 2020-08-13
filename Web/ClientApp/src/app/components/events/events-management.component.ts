import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AppTranslationService } from '../../services/app-translation.service';
import { EventService } from "../../services/event.service";
import { Utilities } from '../../helpers/utilities';
import { EventEditorComponent } from './event-editor.component';
import * as generated from '../../services/endpoint.services';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'events-management',
  templateUrl: './events-management.component.html',
  styleUrls: ['./events-management.component.scss']
})

export class EventsManagementComponent implements OnInit, AfterViewInit {
  protected editingEventName: { name: string };
  protected loadingIndicator: boolean;
  protected columns: any[] = [];
  protected rows: generated.Event[] = [];
  private cachedRows: generated.Event[] = [];
  private editedRowIndex: number;
  private searchValue: string;


  @ViewChild('dataTable', { static: true })
  private ngxDatatable: DatatableComponent;

  @ViewChild('eventLocationsTemplate', { static: true })
  private eventLocationsTemplate: TemplateRef<any>;
  
  @ViewChild('actionsTemplate', { static: true })
  private actionsTemplate: TemplateRef<any>;

  @ViewChild('editorModal', { static: true })
  private editorModal: ModalDirective;

  @ViewChild('eventEditor', { static: true })
  private eventEditor: EventEditorComponent;

  constructor(
    private alertService: AlertService,
    private translationService: AppTranslationService,
    private router: Router,
    protected eventService: EventService) {
  }

  public ngOnInit() {

    const gT = (key: string) => this.translationService.getTranslation(key);

    this.columns = [
      { prop: 'name', name: gT('events.management.Name'), width: 200 },
      { prop: 'description', name: gT('events.management.Description'), width: 275 },
      { prop: 'locations', name: gT('events.management.Locations'), width: 350, cellTemplate: this.eventLocationsTemplate },
  ];

    if (this.canManageEvents) {
      this.columns.push({ name: '', width: 400, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false });
    }
    this.loadData();
  }

  public ngAfterViewInit() {
    this.eventEditor.changesSavedCallback = (event: generated.Event) => {
      this.onEditorModalSaved(event);
      this.editorModal.hide();
    };

    this.eventEditor.changesCancelledCallback = () => {
      this.editorModal.hide();
    };
  }

  private loadData() {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.eventService.getEvents(null, null, "locations.schedules").subscribe(events => this.onLoadDataSuccessful(events), error => this.onLoadDataFailed(error));
  }

  private onLoadDataSuccessful(events: generated.Event[]) {
    this.cachedRows = events;
    this.onSearchChanged("");
    //this.rows = [...events];
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
  }

  private onLoadDataFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error', `Unable to retrieve events from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
      MessageSeverity.error, error);
  }

  protected onSearchChanged(value: string) {
    this.searchValue = value
    this.rows = this.cachedRows.filter(r => Utilities.searchArray(value, false, r.id, r.name, r.description));
  }

  private onEditorModalSaved(updatedEvent: generated.Event) {

    if (this.editedRowIndex > -1) {
      let cachedEvent: generated.Event = this.cachedRows[this.editedRowIndex];
      updatedEvent.locations = cachedEvent.locations;
      updatedEvent.schedules = cachedEvent.schedules;
      this.cachedRows[this.editedRowIndex] = updatedEvent.clone();

      this.onSearchChanged(this.searchValue);
    } else {
      this.cachedRows.splice(this.cachedRows.length, 0, updatedEvent.clone());
      this.rows = [...this.cachedRows];
      this.ngxDatatable.offset = Math.round(this.rows.length / this.ngxDatatable.pageSize);
    }
  }

  protected onEditorModalHidden() {
    this.editingEventName = null;
    this.eventEditor.resetForm(true);
  }

  protected showEventLocations(row: generated.Event) {
    this.router.navigateByUrl('/locations', { state: { id: row.id }});
  }

  protected showEventSchedules(row: generated.Event) {
    this.router.navigateByUrl('/schedules', { state: { id: row.id } });
  }

  protected newEvent() {
    this.editingEventName = null;
    this.editedRowIndex = -1;
    this.eventEditor.newEvent();
    this.editorModal.show();
  }

  protected editEvent(row: generated.Event) {
    this.editingEventName = { name: row.name };
    this.editedRowIndex = -1;
    this.cachedRows.forEach((value: generated.Event, index: number, array: generated.Event[]) => {
      if (value.id == row.id) {
        this.editedRowIndex = index;
      }
    });
    this.eventEditor.editEvent(row);
    this.editorModal.show();
  }

  protected deleteEvent(row: generated.Event) {
    this.alertService.showDialog('Are you sure you want to delete \"' + row.name + '\"?', DialogType.confirm, () => this.deleteEventHelper(row));
  }

  private deleteEventHelper(row: generated.Event) {

    this.alertService.startLoadingMessage('Deleting...');
    this.loadingIndicator = true;

    this.eventService.deleteEvent(row.id)
      .subscribe(results => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.cachedRows = this.cachedRows.filter(item => item !== row);
        this.rows = this.rows.filter(item => item !== row);
      },
        error => {
          this.alertService.stopLoadingMessage();
          this.loadingIndicator = false;

          this.alertService.showStickyMessage('Delete Error', `An error occurred whilst deleting the event.\r\nError: "${Utilities.getHttpResponseMessages(error)}"`,
            MessageSeverity.error, error);
        });
  }

  protected getDisplayDaysOfTheWeek(daysOfTheWeek: generated.DaysOfTheWeek): string {
    if (daysOfTheWeek == undefined)
      return "";
    let displayDays: string = "";
    if (daysOfTheWeek & generated.DaysOfTheWeek.Sunday)
      displayDays += "Sun, ";
    if (daysOfTheWeek & generated.DaysOfTheWeek.Monday)
      displayDays += "Mon, ";
    if (daysOfTheWeek & generated.DaysOfTheWeek.Tuesday)
      displayDays += "Tue, ";
    if (daysOfTheWeek & generated.DaysOfTheWeek.Wednesday)
      displayDays += "Wed, ";
    if (daysOfTheWeek & generated.DaysOfTheWeek.Thursday)
      displayDays += "Thu, ";
    if (daysOfTheWeek & generated.DaysOfTheWeek.Friday)
      displayDays += "Fri, ";
    if (daysOfTheWeek & generated.DaysOfTheWeek.Saturday)
      displayDays += "Sat, ";

    displayDays = displayDays.substr(0, displayDays.length - 2);
    return displayDays.substr(0, displayDays.length - 3) + " & " + displayDays.substr(displayDays.length - 3, 3);
  }

  protected get canManageEvents() {
    return this.eventService.canManageEvents;
  }
}
