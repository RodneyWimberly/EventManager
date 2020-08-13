/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { EventLocationsManagementComponent } from './eventlocations-management.component';

let component: EventLocationsManagementComponent;
let fixture: ComponentFixture<EventLocationsManagementComponent>;

describe('eventlocations-management component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ EventLocationsManagementComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(EventLocationsManagementComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});