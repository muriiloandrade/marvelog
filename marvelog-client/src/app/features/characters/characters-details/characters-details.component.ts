import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from '@features/characters/models/characterDetails.dto';
import { CharactersService } from '@features/characters/services/characters.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.scss'],
  providers: [CharactersService],
})
export class CharactersDetailsComponent {
  characterDetails$: Observable<Result>;

  regexForNumber: RegExp = /\d+$/;

  constructor(private service: CharactersService, private route: ActivatedRoute) {
    this.characterDetails$ = this.service.getDetails(Number(this.route.snapshot.paramMap.get('id')));
  }
}
