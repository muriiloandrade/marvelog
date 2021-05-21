import { Module } from '@nestjs/common';
import { DbModule } from '@config/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
