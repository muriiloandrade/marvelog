/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';

export class ComicsItem {
  resourceURI: string;
  name: string;
}

export class Comics {
  available: number;
  collectionURI: string;

  @Type(() => ComicsItem)
  items: ComicsItem[];
}

export class Thumbnail {
  path: string;
  extension: string;
}

export class Result {
  id: number;
  name: string;
  description: string;
  modified: string;

  @Type(() => Thumbnail)
  thumbnail: Thumbnail;

  resourceURI: string;

  @Type(() => Comics)
  comics: Comics;
}

export class CharacterDetailsData {
  offset: number;
  limit: number;
  total: number;
  count: number;

  @Type(() => Result)
  results: Result[];

  constructor(partial: CharacterDetailsData) {
    const { results, ...trash } = partial;
    this.results = results;
  }
}

export interface CharacterDetails {
  data: CharacterDetailsData;
}
