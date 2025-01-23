import { Injectable } from '@angular/core';
import { BaseResponse } from '../../../shared/models/BaseApiResponse';
import { UsuarioRequest, UsuarioResponse} from '../Models/UsuariosResponse';
import { environment as env } from '../../../../enviroments/environment';  
import { endpoint as end, httpOptions } from '../../../shared/apis/endpoints'; 
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getIcon } from '../../../shared/components/function/helpers';
import { UsuarioResponseEdit } from '../Models/Usuariobyid';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { RolesOpcionesResponse } from '../Models/RolesReponse';
@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http: HttpClient,private toastr: ToastrService) { }

  GetAll(size: number, sort: string, order: string, page: number, getInputs: number,id:number): Observable<BaseResponse> {
    const requestURL = `${env.api}${end.LIST_USUARIOS}?idUsuario=${id}${getInputs}&NumPage=${page+1}&Records=${size}`;

    console.log("aqui1")

    return this.http.get<BaseResponse>(requestURL).pipe(map((resp) => {
      (resp.data || []).forEach(function (usuario: UsuarioResponse) {
      
        switch (usuario.sesionActive) {
          case "I": usuario.badgeColor = 'text-gray bg gray-light'
          
            break
          case "A": usuario.badgeColor = 'text-green bg-green-light'
      
            break
        
        }
        switch (usuario.statusUsuario) {
          case "Activo": usuario.badgeColor2 = 'text-green bg-green-light'
          
            break
          case "Bloqueado": usuario.badgeColor2 = 'text-orange bg-red'
      
            break
            case "Inactivo": usuario.badgeColor2 = 'text-gray bg gray-light'
      
            break
        
        }
        switch (usuario.statusPersona) {
          case "Activo": usuario.badgeColor3 = 'text-green bg-green-light'
          
            break
          case "Inactivo": usuario.badgeColor3 = 'text-gray bg gray-light'
      
            break
        
        }
        usuario.icEdit = getIcon("icEdit", "Editar Producto", true, "edit");
        usuario.icDelete = getIcon("icDelete", "Eliminar Producto", true, "Remove");
      
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
  
  UsuarioRegister(user: UsuarioRequest): Observable<BaseResponse> {
    const requestURL = `${env.api}${end.USUARIOS_REGISTER}`;
    const Formdata = this._builFormDataRegUser(user);
    return this.http.post(requestURL, Formdata).pipe(map((resp: BaseResponse) => {
      return resp;


    }))
  }

  private _builFormDataRegUser(user: UsuarioRequest): FormData {
    const formData = new FormData();
  
    formData.append("identificacion", user.identificacion .toString());  
    formData.append("userName", user.userName.toString());   
    formData.append("password", user.password.toString());              
    formData.append("nombres", user.nombres.toString());                
    formData.append("apellidos", user.apellidos.toString());            
    formData.append("fechaNacimiento", user.fechaNacimiento.toString()); 
    formData.append("sesionActive", user.sesionActive.toString()); 
    formData.append("stadoPersona", user.statusPersona.toString());    
    formData.append("stadoUsuario", user.statusUsuario.toString());   
    formData.append("Rol", user.rol.toString());     
            
  
   
    return formData;
  }
  EliminarUsuario(idUsuario:Number, idAdmin:number):Observable<void>{
    const requestURL=  `${env.api}${end.USUARIOS_ELIMINAR}${idAdmin}?idUsuario=${idUsuario}`;
    return this.http.put(requestURL,"").pipe(map((resp:BaseResponse)=>{
      console.log(resp);
  if(resp.isSucces){
    console.log(resp);
   this.showSuccess(resp.message)
  }if(!resp.isSucces){
this.showError(resp.message)
  }
    
  
    }))
  
  }
  showSuccess(msj:string) {
    this.toastr.success(msj, 'Éxito');
  }
  showError (msj:string) {
    this.toastr.error(msj, 'Error');
  }

  RolesOpciones(iduser:number): Observable<BaseResponse> {
    const requestURL = `${env.api}${end.ROLESOPCIONES}?idUsuario=${iduser}`;

    return this.http.get<BaseResponse>(requestURL).pipe(map((resp) => {
     
      return resp;

    }))
  }

 





}


