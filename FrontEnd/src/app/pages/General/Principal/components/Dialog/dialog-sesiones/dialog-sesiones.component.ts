import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseResponse } from '../../../../../../shared/models/BaseApiResponse';
import { DateRange } from '../../../../../../shared/models/SearchOptions.interface';
import { AuthService } from '../../../../../Auth/Services/auth.service';
import { SesionesService } from '../../../../../Servicios/Sesiones/sesiones.service';
import { ComponentSettings } from '../listsesions-config';

@Component({
  selector: 'app-dialog-sesiones',
  templateUrl: './dialog-sesiones.component.html',
  styleUrl: './dialog-sesiones.component.scss'
})
export class DialogSesionesComponent implements OnInit {
  totalFallidos: number = 0;

rowClick($event: { action: string; row: any; }) {
throw new Error('Method not implemented.');
}
  component:any;
  form: FormGroup 
  ocultar:boolean
  identifi?:any
totalfallidos:number
 

    constructor( @Inject(MAT_DIALOG_DATA) public data,   private _fb:FormBuilder,
    public _dialogRef:MatDialogRef<DialogSesionesComponent> , public sesionserv:SesionesService,
     private authService:AuthService
   ) { 
   
  
   

   
   }

 

  formatGetInputs() {
    let str = "";
  
    if (this.component.filters.numFilter !== "") {
      str += `&NumFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }
  
    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }
  
    // Verificar si las fechas están definidas y no son vacías antes de concatenarlas
    if (
      this.component.filters.startDate &&
      this.component.filters.startDate.trim() !== "" &&
      this.component.filters.endDate &&
      this.component.filters.endDate.trim() !== ""
    ) {
      str += `&startDate=${this.component.filters.startDate}`;
      str += `&endDate=${this.component.filters.endDate}`;
     
    }
  
    if (this.component.filters.refresh) {
      const random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }
  
    this.component.getInputs = str;
    console.log("getInputs:", this.component.getInputs);
  }



  setGetInputsProviders(refresh:boolean){
    this.component.filters.refresh=refresh;
    this.formatGetInputs()
  }

  searchDadteRange(date:DateRange) {

    this.component.filters.startDate=date.startDate;
    this.component.filters.endDate=date.endDate;
    this.setGetInputsProviders(true)
  
 
    console.log(this.totalfallidos=this.sesionserv.total())
    }
 
    // Método que recibe el total de sesiones fallidas desde el componente hijo
    recibirTotalFallidos(total: number) {
      this.totalFallidos = total;
    }
  ngOnInit(): void {
    this.component=ComponentSettings
    const userId = this.authService.getUserId();
    this.identifi=userId;
    this.setGetInputsProviders(true)

  }










}
