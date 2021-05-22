import { Module } from '@nestjs/common';
import { DbModule } from '@config/db/db.module';
import { AuthModule } from '@app/auth/auth.module';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [DbModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
