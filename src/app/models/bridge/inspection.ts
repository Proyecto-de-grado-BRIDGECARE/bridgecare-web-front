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
  nomb: string; 
  calificacion: number;
  mantenimiento: string;
  inspEesp: string;
  tipoDanio: string | number; 
  reparacion: repair[];
  numeroFfotos?: number;
  danio: string;
  fotos?: String[]; 
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
