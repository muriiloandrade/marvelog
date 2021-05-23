import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserModel } from '@app/user/models/user.model';

@Injectable()
export class UserService {
  constructor(@Inject('UserModel') private modelClass: ModelClass<UserModel>) {}

  async getById(cod_user_str: string) {
    return this.modelClass.query().where({ cod_user_str }).limit(1).first();
  }

  async getByLoginUsed(loginField: string) {
    return this.modelClass
      .query()
      .where((builder) => {
        builder
          .where('str_email_usr', loginField)
          .orWhere('str_user_usr', loginField);
      })
      .limit(1)
      .first();
  }

  async create(data: Partial<UserModel>) {
    return this.modelClass
      .query()
      .insert({
        num_telephone_usr: data.num_telephone_usr.replace(/\D/g, ''),
        str_user_usr: data.str_user_usr,
        str_email_usr: data.str_email_usr,
        str_name_usr: data.str_name_usr,
        str_password_usr: data.str_password_usr,
      })
      .first();
  }
}
