import { Module } from '@nestjs/common';
import { DbModule } from '@config/db/db.module';
import { AuthModule } from '@app/auth/auth.module';
import { UserModule } from '@app/user/user.module';
import { ComicModule } from '@app/comic/comic.module';
import { CharacterModule } from './app/character/character.module';

@Module({
  imports: [DbModule, AuthModule, UserModule, ComicModule, CharacterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
