import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment,{ Moment } from 'moment';
import { IconsService } from '../../../../services/Icon.services';
import { SharedModule } from '../../../../shared.module';
import { MY_DATE_FORMATS } from '../../../function/dateformats';

@Component({
  selector: 'app-filter-date',
  standalone: true,
  imports: [SharedModule, MomentDateModule],
  templateUrl: './filter-date.component.html',
  styleUrl: './filter-date.component.scss',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class FilterDateComponent implements OnInit , OnChanges {

  @Input() start: string;
  @Input() end: string;
  @Input() maxDate: Moment = moment();
  @Output() rangeDate = new EventEmitter<{}>();
 range = new FormGroup({
       startDate: new FormControl(),
       endDate: new FormControl(),
     });
icToday=IconsService.prototype.getIcon("icToday");
  constructor() { }
  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges):void{
    if(changes.start ||changes.end){
this.range.get('startDate').patchValue(this.start);

this.range.get('endDate').patchValue(this.end);
    }
  }
addEvent(event: MatDatepickerInputEvent<Date>){
if(event.value!=null){
this.emitDates();
}
}
emitDates() {
  const startDateControl = this.range.get('startDate').value;
  const endDateControl = this.range.get('endDate').value;

  const startDate = startDateControl 
    ? moment(startDateControl).format('YYYY-MM-DD') 
    : null;
  const endDate = endDateControl 
    ? moment(endDateControl).format('YYYY-MM-DD') 
    : null;

  const data = {
    startDate,
    endDate,
  };

  this.rangeDate.emit(data);
}

}

