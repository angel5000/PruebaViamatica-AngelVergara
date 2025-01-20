import { Icon } from '@visurel/iconify-angular';

//export type NavigationItem ;

/*
export interface NavigationDropdown {
  type: 'dropdown';
  label: string;
  icon?: Icon;
  children: Array<NavigationLink | NavigationDropdown>;
  badge?: {
    value: string;
    bgClass: string;
    textClass: string;
  };
}
*/

export interface Navigationitem {
  icons?: string;
    route: string; // Ruta asociada
   
    label: string; // Nombre que se mostrará
    requiredRole?: number[]|null;
  }
  