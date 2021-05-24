/* eslint-disable @typescript-eslint/indent */
import {
  HttpService,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { Md5 } from 'ts-md5';
import { catchError, map } from 'rxjs/operators';
import { EnvService } from '@config/env/env.service';
import { MarvelParamsDTO } from '@app/marvel/models/marvel.dto';
import { Characters, Result } from '@app/marvel/models/charactersResp.dto';

@Injectable()
export class MarvelService {
  constructor(private http: HttpService, private env: EnvService) {}

  searchCharacters(searchParams: MarvelParamsDTO) {
    return this.http
      .get<Characters>(`${this.env.marvelApiUrl}/characters`, {
        params: {
          ...this.makeRequestParams(),
          ...searchParams,
        },
      })
      .pipe(
        map((marvelResponse) => {
          const results: Result[] = [];
          const { data } = marvelResponse.data;
          data.results.forEach((searchResult) => {
            results.push(new Result(searchResult));
          });
          return results;
        }),
        catchError(() => {
          throw new PreconditionFailedException(
            'Não foi possível consultar o personagem no momento!',
          );
        }),
      );
  }

  private makeRequestParams() {
    const timestamp = Date.now();
    return {
      hash: Md5.hashStr(
        `${timestamp}${this.env.marvelPrivKey}${this.env.marvelPubKey}`,
      ),
      ts: timestamp,
      apikey: this.env.marvelPubKey,
    };
  }
}
