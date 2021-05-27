import { HttpModule, Module } from '@nestjs/common';
import { MarvelController } from '@app/marvel/controller/marvel.controller';
import { MarvelService } from '@app/marvel/services/marvel.service';
import { CharacterService } from '@app/character/services/character.service';

@Module({
  imports: [HttpModule],
  controllers: [MarvelController],
  providers: [MarvelService, CharacterService],
})
export class MarvelModule {}
