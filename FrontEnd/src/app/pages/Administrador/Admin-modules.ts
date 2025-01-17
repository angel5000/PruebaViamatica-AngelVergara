import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module'; 

import { AppRoutingModule } from '../../app-routing.module';
import { ListAdministradorComponent } from './components/list-administrador/list-administrador.component';





@NgModule({
  declarations: [
    ListAdministradorComponent
  ],
  exports:[],
  imports: [
    CommonModule,
    
    SharedModule,
   
  ]
})
export class ListAdministradorModule { }
