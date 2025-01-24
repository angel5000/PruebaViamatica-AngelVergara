import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthGuard } from '../../shared/components/guardas/Authguards';
import { AuthService } from '../Auth/Services/auth.service';

@Component({
  selector: 'vex-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  regresar() {
    const userId = this.authService.getUserId();
    const userRole = this.authService.getUserRole();
    if (userId && userRole) {
    
      if (userRole === 1) {
        this.router.navigate(['/dashboard']); 
      } else if (userRole === 2) {
        this.router.navigate(['/bienvenido']); 
      }
    } else {
      
      this.router.navigate(['/login']);
    }
  }

}
