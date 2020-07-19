import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PersonGenderType, PetType, Pet } from '@app/core';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetListComponent {
  @Input() pets: Pet[];
  @Input() ownerGender: PersonGenderType;
  @Input() pet: PetType;

  constructor() {}
}
