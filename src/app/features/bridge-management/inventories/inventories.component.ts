import { Component } from '@angular/core';
import {HeaderComponent} from "../../../shared/components/layouts/header/header.component";
import {TableInventoriesComponent} from "../../../shared/components/tables/table-inventories/table-inventories.component";

@Component({
    selector: 'app-inventories',
    imports: [
        HeaderComponent,
        TableInventoriesComponent
    ],
    templateUrl: './inventories.component.html',
    styleUrl: './inventories.component.css'
})
export class InventoriesComponent {

}
