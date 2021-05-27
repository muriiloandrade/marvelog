import { Pipe, PipeTransform } from '@angular/core';
import { FavoriteComics } from '@features/comics/models/favoriteComic.dto';

@Pipe({
  name: 'comicFilter',
})

export class ComicFilterPipe implements PipeTransform {
  transform(items: FavoriteComics[], searchString: string): any {
    if (searchString) {
      return items.filter((item) => item.comic.str_title_com
        .toLowerCase()
        .indexOf(searchString) !== -1);
    }

    return items;
  }
}
