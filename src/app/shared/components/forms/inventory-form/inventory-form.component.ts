import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { InventoryServiceService } from "../../../services/bridge-services/inventory-service.service";
import { Inventory } from "../../../../models/bridge/inventory";
import { InventarioDTO } from "../../../../models/bridge/inventarioDTO";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css'],
  standalone: true,
  imports:[
    ReactiveFormsModule,
    CommonModule
  ]
})
export class InventoryFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  formSubmitted = false;
  isEditMode = false;
  isViewMode = false;
  editingInventoryId: number | null = null;

  // private apiUrl = 'https://tuservidor.com/api'; 

  //regional
  regionalOptions: string[] = [
    '1 - Antioquia', '2 - Atlántico', '3 - Bolívar', '4 - Boyacá', '5 - Caldas',
    '6 - Caquetá', '7 - Casanare', '8 - Cauca', '9 - Cesar', '10 - Chocó',
    '11 - Córdoba', '12 - Cundinamarca', '13 - La Guajira', '14 - Huila', '15 - Magdalena',
    '16 - Meta', '17 - Nariño', '18 - Norte de Santander', '19 - Putumayo',
    '20 - Quindío', '21 - Risaralda', '22 - Santander', '23 - Sucre',
    '24 - Tolima', '25 - Valle del Cauca', '26 - Ocaña'
  ];

  //opciones de direccion
  direccionOptions: string[] = ['N', 'S', 'E', 'O'];

  constructor(
    private inventoryService: InventoryServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const param = params.get('bridgeIdentification');
      this.editingInventoryId = param ? Number(param) : null;
  
      this.isViewMode = this.router.url.includes('/view');
      this.isEditMode = this.editingInventoryId !== null && !this.isViewMode;
  
      this.initForm();
  
      if (this.isEditMode && this.editingInventoryId) {
        this.loadInventoryData(this.editingInventoryId);
      }
    });
  }
  

  datosTecnicosCampos = [
    { name: 'numeroLuces', label: 'Número de luces', type: 'number' },
    { name: 'longitudLuzMenor', label: 'Longitud Luz Menor (m)', type: 'number' },
    { name: 'longitudLuzMayor', label: 'Longitud Luz Mayor (m)', type: 'number' },
    { name: 'longitudTotal', label: 'Longitud Total (m)', type: 'number' },
    { name: 'anchoTablero', label: 'Ancho Tablero (m)', type: 'number' },
    { name: 'anchoSeparador', label: 'Ancho Separador (m)', type: 'number' },
    { name: 'anchoAndenIzq', label: 'Ancho Andén Izquierdo (m)', type: 'number' },
    { name: 'anchoAndenDer', label: 'Ancho Andén Derecho (m)', type: 'number' },
    { name: 'anchoCalzada', label: 'Ancho Calzada (m)', type: 'number' },
    { name: 'anchoEntreBordillos', label: 'Ancho Entre Bordillos (m)', type: 'number' },
    { name: 'anchoAcceso', label: 'Ancho Acceso (m)', type: 'number' },
    { name: 'alturaPilas', label: 'Altura Pilas (m)', type: 'number' },
    { name: 'alturaEstribos', label: 'Altura Estribos (m)', type: 'number' },
    { name: 'longitudApoyoPilas', label: 'Longitud de Apoyo en Pilas (m)', type: 'number' },
    { name: 'longitudApoyoEstribos', label: 'Longitud Apoyo Estribos', type: 'number' },
    {
      name: 'puenteTerraplen',
      label: 'Puente Terraplén',
      type: 'dropdown',
      options: ['Sí', 'No']
    },
    {
      name: 'puenteCurvaTangente',
      label: 'Puente Curva/Tangente',
      type: 'dropdown',
      options: ['C', 'T']
    },
    { name: 'esviajamiento', label: 'Esviajamiento (gra)', type: 'number' }
  ];

  transversalStructuringOptions = [
    { value: 10, label: '10 - Losa' },
    { value: 11, label: '11 - Losa/viga, 1 viga' },
    { value: 12, label: '12 - Losa/viga, 2 vigas' },
    { value: 13, label: '13 - Losa/viga, 3 vigas' },
    { value: 14, label: '14 - Losa/viga, 4 ó más vigas' },
    { value: 30, label: '30 - Viga cajón, 1 cajón' },
    { value: 31, label: '31 - Viga cajón, 2 ó más cajones' },
    { value: 40, label: '40 - Armadura de paso inferior' },
    { value: 41, label: '41 - Armadura de paso superior' },
    { value: 42, label: '42 - Armadura de paso a través' },
    { value: 50, label: '50 - Arco superior' },
    { value: 51, label: '51 - Arco inferior, tipo abierto' },
    { value: 52, label: '52 - Arco inferior, tipo cerrado' },
    { value: 80, label: '80 - Provisional, tipo Bailey' },
    { value: 81, label: '81 - Provisional, tipo Callender Hamilton' },
    { value: 90, label: '90 - Otro' },
    { value: 91, label: '91 - No aplicable' },
    { value: 92, label: '92 - Desconocido' },
    { value: 93, label: '93 - No registrado' },
  ];
  
  longitudinalStructuringOptions = [...this.transversalStructuringOptions];
  
  materialConstructionOptions = [
    { value: 10, label: '10 - Concreto ciclópeo' },
    { value: 11, label: '11 - Concreto simple' },
    { value: 20, label: '20 - Concreto reforzado, in situ' },
    { value: 21, label: '21 - Concreto reforzado, prefabricado' },
    { value: 30, label: '30 - Concreto presforzado, in situ' },
    { value: 31, label: '31 - Concreto presforzado, prefabricado' },
    { value: 32, label: '32 - Concreto presforzado, en secciones' },
    { value: 41, label: '41 - Concreto presforzado prefabricado & in situ' },
    { value: 42, label: '42 - Concreto y acero' },
    { value: 50, label: '50 - Acero' },
    { value: 60, label: '60 - Mampostería' },
    { value: 90, label: '90 - Otro' },
    { value: 91, label: '91 - No aplicable' },
    { value: 92, label: '92 - Desconocido' },
    { value: 93, label: '93 - No registrado' },
  ];
  
  snOptions = [
    { value: true, label: 'Sí' },
    { value: false, label: 'No' },
  ];
  
  stirrupsMaterialOptions = [
    { value: 10, label: '10 - Mampostería' },
    { value: 20, label: '20 - Concreto ciclópeo' },
    { value: 21, label: '21 - Concreto reforzado' },
    { value: 30, label: '30 - Acero' },
    { value: 40, label: '40 - Acero y concreto' },
    { value: 50, label: '50 - Tierra armada' },
    { value: 60, label: '60 - Ladrillo' },
    { value: 90, label: '90 - Otro' },
    { value: 91, label: '91 - No aplicable' },
    { value: 92, label: '92 - Desconocido' },
    { value: 93, label: '93 - No registrado' }
  ];
  
  stirrupsFoundationTypeOptions = [
    { value: 10, label: '10 - Cimentación superficial' },
    { value: 20, label: '20 - Pilotes de concreto' },
    { value: 21, label: '21 - Pilotes de acero' },
    { value: 22, label: '22 - Pilotes de madera' },
    { value: 30, label: '30 - Caisson de concreto' },
    { value: 40, label: '40 - Cajón de autofundante' },
    { value: 90, label: '90 - Otro' },
    { value: 91, label: '91 - No aplicable' },
    { value: 92, label: '92 - Desconocido' },
    { value: 93, label: '93 - No registrado' }
  ];

  railingTypeOptions = [
    { value: 10, label: '10 - Sólida, mampostería' },
    { value: 20, label: '20 - Sólida, concreto' },
    { value: 21, label: '21 - Sólida, concreto, con pasamanos metálicas' },
    { value: 30, label: '30 - Pasamanos de concreto y pilastras de concreto' },
    { value: 40, label: '40 - Pasamanos metálicas y pilastras de concreto' },
    { value: 41, label: '41 - Pasamanos metálicas y pilastras metálicas' },
    { value: 50, label: '50 - Construcción metálica ligera' },
    { value: 60, label: '60 - Parte integral de la superestructura' },
    { value: 90, label: '90 - Otro' },
    { value: 91, label: '91 - No aplicable' },
    { value: 92, label: '92 - Desconocido' },
    { value: 93, label: '93 - No registrado' }
  ];
  
  roadwaySurfaceOptions = [
    { value: 10, label: '10 - Asfalto' },
    { value: 20, label: '20 - Concreto' },
    { value: 30, label: '30 - Acero (con dispositivo de fricción)' },
    { value: 40, label: '40 - Afirmado' },
    { value: 90, label: '90 - Otro' },
    { value: 91, label: '91 - No aplicable' },
    { value: 92, label: '92 - Desconocido' },
    { value: 93, label: '93 - No registrado' }
  ];
  
  expansionJointOptions = [
    { value: 10, label: '10 - Placa de acero' },
    { value: 11, label: '11 - Placa de acero cubierta de asfalto' },
    { value: 12, label: '12 - Placas verticales / ángulos de acero' },
    { value: 13, label: '13 - Junta dentada' },
    { value: 20, label: '20 - Acero con sello fijo de neopreno' },
    { value: 21, label: '21 - Acero con neopreno comprimido' },
    { value: 30, label: '30 - Bloque de neopreno' },
    { value: 40, label: '40 - Junta de goma asfáltica' },
    { value: 50, label: '50 - No dispositivo de junta' },
    { value: 51, label: '51 - Junta de cartón asfaltado' },
    { value: 52, label: '52 - Junta de cartón asfaltado con sello' },
    { value: 90, label: '90 - Otro' },
    { value: 91, label: '91 - No aplicable' },
    { value: 92, label: '92 - Desconocido' },
    { value: 93, label: '93 - No registrado' }
  ];

  pileTypeOptions = [
    { value: 10, label: '10 - Pila sólida' },
    { value: 20, label: '20 - Columna sola' },
    { value: 21, label: '21 - 2 ó más columnas sin viga cabezal' },
    { value: 30, label: '30 - Columna sola con viga cabezal' },
    { value: 31, label: '31 - 2 ó más columnas con vigas cabezales separadas' },
    { value: 32, label: '32 - 2 ó más columnas con viga cabezal común' },
    { value: 33, label: '33 - 2 ó más columnas con viga cabezal común y diafragma' },
    { value: 40, label: '40 - Pilotes con viga cabezal' },
    { value: 41, label: '41 - Pilotes con viga cabezal y diafragma' },
    { value: 50, label: '50 - Mástil (Pilón)' },
    { value: 60, label: '60 - Torre metálica' },
    { value: 90, label: '90 - Otro' },
    { value: 91, label: '91 - No aplicable' },
    { value: 92, label: '92 - Desconocido' },
    { value: 93, label: '93 - No registrado' }
  ];
  
  pileMaterialOptions = [...this.stirrupsMaterialOptions]; // mismos que los estribos
  foundationTypeOptions = [...this.stirrupsFoundationTypeOptions]; // mismos que los estribos

  //apoyos
  fixedSupportTypes = [
    { value: 10, label: '10 - Junta de construcción (cartón asfaltado o plomo)' },
    { value: 20, label: '20 - Balancín de concreto' },
    { value: 30, label: '30 - Placas de neopreno' },
    { value: 40, label: '40 - Apoyo fijo de acero' },
    { value: 41, label: '41 - Apoyo de deslizamiento (acero)' },
    { value: 42, label: '42 - Balancín de acero' },
    { value: 43, label: '43 - Apoyos de rodillos (acero)' },
    { value: 50, label: '50 - Basculante' },
    { value: 90, label: '90 - Otro' },
    { value: 91, label: '91 - No aplicable' },
    { value: 92, label: '92 - Desconocido' },
    { value: 93, label: '93 - No registrado' },
  ];
  
  loadDistributionClasses = [
    { value: 'Distribución en dos direcciones', label: 'Distribución en dos direcciones' },
    { value: 'Distribución en una dirección', label: 'Distribución en una dirección' },
    { value: 'No distribución', label: 'No distribución' },
  ];
  
  seismicAccelerationCoefficientOptions = [
    { value: '0.05', label: '0.05' },
    { value: '0.10', label: '0.10' },
    { value: '0.15', label: '0.15' },
    { value: '0.20', label: '0.20' },
    { value: '0.25', label: '0.25' },
    { value: '0.30', label: '0.30' },
    { value: '0.35', label: '0.35' },
    { value: '0.40', label: '0.40' },
  ];

  brmOptions = [
    { value: 'B', label: 'Bueno' },
    { value: 'R', label: 'Regular' },
    { value: 'M', label: 'Malo' },
  ];

  criticalSpanLengthOptions = [
    { value: 5, label: '5 m' },
    { value: 10, label: '10 m' },
    { value: 15, label: '15 m' },
    { value: 20, label: '20 m' },
    { value: 25, label: '25 m' },
    { value: 30, label: '30 m' }
  ];
  
  classificationFactorOptions = [
    { value: '1.0', label: '1.0' },
    { value: '1.1', label: '1.1' },
    { value: '1.2', label: '1.2' },
    { value: '1.3', label: '1.3' },
    { value: '1.4', label: '1.4' },
    { value: '1.5', label: '1.5' },
  ];
  
  linealOptions = [
    { value: '3.0', label: '3.0 t' },
    { value: '4.0', label: '4.0 t' },
    { value: '5.0', label: '5.0 t' },
    { value: '6.0', label: '6.0 t' },
    { value: '7.0', label: '7.0 t' },
    { value: '8.0', label: '8.0 t' },
  ];
  
  
  

  initForm() {
    this.form = new FormGroup({
      observaciones: new FormControl('', Validators.required),
      puenteId: new FormControl('', Validators.required),
      usuarioId: new FormControl('', Validators.required),

      // Información General del Puente
      nombre: new FormControl('', Validators.required),
      identificador: new FormControl('', Validators.required),
      carretera: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      pr: new FormControl('', Validators.required),
      regional: new FormControl('', Validators.required),

      tipoPaso1: new FormControl('', Validators.required),
      primero1: new FormControl(false),
      supInf1: new FormControl(''),
      galiboI1: new FormControl(null),
      galiboIm1: new FormControl(null),
      galiboDm1: new FormControl(null),
      galiboD1: new FormControl(null),

      tipoPaso2: new FormControl('', Validators.required),
      primero2: new FormControl(false),
      supInf2: new FormControl(''),
      galiboI2: new FormControl(null),
      galiboIm2: new FormControl(null),
      galiboDm2: new FormControl(null),
      galiboD2: new FormControl(null),

      // datos administrativos
      anioConstruccion: new FormControl('', Validators.required),
      anioReconstruccion: new FormControl(''),
      direccionAbscCarretera: new FormControl(''),
      requisitosInspeccion: new FormControl(''),
      numeroSeccionesInspeccion: new FormControl(''),
      estacionConteo: new FormControl(''),
      fechaRecoleccionDatos: new FormControl(''),

      // datos técnicos
      numeroLuces: new FormControl('', Validators.required),
      longitudLuzMenor: new FormControl('', Validators.required),
      longitudLuzMayor: new FormControl('', Validators.required),
      longitudTotal: new FormControl('', Validators.required),
      anchoTablero: new FormControl('', Validators.required),
      anchoSeparador: new FormControl('', Validators.required),
      anchoAndenIzq: new FormControl('', Validators.required),
      anchoAndenDer: new FormControl('', Validators.required),
      anchoCalzada: new FormControl('', Validators.required),
      anchoEntreBordillos: new FormControl('', Validators.required),
      anchoAcceso: new FormControl('', Validators.required),
      alturaPilas: new FormControl('', Validators.required),
      alturaEstribos: new FormControl('', Validators.required),
      longitudApoyoPilas: new FormControl('', Validators.required),
      longitudApoyoEstribos: new FormControl('', Validators.required),
      puenteTerraplen: new FormControl('', Validators.required),
      puenteCurvaTangente: new FormControl('', Validators.required),
      esviajamiento: new FormControl('', Validators.required),

      //super estructura
      disenioTipo: new FormControl('', Validators.required),
      tipoEstructuracionTransversal: new FormControl('', Validators.required),
      tipoEstructuracionLongitudinal: new FormControl('', Validators.required),
      material: new FormControl('', Validators.required),
      superstructureImageUrl: new FormControl(''),

      //subestuctura

      disenoTipoSec: new FormControl('', Validators.required),
      tipoEstructuracionTransversalSec: new FormControl('', Validators.required),
      tipoEstructuracionLongitudinalSec: new FormControl('', Validators.required),
      materialSec: new FormControl('', Validators.required),
      superstructureSecondaryImageUrl: new FormControl(''),


      // Subestructura - Estribos
      tipoEstribos: new FormControl('', Validators.required),
      materialEstribos: new FormControl('', Validators.required),
      tipoCimentacion: new FormControl('', Validators.required),
      substructureAbutmentsImageUrl: new FormControl(''),

      // Subestructura - Detalles
      tipoBaranda: new FormControl('', Validators.required),
      superficieRodadura: new FormControl('', Validators.required),
      juntaExpansion: new FormControl('', Validators.required),
      substructureDetailsImageUrl: new FormControl(''),

      // Subestructura - Pilas
      tipoPilas: new FormControl('', Validators.required),
      materialPilas: new FormControl('', Validators.required),
      tipoCimentacionPilas: new FormControl('', Validators.required),
      substructurePilesImageUrl: new FormControl(''),

      // Subestructura - Señales
      cargaMaxima: new FormControl('', Validators.required),
      velocidadMaxima: new FormControl('', Validators.required),
      otraInfo: new FormControl('', Validators.required),
      substructureSignalsImageUrl: new FormControl(''),

      //apoyos
      fijoSobreEstribo: new FormControl('', Validators.required),
      movilSobreEstribo: new FormControl('', Validators.required),
      fijoEnPila: new FormControl('', Validators.required),
      movilEnPila: new FormControl('', Validators.required),
      fijoEnViga: new FormControl('', Validators.required),
      movilEnViga: new FormControl('', Validators.required),
      vehiculoDiseno: new FormControl('', Validators.required),
      claseDistribucionCarga: new FormControl('', Validators.required),
      supportsImageUrl: new FormControl(''),

      //miembros interesados
      propietario: new FormControl('', Validators.required),
      departamento: new FormControl('', Validators.required),
      administradorVial: new FormControl('', Validators.required),
      proyectista: new FormControl('', Validators.required),
      municipio: new FormControl('', Validators.required),

      // Posición Geográfica
      latitud: new FormControl(null, Validators.required),
      longitud: new FormControl(null, Validators.required),
      altitud: new FormControl(null, Validators.required),
      coeficienteAceleracionSismica: new FormControl('', Validators.required),
      pasoCauce: new FormControl('', Validators.required),
      existeVariante: new FormControl('', Validators.required),
      longitudVariante: new FormControl(null),
      estado: new FormControl('', Validators.required),

      // Carga - Tránsito legal y transportes
      longitudLuzCritica: new FormControl('', Validators.required),
      factorClasificacion: new FormControl('', Validators.required),
      fuerzaCortante: new FormControl('', Validators.required),
      momento: new FormControl('', Validators.required),
      lineaCargaPorRueda: new FormControl('', Validators.required),

      observationsImageUrl: new FormControl('')
    });

    if (this.isViewMode) {
      this.form.disable();
    }
  }

  async loadInventoryData(id: number) {
    try {
      const result = await firstValueFrom(this.inventoryService.getInventories());
      const inventory = result.find(inv => inv.puente.id === id);

      if (!inventory) return;

      this.form.patchValue({
        observaciones: inventory.observaciones,
        puenteId: inventory.puente.id,
        usuarioId: inventory.usuario.id,
      });
    } catch (error) {
      console.error('Error cargando datos del inventario:', error);
    }
  }

  async onSubmit() {
    this.formSubmitted = true;
    if (!this.form) return;
    if (this.form.invalid) return;

    console.log('🚀 Formulario enviado', this.form.value);

    const inventory: Inventory = {
      observaciones: this.form.value.observaciones,
      usuario: {
        id: 0,
        nombres: '',
        apellidos: '',
        correo: '',
        identificacion: 0,
        municipio: '',
        tipoUsuario: 0
      },
      puente: {
        id: 0,
        nombre: '',
        identif: '',
        carretera: '',
        pr: '',
        regional: ''
      }
    };
    
    try {
      if (this.isEditMode && this.editingInventoryId) {
        await this.inventoryService.updateInventory(this.editingInventoryId.toString(), inventory);
      } else {
        await this.inventoryService.createInventory(inventory);
      }
      this.router.navigate(['/home/bridge-management/inventories']);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  }

  campoInvalido(campo: string) {
    const control = this.form.get(campo);
    return control && control.touched && control.invalid;
  }

  get f() {
    return this.form.controls;
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.form.get(controlName)?.setValue(file);
      this.form.get(`${controlName}Url`)?.setValue(file.name);
    }
  }
  
}
