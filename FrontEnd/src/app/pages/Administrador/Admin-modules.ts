import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module'; 

import { AppRoutingModule } from '../../app-routing.module';
import { ListAdministradorComponent } from './components/list-administrador/list-administrador.component';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from '../../commons/sidenav/sidenav.component';
import { ListTableComponent } from '../../shared/components/Reusables/list-table/list-table.component';





@NgModule({
  declarations: [
    ListAdministradorComponent
  ],
  exports:[],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
   ListTableComponent
  ]
})
export class ListAdministradorModule { }
