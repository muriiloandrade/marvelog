import { Pipe, PipeTransform } from '@angular/core';
import { FavoriteCharacters } from '@features/characters/models/favoriteCharacter.dto';

@Pipe({
  name: 'characterFilter',
})

export class CharacterFilterPipe implements PipeTransform {
  transform(items: FavoriteCharacters[], searchString: string): any {
    if (searchString) {
      return items.filter((item) => item.character.str_name_cha
        .toLowerCase()
        .indexOf(searchString) !== -1);
    }

    return items;
  }
}
