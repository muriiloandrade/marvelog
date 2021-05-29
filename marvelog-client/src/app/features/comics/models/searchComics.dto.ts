export interface SearchComicsParamsDTO {
  titleStartsWith?: string;
  orderBy?: string;
  limit: number;
  startPage: number;
}

export interface SearchComicsDTO {
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
  title: string;
  issueNumber: number;
  description: string;
  modified: string;
  pageCount: number;
  resourceURI: string;
  thumbnail: Thumbnail;
  favorite: boolean;
}

export interface Thumbnail {
  path: string;
  extension: string;
}
