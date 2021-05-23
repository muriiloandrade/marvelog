import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserModel } from '@app/user/models/user.model';
import { RegisterDTO } from '@app/auth/models/register.dto';

@Injectable()
export class UserService {
  constructor(@Inject('UserModel') private modelClass: ModelClass<UserModel>) {}

  async getById(cod_user_usr: string) {
    return this.modelClass.query().where({ cod_user_usr }).limit(1).first();
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

  async create(data: RegisterDTO) {
    return this.modelClass
      .query()
      .insert({
        num_telephone_usr: data.telephone.replace(/\D/g, ''),
        str_user_usr: data.username,
        str_email_usr: data.email,
        str_name_usr: data.name,
        str_password_usr: data.password,
      })
      .first();
  }
}
