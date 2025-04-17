import { Apoyo } from './apoyo';
import { Carga } from './carga';
import { DatosAdministrativos } from './datosAdministrativos';
import { DatosTecnicos } from './datosTecnicos';
import { Detalle } from './detalle';
import { Estribo } from './estribo';
import { MiembrosInteresados } from './miembrosInteresados';
import { Paso } from './paso';
import { Pila } from './pila';
import { PosicionGeografica } from './posicionGeografica';
import { Puente } from './puente';
import { Senial } from './senial';
import { Subestructura } from './subestructura';
import { Superestructura } from './superestructura';

export interface Inventory {
  id: number;
  observaciones: string;
  usuario: {
    id: number;
    nombres: string;
    apellidos: string;
    correo: string;
    identificacion: number;
    municipio: string;
    tipoUsuario: number;
  };
  puente: Puente;
  apoyo?: Apoyo;
  carga?: Carga;
  datosAdministrativos?: DatosAdministrativos;
  datosTecnicos?: DatosTecnicos;
  miembrosInteresados?: MiembrosInteresados;
  pasos?: Paso[];
  posicionGeografica?: PosicionGeografica;
  subestructura?: {
    estribo?: Estribo;
    pila?: Pila;
    detalle?: Detalle;
    senial?: Senial;
  };
  superestructuras?: Superestructura[];
}
