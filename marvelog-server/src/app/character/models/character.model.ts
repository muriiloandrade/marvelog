import { Model, RelationMappings } from 'objection';
import { FavoriteCharacterModel } from '@shared/models/favoriteCharacter.model';

export class CharacterModel extends Model {
  static tableName = 'character';

  cod_marvelid_cha: number;
  str_name_cha: string;
  str_thumbnail_cha: string;
  str_details_cha: string;
  dat_lastmodified_cha: Date;
  dat_created_cha: Date;

  static get idColumn(): string {
    return 'cod_marvelid_cha';
  }

  static relationMappings = (): RelationMappings => ({
    favoriteCharacter: {
      modelClass: FavoriteCharacterModel,
      relation: Model.HasManyRelation,
      join: {
        from: 'character.cod_marvelid_cha',
        to: 'favoriteCharacter.cod_marvelid_cha',
      },
    },
  });
}
