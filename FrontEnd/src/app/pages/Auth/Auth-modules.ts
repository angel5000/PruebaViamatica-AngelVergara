import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './Auth-routing.module';

import { SharedModule } from '../../shared/shared.module'; 
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    LoginComponent
  ],
  exports:[],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ToastrModule,
   
  ]
})
export class AuthModule { }
