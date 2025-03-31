// models/bridge/inventory.ts

export interface Inventory {
  observaciones: string;
  fecha: Date;
  puente: {
    id: number;
    nombre: string;
    identif: string;
    carretera: string;
    pr: string;
    regional: string;
  };
  usuario: {
    id: number;
    nombres: string;
    apellidos: string;
  };
}

export interface Puente {
  id?: number;
  nombre: string;
  identif: string;
  carretera: string;
  pr: string;
  regional: string;
}

export interface Superestructura {
  id?: number;
  tipo: number; // 1 = Principal, 2 = Secundario
  disenioTipo: boolean;
  tipoEstructuracionTransversal: number;
  tipoEstructuracionLongitudinal: number;
  material: number;
  inventarioId: number;
}

export interface Subestructura {
  id?: number;
  inventarioId: number;
}

export interface Pila {
  id?: number;
  tipo: number;
  material: number;
  tipoCimentacion: number;
  subestructuraId: number;
}

export interface Estribo {
  id?: number;
  tipo: number;
  material: number;
  tipoCimentacion: number;
  subestructuraId: number;
}

export interface Detalle {
  id?: number;
  tipoBaranda: number;
  superficieRodadura: number;
  juntaExpansion: number;
  subestructuraId: number;
}

export interface Senial {
  id?: number;
  cargaMaxima: string;
  velocidadMaxima: string;
  otra: string;
  subestructuraId: number;
}

export interface Paso {
  id?: number;
  numero: number; // 1 o 2
  tipoPaso: string; // 'S' o 'I'
  primero: boolean;
  supInf: string; // 'S' o 'I'
  galiboI?: number;
  galiboIm?: number;
  galiboDm?: number;
  galiboD?: number;
  inventarioId: number;
}

export interface Galibo {
  id?: number;
  i: number;
  im: number;
  dm: number;
  d: number;
  pasoId: number;
}

export interface PosicionGeografica {
  id?: number;
  latitud: number;
  longitud: number;
  altitud: number;
  coeficienteAceleracionSismica: string;
  pasoCauce: boolean;
  existeVariante: boolean;
  longitudVariante: number;
  estado: string; // 'B', 'R' o 'M'
  inventarioId: number;
}

export interface DatosTecnicos {
  id?: number;
  numeroLuces: number;
  longitudLuzMenor: number;
  longitudLuzMayor: number;
  longitudTotal: number;
  anchoTablero: number;
  anchoSeparador: number;
  anchoAndenIzq: number;
  anchoAndenDer: number;
  anchoCalzada: number;
  anchoEntreBordillos: number;
  anchoAcceso: number;
  alturaPilas: number;
  alturaEstribos: number;
  longitudApoyoPilas: number;
  longitudApoyoEstribos: number;
  puenteTerraplen: boolean;
  puenteCurvaTangente: string; // 'C' o 'T'
  esviajamiento: number;
  inventarioId: number;
}

export interface DatosAdministrativos {
  id?: number;
  anioConstruccion: number;
  anioReconstruccion: number;
  direccionAbscCarretera: string; // 'N', 'S', 'E', 'O'
  requisitosInspeccion: string;
  numeroSeccionesInspeccion: string;
  estacionConteo: string;
  fechaRecoleccionDatos: Date;
  inventarioId: number;
}

export interface Carga {
  id?: number;
  longitudLuzCritica: number;
  factorClasificacion: string;
  fuerzaCortante: string;
  momento: string;
  lineaCargaPorRueda: string;
  inventarioId: number;
}

export interface Apoyo {
  id?: number;
  fijoSobreEstribo: number;
  movilSobreEstribo: number;
  fijoEnPila: number;
  movilEnPila: number;
  fijoEnViga: number;
  movilEnViga: number;
  vehiculoDiseno: number;
  claseDistribucionCarga: string;
  inventarioId: number;
}

export interface MiembrosInteresados {
  id?: number;
  propietario: string;
  departamento: string;
  administradorVial: string;
  proyectista: string;
  municipio: string;
  inventarioId: number;
}
