import { MarvelParamsDTO } from '@app/marvel/models/marvel.dto';
import { MarvelService } from '@app/marvel/services/marvel.service';
import {
  Controller,
  Get,
  Query,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GeneralErrorsFilter } from '@shared/filters/error-handling.filter';
import { HttpExceptionFilter } from '@shared/filters/http-exception.filter';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@UseFilters(GeneralErrorsFilter, HttpExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
@Controller('v1/marvel')
export class MarvelController {
  constructor(private service: MarvelService) {}

  @Get('characters')
  searchCharacters(@Query() params: MarvelParamsDTO) {
    return this.service.searchCharacters(params);
  }
}
