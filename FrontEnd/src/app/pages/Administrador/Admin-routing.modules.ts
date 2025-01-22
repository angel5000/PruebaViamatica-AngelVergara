import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from '../../commons/sidenav/sidenav.component';
import { ListAdministradorComponent } from './components/list-administrador/list-administrador.component';


export const routes: Routes = [
  {path:'administrador',
component: ListAdministradorComponent
,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class AdminRoutingModule { }
