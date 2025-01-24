import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module'; 

import { RouterModule } from '@angular/router';

import { PerfilComponent } from './Components/perfil/perfil.component';
import { ToastrModule } from 'ngx-toastr';





@NgModule({
  declarations: [
  PerfilComponent
  ],
  exports:[],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ToastrModule
  ]
})
export class PerfilModule { }
