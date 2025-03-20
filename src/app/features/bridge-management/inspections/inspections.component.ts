import { Component } from '@angular/core';
import {HeaderComponent} from "../../../shared/components/layouts/header/header.component";
import {TableInspectionsComponent} from "../../../shared/components/tables/table-inspections/table-inspections.component";

@Component({
    selector: 'app-inspections',
    imports: [
        HeaderComponent,
        TableInspectionsComponent
    ],
    templateUrl: './inspections.component.html',
    styleUrl: './inspections.component.css'
})
export class InspectionsComponent {

}
