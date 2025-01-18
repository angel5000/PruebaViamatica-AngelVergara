import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
   BienvenidaComponent
  ],
  exports:[],
  imports: [
    CommonModule,
   SharedModule
  ]
})
export class BienvenidaModule { }
