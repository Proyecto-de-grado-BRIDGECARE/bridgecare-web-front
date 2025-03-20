import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Inspection, inspectionComponent } from "../../../../models/bridge/inspection";
import { ActivatedRoute, Router } from "@angular/router";
import { inspectionLists } from "../../../../models/lists/inspectionLists";
import { NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from "@angular/common";
import swal from "sweetalert";
import { InspectionServiceService } from "../../../services/bridge-services/inspection-service.service";
import { InventoryServiceService } from "../../../services/bridge-services/inventory-service.service";

@Component({
    selector: 'app-inspection-form',
    imports: [
        FormsModule,
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

  viewMode: 'view' | 'edit' | 'new' | undefined = undefined;
  inspectionId: number = -1;
  bridgeId: any;

  inspections: Inspection[] = [];
  bridgeBasicInfo = {
    name: '',
    regionalId: 0,
    roadId: 0,
    bridgeId: 0,
    road: '',
    pr: '',
  }
  formInspection: Inspection = {
    inspectionId: 0,
    date: new Date(),
    temperature: 0,
    inspector: '',
    administrator: '',
    nextInspectionYear: 0,
    inspectionComponents: [],
    generalComments: ''
  }
  componentNames: string[] = [];
  yearList: number[] = [];
  currentMonthStart: string = '';
  currentMonthEnd: string = '';
  damageRatingList: any;
  damageTypeList: any;
  repairOptionsByComponent: any;

  constructor(
    private inventoryService: InventoryServiceService,
    private inspectionService: InspectionServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    //Obtain the mode, bridgeId and/or inspectionId from the query params
    this.route.queryParams.subscribe(params => {
      const mode = params['mode'];
      if (mode) {
        this.viewMode = mode === 'edit' ? 'edit' : mode === 'new' ? 'new' : 'view';
      } else {
        this.viewMode = 'view';
      }
    });
    this.route.params.subscribe(params => {
      const id = params['bridgeIdentification'];
      if (id) {
        this.bridgeId = id;
      }
    });
    if (this.viewMode === 'new') {
      this.inspectionService.generateInspectionId().then((inspectionId) => {
        if (inspectionId != null) {
          this.inspectionId = inspectionId;
          this.formInspection.inspectionId = inspectionId;
        }
      });
    } else if (this.viewMode === 'edit' || this.viewMode === 'view') {
      this.route.queryParams.subscribe(params => {
        const inspectionId = params['inspid'];
        if (inspectionId) {
          this.inspectionId = inspectionId;
        }
      });
    }
    //Get the bridge basic info with the bridgeId
    this.inventoryService.getBridgeBasicInfo(this.bridgeId).then((bridgeName) => {
      if (bridgeName != null) {
        this.bridgeBasicInfo.bridgeId = bridgeName.bridgeIdentification;
        this.bridgeBasicInfo.name = bridgeName.name;
        this.bridgeBasicInfo.regionalId = bridgeName.regionalIdentification;
        this.bridgeBasicInfo.road = bridgeName.road;
        this.bridgeBasicInfo.roadId = bridgeName.roadIdentification;
        this.bridgeBasicInfo.pr = bridgeName.pr;
      }
    });

    this.componentNames = inspectionLists.componentNames;
    this.formInspection = this.initializeFormInspection();
    this.yearList = inspectionLists.yearList;
    this.damageRatingList = inspectionLists.ratingComponentOptions;
    this.damageTypeList = inspectionLists.damageTypeComponentOptions;
    this.repairOptionsByComponent = inspectionLists.repairTypeComponentOptions;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const start = new Date(currentYear, currentMonth, 1);
    const end = new Date(currentYear, currentMonth + 1, 0);

    this.currentMonthStart = start.toISOString().split('T')[0];
    this.currentMonthEnd = end.toISOString().split('T')[0];

  }

  private initializeFormInspection(): any {
    if (this.viewMode === 'new') {
      const inspectionComponents: inspectionComponent[] = [];
      if (this.componentNames !== undefined) {
        this.componentNames.forEach(componentName => {
          const newComponent: inspectionComponent = {
            name: componentName,
            rating: -1,
            maintenance: '',
            specializedInspection: '',
            damageType: '',
            repairs: [],
            photos: [],
          }
          inspectionComponents.push(newComponent);
        });
      }
      return {
        inspectionId: 0,
        date: new Date(),
        temperature: 0,
        inspector: '',
        administrator: '',
        nextInspectionYear: -1,
        inspectionComponents: inspectionComponents,
        generalComments: ''
      }
    } else {
      this.inspectionService.getInspection(this.bridgeId, this.inspectionId).then((inspection) => {
        if (inspection != null) {
          this.formInspection = inspection
        }
      });
    }

  }

  onSubmit(viewMode: "view" | "edit" | "new" | undefined) {
    const today = new Date();
    const inputDate = new Date(this.formInspection.date);
    if (!this.validateBasicInfo()) {
      swal(
        '¡Error!',
        'Por favor, llene todos los campos',
        'error'
      )
      return;
    } else if (this.formInspection.temperature < 0 || this.formInspection.temperature > 50) {
      swal(
        '¡Error!',
        'La temperatura debe estar entre 0 y 50',
        'error'
      )
      return;
    } else if (inputDate > today) {
      swal(
        '¡Error!',
        'La fecha no puede ser mayor que el día de hoy',
        'error'
      )
      return;
    } else if (this.formInspection.nextInspectionYear < 2024 || this.formInspection.nextInspectionYear > 2040) {
      swal(
        '¡Error!',
        'Seleccione un año para la próxima inspección',
        'error'
      )
      return;
    } else if (this.validateRatings() && this.validateMaintainance() && this.validateSpecializedInspection() && this.validateRepairFields() && this.validateDamagetype()) {
      swal(
        '¡Éxito!',
        'Inspección enviada con éxito',
        'success'
      )
      if (this.viewMode === 'new') {
        this.inspectionService.setInspection(this.bridgeId, this.formInspection);
      } else if (this.viewMode === 'edit') {
        this.inspectionService.updateInspection(this.bridgeId, this.formInspection);
      }

      this.router.navigate([`home/bridge-management/inventories/${this.bridgeId}/inspections`]);

    }
  }

  validateRatings(): boolean {
    if (this.formInspection && this.formInspection.inspectionComponents) {
      for (const component of this.formInspection.inspectionComponents) {

        if (component.rating === -1) {
          swal(
            '¡Error!',
            'Por favor, seleccione una calificación para el componente ' + component.name,
            'error'
          )
          return false;
        }
      }
    }
    return true;
  }

  validateBasicInfo(): boolean {
    return !(this.formInspection.date == null || this.formInspection.temperature == null || this.formInspection.inspector == '' || this.formInspection.nextInspectionYear == null || this.formInspection.administrator == '')
  }

  validateMaintainance(): boolean {
    for (const component of this.formInspection.inspectionComponents) {
      if (component.maintenance.valueOf() === '') {
        swal(
          '¡Error!',
          'Por favor, seleccione una opción para el campo de mantenimiento del componente ' + component.name,
          'error'
        )
        return false;
      }
    }
    return true;
  }

  validateSpecializedInspection(): boolean {
    for (const component of this.formInspection.inspectionComponents) {
      if (component.specializedInspection === '') {
        swal(
          '¡Error!',
          'Por favor, seleccione una opción para la inspección especial del componente ' + component.name,
          'error'
        )
        return false;
      }
    }
    return true;
  }

  validateDamagetype(): boolean {
    if (this.formInspection && this.formInspection.inspectionComponents) {
      for (const component of this.formInspection.inspectionComponents) {
        if (component.damageType === '') {
          swal(
            '¡Error!',
            'Por favor, seleccione un tipo de daño para el componente ' + component.name,
            'error'
          )
          return false;
        }
      }
    }
    return true;
  }

  private validateRepairFields(): boolean {
    if (this.formInspection && this.formInspection.inspectionComponents) {
      for (const component of this.formInspection.inspectionComponents) {
        for (const repair of component.repairs) {
          if (!repair.type || repair.type.trim() === '') {
            swal(
              '¡Error!',
              'Por favor, seleccione un tipo de reparación para el componente ' + component.name,
              'error'
            )
            return false;
          }

          if (repair.quantity <= 0) {
            swal(
              '¡Error!',
              'Por favor, ingrese una cantidad válida para el componente ' + component.name,
              'error'
            )
            return false;
          }

          if (repair.year < 2024 || repair.year > 2040) {
            swal(
              '¡Error!',
              'Por favor, seleccione un año para el componente ' + component.name,
              'error'
            )
            return false;
          }

          if (repair.cost <= 0) {
            swal(
              '¡Error!',
              'Por favor, ingrese un costo válido para el componente ' + component.name,
              'error'
            )
            return false;
          }
          if (!repair.damage || repair.damage.trim() === '') {
            swal(
              '¡Error!',
              'Por favor, ingrese una observación para el componente ' + component.name,
              'error'
            )
            return false;
          }
        }
      }
    }
    return true;
  }

  addRepair(componentIndex: number): void {
    if (this.formInspection && this.formInspection.inspectionComponents &&
      componentIndex >= 0 && componentIndex < this.formInspection.inspectionComponents.length) {
      const newRepair = {
        type: '',
        quantity: 0,
        unit: '',
        year: -1,
        cost: 0,
        damage: '',
        photos: [],
      };
      this.formInspection.inspectionComponents[componentIndex].repairs.push(newRepair);
    }
  }

  removeRepair(componentIndex: number) {
    //Remove last repair
    if (this.formInspection && this.formInspection.inspectionComponents &&
      componentIndex >= 0 && componentIndex < this.formInspection.inspectionComponents.length) {
      this.formInspection.inspectionComponents[componentIndex].repairs.pop();
    }
  }

  updateRepairOptions(componentName: string): any[] {
    const repairOptions = this.repairOptionsByComponent[componentName];
    if (repairOptions) {
      return repairOptions;
    } else {
      return [];
    }
  }

  updateUnit(componentIndex: number, repairIndex: number, repairType: string, componentName: string): void {
    const repairOptions = this.repairOptionsByComponent[componentName] || [];
    const selectedRepair = repairOptions.find((option: { type: string; }) => option.type === repairType);

    if (selectedRepair) {
      this.formInspection.inspectionComponents[componentIndex].repairs[repairIndex].unit = selectedRepair.unit;
    }
  }

  uploadPhotos(event: Event, component: any): void {
    const fileList = (event.target as HTMLInputElement).files;
    if (!fileList || fileList.length === 0) {
      swal('¡Error!', 'No se han seleccionado archivos.', 'error');
      return;
    }
    if (component.photos.length + fileList.length > 5) {
      swal('¡Error!', 'Solo se permiten un máximo de 5 fotos por componente', 'error');
      return;
    }

    const promises = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      promises.push(this.inspectionService.uploadPhoto(this.bridgeId, this.inspectionId, file));
    }

    Promise.all(promises).then(photoUrls => {
      component.photos.push(...photoUrls);
      this.inspectionService.updateInspectionPhotos(this.bridgeId, this.inspectionId, component.photos);
    }).catch(error => {
      console.error('Error al subir las fotos:', error);
    });
  }

  deletePhoto(component: any, index: number): void {
    if (index >= 0 && index < component.photos.length) {
      const photoUrl = component.photos[index];
      this.inspectionService.deletePhoto(this.bridgeId, this.inspectionId, photoUrl).then(() => {
        component.photos.splice(index, 1);
        this.inspectionService.updateInspectionPhotos(this.bridgeId, this.inspectionId, component.photos);
      }).catch(error => {
        console.error('Error al eliminar la foto:', error);
      });
    }
  }

  clickFileInput(i: number): void {
    const fileInput = document.getElementById(`componentPhoto${i}`);
    if (fileInput) {
      (fileInput as HTMLInputElement).click();
    } else {
      swal(
        '¡Error!',
        `Elemento no encontrado: componentPhoto${i}`,
        'error'
      )
    }
  }

  cancel() {
    this.inspectionService.deleteInspectionPhotosFolder(this.bridgeId, this.inspectionId).then(() => {
      this.router.navigate([`home/bridge-management/inventories/${this.bridgeId}/inspections`]);
    }).catch(error => {
      console.error('Error al eliminar la carpeta de fotos:', error);
    });
  }
}
