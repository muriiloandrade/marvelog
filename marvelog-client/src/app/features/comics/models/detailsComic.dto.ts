export interface ComicDetails {
  results: Result[];
}

export interface Result {
  id: number;
  title: string;
  issueNumber: number;
  description: null;
  modified: string;
  pageCount: number;
  resourceURI: string;
  prices: Price[];
  thumbnail: Thumbnail;
  characters: Characters;
}

export interface Characters {
  available: number;
  items: Item[];
  returned: number;
}

export interface Item {
  resourceURI: string;
  name: string;
}

export interface Price {
  type: string;
  price: number;
}

export interface Thumbnail {
  path: string;
  extension: string;
}
