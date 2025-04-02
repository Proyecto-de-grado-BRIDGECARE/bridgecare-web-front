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

  ngOnInit() {
    this.inventoryService.getInventories().subscribe({
      next: (data: Inventory[]) => {
        this.inventories = data;
      },
      error: (err) => {
        console.error('Error al obtener inventarios:', err);
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

  navigateToViewInventory(puenteId: string, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate([`home/bridge-management/inventories/${puenteId}/view-inventory-bridge`]);
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
