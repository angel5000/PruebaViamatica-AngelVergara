import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './import-modules/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@visurel/iconify-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



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
    MatFormFieldModule
   
  ]
})
export class SharedModule { }
