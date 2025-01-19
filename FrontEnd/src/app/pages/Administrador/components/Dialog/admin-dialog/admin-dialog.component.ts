import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../Auth/Services/auth.service';
import { AdministradorService } from '../../../Services/administrador.service';

@Component({
  selector: 'app-admin-dialog',

  templateUrl: './admin-dialog.component.html',
  styleUrl: './admin-dialog.component.scss'
})
export class AdminDialogComponent {

  form: FormGroup 
  initForm(): void {
    this.form = this._fb.group({
      idPersona: ['', [Validators.required]],
      userName: ['', [Validators.required]], // Cambiado 'name' a 'userName'
      sesionActive: ['', [Validators.required]], // Cambiado 'state' a 'sesionActive'
      statusUsuario: ['', [Validators.required]], // Cambiado 'state' a 'statusUsuario'
      nombres: ['', [Validators.required]], // Cambiado 'name' a 'nombres'
      apellidos: ['', [Validators.required]], // Cambiado 'name' a 'apellidos'
      fechaNacimiento: ['', [Validators.required]], // Cambiado 'stockMin' a 'fechaNacimiento'
      statusPersona: ['', [Validators.required]] // Cambiado 'stockMax' a 'statusPersona'
    });
  }
  

  constructor( @Inject(MAT_DIALOG_DATA) public data,   private _fb:FormBuilder,
   public _dialogRef:MatDialogRef<AdminDialogComponent> 
   ,private authService: AuthService,private UserServices: AdministradorService) { 
    this.initForm();
  
  }

  ngOnInit(): void {

    console.log("id ",this.data.data);
if(this.data!=null){
  console.log("idpersona ",this.data.idPersona);
  this.UserById(this.data.data.idUsuario)
 
}
  }

  UserById(idUser: number): void {
    this.UserServices.UserById(idUser).subscribe((resp) => {
      console.log("idpersona  metodo:",resp.sesionActive);
      this.form.reset({
        idPersona: resp.idPersona,
        userName: resp.userName,          // Cambiado 'productId' a 'userName'     
        sesionActive: resp.sesionActive ,  // Cambiado 'state' a 'sesionActive'
        statusUsuario: resp.statusUsuario, // Cambiado 'state' a 'statusUsuario'
        nombres: resp.nombres,            // Cambiado 'name' a 'nombres'
        apellidos: resp.apellidos,        // Cambiado 'name' a 'apellidos'
        fechaNacimiento: resp.fechaNacimiento, // Cambiado 'stockMin' a 'fechaNacimiento'
        statusPersona: resp.statusPersona,  // Cambiado 'stockMax' a 'statusPersona'
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
    if(userId>0){
    this.UserEdit (userId);
    
    }
    /*else{
      this.ProductRegister();
     
    }
  */
  
  
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






