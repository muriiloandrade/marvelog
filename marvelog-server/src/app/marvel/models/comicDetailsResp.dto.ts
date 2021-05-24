/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';

export class Item {
  resourceURI: string;
  name: string;
  role?: string;
  type?: string;
}

export class Characters {
  available: number;
  collectionURI: string;

  @Type(() => Item)
  items: Item[];

  returned: number;
}

export class Thumbnail {
  path: string;
  extension: string;
}

export class Price {
  type: string;
  price: number;
}

export class Result {
  id: number;
  title: string;
  issueNumber: number;
  description: null;
  modified: string;
  pageCount: number;

  @Type(() => Price)
  prices: Price[];

  @Type(() => Thumbnail)
  thumbnail: Thumbnail;

  @Type(() => Characters)
  characters: Characters;
}

export class ComicDetailsData {
  offset: number;
  limit: number;
  total: number;
  count: number;

  @Type(() => Result)
  results: Result[];

  constructor(partial: ComicDetailsData) {
    const { results, ...trash } = partial;
    this.results = results;
  }
}

export class ComicsDetails {
  @Type(() => ComicDetailsData)
  data: ComicDetailsData;
}
