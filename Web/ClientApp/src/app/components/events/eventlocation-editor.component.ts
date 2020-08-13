import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { EventService } from "../../services/event.service";
import { EventLocationService } from "../../services/eventlocation.service";
import { Utilities } from '../../helpers/utilities';
import * as generated from '../../services/endpoint.services';
import { ViewModelStates } from '../../models/enum.models';
import { AppTranslationService } from '../../services/app-translation.service';

@Component({
    selector: 'eventlocation-editor',
    templateUrl: './eventlocation-editor.component.html',
    styleUrls: ['./eventlocation-editor.component.scss']
})
export class EventLocationEditorComponent implements OnInit {
  public changesSavedCallback: (eventLocation: generated.EventLocation) => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;

  protected showValidationErrors = false;
  protected isSaving = false;
  protected formResetToggle = true;
  protected viewModelState: ViewModelStates = ViewModelStates.Edit;
  protected eventLocation: generated.EventLocation = new generated.EventLocation();
  protected events: generated.Event[];

  @ViewChild('form')
  public form;

  @ViewChild('eventSelector')
  public eventSelector;

  @ViewChild('name')
  public name;

  @ViewChild('address1')
  public address1;

  @ViewChild('address2')
  public address2;

  @ViewChild('city')
  public city;

  @ViewChild('state')
  public state;

  @ViewChild('zipCode')
  public zipCode;

  constructor(private alertService: AlertService,
    private translationService: AppTranslationService,
    private eventService: EventService,
    private eventLocationService: EventLocationService) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.eventService.getEvents().subscribe(events => this.onLoadDataSuccessful(events), error => this.onLoadDataFailed(error));
  }

  private onLoadDataSuccessful(events: generated.Event[]): void {
    this.events = events;
    this.alertService.stopLoadingMessage();
    setTimeout(() => {
      if (this.eventSelector) {
        this.eventSelector.refresh();
      }
      
    });
  }

  private onLoadDataFailed(error: any): void {
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Load Error', `Unable to retrieve user data from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`, MessageSeverity.error, error);
  }

  public translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  public resetForm(replace = false): void {
    if (!replace) {
      this.form.reset();
    } else {
      this.formResetToggle = false;
      setTimeout(() => {
        this.formResetToggle = true;
      });
    }
  }

  public newEventLocation(): void {
    this.viewModelState = ViewModelStates.New;
    this.showValidationErrors = true;
    this.eventLocation = new generated.EventLocation();
  }

  public editEventLocation(eventLocation: generated.EventLocation): void {
    this.viewModelState = ViewModelStates.Edit;
    this.showValidationErrors = true;
    this.eventLocation = eventLocation.clone();
  }

  public viewEventLocation(eventLocation: generated.EventLocation): generated.EventLocation {
    this.viewModelState = ViewModelStates.View;
    return this.eventLocation = eventLocation;
  }

  protected get canManageEvents(): boolean {
    return this.eventLocationService.canManageEvents;
  }

  protected get isEditMode(): boolean {
    return this.viewModelState == ViewModelStates.Edit || this.viewModelState == ViewModelStates.New;
  }

  protected cancel(): void {
    this.showValidationErrors = false;
    this.alertService.showMessage('Canceled', 'Operation canceled by user', MessageSeverity.default);
    this.alertService.resetStickyMessage();

    if (this.changesCancelledCallback) {
      this.changesCancelledCallback();
    }
  }

  protected close(): void {
    this.showValidationErrors = false;
    if (this.changesCancelledCallback) {
      this.changesCancelledCallback();
    }
  }

  protected save(): void {
    this.isSaving = true;
    this.alertService.startLoadingMessage('Saving changes...');
    this.eventLocation.schedules = null;

    if (this.viewModelState == ViewModelStates.New) {
      this.eventLocation.event = null;
      this.eventLocationService.addEventLocation(this.eventLocation).subscribe(eventLocation => this.saveSuccessHelper(eventLocation), error => this.saveFailedHelper(error));
    } else if (this.viewModelState == ViewModelStates.Edit) {
      this.eventLocationService.updateEventLocation(this.eventLocation).subscribe(eventLocation => this.saveSuccessHelper(eventLocation), error => this.saveFailedHelper(error));
    }
  }

  protected showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }

  private saveSuccessHelper(eventLocation: generated.EventLocation): void {
    this.eventLocation = eventLocation;
    this.showValidationErrors = false;

    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    var eventLocationName: string = eventLocation.name;

    if (this.viewModelState == ViewModelStates.New) {
      this.alertService.showMessage('Success', `Event Location \"${eventLocationName}\" was created successfully`, MessageSeverity.success);
    } else if (this.viewModelState == ViewModelStates.Edit) {
      this.alertService.showMessage('Success', `Changes to event location \"${eventLocationName}\" was saved successfully`, MessageSeverity.success);
    }
    if (this.changesSavedCallback) {
      this.changesSavedCallback(eventLocation);
    }
    this.viewModelState = ViewModelStates.Edit;
    this.resetForm();
  }

  private saveFailedHelper(error: any): void {
    this.showValidationErrors = false;
    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Save Error', 'The below errors occurred while saving your changes:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);

    if (this.changesFailedCallback) {
      this.changesFailedCallback();
    }
  }
}

