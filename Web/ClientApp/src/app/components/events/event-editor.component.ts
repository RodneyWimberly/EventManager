import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { EventService } from "../../services/event.service";
import { Utilities } from '../../helpers/utilities';
import * as generated from '../../services/endpoint.services';
import { ViewModelStates } from '../../models/enum.models';
import { AppTranslationService } from '../../services/app-translation.service';

@Component({
  selector: 'event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})

export class EventEditorComponent implements OnInit {
  public changesSavedCallback: (event: generated.Event) => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;

  protected showValidationErrors = false;
  protected isSaving = false;
  protected uniqueId: string = Utilities.uniqueId();
  protected formResetToggle = true;
  protected viewModelState: ViewModelStates = ViewModelStates.Edit;
  protected stateKeys: number[];
  protected event: generated.Event = new generated.Event();
 
  @ViewChild('form')
  public form;

  @ViewChild('name')
  public name;

  @ViewChild('description')
  public description;

  constructor(private alertService: AlertService,
    private translationService: AppTranslationService,
    private eventService: EventService) {
  }

  public ngOnInit(): void {
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

  public newEvent(): void {
    this.viewModelState = ViewModelStates.New;
    this.showValidationErrors = true;
    this.event = new generated.Event();
  }

  public editEvent(event: generated.Event): void {
    this.viewModelState = ViewModelStates.Edit;
    this.showValidationErrors = true;
    this.event = event.clone();
  }

  public viewEvent(event: generated.Event): generated.Event {
    this.viewModelState = ViewModelStates.View;
    return this.event = event;
  }

  protected get canManageEvents(): boolean {
    return this.eventService.canManageEvents;
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
    this.event.locations = null;
    this.event.schedules = null;
    this.event.occurrences = null;
    this.event.services = null;

    if (this.viewModelState == ViewModelStates.New) {
      this.eventService.addEvent(this.event).subscribe(event => this.saveSuccessHelper(event), error => this.saveFailedHelper(error));
    } else if (this.viewModelState == ViewModelStates.Edit) {
      this.eventService.updateEvent(this.event).subscribe(event => this.saveSuccessHelper(event), error => this.saveFailedHelper(error));
    }
  }

  protected showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }

  private saveSuccessHelper(event: generated.Event): void {
    this.event = event;
    this.showValidationErrors = false;

    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    var eventName: string = event.name;

    if (this.viewModelState == ViewModelStates.New) {
      this.alertService.showMessage('Success', `Event \"${eventName}\" was created successfully`, MessageSeverity.success);
    } else if (this.viewModelState == ViewModelStates.Edit) {
      this.alertService.showMessage('Success', `Changes to event \"${eventName}\" was saved successfully`, MessageSeverity.success);
    }
    if (this.changesSavedCallback) {
      this.changesSavedCallback(event);
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
  

