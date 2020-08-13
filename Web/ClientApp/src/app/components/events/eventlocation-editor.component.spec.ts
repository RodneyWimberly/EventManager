/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { EventLocationEditorComponent } from './eventlocation-editor.component';

let component: EventLocationEditorComponent;
let fixture: ComponentFixture<EventLocationEditorComponent>;

describe('eventlocation-editor component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ EventLocationEditorComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(EventLocationEditorComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});