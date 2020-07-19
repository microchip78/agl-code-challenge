import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { Observable, throwError, of } from 'rxjs';
import { Person } from './models';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private readonly webApiUrl: string;

  private people: Person[];

  constructor(private httpClient: HttpClient) {
    this.webApiUrl = environment.apiUrl;
  }

  private loadData(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.webApiUrl).pipe(
      catchError((error) => {
        console.error(`error loading people data from ${this.webApiUrl}`);
        return throwError(error);
      }),
      map((people) => {
        this.people = people;
        return people;
      })
    );
  }

  getPeople(): Observable<Person[]> {
    if (!!this.people) {
      return of(this.people);
    } else {
      return this.loadData();
    }
  }
}
