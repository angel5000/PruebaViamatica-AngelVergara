import { Injectable } from "@angular/core";

import { environment as env  } from "../../../enviroments/environment"; 
import { observable, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { formatDate } from "@angular/common";
import { BaseResponse } from "../models/BaseApiResponse";
import { endpoint
    as end } from "../apis/endpoints"; 

@Injectable({
  providedIn: "root",
})
export class UploadExcelService {


  constructor(private http: HttpClient) {}

  uploadExcel(file: File): Observable<BaseResponse> {
    const formData: FormData = new FormData();
    formData.append('archivo', file, file.name);  // 'file' debe coincidir con el nombre del campo en el backend
    return this.http.post<BaseResponse>(`${env.api}${end.UPLOAD_EXCEL}`, formData);
 

}

}