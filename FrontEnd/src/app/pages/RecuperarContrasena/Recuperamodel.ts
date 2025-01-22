import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module'; 


import { RouterModule } from '@angular/router';
import { RecuperarcontrasenaComponent } from './recuperarcontrasena/recuperarcontrasena.component';





@NgModule({
  declarations: [
    RecuperarcontrasenaComponent
  ],
  exports:[],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  
  ]
})
export class RecuperaContraModule { }
