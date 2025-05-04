import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Inspection, inspectionComponent } from "../../../../models/bridge/inspection";
import { ActivatedRoute, Router } from "@angular/router";
import { inspectionLists } from "../../../../models/lists/inspectionLists";
import { CommonModule, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from "@angular/common";
import swal from "sweetalert";
import { InspectionServiceService } from "../../../services/bridge-services/inspection-service.service";
import { InventoryServiceService } from "../../../services/bridge-services/inventory-service.service";
import { Puente } from '../../../../models/bridge/puente';

@Component({
    selector: 'app-inspection-form',
    imports: [
        FormsModule,
        CommonModule,
        NgForOf,
        NgIf,
        NgClass,
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault
    ],
    templateUrl: './inspection-form.component.html',
    styleUrl: './inspection-form.component.css'
})
export class InspectionFormComponent implements OnInit {

  formInspection: Inspection = {} as Inspection; 
  bridgeBasicInfo: Puente = {} as Puente;         
  inspectionId!: number;
  bridgeId!: number;
  viewMode: string = 'view';
  yearList: number[] = [];
  damageRatingList: any;
  damageTypeList: any;
  repairOptionsByComponent: any;


  constructor(
    private route: ActivatedRoute,
    private inspectionService: InspectionServiceService
  ) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.yearList = Array.from({ length: 10 }, (_, i) => currentYear + i);

    this.bridgeId = +this.route.snapshot.paramMap.get('bridgeIdentification')!;
    this.inspectionId = +this.route.snapshot.paramMap.get('inspectionId')!;
    console.log('id de la inspeccion: ', this.inspectionId);
    this.loadInspection();

    

    this.formInspection = {
      id: 0,
      fecha: new Date(),
      temperatura: 0,
      inspector: '',
      administrador: '',
      anioProximaInspeccion: new Date().getFullYear(),
      observacionesGenerales: '',
      componentes: [
        {
          nomb: 'Superestructura',
          calificacion: -1,
          mantenimiento: '',
          inspEesp: '',
          tipoDanio: '',
          reparacion: [],
          fotos: [],
          danio: ''
        },
        {
          nomb: 'Apoyo estructural',
          calificacion: -1,
          mantenimiento: '',
          inspEesp: '',
          tipoDanio: '',
          reparacion: [],
          fotos: [],
          danio: ''
        }
      ],
      usuario: {
        id: '',
        name: '',
        surname: '',
        identification: 0,
        email: '',
        type: 0,
        municipality: '',
        password: ''
      },
      puente: {
        id: 0,
        nombre: '',
        identif: '',
        carretera: '',
        pr: '',
        regional: ''
      }
    }
  }

  loadInspection(): void {
    this.inspectionService.getInspectionById(this.inspectionId).subscribe({
      next: (inspection) => {
        console.log(inspection);
        this.formInspection = inspection;
        this.bridgeBasicInfo = inspection.puente; 
      },
      error: (err) => {
        console.error('Error al cargar inspección', err);
      }
    });
  }

  onSubmit(viewMode: string): void {
    if (viewMode === 'view') {
      console.log('Vista: no se guarda');
    } else {
      console.log('Guardando inspección:', this.formInspection);

    }
  }
}
