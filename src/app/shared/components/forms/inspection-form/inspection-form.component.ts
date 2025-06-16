import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Inspection } from "../../../../models/bridge/inspection";
import { ActivatedRoute } from "@angular/router";
import { CommonModule, NgClass, NgForOf, NgIf } from "@angular/common";
import { InspectionServiceService } from "../../../services/bridge-services/inspection-service.service";
import { Puente } from '../../../../models/bridge/puente';
import pdfMake from 'pdfmake/build/pdfmake';
import { logoBase64 } from '../../../../../assets/images/logoBase64'; 
import { image } from 'html2canvas/dist/types/css/types/image';
import { style } from '@angular/animations';


@Component({
    selector: 'app-inspection-form',
    imports: [
        FormsModule,
        CommonModule,
        NgForOf,
        NgIf,
        NgClass
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
          id: 0,
          nomb: 'Superestructura',
          calificacion: -1,
          mantenimiento: '',
          inspEesp: '',
          numeroFfotos: 0,
          tipoDanio: 0,
          danio: '',
          imagen: [],
          inspeccionId: 0,
          reparacion: [],
          imagenes: []
        },
        {
          id: 0,
          nomb: 'Apoyo estructural',
          calificacion: -1,
          mantenimiento: '',
          inspEesp: '',
          numeroFfotos: 0,
          tipoDanio: 0,
          danio: '',
          imagen: [],
          inspeccionId: 0,
          reparacion: [],
          imagenes: []
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
    this.formInspection.componentes[0].imagenes = [''];
    this.loadInspection();

    this.formInspection.componentes.forEach((comp) => {
      if (typeof comp.imagenes === 'string') {
        try {
          comp.imagenes = JSON.parse(comp.imagenes);
        } catch (e) {
          comp.imagenes = [];
        }
      }
    });
  }

  loadInspection(): void {
    this.inspectionService.getInspectionById(this.inspectionId).subscribe({
      next: (inspection) => {
        this.formInspection = inspection;
        this.bridgeBasicInfo = inspection.puente;

        if (inspection.componentes && inspection.componentes.length > 0) {
          this.formInspection.componentes.forEach((comp, index) => {
            comp.imagenes = inspection.componentes[index]?.imagenes || [];
          });
        }

        console.log("inspección: ", inspection);
        console.log('Componentes:', this.formInspection.componentes);

      },
      error: (err) => {
        console.error('Error al cargar inspección', err);
      },
    });
  }

  onSubmit(viewMode: string): void {
    if (viewMode === 'view') {
      console.log('Vista: no se guarda');
    } else {
      console.log('Guardando inspección:', this.formInspection);

    }
  }
  

  getFullImageUrl(relativePath: string): string {
    return `https://api.bridgecare.com.co/images/${relativePath}`; 
  }


  generatePDF() {
    const data = this.formInspection;
    const currentDate = new Date();
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const mm = String(currentDate.getMonth()).padStart(2, '0');
    const yyyy = String(currentDate.getFullYear());
    const date = `${dd}-${mm}-${yyyy}`;
    
    const documentDefinition = {
      content: [
        { image: logoBase64.miVar, width: 80, absolutePosition: { x: 30, y: 15 }},
        { text: `BRIDGECARE`, style: 'header', alignment: 'center', margin: [0, 0, 0, 20] },
        { text: `INFORME DE INSPECCIÓN - ${data.puente?.nombre ?? 'Puente desconocido'}`, style: 'header', alignment: 'center', margin: [0, 0, 0, 20] },
  
        { text: `Reporte generado en: ${date}`, margin: [0, 0, 0, 20] },
        { text: 'Información General', style: 'sectionHeader' },
        { text: `ID Inspección: ${data.id ?? 'No disponible'}` },
        { text: `Fecha: ${data.fecha ?? 'No disponible'}` },
        { text: `Inspector: ${data.usuario?.name ?? 'No disponible'} ${data.usuario?.surname ?? ''}` },
        { text: `Administrador: ${data.administrador ?? 'No disponible'}` },
        { text: `Temperatura: ${data.temperatura ?? 'No disponible'} °C` },
        { text: `Año próxima inspección: ${data.anioProximaInspeccion ?? 'No disponible'}` },
        { text: `Observaciones generales: ${data.observacionesGenerales ?? 'No disponible'}` },
  
        { text: 'Componentes Inspeccionados', style: 'sectionHeader', margin: [0, 10, 0, 5] },
        ...data.componentes.map((comp, index) => ({
          stack: [
            { text: `Componente ${index + 1}: ${comp.nomb ?? 'No disponible'}`, bold: true },
            { text: `Calificación: ${comp.calificacion ?? 'No disponible'}` },
            { text: `Mantenimiento: ${comp.mantenimiento ?? 'No disponible'}` },
            { text: `Inspección Especializada: ${comp.inspEesp ?? 'No disponible'}` },
            { text: `Tipo Daño: ${comp.tipoDanio ?? 'No disponible'}` },
            { text: `Daño: ${comp.danio ?? 'No disponible'}` },
            { text: `Número de fotos: ${comp.numeroFfotos ?? '0'}` },
  
            ...(comp.reparacion?.length > 0
              ? comp.reparacion.map((rep, repIndex) => ({
                  stack: [
                    { text: `  Reparación ${repIndex + 1}:`, italics: true },
                    { text: `    Tipo: ${rep.tipo ?? 'No disponible'}` },
                    { text: `    Cantidad: ${rep.cantidad ?? 'No disponible'}` },
                    { text: `    Año: ${rep.anio ?? 'No disponible'}` },
                    { text: `    Costo: ${rep.costo?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) ?? 'No disponible'}` },
                  ],
                }))
              : [{ text: `  No hay reparaciones registradas.` }]
            )
          ],
          margin: [0, 0, 0, 10]
        })),
  
        { text: 'Puente Asociado', style: 'sectionHeader', margin: [0, 10, 0, 5] },
        { text: `Nombre: ${data.puente?.nombre ?? 'No disponible'}` },
        { text: `Identificador: ${data.puente?.identif ?? 'No disponible'}` },
        { text: `Carretera: ${data.puente?.carretera ?? 'No disponible'}` },
        { text: `PR: ${data.puente?.pr ?? 'No disponible'}` },
        { text: `Regional: ${data.puente?.regional ?? 'No disponible'}` },
      ],
      styles: {
        header: { fontSize: 22, bold: true },
        sectionHeader: { fontSize: 18, bold: true, margin: [0, 10, 0, 5] }
      }
    };
  
    pdfMake.createPdf(documentDefinition as any).download(`Inspeccion_Puente_${data.puente?.nombre ?? 'SinNombre'}.pdf`);
  }
  
}
