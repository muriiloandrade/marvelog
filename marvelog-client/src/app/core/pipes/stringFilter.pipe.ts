import { Pipe, PipeTransform } from '@angular/core';
import { FavoriteComics } from '@features/comics/models/favoriteComic.dto';

@Pipe({
  name: 'stringFilter',
  // pure: false,
})

export class StringFilterPipe implements PipeTransform {
  transform(items: FavoriteComics[], searchString: string): any {
    if (searchString) {
      return items.filter((item) => item.comic.str_title_com.indexOf(searchString) !== -1);
    }

    return items;
  }
}
