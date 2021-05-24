import { OmitType } from '@nestjs/mapped-types';
import { SearchCharactersParamsDTO } from '@app/marvel/models/searchCharacters.dto';
import { IsOptional } from 'class-validator';

export class SearchComicsParamsDTO extends OmitType(SearchCharactersParamsDTO, [
  'nameStartsWith',
]) {
  @IsOptional()
  titleStartsWith: string;
}
