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
        label:"IDUSUARIO",
        csslabel:["font-bold", "text-sm"],
        property: "idUsuario",
        cssProperty:["font-semibold", "text-sm", "text-left"],
        type:"number",
       sticky:false,
       sort:true,
            visible:true,
            download:true
      
    },


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
    label:"FECHA INGRESO",
    csslabel:["font-bold", "text-sm"],
    property: "fechaIngreso",
    cssProperty:["font-semibold", "text-sm", "text-left"],
    type:"text",
   sticky:false,
   sort:true,
        visible:true,
        download:true
  
},
{
    label:"SESION EXITOSA",
    csslabel:["font-bold", "text-sm"],
    property: "sesionExitosa",
    cssProperty:["font-semibold", "text-sm", "text-left"],
    type:"badge5",
   sticky:false,
   sort:true,
        visible:true,
        download:true
  
},
{
    label:"SESION FALLIDA",
    csslabel:["font-bold", "text-sm"],
    property: "sesionFallida",
    cssProperty:["font-semibold", "text-sm", "text-left"],
    type:"badge4",
   sticky:false,
   sort:true,
        visible:true,
        download:true
  
},


]

const filters={
    numFilter:2,
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
export const ComponentSettings2={
   
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
    