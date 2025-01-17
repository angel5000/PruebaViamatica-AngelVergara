import { Icon } from "@visurel/iconify-angular"; //npm install @iconify/iconify

export interface MenuItems{
    type: 'link';
    id?: 'all' | 'Activo' | 'Inactivo';
    icon?: Icon;
    label: string;
    value?: number;
    class?: {
        icon?: string;
    };
    size?: string;

}