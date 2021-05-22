import { Module } from '@nestjs/common';
import { AuthController } from '@app/auth/controller/auth.controller';
import { AuthService } from '@app/auth/service/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
