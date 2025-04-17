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