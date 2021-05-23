import { Model } from 'objection';
import { ComicModel } from '@app/comic/models/comic.model';
import { UserModel } from '@app/user/models/user.model';

export class FavoriteComicModel extends Model {
  static tableName = 'favoriteComic';

  cod_marvelid_com: number;
  cod_user_usr: string;
  dat_created_com: Date;

  user: UserModel;
  comic: ComicModel;

  static relationMappings = () => ({
    comic: {
      modelClass: ComicModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'favoriteComic.cod_marvelid_com',
        to: 'comic.cod_marvelid_com',
      },
    },
    user: {
      modelClass: UserModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'favoriteComic.cod_user_usr',
        to: 'user.cod_user_usr',
      },
    },
  });
}
