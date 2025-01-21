import { TableColumns } from "../../../../../shared/models/list-table-interface";
import { SesionResponse } from "../../../../Servicios/Models/SesionesRespones";




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

const tableColumns: TableColumns<SesionResponse>[] = [
    {
      label: "FECHA INGRESO",
      csslabel: ["font-bold", "text-sm"],
      property: "fechaIngreso",
      cssProperty: ["font-semibold", "text-sm", "text-left"],
      type: "datetime",
      sticky: true,
      sort: true,
      sortProperty: "fechainicio", // SortProperty solo en esta columna
      visible: true,
      download: true,
    },
    {
      label: "FECHA CIERRE",
      csslabel: ["font-bold", "text-sm"],
      property: "fechaCierre",
      cssProperty: ["font-semibold", "text-sm", "text-left"],
      type: "datetime",
      sticky: true,
      sort: true,
      sortProperty: "fechafin", // SortProperty solo en esta columna
      visible: true,
      download: true,
    },
    {
      label: "SESION EXITOSA",
      property: "sesionExitosa",
      type: "number",
      csslabel: ["font-bold", "text-sm"],
      cssProperty: ["font-semibold", "text-sm", "text-left"],
      sticky: false,
      sort: true,
      visible: true,
      download: true,
    },
    {
      label: "SESION FALLIDA",
      property: "sesionFallida",
      type: "number",
      csslabel: ["font-bold", "text-sm"],
      cssProperty: ["font-semibold", "text-sm", "text-left"],
      sticky: false,
      sort: true,
      visible: true,
      download: true,
    },
    
   
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
    filters:filters,
    datesFilterArray:['Fecha de creación'],
    filters_dates_active:false,
    //searchOptions: searchOptions,
    filename: "listado de proveedores"
  //  columnsFilter:tableColumns.map((column)=>{return {label: column.label, property: column.property, type: column.type}})
    
    }