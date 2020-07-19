import { TestBed, inject } from '@angular/core/testing';
import { PeopleService } from './people.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '@env';

describe('PeopleService', () => {
  let peopleService: PeopleService;
  let httpTestingController: HttpTestingController;
  let loadDataSpy: jasmine.Spy;
  let getPeopleSpy: jasmine.Spy;

  const mockData = [
    {
      name: 'Bob',
      gender: 'Male',
      age: 23,
      pets: [
        { name: 'Garfield', type: 'Cat' },
        { name: 'Fido', type: 'Dog' },
      ],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeopleService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    peopleService = TestBed.inject(PeopleService);
    loadDataSpy = spyOn<any>(peopleService, 'loadData').and.callThrough();
    getPeopleSpy = spyOn(peopleService, 'getPeople').and.callThrough();
  });

  it('should create an instance of PeopleService', inject(
    [PeopleService],
    (service: PeopleService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should called load json when calling it for first time', (done) => {
    inject([PeopleService], (service: PeopleService) => {
      service.getPeople().subscribe(() => {
        expect(getPeopleSpy).toHaveBeenCalled();
        expect(getPeopleSpy.calls.count()).toEqual(1);

        expect(loadDataSpy).toHaveBeenCalled();
        expect(loadDataSpy.calls.count()).toEqual(1);

        done();
      });

      httpTestingController
        .expectOne({ url: environment.apiUrl })
        .flush(mockData);
    })();
  });

  it('should not make a call to API if people data already exists', (done) => {
    inject([PeopleService], (service: PeopleService) => {
      service.getPeople().subscribe(() => {
        expect(getPeopleSpy).toHaveBeenCalled();
        expect(getPeopleSpy.calls.count()).toEqual(1);

        expect(loadDataSpy).toHaveBeenCalled();
        expect(loadDataSpy.calls.count()).toEqual(1);

        loadDataSpy.calls.reset();
        getPeopleSpy.calls.reset();

        service.getPeople().subscribe(() => {
          expect(getPeopleSpy).toHaveBeenCalled();
          expect(getPeopleSpy.calls.count()).toEqual(1);

          expect(loadDataSpy).not.toHaveBeenCalled();
          expect(loadDataSpy.calls.count()).toEqual(0);
        });

        done();
      });

      httpTestingController
        .expectOne({ url: environment.apiUrl })
        .flush(mockData);
    })();
  });
});
