import { TableColumns } from "../../../../../../shared/models/list-table-interface";
import { MenuItems } from "../../../../../../shared/models/menu-items.interfaces";
import { Dashboardresponse } from "../../Models/dashboardResponse";



const menuItems :MenuItems[]=

[
    {    type:"link",
    id:"all",
    
    label:"Todos"
},
{    type:"link",
    id:"Activo",
    value:1,

    
    label:"Activo",
    class:{
        icon: "text-green"
    }
},{    type:"link",
id:"Inactivo",
value:0,

label:"Inactivo",
class:{
    icon: "text-gray"
}
}
]
const tableColumns: TableColumns<Dashboardresponse>[]=[

    {
        label:"USUARIO",
        csslabel:["font-bold", "text-sm"],
        property: "userName",
        cssProperty:["font-semibold", "text-sm", "text-left"],
        type:"text",
       sticky:false,
       sort:true,
            visible:true,
            download:true
      
    },

    {
    label:"ESTADO DE SESION",
    csslabel:["font-bold", "text-sm"],
    property: "sesionActive",
    cssProperty:["font-semibold", "text-sm", "text-left"],
    type:"badge",
   sticky:true,
   sort:true,
        visible:true,
        download:true
  
},
{
    label:"ESTADO DEL USUARIO",
    csslabel:["font-bold", "text-sm"],
    property: "statusUsuario",
    cssProperty:["font-semibold", "text-sm", "text-left"],
    type:"badge3",
   sticky:false,
   sort:true,
        visible:true,
        download:true
  
},
{
    label:"INTENTOS FALLIDOS",
    csslabel:["font-bold", "text-sm"],
    property: "intentosFallidos",
    cssProperty:["font-semibold", "text-sm", "text-left"],
    type:"number",
   sticky:true,
   sort:true,
        visible:true,
        download:true
  
}
]
const filters={
    numFilter:3,
    textFilter:"",
    stateFilter: null,
    startDate: null,
    endDate: null,
    refresh:false
}

const resetFilters={
    numFilter:0,
    textFilter:"",
    stateFilter: null,
    startDate: null,
    endDate: null,
    refresh: false
};
const getInputs: string="";
export const ComponentSettings={
   
    tableColumns,
    initialSort: "Id",
    initialSortDir: "desc",
    getInputs,
    resetFilters,
    menuItems,
    filters,
    datesFilterArray:['Fecha de creación'],
    filters_dates_active:false,
    filename: "listado de almacenes"
  //  columnsFilter:tableColumns.map((column)=>{return {label: column.label, property: column.property, type: column.type}})
    
    }
    