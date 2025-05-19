export interface alerta{
    id: number;
    tipo: string;
    fecha: Date;
    mensaje: string;
    estado: string;
    inspeccionId: number;
}