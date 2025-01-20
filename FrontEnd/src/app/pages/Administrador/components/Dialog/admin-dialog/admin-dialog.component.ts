import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { passwordValidator } from '../../../../../shared/validators/generic-validators';
import { AuthService } from '../../../../Auth/Services/auth.service';
import { AdministradorService } from '../../../Services/administrador.service';
import {GenericValidators} from '../../../../../shared/validators/generic-validators'
@Component({
  selector: 'app-admin-dialog',

  templateUrl: './admin-dialog.component.html',
  styleUrl: './admin-dialog.component.scss'
})
export class AdminDialogComponent {

  form: FormGroup 
  ocultar:boolean
  initForm(bool:Boolean): void {
    
    if(bool){
      this.form = this._fb.group({
        idPersona: [0, [Validators.required]],
        userName: ['', [Validators.required]], 
        sesionActive: ['I', [Validators.required]],
        statusUsuario: ['', [Validators.required]],
        nombres: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        fechaNacimiento: ['', [Validators.required]],
        statusPersona: ['', [Validators.required]],
        
      });
  
    }else{
      this.form = this._fb.group({
        idPersona: [0, [Validators.required]],
        userName: ['', [Validators.required,GenericValidators.validUsername]], 
        sesionActive: ['I', [Validators.required]],
        statusUsuario: ['', [Validators.required]],
        password: ['', [Validators.required ,passwordValidator()]],
        identificacion: ['', [Validators.required, GenericValidators.identificacion]],
        nombres: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        fechaNacimiento: ['', [Validators.required]],
        statusPersona: ['', [Validators.required]],
        rol: [2, [Validators.required]]
        
      });
    }
 

  }
  

  constructor( @Inject(MAT_DIALOG_DATA) public data,   private _fb:FormBuilder,
   public _dialogRef:MatDialogRef<AdminDialogComponent> 
   ,private authService: AuthService,private UserServices: AdministradorService) { 
  
    this.ocultar = data.ocultar;
    this.initForm(this.ocultar);
  
  
  }
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');  // Remueve cualquier carácter que no sea un número
  }


  ngOnInit(): void {

if(this.data!=null&&this.ocultar===true){

  console.log("idpersona ",this.data.idPersona);
  this.UserById(this.data.idUsuario)
  console.log("bool:"+this.ocultar)
  console.log("form:",this.form.invalid)
 /* if(this.form.invalid)
    {
    
   
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        if (control?.invalid) {
          console.log(`Campo inválido: ${field}`);
          console.log("Errores:", control.errors); // Muestra los errores específicos
        }
      });
    }*/
}
  }

  UserById(idUser: number): void {
    this.UserServices.UserById(idUser).subscribe((resp) => {
      console.log("idpersona  metodo:",resp.sesionActive);
      this.form.reset({
        idPersona: resp.idPersona,
        userName: resp.userName ,
        sesionActive: resp.sesionActive,
        statusUsuario: resp.statusUsuario,
        nombres: resp.nombres,
        apellidos: resp.apellidos,
        fechaNacimiento: resp.fechaNacimiento,
        statusPersona: resp.statusPersona,
      });
    });
  }

  productSave():void{
    if(this.form.invalid)
    {
    return Object.values(this.form.controls).forEach((controls)=>{
      controls.markAllAsTouched();
    })
    } 
    const userId = this.authService.getUserId();
    if(userId>0&&this.ocultar===true){
    console.log("bolean:",this.ocultar)
      this.UserEdit (userId);
    
    }
    else{
     this.UserRegister();
     
    }
  
  
  
  }
 UserRegister() {
    this.UserServices.UsuarioRegister(this.form.value).subscribe((resp)=>{
      console.log('Respuesta del servidor:', resp);
      if(resp.isSucces){
        
  //this._alert.success('Excelente', resp.message)
  this._dialogRef.close(true)
      }else{
        
    //    this._alert.warn('Atencion', resp.message)
       
      }
    })
  }
  UserEdit(productId:number):void{
    this.UserServices.UserEdit(productId,this.form.value).subscribe((resp)=>{
      console.log('Respuesta del servidor:', resp);
      if(resp.isSucces === true){
        console.log('Respuesta del servidor:', resp.isSucces);
    //    this._alert.success('Excelente',resp.message)
        this._dialogRef.close(true)
      }else{
        console.log('Respuesta del servidor:', resp.isSucces);
       // this._alert.warn('Atencion',resp.message)
      }
     
    })
     }
    

}






