import { CharacterModel } from '@app/character/models/character.model';
import { Inject, Injectable } from '@nestjs/common';
import { FavoriteCharacterModel } from '@shared/models/favoriteCharacter.model';
import { ModelClass } from 'objection';

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
}
