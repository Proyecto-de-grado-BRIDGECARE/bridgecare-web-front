import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule, NgForOf } from "@angular/common";
import { IconDelete } from "../../../../../assets/icons/delete";
import { IconEdit } from "../../../../../assets/icons/edit";
import { IconSettings } from "../../../../../assets/icons/settings";
import { IconView } from "../../../../../assets/icons/view";
import { FormsModule } from "@angular/forms";
import { Inspection } from '../../../../models/bridge/inspection';
import { InspectionServiceService } from '../../../services/bridge-services/inspection-service.service';

@Component({
    selector: 'app-table-inspections',
    imports: [
        NgForOf,
        IconDelete,
        IconEdit,
        IconSettings,
        IconView,
        FormsModule,
        CommonModule
    ],
    templateUrl: './table-inspections.component.html',
    styleUrl: './table-inspections.component.css'
})
export class TableInspectionsComponent implements OnInit {
  
  bridgeId!: number;
  bridgeName: string = '';
  inspections: Inspection[] = [];
  filteredInspections: Inspection[] = [];
  searchTerm: string = '';

  constructor(
    private inspectionService: InspectionServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bridgeId = +this.route.snapshot.paramMap.get('bridgeIdentification')!;
    this.loadInspections(this.bridgeId);
  }
  
  
  loadInspections(puenteId: number): void {
    this.inspectionService.getInspectionsByBridge(puenteId).subscribe({
      next: (data) => {
        this.inspections = data;
        this.filteredInspections = [...data];
        if (data.length > 0) {
          this.bridgeName = data[0].puente.nombre;
        }
      },
      error: (err) => {
        console.error('Error al cargar inspecciones', err);
      }
    });
  }

  filterInspections(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredInspections = this.inspections.filter(inspection =>
      inspection.id.toString().includes(term) ||
      inspection.administrador?.toLowerCase().includes(term) ||
      inspection.fecha?.toString().includes(term)
    );
  }

  viewInspection(inspectionId: number): void {
    this.router.navigate([`home/bridge-management/inventories/${this.bridgeId}/inspections/${inspectionId}/view`]);
  }

}
