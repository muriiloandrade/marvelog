import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MarvelController } from '@app/marvel/controller/marvel.controller';
import { MarvelService } from '@app/marvel/services/marvel.service';
import { CharacterService } from '@app/character/services/character.service';
import { ComicService } from '@app/comic/service/comic.service';

@Module({
  imports: [HttpModule],
  controllers: [MarvelController],
  providers: [MarvelService, CharacterService, ComicService],
})
export class MarvelModule {}
