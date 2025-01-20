import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertDateToRequest } from '../../../../../shared/components/function/helpers';
import { AuthService } from '../../../../Auth/Services/auth.service';

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
,private authService: AuthService) { 
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
}