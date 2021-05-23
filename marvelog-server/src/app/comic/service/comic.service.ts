import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { ComicModel } from '@app/comic/models/comic.model';
import { FavoriteComicModel } from '@shared/models/favoriteComic.model';

@Injectable()
export class ComicService {
  constructor(
    @Inject('ComicModel') private modelClass: ModelClass<ComicModel>,
    @Inject('FavoriteComicModel')
    private favoriteModelClass: ModelClass<FavoriteComicModel>,
  ) {}

  async getFavorites(cod_user_usr: string) {
    return this.favoriteModelClass
      .query()
      .withGraphFetched('comic')
      .where({ cod_user_usr });
  }
}
