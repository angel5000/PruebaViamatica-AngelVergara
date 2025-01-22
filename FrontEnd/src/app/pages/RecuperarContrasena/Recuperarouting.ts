import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from '../../commons/sidenav/sidenav.component';
import { RecuperaContraModule } from './Recuperamodel';

export const routes: Routes = [
  {path:'recuperar',
component: RecuperaContraModule
,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class AdminRoutingModule { }
