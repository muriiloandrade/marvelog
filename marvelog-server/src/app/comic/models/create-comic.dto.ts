import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  IsDate,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateComicDTO {
  @IsNotEmpty({ message: 'O campo marvelId é obrigatório!' })
  @Type(() => Number)
  @IsNumber({}, { message: 'O campo marvelId deve ser do tipo número!' })
  marvelId: number;

  @IsNotEmpty({ message: 'O campo title é obrigatório!' })
  @IsString({ message: 'O campo title deve ser do tipo string!' })
  @MaxLength(100, {
    message: 'O campo title deve conter no máximo 100 caracteres!',
  })
  title: string;

  @IsOptional()
  @IsNumber({}, { message: 'O campo issueNumber deve ser do tipo número!' })
  @Type(() => Number)
  issueNumber: number;

  @IsOptional()
  @IsUrl({}, { message: 'O campo thumbnail não possui uma URL válida!' })
  @IsString({ message: 'O campo thumbnail deve ser do tipo string!' })
  @MaxLength(300, {
    message: 'A URL da thumbnail deve conter no máximo 300 caracteres!',
  })
  thumbnail: string;

  @IsOptional()
  @IsString({ message: 'O campo details deve ser do tipo string!' })
  @MaxLength(1000, {
    message: 'O campo details deve conter no máximo 1000 caracteres!',
  })
  details: string;

  @IsNotEmpty({ message: 'O campo lastModified é obrigatório!' })
  @IsDate({ message: 'O campo lastModified deve ser do tipo Date!' })
  @Type(() => Date)
  lastModified: Date;
}
