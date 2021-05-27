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
import { CreateCharacterDTO } from '@app/character/models/create-character.dto';
import { CharacterService } from '@app/character/services/character.service';
import { User } from '@shared/decorators/usuario.decorator';
import { GeneralErrorsFilter } from '@shared/filters/error-handling.filter';
import { HttpExceptionFilter } from '@shared/filters/http-exception.filter';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { JwtDTO } from '@shared/interfaces/jwt.dto';

@UseGuards(JwtAuthGuard)
@UseFilters(GeneralErrorsFilter, HttpExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
@Controller('v1/character')
export class CharacterController {
  constructor(private service: CharacterService) {}

  @Get('favorites')
  async getFavoritesByUser(@User() user: JwtDTO) {
    return this.service.getFavorites(user.sub);
  }

  @Post('favorite')
  async createFavorite(@User() user: JwtDTO, @Body() data: CreateCharacterDTO) {
    return this.service.createFavorite(user.sub, data);
  }

  @Delete('favorite/:id')
  async deleteFavorite(
    @User() user: JwtDTO,
    @Param('id', new ParseIntPipe()) characterId: number,
  ) {
    const exists = await this.service.characterExists(user.sub, characterId);

    if (!exists) {
      throw new BadRequestException('O personagem não está favoritado!');
    }

    return this.service.deleteFavorite(user.sub, characterId);
  }
}
