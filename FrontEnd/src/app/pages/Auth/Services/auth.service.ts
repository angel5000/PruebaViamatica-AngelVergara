import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseResponse } from '../../../shared/models/BaseApiResponse'; 
import { Login, Logout } from '../Models/login-interface'; 
import { environment as env } from '../../../../enviroments/environment';  
import { endpoint as end, httpOptions } from '../../../shared/apis/endpoints'; 
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
/*private user: BehaviorSubject<BaseResponse>;
public get userToken():BaseResponse{
  return this.user.value
}*/


  constructor(private http:HttpClient) { 
    /*
this.user= new BehaviorSubject<BaseResponse>(
  JSON.parse(localStorage.getItem("token"))
)*/

  }

  login(req:Login): Observable<BaseResponse>{
//    localStorage.setItem("authType","Interno");
const requestURL=  `${env.api}${end.GENERATE_TOKEN}`
return this.http.post<BaseResponse>(requestURL, req, httpOptions).pipe(
map((resp:BaseResponse)=>{

if(resp.isSucces){
  console.log(resp.isSucces)
//localStorage.setItem("token",JSON.stringify(resp.data))
//this.user.next(resp.data)

if (resp.data!=null && resp.additionalData!=null) {
  const rol= resp.data;
  const id= resp.additionalData;

  // Guardar el rol e ID en localStorage
  localStorage.setItem('userRole', JSON.stringify(rol)); // Almacenar el rol
  localStorage.setItem('userId', JSON.stringify(id));   // Almacenar el ID
  const credentials = {
   
    personalData: resp.dataPersonal.userName // Los datos personales del usuario
  };

  // Almacenar el objeto de credenciales en localStorage
  localStorage.setItem('userCredentials', JSON.stringify(resp.dataPersonal.userName));
}
if (resp.dataPersonal) {
  const userName = resp.dataPersonal.userName;
  //localStorage.setItem('personalData', JSON.stringify(resp.dataPersonal));
  console.log('Datos personales:', resp.dataPersonal,userName);
}
}
return resp;
})


)
  }
  getUserRole(): number | null {
    return JSON.parse(localStorage.getItem('userRole') || 'null');
    
  }

  // Método para obtener el ID del usuario
  getUserId(): number | null {
    return JSON.parse(localStorage.getItem('userId') || 'null');
  }

  
  logout(credentials: string): Observable<BaseResponse> {
    const requestURL = `${env.api}${end.LOGOUT}`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain', // Indica que el cuerpo es texto plano
    });
  console.log(credentials)
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
        throw error; // Re-lanza el error para manejo posterior
      })
    );
  }
  
  
}
