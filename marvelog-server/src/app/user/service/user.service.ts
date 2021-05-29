import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserModel } from '@app/user/models/user.model';
import { RegisterDTO } from '@app/auth/models/register.dto';
import { UpdateUserDTO } from '@app/user/models/update-user.dto';
import { UpdatePassDTO } from '@app/user/models/update-pass.dto';

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

  async delete(cod_user_usr: string) {
    return this.modelClass.query().delete().where({ cod_user_usr });
  }

  async update(cod_user_usr: string, data: UpdateUserDTO) {
    return this.modelClass
      .query()
      .patch({
        str_email_usr: data.email,
        num_telephone_usr: data.telephone.replace(/\D/g, ''),
        str_name_usr: data.name,
      })
      .where({ cod_user_usr });
  }

  async updatePass(cod_user_usr: string, data: UpdatePassDTO) {
    return this.modelClass
      .query()
      .patch({ str_password_usr: data.password })
      .where({ cod_user_usr })
      .first();
  }
}
