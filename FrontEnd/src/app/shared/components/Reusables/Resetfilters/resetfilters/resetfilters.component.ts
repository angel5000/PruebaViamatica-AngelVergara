import { Component, EventEmitter, Output } from '@angular/core';
import { IconsService } from '../../../../services/Icon.services';
import { SharedModule } from '../../../../shared.module';

@Component({
  selector: 'app-resetfilters',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './resetfilters.component.html',
  styleUrl: './resetfilters.component.scss'
})
export class ResetfiltersComponent {
  @Output() buttonClick = new EventEmitter<void>();
  icRefresh=IconsService.prototype.getIcon("icRefresh");
    constructor() { }
  
    emitClick(){
      return this.buttonClick.emit();
    }
}
