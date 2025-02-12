import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ItemsidenavComponent } from './itemsidenav.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatRippleModule,
    IconModule,
    FlexLayoutModule,
  ],
  exports: []
})
export class SidenavItemsModule {
}
