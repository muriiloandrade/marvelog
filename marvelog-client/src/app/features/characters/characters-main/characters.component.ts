import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { Result, SearchCharactersParamsDTO } from '@features/characters/models/searchCharacters.dto';
import { CharactersService } from '@features/characters/services/characters.service';
import { FavoriteCharacter } from '@features/characters/models/favoriteCharacter.dto';

@Component({
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  providers: [CharactersService],
})
export class CharactersComponent implements OnInit {
  searchFG: FormGroup;

  icons = IconNamesEnum;

  characters: Result[] = [];

  offset: number = 0;

  total: number = 0;

  constructor(
    private fb: FormBuilder,
    private service: CharactersService,
  ) {
    this.searchFG = this.fb.group({
      offset: [0],
      limit: [20, [Validators.min(10), Validators.max(100)]],
      nameStartsWith: [''],
      orderBy: ['name', [Validators.pattern(/^(?:-)?name|(?:-)?modified$/)]],
    });
  }

  ngOnInit() {
    this.paginar(1);
  }

  searchCharacter(search: string) {
    this.searchFG.get('nameStartsWith')?.setValue(search);
    this.paginar(1);
  }

  paginar(page: number) {
    if (this.searchFG.valid) {
      Swal.showLoading();
      const searchParams = {
        limit: 8,
        nameStartsWith: this.searchFG.get('nameStartsWith')?.value,
        startPage: page,
        orderBy: this.searchFG.get('orderBy')?.value,
      } as SearchCharactersParamsDTO;

      this.service.search(searchParams).subscribe(
        (res) => {
          Swal.close();

          this.total = res.data.total;
          this.offset = page;
          this.characters = res.data.results;
        }, (err: HttpErrorResponse) => {
          Swal.close();
          Swal.fire('Algo deu errado!', err.error.message, 'error');
        },
      );
    }
  }

  favoritar(id: number) {
    const characterData = this.characters.find((cha) => cha.id === id);
    const param: FavoriteCharacter = {
      details: characterData?.description!!,
      lastModified: characterData?.modified!!,
      favorite: characterData?.favorite!!,
      marvelId: id,
      name: characterData?.name!!,
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
