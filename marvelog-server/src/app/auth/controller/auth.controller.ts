import {
  Body,
  Controller,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '@app/auth/service/auth.service';
import { Request } from 'express';
import { LocalAuthGuard } from '@shared/guards/local-auth.guard';
import { RegisterDTO } from '@app/auth/models/register.dto';
import { GeneralErrorsFilter } from '@shared/filters/error-handling.filter';
import { HttpExceptionFilter } from '@shared/filters/http-exception.filter';

@UseFilters(GeneralErrorsFilter, HttpExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async register(@Body() cred: RegisterDTO) {
    await this.authService.register(cred);
  }
}
