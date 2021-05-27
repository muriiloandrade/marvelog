/* eslint-disable @typescript-eslint/indent */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateComicDTO } from '@app/comic/models/create-comic.dto';
import { ComicService } from '@app/comic/service/comic.service';
import { User } from '@shared/decorators/usuario.decorator';
import { GeneralErrorsFilter } from '@shared/filters/error-handling.filter';
import { HttpExceptionFilter } from '@shared/filters/http-exception.filter';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { JwtDTO } from '@shared/interfaces/jwt.dto';

@UseGuards(JwtAuthGuard)
@UseFilters(GeneralErrorsFilter, HttpExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
@Controller('v1/comic')
export class ComicController {
  constructor(private service: ComicService) {}

  @Get('favorites')
  async getFavoritesByUser(@User() user: JwtDTO) {
    return this.service.getFavorites(user.sub);
  }

  @Post('favorite')
  async createFavorite(@User() user: JwtDTO, @Body() data: CreateComicDTO) {
    return this.service.createFavorite(user.sub, data);
  }

  @Delete('favorite/:id')
  async deleteFavorite(
    @User() user: JwtDTO,
    @Param('id', new ParseIntPipe()) comicId: number,
  ) {
    const exists = await this.service.comicExists(user.sub, comicId);

    if (!exists) {
      throw new BadRequestException('O personagem não está favoritado!');
    }

    return this.service.deleteFavorite(user.sub, comicId);
  }
}
