import { Pipe, PipeTransform } from '@angular/core';
import { Person, PersonGenderType, PetType, Pet } from '@app/core';
import { groupBy } from 'lodash';

@Pipe({
  name: 'petsByOwnerGender',
})
export class PetsByOwnerGenderPipe implements PipeTransform {
  transform(
    pets: Pet[],
    ownerGender: PersonGenderType,
    petType: PetType
  ): Pet[] {
    if (pets) {
      return pets
        .filter(
          (p) =>
            p.type.toLowerCase() === petType.toLowerCase() &&
            p.ownerGender.toLowerCase() === ownerGender.toLowerCase()
        )
        .sort((a, b) => (a.name > b.name ? 1 : a.name === b.name ? 0 : -1));
    }
    return pets;
  }
}
