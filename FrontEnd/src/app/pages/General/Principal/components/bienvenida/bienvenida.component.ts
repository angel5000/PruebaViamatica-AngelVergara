import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { convertDateToRequest } from '../../../../../shared/components/function/helpers';
import { AuthService } from '../../../../Auth/Services/auth.service';
import { SesionResponse } from '../../../../Servicios/Models/SesionesRespones';
import { DialogSesionesComponent } from '../Dialog/dialog-sesiones/dialog-sesiones.component';

@Component({
  selector: 'app-bienvenida',

  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.scss'
})
export class BienvenidaComponent implements OnInit {
form: FormGroup 
  initForm(): void {
    this.form = this._fb.group({
      userName: ['',], // Cambiado 'name' a 'userName'
      fechaIngreso: ['', ], // Cambiado 'state' a 'statusUsuario'
      nombres: ['', ], // Cambiado 'name' a 'nombres'
      apellidos: ['', ], // Cambiado 'name' a 'apellidos'
      fechaNacimiento: ['', ], // Cambiado 'stockMin' a 'fechaNacimiento'
      identificacion: ['', ] // Cambiado 'stockMax' a 'statusPersona'
    });
  }


constructor(   private _fb:FormBuilder
,private authService: AuthService, public _dialog: MatDialog) { 
 this.initForm();

}
  ngOnInit(): void {
    this.Userdata()
    
  }
 
Userdata(): void {
  const formData = this.authService.getFormDataUser();

 const userName = formData.get('userName');
    const nombres = formData.get('nombres');
    const apellidos = formData.get('apellidos');
    const fechaNacimiento = formData.get('fechaNacimiento');
    const fechaIngreso = formData.get('fechaIngreso');
    const identificacion = formData.get('identificacion');
    const fechaconvertida =convertDateToRequest(fechaIngreso,"datetime");
    this.form.reset({
      identificacion: identificacion || '',
      userName: userName || '',
      nombres:`${nombres || ''} ${apellidos || ''}` || '',
     
      fechaNacimiento: fechaNacimiento || '',
      fechaIngreso: fechaconvertida|| '',
    });
  }
  Dialog(){

    let dialogref = this._dialog.open(DialogSesionesComponent,{
      data:{mode:'Datos sesiones',},
      disableClose:true,
      width: '850px',
    
    })
    dialogref.afterClosed().subscribe((res)=>{
      if(res){
       // this.setGetInputsProviders(true)
      }
    })
  }







}