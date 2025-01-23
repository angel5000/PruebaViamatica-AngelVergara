export interface UsuarioResponse {
    idUsuario: number;
    userName: string;
    mail: string;
    sesionActive: string;
    intentosFallidos: number;
    statusUsuario: string;
    nombres: string;
    apellidos: string;
    identificacion: string;
    fechaNacimiento: Date;
    statusPersona: string;
 

badgeColor:string;
badgeColor2:string;
badgeColor3:string;
badgeColor4:string;
icEdit:any;
icDelete:any;
}
export interface UsuarioRequest {
    userName: string;
    password: string;
    mail: string;
    sesionActive: string;
    statusUsuario: string;
    nombres: string;
    apellidos: string;
    identificacion: string;
    fechaNacimiento: Date;
    statusPersona: string;
    rol: number;
}

