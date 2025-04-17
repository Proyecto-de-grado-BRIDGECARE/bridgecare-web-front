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