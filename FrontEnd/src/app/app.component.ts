import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';


import icDashboard from '@iconify/icons-ic/twotone-dashboard';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import icCategory from "@iconify/icons-ic/twotone-article";
import { IconsService } from './shared/services/Icon.services';
import icWarehouse from "@iconify/icons-ic/twotone-widgets";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Fundacion';

  constructor() {

    
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