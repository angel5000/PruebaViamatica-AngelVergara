import { HttpHeaders } from "@angular/common/http"

export const endpoint={
    GENERATE_TOKEN: 'AuthControlles/Login',
    LIST_USUARIOS: 'Admin/ListaUsuarios',
    LOGOUT: 'AuthControlles/Logout',

    
}
    export const httpOptions ={
        headers: new HttpHeaders({
    "Content-Type":"application/json"
    
        }),
        timeout: 30000
    }
