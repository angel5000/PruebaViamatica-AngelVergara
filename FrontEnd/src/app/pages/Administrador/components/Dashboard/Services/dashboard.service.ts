import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../../../../shared/models/BaseApiResponse';
import { DashboardCount, Dashboardresponse } from '../Models/dashboardResponse';
import { environment as env  } from '../../../../../../enviroments/environment';  
import { endpoint as end } from '../../../../../shared/apis/endpoints'; 
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  GetAll(size: number, sort: string, order: string, page: number, getInputs: number,id:number): Observable<BaseResponse> {
    const requestURL = `${env.api}${end.DASHBOARD}?idUsuario=${id}${getInputs}&NumPage=${page+1}&Records=${size}`;

    console.log("aqui1")

    return this.http.get<BaseResponse>(requestURL).pipe(map((resp) => {
      (resp.data || []).forEach(function (dash: Dashboardresponse) {
        switch (dash.sesionActive) {
          case 'I': dash.badgeColor = 'text-gray bg gray-light'
          
            break
          case 'A': dash.badgeColor = 'text-green bg-green-light'
         
            break
         
        
        }

        switch (dash.statusUsuario) {
          case "Bloqueado": dash.badgeColor3 = 'text-orange bg-red'
            break
            case "Activo": dash.badgeColor3 = 'text-green bg-green-light'
            break
            case "Inactivo": dash.badgeColor3 = 'text-gray bg gray-light'
            break
        }

        switch (dash.sesionExitosa) {
          case "1": dash.badgeColor5 = 'text-green bg-green-light'
            break
            case "0": dash.badgeColor5 = 'text-green bg gray-light'
            break
        
        }
        switch (dash.sesionFallida) {
          case "1": dash.badgeColor4 ='text-orange bg-red'
            break
            case "0": dash.badgeColor4 ='text-gray bg gray-light'
            break
        }
       
     
   
      })
      return resp;

    }))
  }




  GetCount(): Observable<DashboardCount> {
    const requestURL = `${env.api}${end.DASHBOARDCOUNT}`;
    return this.http.get<BaseResponse>(requestURL).pipe(
      map((response) => {
        if (response.isSucces && response.data && response.data.length > 0) {
          const data = response.data[0]; // Acceder al primer objeto dentro del array
          return {
            totalUsuarios: data.totalUsuarios,
            totalSesionActiva: data.totalSesionActiva,
            totalBloqueados: data.totalBloqueados
          } as DashboardCount;
        } else {
          throw new Error('Error al obtener los datos');
        }
      })
    );
  }
  


}
