import { Component, Inject, LOCALE_ID, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';


import icDashboard from '@iconify/icons-ic/twotone-dashboard';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import icCategory from "@iconify/icons-ic/twotone-article";
import { IconsService } from './shared/services/Icon.services';
import icWarehouse from "@iconify/icons-ic/twotone-widgets";
import { FormControl } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Navigationitem } from './commons/sidenav/itemsidenav/navigations';
import { AuthService } from './pages/Auth/Services/auth.service';
import { UsuarioResponse } from './pages/Administrador/Models/UsuariosResponse';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
title=""
  showSidenav = true;
  NombreUsuario:any;
  mode = new FormControl('push' as MatDrawerMode);
  items: Navigationitem[] = [
    { icons:'bi bi-house fs-4',route: '/bienvenido', label: 'Principal' },
    { icons:'bi bi-speedometer',route: '/dashboard', label: 'Dashboard',requiredRole: [1] },
    { icons:'bi bi-people',route: '/administrador', label: 'Manejo de usuarios',requiredRole: [1] },
    { icons:'bi bi-person',route: '/datos', label: 'Usuario',requiredRole: [2]},

  ];
  filteredItems: Navigationitem[] = [];
  constructor(private router: Router, private authService: AuthService) {

    
  }
  ngOnInit(): void {
    
    const hiddenRoutes = ['/login', '/recuperar', '/notfound'];

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Oculta el sidenav si la URL está en las rutas ocultas
        this.showSidenav = !hiddenRoutes.includes(this.router.url);
      }
    });


    const userRole = this.authService.getUserRole()?? 0; // Método que devuelve el rol del usuario
    if(this.NombreUsuario===''||this.NombreUsuario!==''){
      const userName = this.authService.getNombre()?? ''.replace(/"/g, ''); 
      this.NombreUsuario =userName;
    }
  
    // Filtrar los elementos según el rol
    this.filteredItems = this.items.filter(item => 
      item.requiredRole ? item.requiredRole.includes(userRole) : true
      
    );
  

   // console.log(this.NombreUsuario)
  }
  Cerrarsesion(): void {
    // Obtén las credenciales del almacenamiento local
    const userCredentials = localStorage.getItem('userCredentials');
//console.log(userCredentials)
    // Verifica que las credenciales existen antes de llamar a logout
    if (userCredentials) {
      this.authService.logout(userCredentials).subscribe({
        next: () => {
          // Redirige al usuario al login después de un logout exitoso
          localStorage.removeItem('userCredentials');
          localStorage.removeItem('NombreUsuario');
          localStorage.removeItem('datospersonales');
          this.NombreUsuario=''
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error al cerrar sesión:', err);
          // Manejo de errores opcional, como mostrar un mensaje al usuario
        },
      });
    } else {
      console.warn('No se encontraron credenciales de usuario en localStorage.');
      this.router.navigate(['/login']); // Redirige al login incluso si no hay credenciales
    }
  }    
 /* constructor(private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private route: ActivatedRoute,
    private navigationService: NavigationService) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.configService.updateConfig({
      sidenav: {
        title: "POS",
        imageUrl: "/assets/img/demo/logo.svg",
        showCollapsePin: true,
      },
    });

    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl'))),
    ).subscribe(isRtl => {
      this.document.body.dir = isRtl ? 'rtl' : 'ltr';
      this.configService.updateConfig({
        rtl: isRtl
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));


    this.navigationService.items = [
      {
        type: 'link',
        label: 'Estadísticas',
        route: 'estadisticas',
        icon: icDashboard
      },{
        type: 'link',
        label: 'Almacenes',
        route: 'almacenes',
        icon: icWarehouse
      },{
        type: 'dropdown',
        label: 'Catalogo',
        icon: icCategory,
        children:[{
          type: 'link',
          label: 'Categorias',
          route: 'categorias',
        
        },{
          type: 'link',
          label: 'Productos',
          route: 'productos',
        
        }]
      },{
        type: 'link',
        label: 'Proveedores',
        route: 'proveedores',
        icon: IconsService.prototype.getIcon("icProvider")
      },
      {
        type: 'link',
        label: 'Clientes',
        route: 'client',
        icon: IconsService.prototype.getIcon("icClient")
      },
      {
        type: 'dropdown',
        label: 'Procesos',
        icon: icCategory,//icsales point of sale
        children:[{
          type: 'link',
          label: 'Proceso de compras',
          route: 'proceso-compras',
        
        },{
          type: 'link',
          label: 'Proceso de ventas',
          route: 'proceso-ventas',
        
        }]
      }
    ];
  }
*/
}