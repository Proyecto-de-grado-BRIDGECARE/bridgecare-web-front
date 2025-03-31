import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InspectionServiceService } from "../../../services/bridge-services/inspection-service.service";
import { CommonModule, NgForOf } from "@angular/common";
import { IconDelete } from "../../../../../assets/icons/delete";
import { IconEdit } from "../../../../../assets/icons/edit";
import { IconSettings } from "../../../../../assets/icons/settings";
import { IconView } from "../../../../../assets/icons/view";
import { FormsModule } from "@angular/forms";
import { InventoryServiceService } from "../../../services/bridge-services/inventory-service.service";
import { waitForAsync } from "@angular/core/testing";
import { AuthService } from '../../../services/auth/auth.service';

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
  searchTerm: string = '';
  bridgeId: any;
  bridgeName: string = '';
  inspections: any[] = [
    {
      id: 0,
      administrator: '',
      inspector: '',
      date: Date,
    }
  ]
  filteredInspections: any[] = this.inspections;

  isPrivilegedUser$ = this.authService.isPrivilegedUser$;

  constructor(
    private inventoryService: InventoryServiceService,
    private inspectionService: InspectionServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    console.log('PRIVILEGED: ' + this.isPrivilegedUser$);
    this.route.params.subscribe(params => {
      this.bridgeId = (params['bridgeIdentification']);
    });
    this.inventoryService.getBridgeName(this.bridgeId).subscribe((bridgeName) => {
      if (bridgeName != null) {
        this.bridgeName = bridgeName;
      }
    });
    //Get inspections from database
    this.inspectionService.getInspections(this.bridgeId).subscribe(
      (data: any) => {
        //reset inspections array
        this.inspections = [];
        if (data.length !== 0) {
          //ITERATE THE DATA
          data.forEach((inspection: any) => {
            //PUSH DATA TO INSPECTIONS ARRAY
            this.inspections.push({
              id: inspection.id,
              administrator: inspection.administrator,
              inspector: inspection.inspector,
              date: inspection.date,
            });
          });
        }
        this.filteredInspections = this.inspections;
      }
    );
  }

  viewInspection(inspectionId: number) {
    this.router.navigate([`home/bridge-management/inventories/${this.bridgeId}/inspections/inspection-bridge`], {
      queryParams: {
        mode: 'view',
        inspid: inspectionId
      }
    });
  }

  editInspection(inspectionId: number) {
    this.router.navigate([`home/bridge-management/inventories/${this.bridgeId}/inspections/inspection-bridge`], {
      queryParams: {
        mode: 'edit',
        inspid: inspectionId
      }
    });
  }

  createInspection() {
    this.router.navigate([`home/bridge-management/inventories/${this.bridgeId}/inspections/inspection-bridge`], { queryParams: { mode: 'new' } });
  }

  filterInspections() {
    if (!this.searchTerm.trim()) {
      // If searchTerm is empty, show all inspections
      this.filteredInspections = this.inspections;
    } else {
      // Filter inspections based on searchTerm
      this.filteredInspections = this.inspections.filter(inspection =>
        inspection.administrator.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        inspection.inspector.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        inspection.id.toString().includes(this.searchTerm.toLowerCase()) || // Filter by ID
        inspection.date.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) // Ensure date is in string format
      );
    }
  }

  deleteInspection(id: any) {
    this.inspectionService.deleteInspection(this.bridgeId, id).then(() => {
      waitForAsync(this.ngOnInit);
    });
  }
}
