import { BaseResponse } from "../../../../shared/models/BaseApiResponse";
import { TableColumns } from "../../../../shared/models/list-table-interface";
import { MenuItems } from "../../../../shared/models/menu-items.interfaces";
import { UsuarioResponse } from "../../Models/UsuariosResponse";


/*
const searchOptions: SearchOptions[] =[
    {
        label:"Nombre",
        value:1,
        placeholder: "Buscar por Nombre",
        validation:[GenericValidators.defaultName],
        validation_desc:"Solo se permite letras en esta busqueda",
        min_lenght:2,
        icon:"icName"
    },
    {
        label:"Email",
        value:2,
        placeholder: "Buscar por Email",
        validation:[GenericValidators.emailValidation],
        validation_desc:"Solo se permite letras y numeros en esta busqueda",
        
        icon:"icMail"
    },
    {
        label:"Numero de Documento",
        value:3,
        placeholder: "Buscar por Numero documento",
        validation:[GenericValidators.document],
        validation_desc:"Solo se permite documentos validos",
      
        icon:"icDescription"
    }
]*/
const menuItems :MenuItems[]=

[
    {    type:"link",
    id:"all",
  //  icon: IconsService.prototype.getIcon("icViewHeadLine"),
    label:"Todos"
},
{    type:"link",
    id:"Activo",
    value:1,

 //   icon: IconsService.prototype.getIcon("icLabel"),
    label:"Activo",
    class:{
        icon: "text-green"
    }
},{    type:"link",
id:"Inactivo",
value:0,

//icon: IconsService.prototype.getIcon("icLabel"),
label:"Inactivo",
class:{
    icon: "text-gray"
}
}
]
const tableColumns: TableColumns<UsuarioResponse>[] = [
    {
      label: "NOMBRE",
      csslabel: ["font-bold", "text-sm"],
      property: "userName",
      cssProperty: ["font-semibold", "text-sm", "text-left"],
      type: "text",
      sticky: true,
      sort: true,
      sortProperty: "userName", // SortProperty solo en esta columna
      visible: true,
      download: true,
    },
    {
      label: "Email",
      property: "mail",
      type: "text",
      csslabel: ["font-bold", "text-sm"],
      cssProperty: ["font-semibold", "text-sm", "text-left"],
      sticky: false,
      sort: true,
      visible: true,
      download: true,
    },
    {
      label: "Apellidos",
      property: "apellidos",
      type: "text",
      csslabel: ["font-bold", "text-sm"],
      cssProperty: ["font-semibold", "text-sm", "text-left"],
      sticky: false,
      sort: true,
      visible: true,
      download: true,
    },
    {
      label: "Identificación",
      property: "identificacion",
      type: "text",
      csslabel: ["font-bold", "text-sm"],
      cssProperty: ["font-semibold", "text-sm", "text-left"],
      sticky: false,
      sort: true,
      visible: true,
      download: true,
    },
    {
      label: "Fecha de Nacimiento",
      property: "fechaNacimiento",
      type: "text",
      csslabel: ["font-bold", "text-sm"],
      cssProperty: ["font-semibold", "text-sm", "text-left"],
      sticky: false,
      sort: true,
      visible: true,
      download: true,
    },
    {
      label: "Estado del Usuario",
      property: "statusUsuario",
      type: "text",
      csslabel: ["font-bold", "text-sm"],
      cssProperty: ["font-semibold", "text-sm", "text-left"],
      sticky: false,
      sort: true,
      visible: true,
      download: true,
    },
    {
      label: "Estado de Persona",
      property: "statusPersona",
      type: "text",
      csslabel: ["font-bold", "text-sm"],
      cssProperty: ["font-semibold", "text-sm", "text-left"],
      sticky: false,
      sort: true,
      visible: true,
      download: true,
    },
    {
      label:"",
      csslabel:[],
      cssProperty:[""],
      cssSubProperty:["bi bi-pen fs-5"],
      property: "icEdit",
      type:"icon",
  action:"edit",
  sticky:false,
  sort:false,
  visible:true,
  download:false
  
  },
  {
      label:"",
      csslabel:[],
      cssProperty:['rounded'],
      property: "icDelete",
      cssSubProperty:["bi bi-trash3 fs-5"],
      type:"icon",
  action:"remove",
  sticky:false,
  sort:false,
  visible:true,
  download:false
  
  }
  ];
  

const filters={
    numFilter:"",
    textFilter:"",
    stateFilter: null,
    startDate: null,
    endDate: null,
    refresh:false
}

const resetFilters={
    numFilter:"",
    textFilter:"",
    stateFilter: null,
    startDate: null,
    endDate: null,
    refresh: false
};
const getInputs: string="";
export const ComponentSettings={
   // icProvider: IconsService.prototype.getIcon("icProvider"),
   
    tableColumns,
    initialSort: "idUsuario",
    initialSortDir: "desc",
    getInputs,
    resetFilters,
    menuItems,
    filters:filters,
    datesFilterArray:['Fecha de creación'],
    filters_dates_active:false,
    //searchOptions: searchOptions,
    filename: "listado de proveedores"
  //  columnsFilter:tableColumns.map((column)=>{return {label: column.label, property: column.property, type: column.type}})
    
    }