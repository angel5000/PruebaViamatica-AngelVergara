import { Injectable } from '@angular/core';
import { BaseResponse } from '../../../shared/models/BaseApiResponse';
import { SesionResponse } from '../Models/SesionesRespones';
import { environment as env } from '../../../../enviroments/environment';  
import { endpoint as end } from '../../../shared/apis/endpoints'; 
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SesionesService {

  constructor(private http: HttpClient) { }
totalfallidos:number
  GetAll(size: number, sort: string, order: string, page: number, getInputs: number,id:number): Observable<BaseResponse> {
    const requestURL = `${env.api}${end.SESIONES}?idUsuario=${id}${getInputs}&NumPage=${page+1}&Records=${size}`;
    ;
    return this.http.get<BaseResponse>(requestURL).pipe(map((resp) => {
      let totalFallidos = 0;
      (resp.data || []).forEach( (sesiones: SesionResponse) =>{


      
        totalFallidos=sesiones.sesionFallidaTotales
     

  
      console.log(sesiones.sesionFallidaTotales)
      });

      return {...resp, totalFallidos};

    }));
  }
total ():number{
return this.totalfallidos;
}







}
