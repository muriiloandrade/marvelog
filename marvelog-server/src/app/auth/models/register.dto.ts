import {
  IsString,
  IsPhoneNumber,
  IsEmail,
  IsAlpha,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RegisterDTO {
  @IsPhoneNumber('BR', {
    message: 'Insira um telefone válido!',
  })
  telephone: string;

  @IsString({
    message: 'Insira um nome de usuário válido!',
  })
  @MinLength(3, {
    message: 'O nome de usuário deve ter pelo menos 3 caracteres!',
  })
  @MaxLength(20, {
    message: 'O nome de usuário deve ter no máximo 20 caracteres!',
  })
  username: string;

  @IsEmail(
    {},
    {
      message: 'Insira um e-mail válido!',
    },
  )
  @MaxLength(256, {
    message: 'Seu e-mail é muito extenso, por favor utilize outro menor!',
  })
  email: string;

  @IsString({
    message: 'Utilize um nome válido',
  })
  @IsAlpha('pt-BR', {
    message: 'O campo aceita apenas letras!',
  })
  name: string;

  @IsNotEmpty({
    message: 'O campo senha é obrigatório!',
  })
  @MinLength(8, {
    message: 'A senha deve conter no mínimo 8 caracteres!',
  })
  password: string;
}
