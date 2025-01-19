import { Injectable } from '@angular/core';
//npm install @iconify/icons-ic
import icEdit from '@iconify/icons-ic/round-edit'
import icDelete from '@iconify/icons-ic/round-delete'
import icArrowDropDown from '@iconify/icons-ic/round-arrow-drop-down'
import icSearch from '@iconify/icons-ic/round-search'
import inClose from '@iconify/icons-ic/round-close'
import icDescription from '@iconify/icons-ic/round-description'
import icName from '@iconify/icons-ic/round-badge'
import icVisibility from '@iconify/icons-ic/twotone-visibility'

import icVisibilityoff from '@iconify/icons-ic/twotone-visibility-off'
import icMail from '@iconify/icons-ic/twotone-email'
import icViewHeadline from "@iconify/icons-ic/twotone-view-headline"
import icLabel from "@iconify/icons-ic/twotone-label"

import icProvider from "@iconify/icons-ic/twotone-group"

import icRefresh from "@iconify/icons-ic/twotone-refresh"
import icUpload from "@iconify/icons-ic/twotone-upload-file"

import icCancel from "@iconify/icons-ic/twotone-block"
import icAdd from "@iconify/icons-ic/twotone-add-shopping-cart"
import icMin from "@iconify/icons-ic/twotone-remove"
import icAdds from "@iconify/icons-ic/twotone-add"
import icClient from "@iconify/icons-ic/twotone-supervisor-account"

import icWarehouse from "@iconify/icons-ic/twotone-widgets"
import icSale from "@iconify/icons-ic/twotone-point-of-sale"
@Injectable({
    providedIn: 'root'
  })
  export class IconsService {
  
    getIcon(icon:string){
   console.log(icon)
      if(icon=="icClient"){
        return   icClient;
      }
      
      
      if(icon=="icSale"){
        return icSale;
      }
  if(icon=="icEdit"){
    return "bi bi-pen";
  }
  
  if(icon=="icDelete"){
    return icDelete;
  }
  if(icon=="icArrowDropDown"){
    return icArrowDropDown;
  }
  if(icon=="icSearch"){
    return icSearch;
  }
  if(icon=="inClose"){
    return inClose;
  }
  if(icon=="icName"){
    return icName;
  }
  if(icon=="icDescription"){
    return icDescription;
  }
  
  if(icon=="icVisibility"){
    return icVisibility;
  }
  
  if(icon=="icVisibilityoff"){
    return icVisibilityoff;
  }
  
  if(icon=="icMail"){
    return icMail;
  }
  
  if(icon=="icViewHeadLine"){
    return icViewHeadline;
  }
  
  if(icon=="icLabel"){
    return icLabel;
  }
  
  if(icon=="icProvider"){
    return icProvider;
  }
  if(icon=="icWarehouse"){
    return icWarehouse;
  }
  
  if(icon=="icRefresh"){
    return icRefresh;
  }

  
  if(icon=="icUpload"){
    return icUpload;
  }
  if(icon=="icCancel"){
    return icCancel;
  }
  if(icon=="icAdd"){
    return icAdd;
  }
  if(icon=="icAdds"){
    return icAdds;
  }
  if(icon=="icMin"){
    return icMin;
  }
  return null; 
    }
  
}