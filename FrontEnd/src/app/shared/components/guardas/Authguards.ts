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
    if (route.url[0].path === 'bienvenido' && role === 1) {
        // Si el rol es admin, redirigir al NotFound
        this.router.navigate(['/notfound']);
        return false;
      }
      if (route.url[0].path === 'administrador' && role === 2) {
        // Si el rol es user, redirigir al NotFound
        this.router.navigate(['/notfound']);
        return false;
      }
     
      if (role !== null && user !== null) {
        return true;

      }
  
      // Si no está autenticado, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
}
