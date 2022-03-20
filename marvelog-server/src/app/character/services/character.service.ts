import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CharacterModel } from '@app/character/models/character.model';
import { CreateCharacterDTO } from '@app/character/models/create-character.dto';
import { FavoriteCharacterModel } from '@shared/models/favoriteCharacter.model';

@Injectable()
export class CharacterService {
  constructor(
    @Inject('CharacterModel') private modelClass: ModelClass<CharacterModel>,
    @Inject('FavoriteCharacterModel')
    private favoriteModelClass: ModelClass<FavoriteCharacterModel>,
  ) {}

  async getFavorites(cod_user_usr: string) {
    return this.favoriteModelClass
      .query()
      .withGraphFetched('character')
      .where({ cod_user_usr });
  }

  async characterExists(cod_marvelid_cha: number) {
    const exists = this.modelClass
      .query()
      .findById(cod_marvelid_cha)
      .then((res) => !!res);

    return exists;
  }

  async createCharacterAndFavorite(
    character: CreateCharacterDTO,
    cod_user_usr: string,
  ) {
    this.favoriteModelClass.transaction(async (transaction) => {
      await this.favoriteModelClass.query(transaction).insertGraph({
        cod_marvelid_cha: character.marvelId,
        cod_user_usr,
        character: {
          cod_marvelid_cha: character.marvelId,
          str_name_cha: character.name,
          str_details_cha: character.details,
          str_thumbnail_cha: character.thumbnail,
          dat_lastmodified_cha: new Date(character.lastModified),
        },
      });
    });
  }

  async createFavorite(cod_user_usr: string, data: CreateCharacterDTO) {
    const exists = await this.characterExists(data.marvelId);

    if (!exists) {
      return this.createCharacterAndFavorite(data, cod_user_usr);
    }

    return this.favoriteModelClass.query().insert({
      cod_marvelid_cha: data.marvelId,
      cod_user_usr,
    });
  }

  async deleteFavorite(cod_user_usr: string, cod_marvelid_cha: number) {
    return this.favoriteModelClass.query().delete().where({
      cod_marvelid_cha,
      cod_user_usr,
    });
  }
}
