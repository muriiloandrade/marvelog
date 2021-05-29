import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { ComicDetails } from '@features/comics/models/detailsComic.dto';
import { FavoriteComic, FavoriteComics } from '@features/comics/models/favoriteComic.dto';
import { SearchComicsDTO, SearchComicsParamsDTO } from '@features/comics/models/searchComics.dto';
import { map } from 'rxjs/operators';

@Injectable()
export class ComicsService {
  private baseURL = `${environment.baseUrl}/v1`;

  constructor(private http: HttpClient) {}

  search(parameters: SearchComicsParamsDTO) {
    const start = (parameters.startPage - 1) * parameters.limit;

    const params = new HttpParams()
      .set('titleStartsWith', parameters.titleStartsWith!!)
      .set('orderBy', parameters.orderBy!!)
      .set('limit', parameters.limit)
      .set('offset', start);

    return this.http.get<SearchComicsDTO>(`${this.baseURL}/marvel/comics`, { params });
  }

  searchFavorites() {
    return this.http.get<FavoriteComics[]>(`${this.baseURL}/comic/favorites`);
  }

  favorite(data: FavoriteComic) {
    if (data.favorite) {
      return this.http.delete(`${this.baseURL}/comic/favorite/${data.marvelId}`);
    }

    return this.http.post(`${this.baseURL}/comic/favorite`, data);
  }

  getDetails(marvelId: number) {
    return this.http.get<ComicDetails>(`${this.baseURL}/marvel/comic/${marvelId}`).pipe(
      map((res) => res.results[0]),
    );
  }
}
