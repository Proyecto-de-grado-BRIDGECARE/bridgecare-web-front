import { Component } from '@angular/core';
import {HeaderComponent} from "../../../shared/components/layouts/header/header.component";
import {InspectionFormComponent} from "../../../shared/components/forms/inspection-form/inspection-form.component";



@Component({
    selector: 'app-inspection-bridge',
    imports: [
        HeaderComponent,
        InspectionFormComponent
    ],
    templateUrl: './inspection-bridge.component.html',
    styleUrl: './inspection-bridge.component.css'
})
export class InspectionBridgeComponent {

}
