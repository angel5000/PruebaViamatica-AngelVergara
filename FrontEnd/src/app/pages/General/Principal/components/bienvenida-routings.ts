import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';


export const routes: Routes = [
  {path:'bienvenido',
component: BienvenidaComponent

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class BienvenidaRoutingModule { }
