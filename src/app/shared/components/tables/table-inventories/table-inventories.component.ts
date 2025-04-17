import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inventory } from '../../../../models/bridge/inventory';
import { InventoryServiceService } from '../../../services/bridge-services/inventory-service.service';
import { NgForOf, CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-table-inventories',
  imports: [
    NgForOf,
    CommonModule
  ],
  templateUrl: './table-inventories.component.html',
  styleUrl: './table-inventories.component.css'
})
export class TableInventoriesComponent implements OnInit {
  inventories: Inventory[] = [];
  isPrivilegedUser$ = this.authService.isPrivilegedUser$;

  constructor(
    private inventoryService: InventoryServiceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.inventoryService.getInventories().subscribe({
      next: (inventarios) => {
        console.log('🧾 Inventarios obtenidos:', inventarios);
        this.inventories = inventarios.map(u => ({
          id: u.id,
          observaciones: u.observaciones,
          usuario: {
            id: u.usuario.id,
            nombres: u.usuario.nombres,
            apellidos: u.usuario.apellidos,
            correo: u.usuario.correo,
            identificacion: u.usuario.identificacion,
            municipio: u.usuario.municipio,
            tipoUsuario: u.usuario.tipoUsuario
          },
          puente: {
            id: u.puente.id,
            nombre: u.puente.nombre,
            identif: u.puente.identif,
            carretera: u.puente.carretera,
            pr: u.puente.pr,
            regional: u.puente.regional
          }
        }));
      },
      error: (err) => {
        console.error('❌ Error al obtener inventarios:', err);
      }
    });
  }
  

  navigateToCreateInventory() {
    this.router.navigate(['home/bridge-management/inventories/inventory-bridge']);
  }
  
  // no necesario
  navigateToEditInventory(puenteId: string, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate([`home/bridge-management/inventories/${puenteId}/inventory-bridge`]);
  }
  
  navigateToInspections(puenteId: string) {
    this.router.navigate([`home/bridge-management/inventories/${puenteId}/inspections`]);
  }

  navigateToViewInventory(bridgeId: number, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate([`/home/bridge-management/inventories/${bridgeId}/view-inventory-bridge`]);
  }
  

  // no necesario 
  // deleteInventory(puenteId: string, event: MouseEvent) {
  //   event.stopPropagation();
  //   if (confirm('¿Estás seguro de que deseas eliminar este inventario?')) {
  //     this.inventoryService.deleteInventory(puenteId).subscribe(() => {
  //       this.inventories = this.inventories.filter(inv => inv.id.toString() !== puenteId);
  //     });
  //   }
  // }
  
}
