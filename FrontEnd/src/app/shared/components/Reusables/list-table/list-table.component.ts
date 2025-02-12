import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import {MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { startWith, switchMap } from 'rxjs';
import { SesionResponse } from '../../../../pages/Servicios/Models/SesionesRespones';
import { BaseResponse } from '../../../models/BaseApiResponse';
import { TableColumns, TableFooter } from '../../../models/list-table-interface';
import { getEsPaginatorIntl } from '../../../paginator-intl/es-paginator-intl';
import { DefaultService } from '../../../services/default.service';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatSortModule, MatTooltipModule, MatIconModule,
    IconModule, MatPaginatorModule,FormsModule, SharedModule],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.scss',
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: getEsPaginatorIntl()

    }, {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appereance: "standard" } as MatFormFieldDefaultOptions,
    }
  ]

})
export class ListTableComponent <T> implements OnInit, AfterViewInit, OnChanges {

  @Input() service?: DefaultService;
  @Input() colums?: TableColumns<T>[];
  @Input() getInputs?: any;
  @Input() Numrecords?: number=5;
  @Input() IDenti?: number=0;
  @Input() sortBy?: string;
  @Input() sortDir: string = "asc";
  @Input() footer: TableFooter<T>[] = [];
@Output() totalFallidos: EventEmitter<number> = new EventEmitter<number>();

  @Output() rowClick  = new EventEmitter<{ action: string; row: T }>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  changesGetInputs = new EventEmitter<T>();
  dataSource = new MatTableDataSource<T>();
  visibleColumns: Array<keyof T | string> ;
  visibleFooter: Array<keyof T | string| object> ;
  paginatorOptions={
    pageSizeOptions:[this.Numrecords || 5,10, 20, 50],
    pageSize:this.Numrecords,
    pageLenght: 0,

  };

  //constructor(private _spinner: NgxSpinnerService, private _alert:AlertService) { }

  ngOnInit(): void {
    this.dataSource.paginator=this.paginator;
this.dataSource.sort= this.sort;
  }






  ngOnChanges(changes: SimpleChanges): void {
    if(changes['colums']){
      this.setVisibleColumns();
        }
      
        if(changes['getInputs'] &&this.paginator){
          this.paginator.pageIndex=0;
          this.changesGetInputs.emit();
            }
  }


  setVisibleColumns() {
    this.visibleColumns= this.colums
   .filter((columns: any)=> columns.visible)
   .map((columns:any)=>columns.property)
     }
   ngAfterViewInit(): void {
     this.getDataByService();
     this.sortChanges();
     this.paginatorChanges()
   }
     paginatorChanges() {
      this.paginator.page.subscribe(()=>{
       this.changesGetInputs.emit();
      });
   
   
     }
     sortChanges() {
       this.sort.sortChange.subscribe(()=>{
         this.paginator.pageIndex=0;
         this.changesGetInputs.emit();
       });
     }
     async getDataByService() {
      this.changesGetInputs
      .pipe(startWith("")
      ,switchMap(()=>{
      // this._spinner.show("modal-table")
       return this.service.GetAll(
         this.paginator.pageSize,
         this.sort.active,
         this.sort.direction,
         this.paginator.pageIndex,
         this.getInputs,
         this.IDenti
       
       );
      })

      ).subscribe((data:BaseResponse)=>{
        if (data.isSucces) {
          this.setData(data);
          this.emitTotalFallidos(data);
          console.log("Datos recibidos: ", data.data);
        } else {
          console.warn("Error al cargar los datos");
        }
      // this._spinner.hide("modal-table")
      });
       }
       
     setData(data: BaseResponse) {
       if(data.isSucces){
   
   if (data.isSucces) {
    this.dataSource.data = data.data;
    this.paginatorOptions.pageLenght = data.totalRecords || data.data.length; 
    this.setVisibleColumns();
  } else {
    console.error("Error al asignar datos");
  }
  
 
      }
     }
     private emitTotalFallidos(data: BaseResponse) {
      let totalFallidos = 0;
      (data.data || []).forEach((sesiones: SesionResponse) => {
        totalFallidos = sesiones.sesionFallidaTotales;
      });
      this.totalFallidos.emit(totalFallidos); 
    }
}
