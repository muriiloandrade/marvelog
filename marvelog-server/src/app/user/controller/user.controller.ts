import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
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
  }

  @Delete(':id')
  async delete(@User() user: JwtDTO): Promise<void> {
    const deleted = await this.service.delete(user.sub);
    if (deleted === 0) {
      throw new ServiceUnavailableException(
        'Não foi possível excluir o usuário!',
      );
    }
  }
}
