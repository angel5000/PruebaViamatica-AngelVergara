import { Injectable } from '@angular/core';
import { BaseResponse } from '../../../shared/models/BaseApiResponse';
import { UsuarioResponse } from '../Models/UsuariosResponse';
import { environment as env } from '../../../../enviroments/environment';  
import { endpoint as end, httpOptions } from '../../../shared/apis/endpoints'; 
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http: HttpClient) { }

  GetAll(id: number): Observable<BaseResponse> {
    const requestURL = `${env.api}${end.LIST_USUARIOS}?idUsuario=${id}`;



    return this.http.get<BaseResponse>(requestURL).pipe(map((resp) => {
      (resp.data.data || []).forEach(function (product: UsuarioResponse) {
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
        
      /*  product.icView = getIcon("icVisibility", "Ver stock Actual", true);
        product.icEdit = getIcon("icEdit", "Editar Producto", true, "edit");
        product.icDelete = getIcon("icDelete", "Eliminar Producto", true, "Remove");*/
      })
      return resp;

    }))
  }
}


