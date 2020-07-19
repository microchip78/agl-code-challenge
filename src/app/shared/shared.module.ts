import { NgModule } from '@angular/core';
import { PetsByOwnerGenderPipe } from './pipes/pets-by-owner-gender.pipe';

@NgModule({
  declarations: [PetsByOwnerGenderPipe],
  exports: [PetsByOwnerGenderPipe],
})
export class SharedModule {}
