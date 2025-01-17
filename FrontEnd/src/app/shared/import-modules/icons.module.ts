import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';





@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], exports: [
    IconModule,
    MatIconModule
  ]
})
export class IconsModule { }
