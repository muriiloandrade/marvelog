export interface FavoriteCharacter {
  marvelId: number;
  name: string;
  thumbnail: string;
  details: string;
  lastModified: string;
  favorite: boolean;
}

export interface FavoriteCharacters {
  cod_marvelid_cha: number;
  cod_user_usr: string;
  dat_liked_fch: string;
  favorite: boolean;
  character: Character;
}

export interface Character {
  cod_marvelid_cha: number;
  str_name_cha: string;
  str_thumbnail_cha: string;
  str_details_cha: string;
  dat_lastmodified_cha: string;
  dat_created_cha: string;
}
