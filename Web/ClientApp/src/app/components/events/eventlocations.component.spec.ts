/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { EventLocationsComponent } from './eventlocations.component';

let component: EventLocationsComponent;
let fixture: ComponentFixture<EventLocationsComponent>;

describe('eventLocations component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ EventLocationsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(EventLocationsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});