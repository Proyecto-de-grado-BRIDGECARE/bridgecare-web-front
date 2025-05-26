import { Component } from '@angular/core';
import { HomeImage } from '../../../../assets/images/home'; 
import { InventoryServiceService } from '../../services/bridge-services/inventory-service.service';
import * as L from 'leaflet';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: '../../../../assets/images/marker-icon-2x.png',
    iconUrl: '../../../../assets/images/marker-icon.png',
    shadowUrl: '../../../../assets/images/marker-shadow.png'
});

@Component({
    selector: 'app-home-main',
    imports: [
        HomeImage
    ],
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css'
})
export class HomePageComponent {

    
    private map!: L.Map;
    
    constructor(private inventoryService: InventoryServiceService) {}

    ngOnInit(): void {
    this.map = L.map('map').setView([4.5709, -74.2973], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.inventoryService.getGeographicInventories().subscribe((inventarios) => {
      inventarios.forEach(inv => {
        const lat = inv.posicionGeografica.latitud;
        const lng = inv.posicionGeografica.longitud;

        if (lat && lng) {
          L.marker([lat, lng]).addTo(this.map)
            .bindPopup(`<strong>${inv.nombrePuente}</strong><br>Regional: ${inv.regional}`);
        }
      });
    });
  }
}
