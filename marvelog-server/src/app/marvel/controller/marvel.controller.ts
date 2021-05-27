/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { CharacterService } from '@app/character/services/character.service';
import { ComicService } from '@app/comic/service/comic.service';
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
import { User } from '@shared/decorators/usuario.decorator';
import { GeneralErrorsFilter } from '@shared/filters/error-handling.filter';
import { HttpExceptionFilter } from '@shared/filters/http-exception.filter';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { JwtDTO } from '@shared/interfaces/jwt.dto';

@UseGuards(JwtAuthGuard)
@UseFilters(GeneralErrorsFilter, HttpExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('v1/marvel')
export class MarvelController {
  constructor(
    private service: MarvelService,
    private charactersService: CharacterService,
    private comicService: ComicService,
  ) {}

  @SerializeOptions({
    excludePrefixes: ['events', 'series', 'stories', 'urls', 'comics'],
  })
  @Get('characters')
  async searchCharacters(
    @Query() params: SearchCharactersParamsDTO,
    @User() user: JwtDTO,
  ) {
    const marvelCharacters = await this.service.searchCharacters(params);
    const favorites = await this.charactersService.getFavorites(user.sub);
    marvelCharacters.data.results.forEach((cha) => {
      const exists = favorites.findIndex(
        (fav) => fav.cod_marvelid_cha === cha.id,
      );

      if (exists !== -1) cha.favorite = true;
      else cha.favorite = false;
    });

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
  async searchComics(
    @Query() params: SearchComicsParamsDTO,
    @User() user: JwtDTO,
  ) {
    const marvelComics = await this.service.searchComics(params);
    const favorites = await this.comicService.getFavorites(user.sub);

    marvelComics.data.results.forEach((com) => {
      const exists = favorites.findIndex(
        (fav) => fav.cod_marvelid_com === com.id,
      );

      if (exists !== -1) com.favorite = true;
      else com.favorite = false;
    });
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
