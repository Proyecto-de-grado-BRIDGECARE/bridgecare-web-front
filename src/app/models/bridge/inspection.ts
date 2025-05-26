import { User } from "../account/user";
import { Puente } from "./puente";


export interface Inspection {
  id: number;
  fecha: Date;
  temperatura: number;
  administrador: string;
  inspector: string;
  anioProximaInspeccion: number;
  observacionesGenerales: string;
  componentes: inspectionComponent[];
  usuario: User;
  puente: Puente;
}


export interface inspectionComponent {
  id: number;
    nombre: string;
    calificacion: number;
    mantenimiento: string;
    insp_esp: string;
    num_fotos: number;
    tipo_danio: number;
    danio: string;
    imagen: string[];
    inspeccion_id: number;
    reparacion: repair[];
    imagenes: string[];
}

export interface repair {
  tipo: string;
  cantidad: number;
  unidad?: string;
  anio: number;
  costo: number;
  danio?: string; 
}

export interface basicInspection {
  id: number;
  administrador: string;
  inspector: string;
  fecha: Date;
}
