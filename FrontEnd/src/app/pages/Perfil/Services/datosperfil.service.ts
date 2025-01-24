import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { environment as env } from '../../../../enviroments/environment';  
import { endpoint as end, httpOptions } from '../../../shared/apis/endpoints'; 
import { BaseResponse } from '../../../shared/models/BaseApiResponse';
import { admindtEdit, admindtperfil, userdtEdit, userdtperfil } from '../Model/editperfiladmin';
@Injectable({
  providedIn: 'root'
})
export class DatosperfilService {
  private formDataUser: FormData | null = null;
  constructor(private http: HttpClient,private toastr: ToastrService) { }


  Getinfoperfiladmin(idAdmin:number): Observable<BaseResponse> {
    const requestURL = `${env.api}${end.ADMIN_PERFIL}${idAdmin}`;

    return this.http.get<BaseResponse>(requestURL).pipe(map((resp) => {
      this._builFormDataperfil(resp.data);
      localStorage.setItem('datospersonales', JSON.stringify(resp.data));
     
      return resp;

    }))
  }




  GetinfoperfilUsuarioGeneral(idUSER:number): Observable<BaseResponse> {
    const requestURL = `${env.api}${end.USUARIOGENERAL_PERFIL}${idUSER}`;

    return this.http.get<BaseResponse>(requestURL).pipe(map((resp) => {
      this._builFormDataperfilUser(resp.data);
     
      localStorage.setItem('datospersonales', JSON.stringify(resp.data));
   
      return resp;

    }))
  }
  UsuarioPerfilEdit(idUsuario:Number,datos: userdtEdit):Observable<BaseResponse>{
    const requestURL=  `${env.api}${end.USUARIOEDIT_PERFIL}${idUsuario}`;
    const Formdata = this._builFormDataUserGEDIT(datos);
   
    return this.http.put(requestURL, Formdata).pipe(map((resp: BaseResponse) => {
      localStorage.setItem('NombreUsuario', JSON.stringify(`${datos.nombres} ${datos.apellidos}`));
  
    
   
      localStorage.removeItem('datospersonales');
      window.location.reload();
      return resp;


    }))
  
  }
  private _builFormDataperfilUser(user: userdtperfil): void {
    const formData = new FormData();
  
    formData.append("userName", user.userName.toString());              
    formData.append("nombres", user.nombres.toString());                
    formData.append("apellidos", user.apellidos.toString());
    formData.append("mail", user.mail.toString());            
    formData.append("fechaNacimiento", user.fechaNacimiento.toString());
    formData.append("fechaIngreso", user.fechaIngreso.toString());     
    formData.append("identificacion", user.identificacion.toString());            
  
   
    this.formDataUser = formData;
  }
 private _builFormDataperfil(user: admindtperfil): void {
    const formData = new FormData();
  
    formData.append("userName", user.userName.toString());              
    formData.append("nombres", user.nombres.toString());                
    formData.append("apellidos", user.apellidos.toString());
    formData.append("mail", user.mail.toString());            
    formData.append("fechaNacimiento", user.fechaNacimiento.toString());
    formData.append("fechaIngreso", user.fechaIngreso.toString());     
    formData.append("identificacion", user.identificacion.toString());            
  
   
    this.formDataUser = formData;
  }
  
  AdminPerfilEdit(idUsuario:Number,datos: admindtEdit):Observable<BaseResponse>{
    const requestURL=  `${env.api}${end.ADMIN_EDITPERFIL}${idUsuario}`;
    const Formdata = this._builFormDataUser(datos);
    return this.http.put(requestURL, Formdata).pipe(map((resp: BaseResponse) => {
      localStorage.setItem('NombreUsuario', JSON.stringify(`${datos.nombres} ${datos.apellidos}`));
  
    
   
      localStorage.removeItem('datospersonales');
      window.location.reload();
      return resp;


    }))
  
  }

  private _builFormDataUserGEDIT(user: userdtEdit): FormData {
    const formData = new FormData();
  
    formData.append("userName", user.userName.toString());              
    formData.append("nombres", user.nombres.toString());                
    formData.append("apellidos", user.apellidos.toString());            
    formData.append("fechaNacimiento", user.fechaNacimiento.toString()); 
  
   
    return formData;
  }


  private _builFormDataUser(user: admindtEdit): FormData {
    const formData = new FormData();
  
    formData.append("userName", user.userName.toString());              
    formData.append("nombres", user.nombres.toString());                
    formData.append("apellidos", user.apellidos.toString());            
    formData.append("fechaNacimiento", user.fechaNacimiento.toString()); 
  
   
    return formData;
  }
  getFormDataUser(): FormData | null {
    const datospersonales = JSON.parse(localStorage.getItem('datospersonales') || '{}');
  
    if (datospersonales && typeof datospersonales === 'object') {
      this._builFormDataperfil(datospersonales); // Construir el FormData
    } 
    return this.formDataUser;
  }
  getFormDataUserGeneral(): FormData | null {
    const datospersonales = JSON.parse(localStorage.getItem('datospersonales') || '{}');
  
    if (datospersonales && typeof datospersonales === 'object') {
      this._builFormDataperfilUser (datospersonales); // Construir el FormData
    } 
    return this.formDataUser;
  }
}
