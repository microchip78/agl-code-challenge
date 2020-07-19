import { PetsByOwnerGenderPipe } from './pets-by-owner-gender.pipe';
import { Pet } from '@app/core';

describe('PetsByOwnerGenderPipe', () => {
  const testPets: Pet[] = [
    {
      name: 'Garfield',
      type: 'Cat',
      ownerGender: 'Male',
    },
    {
      name: 'Sam',
      type: 'Dog',
      ownerGender: 'Male',
    },
    {
      name: 'Tom',
      type: 'Cat',
      ownerGender: 'Female',
    },
    {
      name: 'Max',
      type: 'Cat',
      ownerGender: 'Female',
    },
    {
      name: 'Fido',
      type: 'Dog',
      ownerGender: 'Male',
    },
  ];

  it('create an instance', () => {
    const pipe = new PetsByOwnerGenderPipe();
    expect(pipe).toBeTruthy();
  });

  // tslint:disable-next-line: quotemark
  it("Should return only one pet named 'Garfield' when filter by 'Male' onwer and 'Cat' as Pet type", () => {
    const pipe = new PetsByOwnerGenderPipe();
    const filtered = pipe.transform(testPets, 'Male', 'Cat');
    expect(filtered.length).toEqual(1);
    expect(filtered[0].name).toBe('Garfield');
  });

  // tslint:disable-next-line: quotemark
  it("Should return only 2 pets when filter by 'Male' onwer and 'Dog' as Pet type and first one should be 'Fido'", () => {
    const pipe = new PetsByOwnerGenderPipe();
    const filtered = pipe.transform(testPets, 'Male', 'Dog');
    expect(filtered.length).toEqual(2);
    expect(filtered[0].name).toBe('Fido');
  });

  // tslint:disable-next-line: quotemark
  it("Should return only no pets when filter by 'Female' onwer and 'Dog' as Pet type", () => {
    const pipe = new PetsByOwnerGenderPipe();
    const filtered = pipe.transform(testPets, 'Female', 'Dog');
    expect(filtered.length).toEqual(0);
  });

  // tslint:disable-next-line: quotemark
  it("Should return only 2 pets when filter by 'Female' onwer and 'Cat' as Pet type and second one should be 'Tom'", () => {
    const pipe = new PetsByOwnerGenderPipe();
    const filtered = pipe.transform(testPets, 'Female', 'Cat');
    expect(filtered.length).toEqual(2);
    expect(filtered[1].name).toBe('Tom');
  });
});
