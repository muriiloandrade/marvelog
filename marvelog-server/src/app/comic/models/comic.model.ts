import { Model, RelationMappings } from 'objection';
import { FavoriteComicModel } from '@shared/models/favoriteComic.model';

export class ComicModel extends Model {
  static tableName = 'comic';

  cod_marvelid_com: number;
  str_title_com: string;
  num_issuenumber_com: number;
  str_thumbnail_com: string;
  str_details_com: string;
  dat_lastmodified_com: Date;
  dat_created_com: Date;

  static get idColumn(): string {
    return 'cod_marvelid_com';
  }

  static relationMappings = (): RelationMappings => ({
    favoriteComic: {
      modelClass: FavoriteComicModel,
      relation: Model.HasManyRelation,
      join: {
        from: 'comic.cod_marvelid_com',
        to: 'favoriteComic.cod_marvelid_com',
      },
    },
  });
}
