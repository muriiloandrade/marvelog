export interface FavoriteComic {
  marvelId: number;
  title: string;
  issueNumber: number;
  thumbnail: string;
  details: string;
  lastModified: string;
  favorite: boolean;
}

export interface FavoriteComics {
  cod_marvelid_com: number;
  cod_user_usr: string;
  dat_liked_fco: string;
  comic: Comic;
  favorite: boolean;
}

export interface Comic {
  cod_marvelid_com: number;
  str_title_com: string;
  num_issuenumber_com: number;
  str_thumbnail_com: string;
  str_details_com: string | null;
  dat_lastmodified_com: string;
  dat_created_com: string;
}
