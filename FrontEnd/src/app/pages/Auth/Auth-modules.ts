import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './Auth-routing.module';

import { SharedModule } from '../../shared/shared.module'; 
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    LoginComponent
  ],
  exports:[],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
   
  ]
})
export class AuthModule { }
