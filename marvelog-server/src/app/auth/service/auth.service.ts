import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@app/user/service/user.service';
import { JwtDTO } from '@shared/interfaces/jwt.dto';
import { RegisterDTO } from '@app/auth/models/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<JwtDTO> {
    const user = await this.userService.getByLoginUsed(login);
    if (user && (await user.comparePassword(pass))) {
      const { cod_user_usr, str_name_usr, str_user_usr } = user;
      return {
        sub: cod_user_usr,
        name: str_name_usr,
        user: str_user_usr,
      };
    }
    return null;
  }

  async login(user: JwtDTO) {
    return {
      access_token: this.jwtService.sign(
        {
          name: user.name,
          user: user.user,
        },
        {
          subject: user.sub,
        },
      ),
    };
  }

  async register(cred: RegisterDTO) {
    return this.userService.create(cred);
  }
}
