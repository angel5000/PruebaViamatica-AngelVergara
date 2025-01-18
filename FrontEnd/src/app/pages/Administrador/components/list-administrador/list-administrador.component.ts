import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { RowClick } from '../../../../shared/models/RowClick.interface';
import { AuthService } from '../../../Auth/Services/auth.service';
import { UsuarioResponse } from '../../Models/UsuariosResponse';
import { AdministradorService } from '../../Services/administrador.service';
import { ComponentSettings } from './list.cofing'; 
@Component({
  selector: 'app-list-administrador',
  templateUrl: './list-administrador.component.html',
  styleUrl: './list-administrador.component.scss'
})
export class ListAdministradorComponent implements OnInit {
  component:any;
  identifi?:any
  mode = new FormControl('push' as MatDrawerMode);
constructor(public AdminServices:AdministradorService, private authService: AuthService){

}

  ngOnInit(): void {
    this.component=ComponentSettings
    const userRole = this.authService.getUserRole();
      const userId = this.authService.getUserId();
     this.identifi=userId;
      console.log('Rol del usuario:', userRole);
      console.log('ID del usuario:', userId);
    
    
      }
      rowClick(e:RowClick<UsuarioResponse>){
        let action=e.action
        let product= e.row
        switch(action){
        /*case "view":this.productInfoWarehouse(product)
    break
    case "edit":this.ProductEdit(product)
    break
    case "remove" :this.ProductRemove(product)
    break*/
        }
        return false
      }

}
