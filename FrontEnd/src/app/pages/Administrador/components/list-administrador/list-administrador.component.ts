import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDrawerMode } from '@angular/material/sidenav';
import Swal from 'sweetalert2';
import { BaseResponse } from '../../../../shared/models/BaseApiResponse';
import { RowClick } from '../../../../shared/models/RowClick.interface';
import { FilterBox } from '../../../../shared/models/SearchOptions.interface';
import { AuthService } from '../../../Auth/Services/auth.service';
import { UsuarioResponse } from '../../Models/UsuariosResponse';
import { AdministradorService } from '../../Services/administrador.service';
import { AdminDialogComponent } from '../Dialog/admin-dialog/admin-dialog.component';
import { ComponentSettings } from './list.cofing'; 
import { ToastrService } from 'ngx-toastr';
import { Console } from 'console';
import { actualizarPermiso } from './list.cofing';
@Component({
  selector: 'app-list-administrador',
  templateUrl: './list-administrador.component.html',
  styleUrl: './list-administrador.component.scss'
})
export class ListAdministradorComponent implements OnInit {
  component:any;
  identifi?:any


resetFilters() {
  this.component.filters={ ...this.component.resetFilters};
       
  this.setGetInputsProviders(true);
}



search(data:FilterBox){
  if( this.component.filters.textFilter=data.searchData===""){
    console.log("datos ",this.component.filters.textFilter=data.searchData)
    this.component.filters={ ...this.component.resetFilters};
       
    this.setGetInputsProviders(true);
  }else{
    this.component.filters.numFilter=data.searchValue
    this.component.filters.textFilter=data.searchData
    this.setGetInputsProviders(true);
  }
    
     
      }



  mode = new FormControl('push' as MatDrawerMode);
constructor(public AdminServices:AdministradorService, private authService: AuthService,
   public _dialog: MatDialog){
   
}

  ngOnInit(): void {
    this.component=ComponentSettings
    const userRole = this.authService.getUserRole();
      const userId = this.authService.getUserId();
     this.identifi=userId;
     //this.component.getInputs=1;
      console.log('Rol del usuario:', userRole);
      console.log('ID del usuario:', userId);
      console.log("input",this.component.getInputs)
     
      this.formatGetInputs()

      this.AdminServices.RolesOpciones (userId).subscribe(opciones => {
        const data = opciones.data;
        // Buscar una opción específica en el array usando 'find'
        const opcion = data.find((item) => item.opcion_IdOpcion === 4&&item.activo===true); 
        const editar = data.find((item) => item.opcion_IdOpcion === 2&&item.activo===true); 
       if(opcion!==undefined){

        actualizarPermiso.prototype.PermisoEliminar(true)

       }if(editar!==undefined){
        actualizarPermiso.prototype.PermisoEditar(true)
       }
      
      
      });



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



      rowClick(e:RowClick<UsuarioResponse>){
        let action=e.action
        let usuario= e.row
        switch(action){
       
    case "edit":this.Dialog(usuario,true)
    break
    case "remove" :this.EliminarUsuario(usuario.idUsuario,this.identifi,usuario)
    break
        }
        return false
      }
    
openDialogRegister(){
  this._dialog.open(AdminDialogComponent, {
  disableClose: true,
  width: '400px',
  data:{mode:'register', ocultar:false},
  }).afterClosed().subscribe((res)=>{
    if(res){
      console.log("resp:", res);
      this.setGetInputsProviders(true)
    }
  })
}
      Dialog(row:UsuarioResponse , ocultar: boolean){

        const dialogConfig = new MatDialogConfig()
        dialogConfig.data={ ...row, ocultar };
        let dialogref = this._dialog.open(AdminDialogComponent,{
          data:dialogConfig.data,
          disableClose:true,
          width: '420px'
        })
        dialogref.afterClosed().subscribe((res)=>{
          if(res){
            this.setGetInputsProviders(true)
          }
        })
      }

      EliminarUsuario(idUsuario:number, idAdmin:number,dtuser: UsuarioResponse) {
        
        Swal.fire({
          title:`¿Esta seguro que desea eliminar al usuario: ${dtuser.userName}, ${dtuser.apellidos}? `,
          text:"Se borrara permanentemente",
          icon:"warning",
          showCancelButton:true,
          focusCancel:true,
          confirmButtonColor:'rgb(210,155,253)',
          cancelButtonColor:'rgb(79,109,253)',
          cancelButtonText:'cancelar',
          confirmButtonText:'OK',
          width:430
        
        
        }).then((result)=>{
        if(result.isConfirmed){
          this.AdminServices.EliminarUsuario(idUsuario, idAdmin).subscribe(()=>
          this.setGetInputsProviders(true))
       
        }
        
        })
        
        


      }
     
}
