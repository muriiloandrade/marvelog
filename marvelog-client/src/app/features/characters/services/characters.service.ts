import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { CharacterDetails } from '@features/characters/models/characterDetails.dto';
import { FavoriteCharacter, FavoriteCharacters } from '@features/characters/models/favoriteCharacter.dto';
import { SearchCharacters, SearchCharactersParamsDTO } from '@features/characters/models/searchCharacters.dto';
import { map } from 'rxjs/operators';

@Injectable()
export class CharactersService {
  private baseURL = `${environment.baseUrl}/v1`;

  constructor(private http: HttpClient) {}

  search(parameters: SearchCharactersParamsDTO) {
    const start = (parameters.startPage - 1) * parameters.limit;

    const params = new HttpParams()
      .set('nameStartsWith', parameters.nameStartsWith!!)
      .set('orderBy', parameters.orderBy!!)
      .set('limit', parameters.limit)
      .set('offset', start);

    return this.http.get<SearchCharacters>(`${this.baseURL}/marvel/characters`, { params });
  }

  favorite(data: FavoriteCharacter) {
    if (data.favorite) {
      return this.http.delete(`${this.baseURL}/character/favorite/${data.marvelId}`);
    }

    return this.http.post(`${this.baseURL}/character/favorite`, data);
  }

  searchFavorites() {
    return this.http.get<FavoriteCharacters[]>(`${this.baseURL}/character/favorites`);
  }

  getDetails(marvelId: number) {
    return this.http.get<CharacterDetails>(`${this.baseURL}/marvel/character/${marvelId}`).pipe(
      map((res) => res.results[0]),
    );
  }
}
