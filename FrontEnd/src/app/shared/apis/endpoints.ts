import { HttpHeaders } from "@angular/common/http"

export const endpoint={
    GENERATE_TOKEN: 'AuthControlles/Login',

    
}
    export const httpOptions ={
        headers: new HttpHeaders({
    "Content-Type":"application/json"
    
        }),
        timeout: 30000
    }
