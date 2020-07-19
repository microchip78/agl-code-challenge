import { Component, OnInit } from '@angular/core';
import { PeopleService, Pet } from '@app/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  pets$: Observable<Pet[]>;
  petType = 'cat';

  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService
  ) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.petType = this.route.snapshot.paramMap.get('petType');
    this.pets$ = this.peopleService.getPeople().pipe(
      map((people) => {
        return people
          .filter((p) => !!p.pets)
          .map((p) => {
            return p.pets.map((pet) => {
              pet.ownerGender = p.gender;
              return pet;
            });
          })
          .reduce((a, c) => c.concat(a), []);
      })
    );
  }
}
