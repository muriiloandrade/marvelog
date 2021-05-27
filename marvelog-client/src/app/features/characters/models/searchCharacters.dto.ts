export interface SearchCharactersParamsDTO {
  nameStartsWith?: string;
  orderBy?: string;
  limit: number;
  startPage: number;
}

export interface SearchCharacters {
  data: Data;
}

export interface Data {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Result[];
}

export interface Result {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
}

export interface Item {
  resourceURI: string;
  name: string;
}

export interface Thumbnail {
  path:string;
  extension: string;
}
