import { IsNotEmpty, MinLength } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { RegisterDTO } from '@app/auth/models/register.dto';

export class UpdatePassDTO extends PickType(RegisterDTO, ['password']) {
  @IsNotEmpty({ message: 'O campo senha antiga é obrigatório!' })
  @MinLength(8, {
    message: 'A senha antiga deve conter no mínimo 8 caracteres!',
  })
  oldpassword: string;
}
