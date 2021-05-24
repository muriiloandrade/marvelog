/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */

import { Type } from 'class-transformer';

export class ComicsItem {
  resourceURI: string;
  name: string;

  constructor(partial: ComicsItem) {
    this.resourceURI = partial.resourceURI;
    this.name = partial.name;
  }
}

export class Thumbnail {
  path: string;
  extension: string;

  constructor(partial: Thumbnail) {
    this.path = partial.extension;
    this.extension = partial.extension;
  }
}

export class Comics {
  available: string;
  returned: string;
  collectionURI: string;

  @Type(() => ComicsItem)
  items: ComicsItem[];

  constructor(partial: Comics) {
    const { available, items, returned, collectionURI, ...trash } = partial;

    this.available = available;
    this.returned = returned;
    this.collectionURI = collectionURI;
    this.items = items;
  }
}

export class Result {
  @Type(() => Number)
  id: number;

  name: string;
  description: string;
  modified: string;

  @Type(() => Thumbnail)
  thumbnail: Thumbnail;

  @Type(() => Comics)
  comics: Comics;

  constructor(partial: Result) {
    const { comics, description, id, name, thumbnail, modified, ...trash } =
      partial;

    this.comics = comics;
    this.id = id;
    this.name = name;
    this.description = description;
    this.modified = modified;
    this.thumbnail = thumbnail;
    this.comics = comics;
  }
}

export class Data {
  @Type(() => Result)
  results: Result[];

  constructor(partial: Data) {
    const { results, ...trash } = partial;
    this.results = results;
  }
}

export class Characters {
  code: number;

  @Type(() => Data)
  data: Data;

  constructor(partial: Characters) {
    const { data, ...trash } = partial;
    this.data = data;
  }
}
