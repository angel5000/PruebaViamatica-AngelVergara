import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { SidenavItemsModule } from './itemsidenav/sidenavitems-modules';
import { SharedModule } from '../../shared/shared.module';
import { ListAdministradorComponent } from '../../pages/Administrador/components/list-administrador/list-administrador.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';


@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
   
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
    SharedModule,
   RouterModule,
 
  ],
  exports: [SidenavComponent]
})
export class SidenavModule {
}
