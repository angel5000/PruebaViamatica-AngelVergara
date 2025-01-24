import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseResponse } from '../../../shared/models/BaseApiResponse'; 
import { Login, Logout, UserData } from '../Models/login-interface'; 
import { environment as env } from '../../../../enviroments/environment';  
import { endpoint as end, httpOptions } from '../../../shared/apis/endpoints'; 
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private toastr: ToastrService) { 


  }
  private formDataUser: FormData | null = null; 
  showSuccess(mensaje:string) {
    this.toastr.success(mensaje, 'Éxito');
  }
  showError(mensaje:string) {
    this.toastr.error(mensaje, 'Error');
  }

  login(req:Login): Observable<BaseResponse>{
const requestURL=  `${env.api}${end.GENERATE_TOKEN}`
return this.http.post<BaseResponse>(requestURL, req, httpOptions).pipe(
map((resp:BaseResponse)=>{

if(resp.isSucces){
  
  this.showSuccess(resp.message);
  localStorage.setItem('datospersonales', JSON.stringify(resp.dataPersonal));
 


if (resp.data!=null && resp.additionalData!=null) {
  const rol= resp.data;
  const id= resp.additionalData;

  // Guardar el rol e ID en localStorage
  localStorage.setItem('userRole', JSON.stringify(rol)); // Almacenar el rol
  localStorage.setItem('userId', JSON.stringify(id));   // Almacenar el ID
  const credentials = {
   
    personalData: resp.dataPersonal.userName // Los datos personales del usuario
  };


  localStorage.setItem('userCredentials', JSON.stringify(resp.dataPersonal.userName));
  localStorage.setItem('NombreUsuario', JSON.stringify(`${resp.dataPersonal.nombres} ${resp.dataPersonal.apellidos}`));
}


}else{
 
  this.showError(resp.message);
}
return resp;

}),  catchError((error) => {
 
  this.showError(error);
 
  return of(error);  // Retorna una respuesta de error para que el flujo continúe
})
);
}
 _builFormDataUser(user: UserData): void {
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
getFormDataUser(): FormData | null {
  const datospersonales = JSON.parse(localStorage.getItem('datospersonales') || '{}');

  if (datospersonales && typeof datospersonales === 'object') {
    this._builFormDataUser(datospersonales); // Construir el FormData
  } 
  return this.formDataUser;
}

  getUserRole(): number | null {
    return JSON.parse(localStorage.getItem('userRole') || 'null');
    
  }

  getUserId(): number | null {
    return JSON.parse(localStorage.getItem('userId') || 'null');
  }

  getNombre(): number | null {
    return JSON.parse(localStorage.getItem('NombreUsuario') || 'null');
  }
  
  logout(credentials: string): Observable<BaseResponse> {
    const requestURL = `${env.api}${end.LOGOUT}`;
    return this.http.post<BaseResponse>(requestURL, credentials, httpOptions).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSucces) {
          console.log('Logout exitoso:', resp.isSucces);
          localStorage.removeItem('userRole');
          localStorage.removeItem('userId');
          localStorage.removeItem('userCredentials');
        }
        return resp;
      }),
      catchError((error) => {
        console.error('Error en logout:', error);
        throw error; 
      })
    );
  }
  
  
}
