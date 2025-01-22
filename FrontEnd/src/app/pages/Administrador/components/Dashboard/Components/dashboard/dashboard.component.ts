import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../Auth/Services/auth.service';
import { DashboardService } from '../../Services/dashboard.service';
import { ComponentSettings } from './list.config'; 
import { ComponentSettings2 } from './list2.config'; 
import { SesionEstado } from '../../../../../../../static-data/configs';  
import { DashboardCount } from '../../Models/dashboardResponse';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  totalUsuarios: number
  totalSesionActiva: number
  totalBloqueados: number
  component:any;
  component2:any;
  identifi?:any
filtrsesion:any;
dashboardCount: DashboardCount | null = null;
  constructor(public DashboarServices:DashboardService, private authService: AuthService
    ){
   
   }
   


  ngOnInit(): void {
    this.component=ComponentSettings
    this.component2=ComponentSettings2
    this.filtrsesion=SesionEstado
    const userRole = this.authService.getUserRole();
      const userId = this.authService.getUserId();
     this.identifi=userId;
     //this.component.getInputs=1;
      console.log('Rol del usuario:', userRole);
      console.log('ID del usuario:', userId);
      console.log("input",this.component.getInputs)
     this.component.filters.textFilter="A"
     this.setGetInputsProviders(true)
     this.getDataByService() 
  }

 

  formatGetInputs() {
    let str = "";
  
    if (this.component.filters.numFilter !== "") {
      str += `&NumFilter=${this.component.filters.numFilter}&textFilterSesion=${this.component.filters.textFilter}`;
    }
 
    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }
  
    // Verificar si las fechas están definidas y no son vacías antes de concatenarlas
    if (
      this.component.filters.startDate &&
      this.component.filters.startDate.trim() !== "" &&
      this.component.filters.endDate &&
      this.component.filters.endDate.trim() !== ""
    ) {
      str += `&startDate=${this.component.filters.startDate}`;
      str += `&endDate=${this.component.filters.endDate}`;
    }
  
    if (this.component.filters.refresh) {
      const random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }
  
    this.component.getInputs = str;
    console.log("getInputs:", this.component.getInputs);
  }

  setGetInputsProviders(refresh:boolean){
    this.component.filters.refresh=refresh;
    this.component2.filters.refresh=refresh;
    this.formatGetInputs()
    this.formatGetInputs2()
  }
  formatGetInputs2() {
    let str = "";
  
   
    if (this.component2.filters.numFilter !== "") {
      str += `&NumFilter=${this.component2.filters.numFilter}`;
    }
    if (this.component2.filters.stateFilter != null) {
      str += `&stateFilter=${this.component2.filters.stateFilter}`;
    }
  
    // Verificar si las fechas están definidas y no son vacías antes de concatenarlas
    if (
      this.component.filters.startDate &&
      this.component.filters.startDate.trim() !== "" &&
      this.component.filters.endDate &&
      this.component.filters.endDate.trim() !== ""
    ) {
      str += `&startDate=${this.component.filters.startDate}`;
      str += `&endDate=${this.component.filters.endDate}`;
    }
  
    if (this.component2.filters.refresh) {
      const random = Math.random();
      str += `&refresh=${random}`;
      this.component2.filters.refresh = false;
    }
  
    this.component2.getInputs = str;
    console.log("getInputs2:", this.component2.getInputs);
  }

  onFilterChange() {
    this. setGetInputsProviders(true);
  }

  async getDataByService() {
    this.DashboarServices.GetCount().subscribe(
      (result) => {
        this.totalUsuarios=result.totalUsuarios
        this.totalBloqueados=result.totalBloqueados
        this.totalSesionActiva=result.totalSesionActiva
        console.log("valor:",result.totalUsuarios, result)
      },
      (error) => {   }
    );
     }

}
