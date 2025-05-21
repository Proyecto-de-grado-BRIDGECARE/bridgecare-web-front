import { Component } from '@angular/core';
import { HomeImage } from '../../../../assets/images/home'; 
import { InventoryServiceService } from '../../services/bridge-services/inventory-service.service';
import * as L from 'leaflet';

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
        this.initMap();
        this.inventoryService.getGeographicInventories().subscribe((inventarios) => {
            inventarios.forEach(inv => {
                const lat = inv.posicionGeografica.latitud;
                const lng = inv.posicionGeografica.longitud;
    
                if (lat && lng) {
                    const marker = L.marker([lat, lng]).addTo(this.map);
                    marker.bindPopup(`<strong>${inv.nombrePuente}</strong><br>Regional: ${inv.regional}`);
                }
        });
        });
    }
    
    private initMap(): void {
        this.map = L.map('map').setView([4.5709, -74.2973], 10); // Centro de Colombia
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    }
}
