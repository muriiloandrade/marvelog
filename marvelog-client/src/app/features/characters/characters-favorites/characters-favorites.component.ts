/* eslint-disable no-param-reassign */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FavoriteCharacter, FavoriteCharacters } from '@features/characters/models/favoriteCharacter.dto';
import { CharactersService } from '@features/characters/services/characters.service';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './characters-favorites.component.html',
  styleUrls: ['./characters-favorites.component.scss'],
  providers: [CharactersService],
})
export class CharactersFavoritesComponent implements OnInit {
  favorites: FavoriteCharacters[] = [];

  icons = IconNamesEnum;

  searchTerm: any;

  page = 1;

  totalItems: number = 0;

  itemsPerPage: number = 8;

  constructor(private service: CharactersService) { }

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
    const characterData = this.favorites.find((cha) => cha.character.cod_marvelid_cha === id);
    const param: FavoriteCharacter = {
      details: characterData?.character.str_details_cha!!,
      lastModified: characterData?.character.dat_lastmodified_cha!!,
      favorite: characterData?.favorite!!,
      marvelId: id,
      name: characterData?.character.str_name_cha!!,
      thumbnail: `${characterData?.character.str_thumbnail_cha}`,
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
