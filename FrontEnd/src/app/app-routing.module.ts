import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './commons/layouts/layouts.component';
import { SidenavComponent } from './commons/sidenav/sidenav.component';
import { ListAdministradorComponent } from './pages/Administrador/components/list-administrador/list-administrador.component';
import { LoginComponent } from './pages/Auth/components/login/login.component';
import { BienvenidaComponent } from './pages/General/Principal/components/bienvenida/bienvenida.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './shared/components/guardas/Authguards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'administrador', // Redirige al login
    pathMatch: 'full', // Coincide exactamente con la raíz
   
  },
    
    {
    
      path: 'administrador',
      component: ListAdministradorComponent,
      loadChildren: () => import('./pages/Administrador/Admin-modules').then((m) => m.ListAdministradorModule)
      ,canActivate: [AuthGuard]
    },
    {
    
      path: 'bienvenido',
      component: BienvenidaComponent,
      loadChildren: () => import('./pages/General/Principal/components/bienvenida-modules').then((m) => m.BienvenidaModule)
    },
    {
    
      path: 'login',
      component: LoginComponent,
      loadChildren: () => import('./pages/Auth/Auth-modules').then((m) => m.AuthModule)
    },
   
    { path: '**', component: NotFoundComponent },
   
     
];

/*

const routes: Routes = [
  {
    path: '',
    
    component: SidenavComponent, // Este será el layout principal
    children: [
      {
        path: 'administrador',
        loadChildren: () =>
          import('./pages/Administrador/Admin-modules').then((m) => m.ListAdministradorModule), // Modulo de administrador
      },
      // Otras rutas internas dentro del sidenav
    ],
  },
{
  path: 'login',
  component: LoginComponent,
  loadChildren: () => import('./pages/Auth/Auth-modules').then((m) => m.AuthModule)
},
  {
    path: '**',
    component: NotFoundComponent, // Página 404
  },
];
*/













@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
  
  export class AppRoutingModule {
  }