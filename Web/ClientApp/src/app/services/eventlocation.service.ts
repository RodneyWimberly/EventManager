import { Injectable } from '@angular/core';
import { forkJoin, Observable, generate } from 'rxjs';
import * as generated from './endpoint.services';

@Injectable()
export class EventLocationService {
  constructor(private eventEndpointService: generated.EventEndpointService,
    private authEndpointService: generated.AuthEndpointService) {

  }

  public get canManageEvents(): boolean {
    return this.authEndpointService.userPermissions.some(p => p == generated.PermissionValues.ManageEvents);
  }

  public get canViewEvents(): boolean {
    return this.authEndpointService.userPermissions.some(p => p == generated.PermissionValues.ViewEvents);
  }

  public get canExecuteEvents(): boolean {
    return this.authEndpointService.userPermissions.some(p => p == generated.PermissionValues.ExecuteEvents);
  }

  public getEventLocations(pageNumber?: number, pageSize?: number, includedPropertyPaths?: string): Observable<generated.EventLocation[]> {
    return pageNumber && pageSize ? this.eventEndpointService.getAllEventLocationsPaged(pageNumber, pageSize, includedPropertyPaths) :
      this.eventEndpointService.getAllEventLocations(includedPropertyPaths);
  }

  public getEventLocationsByEvent(eventId: number, pageNumber?: number, pageSize?: number, includedPropertyPaths?: string): Observable<generated.EventLocation[]> {
    if (includedPropertyPaths == undefined)
      includedPropertyPaths = "event";
    else if (!includedPropertyPaths.includes("event"))
      includedPropertyPaths += ";event";
    return pageNumber && pageSize ? this.eventEndpointService.getAllEventLocationsByEventPaged(eventId, pageNumber, pageSize, includedPropertyPaths) :
      this.eventEndpointService.getAllEventLocationsByEvent(eventId, includedPropertyPaths);
  }

  public getEventLocation(id: number, includedPropertyPaths?: string): Observable<generated.EventLocation> {
    return this.eventEndpointService.getEventLocation(id, includedPropertyPaths);
  }

  public addEventLocation(eventLocation: generated.EventLocation): Observable<generated.EventLocation> {
    return this.eventEndpointService.postEventLocation(eventLocation);
  }

  public updateEventLocation(eventLocation: generated.EventLocation, includedPropertyPaths?: string): Observable<generated.EventLocation> {
    if (!includedPropertyPaths)
      includedPropertyPaths = "";
    return this.eventEndpointService.putEventLocation(eventLocation.id, includedPropertyPaths, eventLocation);
  }

  public patchEventLocation(id: number, eventLocation: generated.Operation[], includedPropertyPaths?: string): Observable<generated.EventLocation> {
    if (!includedPropertyPaths)
      includedPropertyPaths = "";
    return this.eventEndpointService.patchEventLocation(id, includedPropertyPaths, eventLocation);
  }

  public deleteEventLocation(id: number): Observable<void> {
    return this.eventEndpointService.deleteEventLocation(id);
  }
}
