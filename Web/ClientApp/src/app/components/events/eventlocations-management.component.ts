import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AppTranslationService } from '../../services/app-translation.service';
import { EventLocationService } from "../../services/eventlocation.service";
import { Utilities } from '../../helpers/utilities';
import { EventLocationEditorComponent } from './eventlocation-editor.component';
import * as generated from '../../services/endpoint.services';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
    selector: 'eventlocations-management',
    templateUrl: './eventlocations-management.component.html',
    styleUrls: ['./eventlocations-management.component.scss']
})
export class EventLocationsManagementComponent implements OnInit, AfterViewInit {
  protected editingEventLocationName: { name: string };
  protected loadingIndicator: boolean;
  protected columns: any[] = [];
  protected rows: generated.EventLocation[] = [];
  private cachedRows: generated.EventLocation[] = [];
  private editedRowIndex: number;
  private searchValue: string;
  protected events: generated.Event[];

  @ViewChild('dataTable', { static: true })
  private ngxDatatable: DatatableComponent;

  @ViewChild('eventSchedulesTemplate', { static: true })
  private eventSchedulesTemplate: TemplateRef<any>;

  @ViewChild('actionsTemplate', { static: true })
  private actionsTemplate: TemplateRef<any>;

  @ViewChild('editorModal', { static: true })
  private editorModal: ModalDirective;

  @ViewChild('eventLocationEditor', { static: true })
  private eventLocationEditor: EventLocationEditorComponent;

  constructor(
    private alertService: AlertService,
    private translationService: AppTranslationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    protected eventLocationService: EventLocationService) {
  }

  public ngOnInit() {

    const gT = (key: string) => this.translationService.getTranslation(key);

    this.columns = [
      { prop: 'name', name: gT('eventlocations.management.Name'), width: 160 },
      { prop: 'address1', name: gT('eventlocations.management.Address1'), width: 200 },
      { prop: 'address2', name: gT('eventlocations.management.Address2'), width: 175 },
      { prop: 'city', name: gT('eventlocations.management.City'), width: 80 },
      { prop: 'state', name: gT('eventlocations.management.State'), width: 25 },
      { prop: 'zipCode', name: gT('eventlocations.management.ZipCode'), width: 50 },
      { prop: 'schedules', name: gT('eventlocations.management.Schedules'), width: 260, cellTemplate: this.eventSchedulesTemplate }
    ];

    if (this.canManageEvents) {
      this.columns.push({ name: '', width: 300, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false });
    }
    this.loadData(history.state);
  }

  public ngAfterViewInit() {
    this.eventLocationEditor.changesSavedCallback = (eventLocation: generated.EventLocation) => {
      this.onEditorModalSaved(eventLocation);
      this.editorModal.hide();
    };

    this.eventLocationEditor.changesCancelledCallback = () => {
      this.editorModal.hide();
    };
  }

  private loadData(state?: any) {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    if (state.id != undefined)
      this.eventLocationService.getEventLocationsByEvent(state.id, null, null, "schedules").subscribe(eventLocations => this.onLoadDataSuccessful(eventLocations), error => this.onLoadDataFailed(error));
    else
      this.eventLocationService.getEventLocations(null, null, "schedules").subscribe(eventLocations => this.onLoadDataSuccessful(eventLocations), error => this.onLoadDataFailed(error));
  }

  private onLoadDataSuccessful(eventLocations: generated.EventLocation[]) {
    this.cachedRows = eventLocations;
    this.onSearchChanged("");
    //this.rows = [...events];
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
  }

  private onLoadDataFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error', `Unable to retrieve event locations from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
      MessageSeverity.error, error);
  }

  protected onSearchChanged(value: string) {
    this.searchValue = value
    this.rows = this.cachedRows.filter(l => Utilities.searchArray(value, false, l.id, l.name, l.address1, l.address2, l.city, l.state, l.zipCode));
  }

  private onEditorModalSaved(updatedEventLocation: generated.EventLocation) {

    if (this.editedRowIndex > -1) {
      let cachedEventLocation: generated.EventLocation = this.cachedRows[this.editedRowIndex];
      updatedEventLocation.schedules = cachedEventLocation.schedules;
      this.cachedRows[this.editedRowIndex] = updatedEventLocation.clone();

      this.onSearchChanged(this.searchValue);
    } else {
      this.cachedRows.splice(this.cachedRows.length, 0, updatedEventLocation.clone());
      this.rows = [...this.cachedRows];
      this.ngxDatatable.offset = Math.round(this.rows.length / this.ngxDatatable.pageSize);
    }
  }

  protected onEditorModalHidden() {
    this.editingEventLocationName = null;
    this.eventLocationEditor.resetForm(true);
  }

  protected showEventSchedules(row: generated.EventLocation) {
  }

  protected newEventLocation() {
    this.editingEventLocationName = null;
    this.editedRowIndex = -1;
    this.eventLocationEditor.newEventLocation();
    this.editorModal.show();
  }

  protected editEventLocation(row: generated.EventLocation) {
    this.editingEventLocationName = { name: row.name };
    this.editedRowIndex = -1;
    this.cachedRows.forEach((value: generated.EventLocation, index: number, array: generated.EventLocation[]) => {
      if (value.id == row.id) {
        this.editedRowIndex = index;
      }
    });
    this.eventLocationEditor.editEventLocation(row);
    this.editorModal.show();
  }

  protected deleteEventLocation(row: generated.EventLocation) {
    this.alertService.showDialog('Are you sure you want to delete \"' + row.name + '\"?', DialogType.confirm, () => this.deleteEventLocationHelper(row));
  }

  private deleteEventLocationHelper(row: generated.EventLocation) {

    this.alertService.startLoadingMessage('Deleting...');
    this.loadingIndicator = true;

    this.eventLocationService.deleteEventLocation(row.id)
      .subscribe(results => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.cachedRows = this.cachedRows.filter(item => item !== row);
        this.rows = this.rows.filter(item => item !== row);
      },
        error => {
          this.alertService.stopLoadingMessage();
          this.loadingIndicator = false;

          this.alertService.showStickyMessage('Delete Error', `An error occurred whilst deleting the event location.\r\nError: "${Utilities.getHttpResponseMessages(error)}"`,
            MessageSeverity.error, error);
        });
  }

  protected getDisplayDaysOfTheWeek(daysOfTheWeek: generated.DaysOfTheWeek): string {
    if (daysOfTheWeek == undefined)
      return "";
    let displayDays: string = "";
    let columnNumber: number = 0;
    if (daysOfTheWeek & generated.DaysOfTheWeek.Sunday) {
      displayDays += "Sun";
      columnNumber++;
      if (columnNumber < 2)
        displayDays += ", ";
      else {
        //displayDays += "<br />";
        columnNumber = 0;
      }
    }
    if (daysOfTheWeek & generated.DaysOfTheWeek.Monday) {
      displayDays += "Mon, ";
      columnNumber++;
      if (columnNumber < 2)
        displayDays += ", ";
      else {
        //displayDays += "<br />";
        columnNumber = 0;
      }
    }
    if (daysOfTheWeek & generated.DaysOfTheWeek.Tuesday) {
      displayDays += "Tue, ";
      columnNumber++;
      if (columnNumber < 2)
        displayDays += ", ";
      else {
        //displayDays += "<br />";
        columnNumber = 0;
      }
    }
    if (daysOfTheWeek & generated.DaysOfTheWeek.Wednesday) {
      displayDays += "Wed, ";
      columnNumber++;
      if (columnNumber < 2)
        displayDays += ", ";
      else {
        //displayDays += "<br />";
        columnNumber = 0;
      }
    }
    if (daysOfTheWeek & generated.DaysOfTheWeek.Thursday) {
      displayDays += "Thu, ";
      columnNumber++;
      if (columnNumber < 2)
        displayDays += ", ";
      else {
        //displayDays += "<br />";
        columnNumber = 0;
      }
    }
    if (daysOfTheWeek & generated.DaysOfTheWeek.Friday) {
      displayDays += "Fri, ";
      columnNumber++;
      if (columnNumber < 2)
        displayDays += ", ";
      else {
        //displayDays += "<br />";
        columnNumber = 0;
      }
    }
    if (daysOfTheWeek & generated.DaysOfTheWeek.Saturday) {
      displayDays += "Sat, ";
      columnNumber++;
      if (columnNumber < 2)
        displayDays += ", ";
      else {
        //displayDays += "<br />";
        columnNumber = 0;
      }
    }
    displayDays = displayDays.substr(0, displayDays.length - 2);
    return displayDays.substr(0, displayDays.length - 3) + " & " + displayDays.substr(displayDays.length - 3, 3);
  }

  protected get canManageEvents() {
    return this.eventLocationService.canManageEvents;
  }
}
