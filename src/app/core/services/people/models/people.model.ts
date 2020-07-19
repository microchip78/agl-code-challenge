import { Pet } from './pet.model';

export type PersonGenderType = 'Male' | 'Female';

export interface Person {
  name: string;
  gender: PersonGenderType;
  age: number;
  pets: Pet[];
}
