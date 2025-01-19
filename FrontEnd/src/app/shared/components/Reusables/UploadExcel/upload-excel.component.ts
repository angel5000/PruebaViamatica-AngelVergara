import { Component } from '@angular/core';
import { UploadExcelService } from '../../../services/UploadExcel-Services';

@Component({
  selector: 'app-upload-excel',
  standalone: true,
  imports: [],
  templateUrl: './upload-excel.component.html',
  styleUrl: './upload-excel.component.scss'
})
export class UploadExcelComponent {
  selectedFile: File | null = null;

  constructor(private fileUploadService: UploadExcelService) {}
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  upload() {
    if (this.selectedFile) {
      this.fileUploadService.uploadExcel(this.selectedFile).subscribe(
        (response) => {
          console.log('Archivo subido correctamente', response);
        },
        (error) => {
          console.error('Error al subir el archivo', error);
        }
      );
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
}

}
