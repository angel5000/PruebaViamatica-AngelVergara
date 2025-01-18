import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';

import { SharedModule } from '../../shared/shared.module';
import { LayoutsComponent } from './layouts.component';
import { SidenavComponent } from '../sidenav/sidenav.component';


@NgModule({
  declarations: [LayoutsComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
    SharedModule,
    
  ],
  exports: [LayoutsComponent]
})
export class LayoutModule {
}
