import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
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
  @Input() getInputs: any;
  @Input() Numrecords?: number=10;
  @Input() sortBy?: string;
  @Input() sortDir: string = "asc";
  @Input() footer: TableFooter<T>[] = [];

  @Output() rowClick = new EventEmitter<T>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  changesGetInputs = new EventEmitter<T>();
  dataSource = new MatTableDataSource<T>();
  visibleColumns?: Array<keyof T | string>
  visibleFooter?: Array<keyof T | string| object>
  paginatorOptions={
    pageSizeOptions:[this.Numrecords,20,50],
    pageSize:this.Numrecords,
    pageLenght: 0,

  };


  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
