import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment as env } from '../../../../enviroments/environment';  
import { endpoint as end, httpOptions } from '../../../shared/apis/endpoints'; 
import { BaseResponse } from '../../../shared/models/BaseApiResponse';
import { RecuperacontraRequest } from '../Model/RecuperaContrarequest';
@Injectable({
  providedIn: 'root'
})
export class CambiarContrasenaService {

  constructor(private http: HttpClient) { }

  
  CambiarContrasena(datos: RecuperacontraRequest):Observable<BaseResponse>{
    const requestURL=  `${env.api}${end.RECUPERACONTRASENA}`;
    const Formdata = this._builFormDataUser(datos);
    console.log(Formdata);
    return this.http.put(requestURL, Formdata).pipe(map((resp: BaseResponse) => {
      return resp;


    }))
  
  }
  public _builFormDataUser(datos: RecuperacontraRequest): FormData {
 
      const formData = new FormData();
    
      formData.append("Identificacion", datos.identificacion.toString());              
      formData.append("Email", datos.email.toString());                
      formData.append("NuevaContrasena", datos.nuevaContrasena.toString());            
      formData.append("ConfirNuevaContrasena", datos.confirNuevaContrasena.toString()); 
           
    
     
      return formData;

  }

}
