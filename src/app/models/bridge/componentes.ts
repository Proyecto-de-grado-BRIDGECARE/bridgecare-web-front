import { Bytes } from "firebase/firestore";

export interface componentes{
    id: number;
    nombre: string;
    calificacion: number;
    mantenimiento: string;
    insp_esp: string;
    num_fotos: number;
    tipo_danio: number;
    danio: string;
    imagen: Bytes[];
    inspeccion_id: number;
}