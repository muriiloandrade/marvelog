import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { ComicModel } from '@app/comic/models/comic.model';
import { FavoriteComicModel } from '@shared/models/favoriteComic.model';
import { CreateComicDTO } from '@app/comic/models/create-comic.dto';

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

  async comicExists(cod_marvelid_com: number) {
    const exists = this.modelClass
      .query()
      .where({ cod_marvelid_com })
      .then((res) => !!res.length);

    return exists;
  }

  async createComicAndFavorite(comic: CreateComicDTO, cod_user_usr: string) {
    this.favoriteModelClass.transaction(async (transaction) => {
      await this.favoriteModelClass.query(transaction).insertGraph({
        cod_marvelid_com: comic.marvelId,
        cod_user_usr,
        comic: {
          cod_marvelid_com: comic.marvelId,
          str_title_com: comic.title,
          str_details_com: comic.details ?? undefined,
          str_thumbnail_com: comic.thumbnail,
          num_issuenumber_com: comic.issueNumber,
          dat_lastmodified_com: new Date(comic.lastModified),
        },
      });
    });
  }

  async createFavorite(cod_user_usr: string, data: CreateComicDTO) {
    const exists = await this.comicExists(data.marvelId);

    if (!exists) {
      return this.createComicAndFavorite(data, cod_user_usr);
    }

    return this.favoriteModelClass.query().insert({
      cod_marvelid_com: data.marvelId,
      cod_user_usr,
    });
  }

  async deleteFavorite(cod_user_usr: string, cod_marvelid_com: number) {
    return this.favoriteModelClass.query().delete().where({
      cod_marvelid_com,
      cod_user_usr,
    });
  }
}
