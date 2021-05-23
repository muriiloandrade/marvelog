import {
  IsString,
  IsPhoneNumber,
  IsEmail,
  Matches,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RegisterDTO {
  @IsPhoneNumber('BR', { message: 'Insira um telefone válido!' })
  telephone: string;

  @IsString({ message: 'Insira um nome de usuário válido!' })
  @MinLength(3, {
    message: 'O nome de usuário deve ter pelo menos 3 caracteres!',
  })
  @MaxLength(20, {
    message: 'O nome de usuário deve ter no máximo 20 caracteres!',
  })
  username: string;

  @IsEmail({}, { message: 'Insira um e-mail válido!' })
  @MaxLength(256, {
    message: 'Seu e-mail é muito extenso, por favor utilize outro menor!',
  })
  email: string;

  @IsString({ message: 'Utilize um nome válido' })
  @Matches(/[a-zA-Z\s]+/, { message: 'O nome deve conter apenas letras!' })
  @MinLength(3, {
    message: 'O nome de usuário deve ter pelo menos 3 caracteres!',
  })
  @MaxLength(100, { message: 'O nome deve conter no máximo 100 caracteres!' })
  name: string;

  @IsNotEmpty({ message: 'O campo senha é obrigatório!' })
  @MinLength(8, { message: 'A senha deve conter no mínimo 8 caracteres!' })
  password: string;
}
