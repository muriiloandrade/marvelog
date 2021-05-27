import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { SearchCharacters, SearchCharactersParamsDTO } from '@features/characters/models/searchCharacters.dto';

@Injectable()
export class CharactersService {
  private baseURL = `${environment.baseUrl}/v1/marvel`;

  constructor(private http: HttpClient) {}

  consultar(parameters: SearchCharactersParamsDTO) {
    const start = (parameters.startPage - 1) * parameters.limit;

    const params = new HttpParams()
      .set('nameStartsWith', parameters.nameStartsWith!!)
      .set('orderBy', parameters.orderBy!!)
      .set('limit', parameters.limit)
      .set('offset', start);

    return this.http.get<SearchCharacters>(`${this.baseURL}/characters`, { params });
  }
}
