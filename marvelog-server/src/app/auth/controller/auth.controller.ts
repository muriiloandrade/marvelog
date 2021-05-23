import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@app/auth/service/auth.service';
import { Request } from 'express';
import { LocalAuthGuard } from '@shared/guards/local-auth.guard';
import { UserModel } from '@app/user/models/user.model';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async register(@Body() cred: Partial<UserModel>) {
    await this.authService.register(cred);
  }
}
