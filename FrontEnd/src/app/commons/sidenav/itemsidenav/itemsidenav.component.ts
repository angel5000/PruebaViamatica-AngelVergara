import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../pages/Auth/Services/auth.service';
import { Navigationitem, NavigationItem } from './navigations';

@Component({
  selector: 'app-itemsidenav',
  templateUrl: './itemsidenav.component.html',
  styleUrl: './itemsidenav.component.scss'
})
export class ItemsidenavComponent {
  @Input() item: Navigationitem | undefined; // Elemento de navegación con propiedades de ruta y etiqueta
  @Input() level: number | undefined; // Nivel jerárquico del elemento en el sidenav
  @Input() rol: number | undefined;
  constructor(private router: Router, private authService: AuthService) {}
 
  
  @HostBinding('class')
  get levelClass() {
    return `item-level-${this.level}`;
  }
  filteredItems: Navigationitem[] = [];
  ngOnInit(): void {

   
  }
  
  isRoleAllowed(item: Navigationitem): boolean {
    const userRole = this.authService.getUserRole() ?? 0;  // O un valor por defecto adecuado
    return item.requiredRole ? item.requiredRole.includes(userRole) : true;
  }
  
  // Método opcional para redirigir si es necesario
  navigate() {
    if (this.item?.route) {
      this.router.navigate([this.item.route]);
    }
  }
}
