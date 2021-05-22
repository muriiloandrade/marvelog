import { Module } from '@nestjs/common';
import { DbModule } from '@config/db/db.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
