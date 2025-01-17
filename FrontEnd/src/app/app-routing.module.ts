import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ListAdministradorComponent } from './pages/Administrador/components/list-administrador/list-administrador.component';
import { LoginComponent } from './pages/Auth/components/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'administrador', // Redirige al login
    pathMatch: 'full', // Coincide exactamente con la raíz
  },
    {
    
      path: 'login',
      component: LoginComponent,
      loadChildren: () => import('./pages/Auth/Auth-modules').then((m) => m.AuthModule)
    },
    {
    
      path: 'administrador',
      component: ListAdministradorComponent,
      loadChildren: () => import('./pages/Administrador/Admin-modules').then((m) => m.ListAdministradorModule)
    },
    { path: '**', component: NotFoundComponent }
    
     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
  
  export class AppRoutingModule {
  }