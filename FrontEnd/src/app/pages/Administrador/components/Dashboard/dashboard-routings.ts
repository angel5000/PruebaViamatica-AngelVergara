import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';


export const routes: Routes = [
  {path:'dashboard',
component: DashboardComponent
,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class DashboardRoutingModule { }
