import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsComponent } from './pets.component';
import { PetsRoutingModule } from './pets.router.module';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

@NgModule({
  imports: [CommonModule, PetsRoutingModule, CoreModule, SharedModule],
  declarations: [PetsComponent],
  bootstrap: [PetsComponent],
})
export class PetsModule {}
