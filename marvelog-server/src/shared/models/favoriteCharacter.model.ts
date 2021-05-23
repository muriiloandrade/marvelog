import { Model } from 'objection';
import { UserModel } from '@app/user/models/user.model';
import { CharacterModel } from '@app/character/models/character.model';

export class FavoriteCharacterModel extends Model {
  static tableName = 'favoriteCharacter';

  cod_marvelid_cha: number;
  cod_user_usr: string;
  dat_created_cha: Date;

  user: UserModel;
  character: CharacterModel;

  static relationMappings = () => ({
    character: {
      modelClass: CharacterModel,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'favoriteCharacter.cod_marvelid_cha',
        to: 'character.cod_marvelid_cha',
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
