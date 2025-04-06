export interface InventarioDTO {
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
    puente: {
      id: number;
      nombre: string;
      identif: string;
      carretera: string;
      pr: string;
      regional: string;
    };
  }