import { Characters } from '@app/marvel/models/charactersResp.dto';
import { MarvelParamsDTO } from '@app/marvel/models/marvel.dto';
import { MarvelService } from '@app/marvel/services/marvel.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
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
  async searchCharacters(@Query() params: MarvelParamsDTO) {
    const marvelCharacters = await this.service.searchCharacters(params);
    return new Characters(marvelCharacters);
  }
}
