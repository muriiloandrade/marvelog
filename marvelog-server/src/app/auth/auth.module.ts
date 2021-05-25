import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@app/auth/controller/auth.controller';
import { AuthService } from '@app/auth/service/auth.service';
import { UserModule } from '@app/user/user.module';
import { EnvModule } from '@config/env/env.module';
import { EnvService } from '@config/env/env.service';
import { LocalStrategy } from '@app/auth/passport-strategies/local.strategy';
import { JwtStrategy } from '@app/auth/passport-strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        secret: envService.jwtSecret,
        signOptions: {
          expiresIn: envService.jwtExp,
          issuer: 'api.marvelog.muriloandrade.dev',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
