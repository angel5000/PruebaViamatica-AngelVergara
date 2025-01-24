import { CdkNoDataRow } from '@angular/cdk/table';
import { Component, EventEmitter, Output } from '@angular/core';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { UploadExcelService } from '../../../services/UploadExcel-Services';

@Component({
  selector: 'app-upload-excel',
  standalone: true,
  imports: [],
  templateUrl: './upload-excel.component.html',
  styleUrl: './upload-excel.component.scss'
})
export class UploadExcelComponent {
  selectedFile: File;
  fileSelected: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();
  constructor(private fileUploadService: UploadExcelService, private toastr: ToastrService) {}
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      const allowedExtensions = ['xls', 'xlsx'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
      if (allowedExtensions.includes(fileExtension || '')) {
        this.selectedFile = file;
        this.fileSelected = true;
      } else {
        this.fileSelected = false;
        this.showError('Formato de archivo no permitido. Solo se aceptan .xls y .xlsx.');
      }
    } else {
      this.fileSelected = false;
    }
  }
  upload(fileInput: HTMLInputElement) {
  
    if (this.selectedFile) {
      this.fileUploadService.uploadExcel(this.selectedFile).subscribe(
        (response) => {
         if(response.isSucces){
          this.showSuccess(response.message)
          console.log(response.message)
          fileInput.value = ''; 
          this.selectedFile = null; 
          this.fileSelected = false; 
          return this.buttonClick.emit();
      
         }else{
          this.showError(response.message);
          console.log(response.message)
        
         }
         
          
        }
      
      );
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
  
}
showSuccess(mensaje:string) {
  this.toastr.success(mensaje, 'Éxito');
}
showError(mensaje:string) {
  this.toastr.error(mensaje, 'Error');
}
}
