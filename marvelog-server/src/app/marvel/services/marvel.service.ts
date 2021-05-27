/* eslint-disable @typescript-eslint/indent */
import {
  HttpService,
  Injectable,
  Logger,
  PreconditionFailedException,
} from '@nestjs/common';
import { Md5 } from 'ts-md5';
import { EnvService } from '@config/env/env.service';
import { SearchCharactersParamsDTO } from '@app/marvel/models/searchCharacters.dto';
import { Characters } from '@app/marvel/models/charactersResp.dto';
import { Comics } from '@app/marvel/models/comicsResp.dto';
import { SearchComicsParamsDTO } from '@app/marvel/models/searchComics.dto';
import { CharacterDetails } from '@app/marvel/models/characterDetailsResp.dto';
import { ComicsDetails } from '@app/marvel/models/comicDetailsResp.dto';

@Injectable()
export class MarvelService {
  constructor(private http: HttpService, private env: EnvService) {}

  async searchCharacters(searchParams: SearchCharactersParamsDTO) {
    return this.http
      .get<Characters>(`${this.env.marvelApiUrl}/characters`, {
        params: {
          ...this.makeRequestParams(),
          ...searchParams,
          nameStartsWith:
            searchParams.nameStartsWith === ''
              ? undefined
              : searchParams.nameStartsWith,
        },
      })
      .toPromise()
      .then((res) => res.data)
      .catch((err) => {
        Logger.error(err);
        throw new PreconditionFailedException(
          'Não foi possível consultar a Marvel no momento!',
        );
      });
  }

  async getCharactersDetails(characterId: number) {
    return this.http
      .get<CharacterDetails>(
        `${this.env.marvelApiUrl}/characters/${characterId}`,
        {
          params: {
            ...this.makeRequestParams(),
          },
        },
      )
      .toPromise()
      .then((res) => res.data.data)
      .catch((err) => {
        Logger.error(err);
        throw new PreconditionFailedException(
          'Não foi possível consultar a Marvel no momento!',
        );
      });
  }

  async searchComics(searchParams: SearchComicsParamsDTO) {
    return this.http
      .get<Comics>(`${this.env.marvelApiUrl}/comics`, {
        params: {
          ...this.makeRequestParams(),
          ...searchParams,
          titleStartsWith:
            searchParams.titleStartsWith === ''
              ? undefined
              : searchParams.titleStartsWith,
        },
      })
      .toPromise()
      .then((res) => res.data)
      .catch((err) => {
        Logger.error(err);
        throw new PreconditionFailedException(
          'Não foi possível consultar a Marvel no momento!',
        );
      });
  }

  async getComicDetails(comicId: number) {
    return this.http
      .get<ComicsDetails>(`${this.env.marvelApiUrl}/comics/${comicId}`, {
        params: {
          ...this.makeRequestParams(),
        },
      })
      .toPromise()
      .then((res) => res.data.data)
      .catch((err) => {
        Logger.error(err);
        throw new PreconditionFailedException(
          'Não foi possível consultar a Marvel no momento!',
        );
      });
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
