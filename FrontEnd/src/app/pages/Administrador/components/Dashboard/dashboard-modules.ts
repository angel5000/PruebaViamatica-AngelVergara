import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ListTableComponent } from '../../../../shared/components/Reusables/list-table/list-table.component';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports:[],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ToastrModule,
    ListTableComponent,
    FormsModule
  ]
})
export class DashboardModule { }
