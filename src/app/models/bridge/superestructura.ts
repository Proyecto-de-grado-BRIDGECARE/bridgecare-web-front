export interface Superestructura {
    id?: number;
    tipo: number; // 1 = Principal, 2 = Secundario
    disenioTipo: boolean;
    tipoEstructuracionTransversal: number;
    tipoEstructuracionLongitudinal: number;
    material: number;
    inventarioId: number;
}