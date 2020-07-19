import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PetsComponent } from './pets.component';
import { PeopleService, Person, CoreModule, PetType } from '@app/core';
import { of, ReplaySubject } from 'rxjs';
import { PetsRoutingModule } from './pets.router.module';
import { SharedModule } from '@app/shared';
import {
  ActivatedRoute,
  ParamMap,
  ActivatedRouteSnapshot,
  Params,
  convertToParamMap,
} from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

class ActivatedRouteStub implements Partial<ActivatedRoute> {
  // tslint:disable-next-line: variable-name
  private _paramMap: ParamMap;
  private subject = new ReplaySubject<ParamMap>();

  paramMap = this.subject.asObservable();

  get snapshot(): ActivatedRouteSnapshot {
    const snapshot: Partial<ActivatedRouteSnapshot> = {
      paramMap: this._paramMap,
    };

    return snapshot as ActivatedRouteSnapshot;
  }

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  setParamMap(params?: Params): void {
    console.log('params : ', params);
    const paramMap = convertToParamMap(params);
    this._paramMap = paramMap;
    this.subject.next(paramMap);
  }
}

describe('Pets Component (shallow)', () => {
  const testPeople: Person[] = [
    {
      name: 'Bob',
      gender: 'Male',
      age: 23,
      pets: [
        { name: 'Garfield', type: 'Cat' },
        { name: 'Fido', type: 'Dog' },
      ],
    },
    {
      name: 'Jennifer',
      gender: 'Female',
      age: 18,
      pets: [{ name: 'Garfield', type: 'Cat' }],
    },
    { name: 'Steve', gender: 'Male', age: 45, pets: null },
  ];

  let peopleService: PeopleService;
  let component: PetsComponent;
  let fixture: ComponentFixture<PetsComponent>;
  let routeStub: ActivatedRouteStub;

  function nagivateToPetOwners(petType: PetType): void {
    routeStub.setParamMap({ petType });
  }

  beforeEach(async () => {
    routeStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [PetsComponent],
      imports: [
        HttpClientTestingModule,
        CoreModule,
        PetsRoutingModule,
        SharedModule,
      ],
      providers: [{ provide: ActivatedRoute, useValue: routeStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    peopleService = TestBed.inject(PeopleService);
    spyOn(peopleService, 'getPeople').and.returnValue(of(testPeople));

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsComponent);
    component = fixture.componentInstance;
  });

  it('should create instance of PetComponent', () => {
    nagivateToPetOwners('Cat');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Pet components should render two PetList Component', async(() => {
    nagivateToPetOwners('Cat');
    fixture.detectChanges();

    const appLists = fixture.debugElement.queryAll(By.css('app-pet-list'));
    expect(appLists.length).toEqual(2);
  }));

  it('Pet components should render two PetList Component even Only Male owner has dog', async(() => {
    nagivateToPetOwners('Dog');
    fixture.detectChanges();

    const appLists = fixture.debugElement.queryAll(By.css('app-pet-list'));
    expect(appLists.length).not.toEqual(1);
  }));
});
