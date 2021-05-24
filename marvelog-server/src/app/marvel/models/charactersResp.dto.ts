export interface Characters {
  code: number;
  data: Data;
}

export interface Data {
  results: Result[];
}

export interface Result {
  id: string;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  comics: Comics;
}

export interface Comics {
  available: string;
  returned: string;
  collectionURI: string;
  items: ComicsItem[];
}

export interface ComicsItem {
  resourceURI: string;
  name: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}
