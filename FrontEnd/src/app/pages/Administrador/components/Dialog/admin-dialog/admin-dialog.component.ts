import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { passwordValidator } from '../../../../../shared/validators/generic-validators';
import { AuthService } from '../../../../Auth/Services/auth.service';
import { AdministradorService } from '../../../Services/administrador.service';
import {GenericValidators} from '../../../../../shared/validators/generic-validators'
import { ToastrService } from 'ngx-toastr';
import { Estadosusuarios, Roles, SesionEstado, SesionEstadoUser } from '../../../../../../static-data/configs';
@Component({
  selector: 'app-admin-dialog',

  templateUrl: './admin-dialog.component.html',
  styleUrl: './admin-dialog.component.scss'
})
export class AdminDialogComponent {


  form: FormGroup 
  ocultar:boolean
  getRol:any;
  getestadouser:any;
  getestasseison:any;
  initForm(bool:Boolean): void {
    
    if(bool){
      //form para editar
      this.form = this._fb.group({
        idPersona: [0, [Validators.required]],
        idUsuario: [0, [Validators.required]],
        userName: ['', [Validators.required]], 
        sesionActive: ['I', [Validators.required]],
        statusUsuario: ['', [Validators.required]],
        nombres: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        fechaNacimiento: ['', [Validators.required]],
        statusPersona: ['', [Validators.required]],
        
      });
  
    }else{
      //form para registrar
      this.form = this._fb.group({
        idPersona: [0, [Validators.required]],
      
        userName: ['', [Validators.required,GenericValidators.validUsername]], 
        sesionActive: ['I', [Validators.required]],
        statusUsuario: ['Activo', [Validators.required]],
        password: ['', [Validators.required ,passwordValidator()]],
        identificacion: ['', [Validators.required, GenericValidators.identificacion]],
        nombres: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        fechaNacimiento: ['', [Validators.required]],
        statusPersona: ['Activo', [Validators.required]],
        rol: [2, [Validators.required]]
        
      });
    }
 

  }
  

  constructor( @Inject(MAT_DIALOG_DATA) public data,   private _fb:FormBuilder,
   public _dialogRef:MatDialogRef<AdminDialogComponent> 
   ,private authService: AuthService,private UserServices: AdministradorService, private toastr: ToastrService) { 
  
    this.ocultar = data.ocultar;
    this.initForm(this.ocultar);
  
  
  }
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');  // Remueve cualquier carácter que no sea un número
  }


  ngOnInit(): void {
    this.getRol =Roles
    this.getestadouser=Estadosusuarios
    this.getestasseison=SesionEstadoUser
if(this.data!=null&&this.ocultar===true){

  console.log("idpersona ",this.data.idPersona, this.data.idUsuario);
  this.UserById(this.data.idUsuario)
  console.log("bool:"+this.ocultar)
  console.log("form:",this.form.invalid)

}
  }

  UserById(idUser: number): void {
    this.UserServices.UserById(idUser).subscribe((resp) => {
      console.log("idpersona  metodo:",resp.idPersona, resp.idUsuario);
      this.form.reset({
        idUsuario: resp.idUsuario,
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
        
        this.showSuccess(resp.message)
  this._dialogRef.close(true)
      }else{
        this.showError(resp.message)
       
      }
    })
  }
  UserEdit(productId:number):void{
    this.UserServices.UserEdit(productId,this.form.value).subscribe((resp)=>{
  
      if(resp.isSucces === true){
    
   this.showSuccess(resp.message)
        this._dialogRef.close(true)
      }else{
       
     this.showError(resp.message)
      }
     
    })
     }
    
     showSuccess(mensaje:string) {
      this.toastr.success(mensaje, 'Éxito');
    }
    showError(mensaje:string) {
      this.toastr.success(mensaje, 'Error');
    }
  
}






