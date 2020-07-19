import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PetListComponent } from './pet-list.component';
import { DebugElement } from '@angular/core';
import { Pet, PersonGenderType } from '../services';
import { SharedModule } from '@app/shared';

describe('PetListComponent', () => {
  let component: PetListComponent;
  let fixture: ComponentFixture<PetListComponent>;
  let expectedOwner: PersonGenderType;
  let debugEle: DebugElement;
  let element: HTMLElement;

  const testPets: Pet[] = [
    {
      name: 'Garfield',
      type: 'Cat',
      ownerGender: 'Male',
    },
    {
      name: 'Fido',
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
      name: 'Sam',
      type: 'Dog',
      ownerGender: 'Male',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PetListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetListComponent);
    component = fixture.componentInstance;
    debugEle = fixture.debugElement;
    element = debugEle.nativeElement;
    component.pets = testPets;
    component.pet = 'Cat';
    expectedOwner = 'Male';
    component.ownerGender = expectedOwner;

    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should have Male as title', () => {
    const titleEl = fixture.debugElement.query(By.css('.title'));
    expect(titleEl.nativeElement.textContent).toEqual(expectedOwner);
  });

  // tslint:disable-next-line: quotemark
  it("should return old title 'Male' before firing change detection", () => {
    const titleEl = fixture.debugElement.query(By.css('.title'));
    const oldOwnerTitle = titleEl.nativeElement.textContent;
    expectedOwner = 'Female';
    component.ownerGender = expectedOwner;
    expect(titleEl.nativeElement.textContent).toEqual(oldOwnerTitle);
  });

  // tslint:disable-next-line: quotemark
  it("should updated title to 'Female' after firing change detection ", () => {
    const titleEl = fixture.debugElement.query(By.css('.title'));
    expectedOwner = 'Female';
    component.ownerGender = expectedOwner;
    fixture.detectChanges();
    expect(titleEl.nativeElement.textContent).toEqual(expectedOwner);
  });

  it('should have no pet element on list', () => {
    expectedOwner = 'Female';
    component.ownerGender = expectedOwner;
    const expectedPet = 'Dog';
    component.pet = expectedPet;
    fixture.detectChanges();
    const pets = fixture.debugElement.queryAll(By.css('li'));
    expect(pets.length).toEqual(0);
  });

  // tslint:disable-next-line: quotemark
  it("should Only one 'Male' owner has 'Cat' as pet and her name is 'Garfield'", () => {
    component.pets = testPets;
    fixture.detectChanges();
    const pets = fixture.debugElement.queryAll(By.css('li'));
    expect(pets.length).toEqual(1);
    expect(pets[0].nativeElement.textContent).toEqual('Garfield');
  });

  // tslint:disable-next-line: quotemark
  it("should 'Male' onwer has 'Dog' as pet and one of their name is 'Fido'", () => {
    component.pets = testPets;
    component.pet = 'Dog';
    fixture.detectChanges();
    const pets = fixture.debugElement.queryAll(By.css('li'));
    expect(
      pets.map((p) => p.nativeElement.textContent).includes('Fido')
    ).toBeTruthy();
  });
});
