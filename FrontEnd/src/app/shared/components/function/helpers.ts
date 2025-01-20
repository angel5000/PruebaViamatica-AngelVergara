import { formatDate } from '@angular/common';
import { IconsService } from '../../services/Icon.services'; 
import { COLORS_BADGE } from './variables';
import { IconifyIcon } from '@iconify/iconify'; 

export function convertDateToRequest(date, format: 'date' | 'datetime' | 'periodo') {
    switch (format) {
        case "date":
            return date == null ? null : formatDate(new Date(date), 'yyyy-MM-dd', 'en-ES');
        case "periodo":
            return date == null ? null : formatDate(new Date(date), 'yyyy-MM', 'en-US');
        case "datetime":
            return date == null ? null : formatDate(new Date(date), 'yyyy-MM-dd hh:mm:ss a', 'en-US');

    }
}

export function toBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}
export function getIcon(iconName: string, tooltip: string | null, permision: boolean, action?: string | null){
    // Your function body here

    let generarCss ="flex justify-center items-center p-1.5 w-fit rounded-full";
    let iconObj={
        tooltip: null,
        icon:null,
        css: null,
        action:null
    };
    if(permision){
 iconObj={
      tooltip, 
      icon:IconsService .prototype.getIcon(iconName),
      css: generarCss + COLORS_BADGE.main,
      action: action? action:null

};
if(["icEdit"].includes(iconName)){
    console.log("icono: ",iconName)
    iconObj.css=generarCss+COLORS_BADGE.main
}
if(["icDelete"].includes(iconName)){
    iconObj.css=generarCss+COLORS_BADGE.red
}
if(["icVisibility"].includes(iconName)){
    iconObj.css=generarCss+COLORS_BADGE.teal
}
if(["icCancel"].includes(iconName)){
    iconObj.css=generarCss+COLORS_BADGE.red
}
if(["icAdd"].includes(iconName)){
    iconObj.css=generarCss+COLORS_BADGE.main
}
    }
return iconObj;
}