import { HttpModule, Module } from '@nestjs/common';
import { MarvelController } from '@app/marvel/controller/marvel.controller';
import { MarvelService } from '@app/marvel/services/marvel.service';

@Module({
  imports: [HttpModule],
  controllers: [MarvelController],
  providers: [MarvelService],
})
export class MarvelModule {}
