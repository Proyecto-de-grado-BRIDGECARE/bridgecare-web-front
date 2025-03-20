import { Component } from '@angular/core';
import {HeaderComponent} from "../../../shared/components/layouts/header/header.component";
import {InventoryFormComponent} from "../../../shared/components/forms/inventory-form/inventory-form.component";

@Component({
    selector: 'app-inventory-bridge',
    imports: [
        HeaderComponent,
        InventoryFormComponent
    ],
    templateUrl: './inventory-bridge.component.html',
    styleUrl: './inventory-bridge.component.css'
})
export class InventoryBridgeComponent {

}
