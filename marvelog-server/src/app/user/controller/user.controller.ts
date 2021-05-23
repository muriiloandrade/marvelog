import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@app/user/service/user.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';

@Controller('v1/user')
export class UserController {
  constructor(private service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') cod_user_usr: string) {
    const user = await this.service.getById(cod_user_usr);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    delete user.str_password_usr;
    return user;
  }
}
