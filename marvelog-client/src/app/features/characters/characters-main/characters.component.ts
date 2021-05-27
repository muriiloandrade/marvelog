import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { Result, SearchCharactersParamsDTO } from '@features/characters/models/searchCharacters.dto';
import { CharactersService } from '@features/characters/services/characters.service';

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
    this.buscar(1);
  }

  buscar(page: number) {
    if (this.searchFG.valid) {
      Swal.showLoading();
      const searchParams = {
        limit: 8,
        nameStartsWith: this.searchFG.get('nameStartsWith')?.value,
        startPage: page,
        orderBy: this.searchFG.get('orderBy')?.value,
      } as SearchCharactersParamsDTO;

      this.service.consultar(searchParams).subscribe(
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
}
