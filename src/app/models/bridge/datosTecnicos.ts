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