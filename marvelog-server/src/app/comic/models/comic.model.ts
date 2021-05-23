import { Model } from 'objection';

export class ComicModel extends Model {
  static tableName = 'comic';

  cod_marvelid_com: number;
  str_title_com: string;
  num_issuenumber_com: number;
  str_thumbnail_com: string;
  str_details_com: string;
  dat_lastmodified_com: Date;
  dat_created_com: Date;

  static get idColumn(): string {
    return 'cod_marvelid_com';
  }

  static relationMappings = {};
}
