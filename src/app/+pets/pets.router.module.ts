import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetsComponent } from './pets.component';

const routes: Routes = [
  {
    path: ':petType',
    component: PetsComponent,
  },
  {
    path: '',
    redirectTo: 'cat',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {}
