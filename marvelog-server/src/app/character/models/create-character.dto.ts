import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  IsDateString,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateCharacterDTO {
  @IsNotEmpty({ message: 'O campo marvelId é obrigatório!' })
  @IsNumber({}, { message: 'O campo marvelId deve ser do tipo número!' })
  marvelId: number;

  @IsNotEmpty({ message: 'O campo name é obrigatório!' })
  @IsString({ message: 'O campo name deve ser do tipo string!' })
  @MaxLength(100, {
    message: 'O campo title deve conter no máximo 100 caracteres!',
  })
  name: string;

  @IsOptional()
  @IsUrl({}, { message: 'O campo thumbnail não possui uma URL válida!' })
  @IsString({ message: 'O campo thumbnail deve ser do tipo string!' })
  @MaxLength(300, {
    message: 'A URL da thumbnail deve conter no máximo 300 caracteres!',
  })
  thumbnail: string;

  @IsUrl({}, { message: 'O campo resourceUrl não possui uma URL válida!' })
  @IsString({ message: 'O campo resourceUrl deve ser do tipo string!' })
  @MaxLength(300, {
    message: 'A URL da resourceUrl deve conter no máximo 300 caracteres!',
  })
  resourceUrl: string;

  @IsString({ message: 'O campo details deve ser do tipo string!' })
  @MaxLength(1000, {
    message: 'O campo details deve conter no máximo 1000 caracteres!',
  })
  details: string;

  @IsNotEmpty({ message: 'O campo lastModified é obrigatório!' })
  @IsDateString({}, { message: 'O campo lastModified deve ser do tipo Date!' })
  lastModified: Date;
}
