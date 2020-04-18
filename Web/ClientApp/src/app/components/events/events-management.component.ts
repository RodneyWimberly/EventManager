import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AppTranslationService } from '../../services/app-translation.service';
import { EventService } from "../../services/event.service";
import { Utilities } from '../../helpers/utilities';
import { EventEditorComponent } from './event-editor.component';
import * as generated from '../../services/endpoint.services';
import { DatatableComponent } from '@swimlane/ngx-datatable';

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
  protected editedEvent: generated.Event;
  private cachedEvent: generated.Event;
  private cachedRows: generated.Event[] = [];


  @ViewChild('dataTable', { static: true })
  private ngxDatatable: DatatableComponent;
  
  @ViewChild('actionsTemplate', { static: true })
  private actionsTemplate: TemplateRef<any>;

  @ViewChild('editorModal', { static: true })
  private editorModal: ModalDirective;

  @ViewChild('eventEditor', { static: true })
  private eventEditor: EventEditorComponent;

  constructor(
    private alertService: AlertService,
    private translationService: AppTranslationService,
    protected eventService: EventService) {
  }

  public ngOnInit() {

    const gT = (key: string) => this.translationService.getTranslation(key);

    this.columns = [
      { prop: 'name', name: gT('events.management.Name'), width: 300 },
      { prop: 'description', name: gT('events.management.Description'), width: 500 }
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
      this.editedEvent = null;
      this.cachedEvent = null;
      this.editorModal.hide();
    };
  }

  private loadData() {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    this.eventService.getEvents().subscribe(events => this.onLoadDataSuccessful(events), error => this.onLoadDataFailed(error));

  }

  private onLoadDataSuccessful(events: generated.Event[]) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.cachedRows = [...events];
    this.rows = events;
  }

  private onLoadDataFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error', `Unable to retrieve events from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
      MessageSeverity.error, error);
  }

  protected onSearchChanged(value: string) {
    this.rows = this.cachedRows.filter(r => Utilities.searchArray(value, false, r.id, r.name, r.description));
  }

  private onEditorModalSaved(newEvent: generated.Event) {

    if (this.cachedEvent) {
      let sourceIndex = this.cachedRows.indexOf(this.cachedEvent, 0);
      if (sourceIndex > -1) {
        Object.assign(this.cachedEvent, newEvent);
        Object.assign(this.cachedRows[sourceIndex], this.cachedEvent);
        Object.assign(this.rows[sourceIndex], this.cachedEvent);
      }
    } else {
      const event = new generated.Event();
      Object.assign(event, newEvent);
      this.cachedRows.splice(this.cachedRows.length, 0, event);
      this.rows.splice(this.rows.length, 0, event);
      this.rows = [...this.rows];
      this.ngxDatatable.offset = Math.round(this.rows.length / this.ngxDatatable.pageSize);
    }
    this.editedEvent = null;
    this.cachedEvent = null;
  }

  protected onEditorModalHidden() {
    this.editingEventName = null;
    this.eventEditor.resetForm(true);
  }

  protected showEventLocations(row: generated.Event) {

  }

  protected showEventSchedules(row: generated.Event) {
  }

  protected newEvent() {
    this.editingEventName = null;
    this.cachedEvent = null;
    this.editedEvent = this.eventEditor.newEvent();
    this.editorModal.show();
  }

  protected editEvent(row: generated.Event) {
    this.editingEventName = { name: row.name };
    this.cachedEvent = row;
    this.editedEvent = this.eventEditor.editEvent(row);
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

  protected get canManageEvents() {
    return this.eventService.canManageEvents;
  }
}
