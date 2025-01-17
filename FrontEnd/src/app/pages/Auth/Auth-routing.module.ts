import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {path:'login',
component: LoginComponent

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class AuthRoutingModule { }
