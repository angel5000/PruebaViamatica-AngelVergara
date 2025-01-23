import { HttpHeaders } from "@angular/common/http"

export const endpoint={
    GENERATE_TOKEN: 'AuthControlles/Login',
    LIST_USUARIOS: 'Admin/ListaUsuarios',
    LOGOUT: 'AuthControlles/Logout',
    UPLOAD_EXCEL: 'Admin/registerbyExcel',
    USUARIOS_EDIT: 'Admin/EditbyAdmin/',
    USUARIOS_REGISTER:'Admin/register',
    USUARIOS_ELIMINAR:'Admin/DeletUser/',
    USUARIOBYID: 'Admin/',
    ROLESOPCIONES:'RolesOpciones/RolesOpciones',

    SESIONES: 'Sesions/ListaSesiones',
    DASHBOARD: 'Dashboard/Dashboard',
    DASHBOARDCOUNT: 'Dashboard/DashboardCount',
    RECUPERACONTRASENA: 'CambiarContrasena/ctrsnueva',
    
}
    export const httpOptions ={
        headers: new HttpHeaders({
    "Content-Type":"application/json"
    
        }),
        timeout: 30000
    }
