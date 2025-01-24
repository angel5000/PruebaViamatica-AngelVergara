import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { convertDateToRequest } from '../../../../shared/components/function/helpers';
import { GenericValidators } from '../../../../shared/validators/generic-validators';
import { AuthService } from '../../../Auth/Services/auth.service';
import { DatosperfilService } from '../../Services/datosperfil.service';

@Component({
  selector: 'app-perfil',

  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit{

  correoDominio: string = 'mail.com';
form: FormGroup;
userid:number=0
userrol:number=0
habilitar:boolean=true
initForm(): void {
  this.form = this._fb.group({
    identificacion: ['', [Validators.required, GenericValidators.identificacion]],
    userName: ['', [Validators.required,]],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required]],
  });
}

constructor(   private _fb:FormBuilder,private authService: AuthService, private perfiadmi:DatosperfilService
  ,private toastr: ToastrService) { 
this.initForm();

}
  ngOnInit(): void {

   this.updateCorreoOnInit();
   
   this.userid = this.authService.getUserId();
   this.userrol = this.authService.getUserRole();
   if(this.userrol==1){

   this.perfiadmi.Getinfoperfiladmin(this.userid).subscribe((resp)=>{
    if(resp.isSucces){
      this.Userdata()
      console.log(resp.data)
      window.location.reload
    }
   })
  }if(this.userrol==2){
    this.perfiadmi.GetinfoperfilUsuarioGeneral (this.userid).subscribe((resp)=>{
      if(resp.isSucces){
        this.dataUsErGENERAL()
        console.log(resp.data)
    
     
      }
     })
  }


  }

Userdata(): void {
  const formData = this.perfiadmi.getFormDataUser();
  
  const userName = formData.get('userName') ?? '';
  const nombres = formData.get('nombres') ?? '';
  const apellidos = formData.get('apellidos') ?? '';
  const correo = formData.get('mail') ?? '';
  const fechaNacimiento = formData.get('fechaNacimiento') ?? '';
  const fechaIngreso = formData.get('fechaIngreso') ?? '';
  const identificacion = formData.get('identificacion') ?? '';
  
  const fechaconvertida = convertDateToRequest(fechaIngreso, "datetime");
  
  this.form.patchValue({
    identificacion: identificacion,
    userName: userName,
    nombres: nombres,
    apellidos: apellidos,
    correo: correo,
    fechaNacimiento: fechaNacimiento,
    fechaIngreso: fechaconvertida,
  });
}

dataUsErGENERAL(): void {
  const formData = this.perfiadmi.getFormDataUserGeneral();
  
  const userName = formData.get('userName') ?? '';
  const nombres = formData.get('nombres') ?? '';
  const apellidos = formData.get('apellidos') ?? '';
  const correo = formData.get('mail') ?? '';
  const fechaNacimiento = formData.get('fechaNacimiento') ?? '';
  const fechaIngreso = formData.get('fechaIngreso') ?? '';
  const identificacion = formData.get('identificacion') ?? '';
  
  const fechaconvertida = convertDateToRequest(fechaIngreso, "datetime");
  
  this.form.patchValue({
    identificacion: identificacion,
    userName: userName,
    nombres: nombres,
    apellidos: apellidos,
    correo: correo,
    fechaNacimiento: fechaNacimiento,
    fechaIngreso: fechaconvertida,
  });
}







Editar() {
  if(this.form.invalid)
  {
  return Object.values(this.form.controls).forEach((controls)=>{
    controls.markAllAsTouched();
  })
  } 
if(this.userrol==1){
  this.perfiadmi.AdminPerfilEdit(this.userid,this.form.value).subscribe((resp)=>{
    console.log('Respuesta del servidor:', resp);
    if(resp.isSucces === true){
  
 this.showSuccess(resp.message)
    }else{
      this.showError(resp.message)
    }
   
  })
  
}

if(this.userrol==2){
  console.log("usuario:",this.userid)
  this.perfiadmi.UsuarioPerfilEdit(this.userid,this.form.value).subscribe((resp)=>{
    console.log('Respuesta del servidor:', resp);
    if(resp.isSucces === true){
  
 this.showSuccess(resp.message)
    }else{
      this.showError(resp.message)
    }
   
  })
  
}
    



}
showSuccess(mensaje:string) {
  this.toastr.success(mensaje, 'Éxito');
}
showError(mensaje:string) {
  this.toastr.success(mensaje, 'Error');
}


habilitarCampos(){
  this.habilitar = !this.habilitar; 

  if (this.habilitar) {
    this.habilitar =true
  } else {
    this.habilitar =false
  }
}

updateCorreoOnInit(): void {
  const value = this.form.get('correo')?.value;
  if (value) {
    const parts = value.split('@');
    this.form.get('correo')?.setValue(parts[0]);

    this.correoDominio = '@' + (parts[1] || 'mail.com');
    console.log(this.correoDominio, value);
  }
}
}
