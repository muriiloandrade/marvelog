/* eslint-disable no-param-reassign */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FavoriteComic, FavoriteComics } from '@features/comics/models/favoriteComic.dto';
import { ComicsService } from '@features/comics/services/comics.service';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './comics-favorites.component.html',
  styleUrls: ['./comics-favorites.component.scss'],
  providers: [ComicsService],
})
export class ComicsFavoritesComponent implements OnInit {
  favorites: FavoriteComics[] = [];

  icons = IconNamesEnum;

  searchTerm: any;

  page = 1;

  totalItems: number = 0;

  constructor(private service: ComicsService) { }

  ngOnInit(): void {
    Swal.showLoading();
    this.service.searchFavorites().subscribe(
      (res) => {
        Swal.close();
        res.forEach((fav) => { fav.favorite = true; });
        this.favorites = res;
      }, (err: HttpErrorResponse) => {
        Swal.close();
        Swal.fire('Algo deu errado!', err.error.message, 'error');
      },
    );
  }

  favoritar(id: number) {
    const comicData = this.favorites.find((cha) => cha.comic.cod_marvelid_com === id);
    const param: FavoriteComic = {
      details: comicData?.comic.str_details_com!!,
      issueNumber: comicData?.comic.num_issuenumber_com!!,
      lastModified: comicData?.comic.dat_lastmodified_com!!,
      favorite: comicData?.favorite!!,
      marvelId: id,
      title: comicData?.comic.str_title_com!!,
      thumbnail: `${comicData?.comic.str_thumbnail_com}`,
    };
    Swal.showLoading();
    this.service.favorite(param).subscribe(
      () => {
        Swal.close();
        comicData!!.favorite = !comicData!!.favorite;
      }, (err: HttpErrorResponse) => {
        Swal.close();
        Swal.fire('Algo deu errado!', err.error.message, 'error');
      },
    );
  }
}
