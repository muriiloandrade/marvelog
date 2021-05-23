import { Module } from '@nestjs/common';
import { UserController } from '@app/user/controller/user.controller';
import { UserService } from '@app/user/service/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
