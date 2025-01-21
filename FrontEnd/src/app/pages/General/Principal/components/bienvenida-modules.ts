import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DialogSesionesComponent } from './Dialog/dialog-sesiones/dialog-sesiones.component';
import { ListTableComponent } from '../../../../shared/components/Reusables/list-table/list-table.component';
import { FilterDateComponent } from '../../../../shared/components/Reusables/FilterDate/filter-date/filter-date.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
   BienvenidaComponent,
DialogSesionesComponent
  ],
  exports:[],
  imports: [
    CommonModule,
   SharedModule,
   ListTableComponent,
   FilterDateComponent,
   ToastrModule
  ]
})
export class BienvenidaModule { }
