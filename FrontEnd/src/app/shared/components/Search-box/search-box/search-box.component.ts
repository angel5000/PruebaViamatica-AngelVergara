import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { SearchOptions } from '../../../models/SearchOptions.interface';
import { IconsService } from '../../../services/Icon.services';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconModule,MatMenuModule, MatTooltipModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent implements OnInit {
  form: FormGroup;
  @Input() searchOptions =[];
  @Input() currentValue: string="";
  @Output() search= new EventEmitter<unknown>();
  
  labelSelection: SearchOptions={
    label:"",
    value: 0,
  placeholder: "",
  validation: "",
  validation_desc: "",
  icon: ""
  
  }
    constructor(private fb: FormBuilder, public iconsService: IconsService  ) { 
  this.form=this.fb.group({
  searchValue:[""],
  searchData: [""]
  
  })
  
  
    }
  
    ngOnInit(): void {
  this.changeSelection(this.searchOptions[0]);
  this.form.controls["searchData"].valueChanges.subscribe((e)=>{
  if(e.trim()==""){
  this.submit();
  
  }
  
  })
  
  
    }
    submit() {
    let data=this.form.getRawValue();
    this.search.emit(data);
  
    }
    reset(){
      this.form.controls["searchData"].setValue("");
      this.submit();
    }
    changeSelection(option: SearchOptions) {
     this.labelSelection=option
     this.form.controls["searchValue"].setValue(option.value);
     this.labelSelection.validation_desc=option.validation_desc?option.validation_desc:"";
     let min_lenght= option.min_lenght?option.min_lenght:1;
     this.setSearchStringValidation(option.validation, min_lenght);
   
  
    }
    setSearchStringValidation(validation: [], min_lenght: number) {
      let searchData= this.form.get("searchData");
  let setValidation=[];
  setValidation.push(Validators.required);
  
  setValidation.push(Validators.minLength(min_lenght));
  
  if(validation){
    validation.forEach((e)=>{
      setValidation.push(e);
    })
  }
  searchData.setValidators(setValidation);
    }
  
}
