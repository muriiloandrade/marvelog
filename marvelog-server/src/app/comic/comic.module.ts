import { ComicController } from '@app/comic/controller/comic.controller';
import { ComicService } from '@app/comic/service/comic.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ComicController],
  providers: [ComicService],
})
export class ComicModule {}
