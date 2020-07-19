import { PersonGenderType } from './people.model';

export type PetType = 'Cat' | 'Dog' | 'Fish';

export interface Pet {
  name: string;
  type: PetType;
  ownerGender?: PersonGenderType;
}
