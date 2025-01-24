import { BaseResponse } from "../../../../shared/models/BaseApiResponse";
import { TableColumns } from "../../../../shared/models/list-table-interface";
import { MenuItems } from "../../../../shared/models/menu-items.interfaces";
import { SearchOptions } from "../../../../shared/models/SearchOptions.interface";
import { GenericValidators } from "../../../../shared/validators/generic-validators";
import { UsuarioResponse } from "../../Models/UsuariosResponse";



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
    
]

  function getTableColumns() {
    return [
      {
        label: "Nombres",
        csslabel: ["font-bold", "text-sm"],
        property: "nombres",
        cssProperty: ["font-semibold", "text-sm", "text-left"],
        type: "text",
        sticky: true,
        sort: true,
        sortProperty: "nombres", // SortProperty solo en esta columna
        visible: true,
        download: true,
      },
      {
        label: "UserName",
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
        label: "Estado de Sesion",
        property: "sesionActive",
        type: "badge",
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
        type: "badge2",
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
        type: "badge3",
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
    visible:Permisos.editar,
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
    visible:Permisos.eliminar ,
    download:false
    
    }
    ];
  }




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
const Permisos={
eliminar:false,
editar:false,
consultar:false
};
export class actualizarPermiso {
  PermisoEliminar(valor: boolean) {
    Permisos.eliminar = valor;
  
    // Actualizar las columnas dinámicamente
    ComponentSettings.tableColumns = getTableColumns();
  }
  PermisoEditar(valor: boolean) {
    Permisos.editar = valor;
  
    // Actualizar las columnas dinámicamente
    ComponentSettings.tableColumns = getTableColumns();
  }
}


const getInputs: string="";
export const ComponentSettings={
   Permisos,
    tableColumns:getTableColumns(),
    getInputs,
    resetFilters,
    filters:filters,
    filters_dates_active:false,
    searchOptions: searchOptions,
   
    }
  