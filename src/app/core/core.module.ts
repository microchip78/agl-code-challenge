import { NgModule } from '@angular/core';
import { PetListComponent } from './pet-list/pet-list.component';
import { SharedModule } from '@app/shared';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [PetListComponent],
  exports: [PetListComponent],
})
export class CoreModule {}
