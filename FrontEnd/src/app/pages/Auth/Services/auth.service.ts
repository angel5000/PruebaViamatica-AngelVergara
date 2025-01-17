import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseResponse } from '../../../shared/models/BaseApiResponse'; 
import { Login } from '../Models/login-interface'; 
import { environment as env } from '../../../../enviroments/environment';  
import { endpoint as end, httpOptions } from '../../../shared/apis/endpoints'; 
import { map } from 'rxjs/operators';
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


}
return resp;
})


)
  }


}
