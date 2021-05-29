import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from '@features/comics/models/detailsComic.dto';
import { ComicsService } from '@features/comics/services/comics.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './comics-details.component.html',
  styleUrls: ['./comics-details.component.scss'],
  providers: [ComicsService],
})
export class ComicsDetailsComponent {
  comicDetails$: Observable<Result>;

  regexForNumber: RegExp = /\d+$/;

  constructor(private service: ComicsService, private route: ActivatedRoute) {
    this.comicDetails$ = this.service.getDetails(Number(this.route.snapshot.paramMap.get('id')));
  }
}
