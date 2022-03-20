/* eslint-disable @typescript-eslint/indent */
import {
  Injectable,
  Logger,
  PreconditionFailedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Md5 } from 'ts-md5';
import { EnvService } from '@config/env/env.service';
import { SearchCharactersParamsDTO } from '@app/marvel/models/searchCharacters.dto';
import { Characters } from '@app/marvel/models/charactersResp.dto';
import { Comics } from '@app/marvel/models/comicsResp.dto';
import { SearchComicsParamsDTO } from '@app/marvel/models/searchComics.dto';
import { CharacterDetails } from '@app/marvel/models/characterDetailsResp.dto';
import { ComicsDetails } from '@app/marvel/models/comicDetailsResp.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MarvelService {
  constructor(private http: HttpService, private env: EnvService) {}

  async searchCharacters(searchParams: SearchCharactersParamsDTO) {
    const source$ = this.http.get<Characters>(
      `${this.env.marvelApiUrl}/characters`,
      {
        params: {
          ...this.makeRequestParams(),
          ...searchParams,
          nameStartsWith:
            searchParams.nameStartsWith === ''
              ? undefined
              : searchParams.nameStartsWith,
        },
      },
    );

    try {
      const res = await lastValueFrom(source$);
      return res.data;
    } catch (error) {
      Logger.error(error);
      throw new PreconditionFailedException(
        'Não foi possível consultar a Marvel no momento!',
      );
    }
  }

  async getCharactersDetails(characterId: number) {
    const source$ = this.http.get<CharacterDetails>(
      `${this.env.marvelApiUrl}/characters/${characterId}`,
      {
        params: {
          ...this.makeRequestParams(),
        },
      },
    );

    try {
      const res = await lastValueFrom(source$);
      return res.data.data;
    } catch (error) {
      Logger.error(error);
      throw new PreconditionFailedException(
        'Não foi possível consultar a Marvel no momento!',
      );
    }
  }

  async searchComics(searchParams: SearchComicsParamsDTO) {
    const source$ = this.http.get<Comics>(`${this.env.marvelApiUrl}/comics`, {
      params: {
        ...this.makeRequestParams(),
        ...searchParams,
        titleStartsWith:
          searchParams.titleStartsWith === ''
            ? undefined
            : searchParams.titleStartsWith,
      },
    });

    try {
      const res = await lastValueFrom(source$);
      return res.data;
    } catch (error) {
      Logger.error(error);
      throw new PreconditionFailedException(
        'Não foi possível consultar a Marvel no momento!',
      );
    }
  }

  async getComicDetails(comicId: number) {
    const source$ = this.http.get<ComicsDetails>(
      `${this.env.marvelApiUrl}/comics/${comicId}`,
      {
        params: {
          ...this.makeRequestParams(),
        },
      },
    );

    try {
      const res = await lastValueFrom(source$);
      return res.data.data;
    } catch (error) {
      Logger.error(error);
      throw new PreconditionFailedException(
        'Não foi possível consultar a Marvel no momento!',
      );
    }
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
