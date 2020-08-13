import { Component } from '@angular/core';
import { fadeInOut } from '../../helpers/animations';

@Component({
    selector: 'eventlocations',
    templateUrl: './eventlocations.component.html',
  styleUrls: ['./eventlocations.component.scss'],
  animations: [fadeInOut]
})
export class EventLocationsComponent {
    constructor() {

    }
}
