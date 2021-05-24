/* eslint-disable @typescript-eslint/indent */
import {
  HttpService,
  Injectable,
  Logger,
  PreconditionFailedException,
} from '@nestjs/common';
import { Md5 } from 'ts-md5';
import { EnvService } from '@config/env/env.service';
import { MarvelParamsDTO } from '@app/marvel/models/marvel.dto';
import { Characters } from '@app/marvel/models/charactersResp.dto';

@Injectable()
export class MarvelService {
  constructor(private http: HttpService, private env: EnvService) {}

  async searchCharacters(searchParams: MarvelParamsDTO) {
    return this.http
      .get<Characters>(`${this.env.marvelApiUrl}/characters`, {
        params: {
          ...this.makeRequestParams(),
          ...searchParams,
        },
      })
      .toPromise()
      .then((res) => res.data)
      .catch((err) => {
        Logger.error(err);
        throw new PreconditionFailedException(
          'Não foi possível consultar o personagem no momento!',
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
