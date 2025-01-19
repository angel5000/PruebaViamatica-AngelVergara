import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './import-modules/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IconDirective, IconModule } from '@visurel/iconify-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SidenavComponent } from '../commons/sidenav/sidenav.component';
import { MatSortModule } from '@angular/material/sort';
import { UploadExcelComponent } from './components/Reusables/UploadExcel/upload-excel.component';
import { ListTableComponent } from './components/Reusables/list-table/list-table.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
    
  ],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    IconModule,
    MatInputModule,
   // ContainerModule,
    //ScrollbarModule,
    //FlexLayoutModule,
    //PageLayoutModule,
    //ListTableModule,
    //ListTableMenuModule,
  
    //ListTableSimpleModule,
    //SearchFilterModule,
    //DownloadCsvModule,
    //NgxSpinnerModule,

    MatFormFieldModule,
  
  ]
})
export class SharedModule { }
