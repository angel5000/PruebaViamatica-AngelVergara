import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
//import { Authinterpcetor } from '@shared/interceptor/auth.interceptor';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { SidenavModule } from "./commons/sidenav/sidenav-modules";
import { SharedModule } from './shared/shared.module';
import { ItemsidenavComponent } from './commons/sidenav/itemsidenav/itemsidenav.component';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [AppComponent, NotFoundComponent, ItemsidenavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,

    SharedModule
],
  /*
  providers:[DatePipe,{provide: MAT_DATE_LOCALE, useValue:"es-ES"},
  {provide: HTTP_INTERCEPTORS, useClass: Authinterpcetor, multi: true}
  ],*/
  bootstrap: [AppComponent]
})
export class AppModule { }