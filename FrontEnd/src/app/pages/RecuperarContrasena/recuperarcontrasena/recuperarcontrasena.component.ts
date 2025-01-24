import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
private recuperarctr:CambiarContrasenaService,
    private cd: ChangeDetectorRef, private router:Router
  ) { }

  ngOnInit(): void {
    this.initForm();
 
  }

  initForm(): void {
    this.form = this.fb.group({
      identificacion: ["", [Validators.required, GenericValidators.identificacion]],
     email: ["", [Validators.required, GenericValidators.emailValidation]], 
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

      this.recuperarctr.CambiarContrasena (this.form.value).subscribe((resp)=>{
        if(resp.isSucces){
          Swal.fire({
            title: 'Éxito!',
            text: 'Tu acción fue exitosa, Inicia sesion otra vez',
            icon: 'success',
            confirmButtonText: 'Continuar',
          }).then((result) => {
            if (result.isConfirmed) {
              // Si el usuario confirma, redirigir a la página de login
              this.router.navigate(['/login']);
            }
          });
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
