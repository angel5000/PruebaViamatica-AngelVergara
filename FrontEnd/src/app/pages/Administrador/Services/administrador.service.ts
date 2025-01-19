import { Injectable } from '@angular/core';
import { BaseResponse } from '../../../shared/models/BaseApiResponse';
import { UsuarioResponse} from '../Models/UsuariosResponse';
import { environment as env } from '../../../../enviroments/environment';  
import { endpoint as end, httpOptions } from '../../../shared/apis/endpoints'; 
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getIcon } from '../../../shared/components/function/helpers';
import { UsuarioResponseEdit } from '../Models/Usuariobyid';
@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http: HttpClient) { }

  GetAll(size: number, sort: string, order: string, page: number, getInputs: number,id:number): Observable<BaseResponse> {
    const requestURL = `${env.api}${end.LIST_USUARIOS}?idUsuario=${id}${getInputs}&NumPage=${page+1}&Records=${size}`;

    console.log("aqui1")

    return this.http.get<BaseResponse>(requestURL).pipe(map((resp) => {
      (resp.data || []).forEach(function (product: UsuarioResponse) {
       /* switch (product.state) {
          case 0: product.badgeColor = 'text-gray bg gray-light'
          console.log("estado:", product.state)
            break
          case 1: product.badgeColor = 'text-green bg-green-light'
          console.log("estado:", product.state)
            break
          default:
            product.badgeColor = 'text-gray bg-gray-light'
            console.log("estado:", product.state)
            break
        
        }*/
      
     
        product.icEdit = getIcon("icEdit", "Editar Producto", true, "edit");
        product.icDelete = getIcon("icDelete", "Eliminar Producto", true, "Remove");
      
      })
      return resp;

    }))
  }


  UserById(idUsuario:Number):Observable<UsuarioResponseEdit>{
    const requestURL=  `${env.api}${end.USUARIOBYID}${idUsuario}`;
    return this.http.get(requestURL).pipe(map((resp:BaseResponse)=>{
  return resp.data;
  
  
    }))
  
  }

 UserEdit(idUsuario:Number,datos: UsuarioResponseEdit):Observable<BaseResponse>{
    const requestURL=  `${env.api}${end.USUARIOS_EDIT}${idUsuario}`;
    const Formdata = this._builFormDataUser(datos);
    return this.http.put(requestURL, Formdata).pipe(map((resp: BaseResponse) => {
      return resp;


    }))
  
  }

  private _builFormDataUser(user: UsuarioResponseEdit): FormData {
    const formData = new FormData();
  
    formData.append("userName", user.userName.toString());              
    formData.append("nombres", user.nombres.toString());                
    formData.append("apellidos", user.apellidos.toString());            
    formData.append("fechaNacimiento", user.fechaNacimiento.toString()); 
    formData.append("sesionActive", user.sesionActive.toString()); 
    formData.append("statusUsuario", user.statusUsuario.toString());    
    formData.append("statusPersona", user.statusPersona.toString());     
    formData.append("idPersona", user.idPersona.toString());            
  
   
    return formData;
  }
  



}


