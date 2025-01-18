import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from '../../commons/sidenav/sidenav.component';

export const routes: Routes = [
  {path:'',
component: SidenavComponent
,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class SidenavRoutingModule { }
