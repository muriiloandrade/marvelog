import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EnvService } from '@config/env/env.service';
import { UserService } from '@app/user/service/user.service';
import { JwtDTO } from '@shared/interfaces/jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private envService: EnvService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      ignoreExpiration: false,
      secretOrKey: envService.jwtSecret,
    });
  }

  async validate(payload: JwtDTO, done) {
    const dbUser = await this.userService.getById(payload.sub);
    if (!dbUser) {
      return done(new UnauthorizedException('Credenciais inválidas'), false);
    }
    const { str_name_usr, str_user_usr, cod_user_usr } = dbUser;
    return done(null, {
      name: str_name_usr,
      user: str_user_usr,
      sub: cod_user_usr,
    });
  }
}
