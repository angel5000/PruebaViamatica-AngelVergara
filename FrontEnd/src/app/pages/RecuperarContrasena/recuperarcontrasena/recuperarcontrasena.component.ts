import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from 'express';
import { GenericValidators,  PasswordComplexityValidator,  PasswordMatchValidator,  passwordValidator } from '../../../shared/validators/generic-validators';
import { AuthService } from '../../Auth/Services/auth.service';
import { CambiarContrasenaService } from '../Servicios/cambiar-contrasena.service';

@Component({
  selector: 'app-recuperarcontrasena',

  templateUrl: './recuperarcontrasena.component.html',
  styleUrl: './recuperarcontrasena.component.scss'
})
export class RecuperarcontrasenaComponent implements OnInit {

  form: FormGroup;
  inputType = "password";
  visible = false;

  constructor(
    private fb: FormBuilder, 
    private authServices: AuthService,
private recuperarctr:CambiarContrasenaService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
 
  }

  initForm(): void {
    this.form = this.fb.group({
      identificacion: ["", [Validators.required, GenericValidators.identificacion]],
     email: ["", [Validators.required, GenericValidators.emailValidation]], // Email validation added
     nuevaContrasena: ["", [Validators.required, passwordValidator()]],
     confirNuevaContrasena: ["", [Validators.required]]
    }
   
    
    
    
    );
  }





Recuperar() {
  if(this.form.invalid)
  {
    console.log(this.form.valid)
    return Object.values(this.form.controls).forEach((controls)=>{
      controls.markAllAsTouched();
    })
    } 
    Object.keys(this.form.controls).forEach((controlName) => {
      const control = this.form.get(controlName);
      if (control?.invalid) {
        console.log(`El campo ${controlName} no es válido`);
        
        // Mostrar los errores de cada campo
        Object.keys(control.errors || {}).forEach((errorKey) => {
          console.log(`Error en el campo ${controlName}: ${errorKey}`);
        });
      }
    });

 console.log(this.form.value)

      this.recuperarctr.CambiarContrasena (this.form.value).subscribe((resp)=>{
        console.log('Respuesta del servidor:', resp);
        if(resp.isSucces === true){
          console.log('Respuesta del servidor:', resp.isSucces);
      //    this._alert.success('Excelente',resp.message)
         
        }else{
          console.log('Respuesta del servidor:', resp.isSucces);
         // this._alert.warn('Atencion',resp.message)
        }
       
      })
       


}





toggleVisibility() {
  if (this.visible) {
    this.inputType = "password";
    this.visible = false;
    this.cd.markForCheck();
  } else {
    this.inputType = "text";
    this.visible = true;
    this.cd.markForCheck();
  }
}

}
