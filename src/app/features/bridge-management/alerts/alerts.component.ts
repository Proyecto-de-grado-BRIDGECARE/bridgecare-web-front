import { Component } from '@angular/core';
import { TableAlertsComponent } from '../../../shared/components/tables/table-alerts/table-alerts.component';
import { HeaderComponent } from '../../../shared/components/layouts/header/header.component';

@Component({
  selector: 'app-alerts',
  imports: [
    HeaderComponent,
    TableAlertsComponent
  ],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {

}
