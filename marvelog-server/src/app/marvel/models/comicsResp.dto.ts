/* eslint-disable max-classes-per-file */

import { Type } from 'class-transformer';

export class CharactersItem {
  resourceURI: string;
  name: string;
  role: string;
}

export class Characters {
  @Type(() => CharactersItem)
  items: CharactersItem[];
}

export class Thumbnail {
  path: string;
  extension: string;
}

export class Result {
  @Type(() => Number)
  id: number;

  title: string;
  issueNumber: string;
  description: string;
  modified: string;
  resourceURI: string;

  @Type(() => Boolean)
  favorite: boolean;

  @Type(() => Thumbnail)
  thumbnail: Thumbnail;

  @Type(() => Characters)
  characters: Characters;
}

export class Data {
  @Type(() => Result)
  results: Result[];
}

export class Comics {
  code: string;

  @Type(() => Data)
  data: Data;

  constructor(partial: Comics) {
    const { data } = partial;
    this.data = data;
  }
}
