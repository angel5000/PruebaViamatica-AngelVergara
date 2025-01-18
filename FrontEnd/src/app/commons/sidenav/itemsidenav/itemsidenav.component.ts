import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Navigationitem, NavigationItem } from './navigations';

@Component({
  selector: 'app-itemsidenav',
  templateUrl: './itemsidenav.component.html',
  styleUrl: './itemsidenav.component.scss'
})
export class ItemsidenavComponent {
  @Input() item: Navigationitem | undefined; // Elemento de navegación con propiedades de ruta y etiqueta
  @Input() level: number | undefined; // Nivel jerárquico del elemento en el sidenav

  constructor(private router: Router) {}
 
  
  @HostBinding('class')
  get levelClass() {
    return `item-level-${this.level}`;
  }

  ngOnInit(): void {

   
  }

  // Método opcional para redirigir si es necesario
  navigate() {
    if (this.item?.route) {
      this.router.navigate([this.item.route]);
    }
  }
}
