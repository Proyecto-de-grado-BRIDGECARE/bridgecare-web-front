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

export interface GeographicInformation {
  inventarioId: number;
  nombrePuente: string;
  regional: string;
  posicionGeografica: PosicionGeografica;
}