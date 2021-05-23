import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  ServiceUnavailableException,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/service/user.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { User } from '@shared/decorators/usuario.decorator';
import { JwtDTO } from '@shared/interfaces/jwt.dto';
import { GeneralErrorsFilter } from '@shared/filters/error-handling.filter';
import { HttpExceptionFilter } from '@shared/filters/http-exception.filter';
import { UpdateUserDTO } from '@app/user/models/update-user.dto';
import { UpdatePassDTO } from '@app/user/models/update-pass.dto';

@UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
@UseFilters(GeneralErrorsFilter, HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@Controller('v1/user')
export class UserController {
  constructor(private service: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') cod_user_usr: string) {
    const user = await this.service.getById(cod_user_usr);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return user.$omit('str_password_usr');
  }

  @Patch(':id')
  async update(@User() user: JwtDTO, @Body() data: UpdateUserDTO) {
    const upd = await this.service.update(user.sub, data);

    if (upd === 0) {
      throw new ServiceUnavailableException(
        'Não foi possível editar o usuário!',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/pass')
  async updatePass(@User() user: JwtDTO, @Body() data: UpdatePassDTO) {
    const dbUser = await this.service.getById(user.sub);
    if (!(await dbUser.comparePassword(data.oldpassword))) {
      throw new BadRequestException('Não foi possível alterar a senha!');
    }
    await this.service.updatePass(user.sub, data);
  }

  @Delete(':id')
  async delete(@User() user: JwtDTO) {
    const deleted = await this.service.delete(user.sub);
    if (deleted === 0) {
      throw new ServiceUnavailableException(
        'Não foi possível excluir o usuário!',
      );
    }
  }
}
