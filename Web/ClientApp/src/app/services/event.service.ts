import { Injectable } from '@angular/core';
import * as generated from './endpoint.services';
import { Observable, forkJoin } from 'rxjs';

@Injectable()
export class EventService {
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

  public getEvents(pageNumber?: number, pageSize?: number): Observable<generated.Event[]> {
    return pageNumber && pageSize ? this.eventEndpointService.getAllEventsPaged(pageNumber, pageSize) :
      this.eventEndpointService.getAllEvents();
  }

  public getEvent(id: number): Observable<generated.Event> {
    return this.eventEndpointService.getEvent(id);
  }

  public addEvent(event: generated.Event): Observable<generated.Event> {
    return this.eventEndpointService.postEvent(event);
  }

  public updateEvent(event: generated.Event): Observable<void> {
    return this.eventEndpointService.putEvent(event.id, event);
  }

  public patchEvent(id: number, event: generated.Operation[]): Observable<void> {
    return this.eventEndpointService.patchEvent(id, event);
  }

  public deleteEvent(id: number): Observable<void> {
    return this.eventEndpointService.deleteEvent(id);
  }
}
