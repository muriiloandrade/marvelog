import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max } from 'class-validator';

export class SearchCharactersParamsDTO {
  @IsOptional()
  @IsString({
    message: 'O nome deve ser uma string!',
  })
  nameStartsWith: string;

  @IsOptional()
  @IsString({
    message: 'O parâmetro de ordenação deve ser uma string!',
  })
  orderBy: string;

  @IsOptional()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    {
      message: 'O campo limit deve ser um número!',
    },
  )
  @Max(100, { message: 'O valor máximo do campo limit é 100!' })
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    {
      message: 'O campo offset deve ser um número!',
    },
  )
  @Type(() => Number)
  offset: number;
}
