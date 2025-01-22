import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../pages/Auth/Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Verifica si el usuario está autenticado
    const user = this.authService.getUserId();
    const role = this.authService.getUserRole();
    console.log(this.authService.getUserId(), role)
   /* if (route.url[0].path === 'bienvenido' && role ===null&& user === null) {
      this.router.navigate(['/login']);
      return false; // Usuario con rol 2 puede acceder a 'bienvenido'
    }
    if (route.url[0].path === 'bienvenido' && role !==null&& user !== null) {
      this.router.navigate(['/bienvenido']);
      return true; // Usuario con rol 2 puede acceder a 'bienvenido'
    }*/
    
    /*
    if (route.url[0].path === 'bienvenido' && role === 2) {
        return true; // Usuario con rol 2 puede acceder a 'bienvenido'
      }
      
      // Redirige al NotFound si el rol no es 2 y trata de acceder a 'bienvenido'
      if (route.url[0].path === 'bienvenido' && role !== 2) {
        this.router.navigate(['/notfound']);
        return false;
      }
      */
      // Acceso a 'administrador' solo permitido para el rol 1 (admin)
     
      // Si el usuario está autenticado, permite el acceso
      if (role !== null && user !== null) {
        if (route.url[0].path === 'administrador' && role === 1) {
          return true; // Administrador con rol 1 puede acceder a 'administrador'
        }
        if (route.url[0].path === 'dashboard' && role === 1) {
          return true; // Administrador con rol 1 puede acceder a 'administrador'
        }
        // Redirige al NotFound si el rol es 2 y trata de acceder a 'administrador'
        if (route.url[0].path === 'administrador' && role === 2) {
          this.router.navigate(['/notfound']);
          return false;
        }
        if (route.url[0].path === 'dashboard' && role === 2) {
          this.router.navigate(['/notfound']);
          return false;
        }
        if (route.url[0].path === 'bienvenido'&&role!==null) {
          this.router.navigate(['/bienvenido']);
          return true;
        }
       // return true;
      }else{
        if (route.url[0].path === 'bienvenido') {
          this.router.navigate(['/notfound']);
          return false;
        }
      }
      
      // Si no está autenticado, redirige al login
     this.router.navigate(['/login']);
      return false;
    }
}
