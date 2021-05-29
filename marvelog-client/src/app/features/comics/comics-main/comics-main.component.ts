import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavoriteComic } from '@features/comics/models/favoriteComic.dto';
import { Result, SearchComicsParamsDTO } from '@features/comics/models/searchComics.dto';
import { ComicsService } from '@features/comics/services/comics.service';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './comics-main.component.html',
  styleUrls: ['./comics-main.component.scss'],
  providers: [ComicsService],
  encapsulation: ViewEncapsulation.None,
})
export class ComicsMainComponent implements OnInit {
  searchFG: FormGroup;

  icons = IconNamesEnum;

  comics: Result[] = [];

  offset: number = 0;

  total: number = 0;

  itemsPerPage: number = 8;

  constructor(
    private fb: FormBuilder,
    private service: ComicsService,
  ) {
    this.searchFG = this.fb.group({
      offset: [0],
      limit: [this.itemsPerPage, [Validators.min(1), Validators.max(100)]],
      titleStartsWith: [''],
      orderBy: ['title', [Validators.pattern(/^(?:-)?title|(?:-)?issueNumber|(?:-)?modified$/)]],
    });
  }

  ngOnInit() {
    this.paginar(1);
  }

  searchComics(search: string) {
    this.searchFG.get('titleStartsWith')?.setValue(search);
    this.paginar(1);
  }

  paginar(page: number) {
    if (this.searchFG.valid) {
      Swal.showLoading();
      const searchParams = {
        limit: this.itemsPerPage,
        titleStartsWith: this.searchFG.get('titleStartsWith')?.value,
        startPage: page,
        orderBy: this.searchFG.get('orderBy')?.value,
      } as SearchComicsParamsDTO;

      this.service.search(searchParams).subscribe(
        (res) => {
          Swal.close();

          this.total = res.data.total;
          this.offset = page;
          this.comics = res.data.results;
        }, (err: HttpErrorResponse) => {
          Swal.close();
          Swal.fire('Algo deu errado!', err.error.message, 'error');
        },
      );
    }
  }

  favoritar(id: number) {
    const characterData = this.comics.find((cha) => cha.id === id);
    const param: FavoriteComic = {
      details: characterData?.description!!,
      issueNumber: characterData?.issueNumber!!,
      lastModified: characterData?.modified!!,
      favorite: characterData?.favorite!!,
      marvelId: id,
      title: characterData?.title!!,
      thumbnail: `${characterData?.thumbnail.path}.${characterData?.thumbnail.extension}`,
    };

    Swal.showLoading();
    this.service.favorite(param).subscribe(
      () => {
        Swal.close();
        characterData!!.favorite = !characterData!!.favorite;
      }, (err: HttpErrorResponse) => {
        Swal.close();
        Swal.fire('Algo deu errado!', err.error.message, 'error');
      },
    );
  }
}
