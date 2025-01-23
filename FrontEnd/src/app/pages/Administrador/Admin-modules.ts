import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module'; 

import { AppRoutingModule } from '../../app-routing.module';
import { ListAdministradorComponent } from './components/list-administrador/list-administrador.component';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from '../../commons/sidenav/sidenav.component';
import { ListTableComponent } from '../../shared/components/Reusables/list-table/list-table.component';
import { UploadExcelComponent } from '../../shared/components/Reusables/UploadExcel/upload-excel.component';
import { IconDirective } from '@visurel/iconify-angular';
import { AdminDialogComponent } from './components/Dialog/admin-dialog/admin-dialog.component';
import { SearchBoxComponent } from '../../shared/components/Search-box/search-box/search-box.component';
import { ResetfiltersComponent } from '../../shared/components/Reusables/Resetfilters/resetfilters/resetfilters.component';
import { ToastrModule } from 'ngx-toastr';





@NgModule({
  declarations: [
    ListAdministradorComponent,
    AdminDialogComponent
  ],
  exports:[],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
   ListTableComponent,
   UploadExcelComponent,
  SearchBoxComponent,
  ResetfiltersComponent,
  ToastrModule,
   
  ]
})
export class ListAdministradorModule { }
