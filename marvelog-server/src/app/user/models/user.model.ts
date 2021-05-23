import { Model, QueryContext, ModelOptions, RelationMappings } from 'objection';
import bcrypt from 'bcryptjs';
import { FavoriteComicModel } from '@shared/models/favoriteComic.model';

export class UserModel extends Model {
  static tableName = 'user';

  cod_user_usr: string;
  str_user_usr: string;
  str_name_usr: string;
  str_email_usr: string;
  str_password_usr: string;
  num_telephone_usr: string;
  dat_created_usr: Date;

  static get idColumn(): string {
    return 'cod_user_usr';
  }

  async $beforeInsert(ctx: QueryContext): Promise<void> {
    await super.$beforeInsert(ctx);
    this.str_password_usr = await bcrypt.hash(this.str_password_usr, 12);
  }

  async $beforeUpdate(opt: ModelOptions, ctx: QueryContext): Promise<void> {
    await super.$beforeUpdate(opt, ctx);
    if (this.str_password_usr) {
      this.str_password_usr = await bcrypt.hash(this.str_password_usr, 12);
    }
  }

  async $afterUpdate(opt: ModelOptions, ctx: QueryContext): Promise<void> {
    await super.$afterUpdate(opt, ctx);
    delete this.str_password_usr;
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.str_password_usr);
  }

  static relationMappings = (): RelationMappings => ({
    favoriteComic: {
      modelClass: FavoriteComicModel,
      relation: Model.HasManyRelation,
      join: {
        from: 'user.cod_user_usr',
        to: 'favoriteComic.cod_user_usr',
      },
    },
  });
}
