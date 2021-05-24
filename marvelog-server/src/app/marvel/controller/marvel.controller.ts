import { CharacterDetailsData } from '@app/marvel/models/characterDetailsResp.dto';
import { Characters } from '@app/marvel/models/charactersResp.dto';
import { ComicDetailsData } from '@app/marvel/models/comicDetailsResp.dto';
import { Comics } from '@app/marvel/models/comicsResp.dto';
import { SearchCharactersParamsDTO } from '@app/marvel/models/searchCharacters.dto';
import { SearchComicsParamsDTO } from '@app/marvel/models/searchComics.dto';
import { MarvelService } from '@app/marvel/services/marvel.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  SerializeOptions,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GeneralErrorsFilter } from '@shared/filters/error-handling.filter';
import { HttpExceptionFilter } from '@shared/filters/http-exception.filter';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@UseFilters(GeneralErrorsFilter, HttpExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('v1/marvel')
export class MarvelController {
  constructor(private service: MarvelService) {}

  @SerializeOptions({
    excludePrefixes: ['events', 'series', 'stories'],
  })
  @Get('characters')
  async searchCharacters(@Query() params: SearchCharactersParamsDTO) {
    const marvelCharacters = await this.service.searchCharacters(params);
    return new Characters(marvelCharacters);
  }

  @SerializeOptions({
    excludePrefixes: [
      'digitalId',
      'variantDescription',
      'isbn',
      'upc',
      'diamondCode',
      'ean',
      'issn',
      'format',
      'textObjects',
      'urls',
      'variants',
      'collect',
      'dates',
      'price',
      'images',
      'creators',
      'series',
      'stories',
      'events',
      'characters',
    ],
  })
  @Get('comics')
  async searchComics(@Query() params: SearchComicsParamsDTO) {
    const marvelComics = await this.service.searchComics(params);
    return new Comics(marvelComics);
  }

  @SerializeOptions({
    excludePrefixes: ['collectionURI', 'series', 'stories', 'events', 'urls'],
  })
  @Get('character/:id')
  async characterDetails(@Param('id', new ParseIntPipe()) characterId: number) {
    const characterDetails = await this.service.getCharactersDetails(
      characterId,
    );
    return new CharacterDetailsData(characterDetails);
  }

  @SerializeOptions({
    excludePrefixes: [
      'digitalId',
      'variantDescription',
      'isbn',
      'upc',
      'diamondCode',
      'ean',
      'issn',
      'format',
      'textObjects',
      'urls',
      'variants',
      'collect',
      'dates',
      'images',
      'creators',
      'series',
      'stories',
      'events',
    ],
  })
  @Get('comic/:id')
  async comicDetails(@Param('id', new ParseIntPipe()) comicId: number) {
    const comicDetails = await this.service.getComicDetails(comicId);
    return new ComicDetailsData(comicDetails);
  }
}
