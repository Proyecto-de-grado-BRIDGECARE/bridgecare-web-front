import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/layouts/header/header.component";
import { TableUsersComponent } from '../../../shared/components/tables/table-users/table-users.component';

@Component({
    selector: 'app-manage-users',
    imports: [
        HeaderComponent,
        TableUsersComponent
    ],
    templateUrl: './manage-users.component.html',
    styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {

}
