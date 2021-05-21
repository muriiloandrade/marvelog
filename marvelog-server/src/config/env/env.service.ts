import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  get dbName(): string {
    return this.configService.get<string>('app.dbName');
  }

  get dbHost(): string {
    return this.configService.get<string>('app.dbHost');
  }

  get dbPort(): number {
    return this.configService.get<number>('app.dbPort');
  }

  get dbUser(): string {
    return this.configService.get<string>('app.dbUser');
  }

  get dbPass(): string {
    return this.configService.get<string>('app.dbPass');
  }

  get env(): string {
    return this.configService.get<string>('app.env');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('app.jwtSecret');
  }

  get jwtExp(): string {
    return this.configService.get<string>('app.jwtExp');
  }

  get rfJwtExp(): string {
    return this.configService.get<string>('app.rfJwtExp');
  }

  get rfJwtSecret(): string {
    return this.configService.get<string>('app.rfJwtSecret');
  }

  get smtpHost(): string {
    return this.configService.get<string>('app.smtp.host');
  }

  get smtpPort(): number {
    return this.configService.get<number>('app.smtp.port');
  }

  get smtpUser(): string {
    return this.configService.get<string>('app.smtp.auth.user');
  }

  get smtpPass(): string {
    return this.configService.get<string>('app.smtp.auth.pass');
  }

  get angularUrl(): string {
    return this.configService.get<string>('app.angularUrl');
  }

  get marvelApiUrl(): string {
    return this.configService.get<string>('app.marvel.apiUrl');
  }

  get marvelPrivKey(): string {
    return this.configService.get<string>('app.marvel.privKey');
  }

  get marvelPubKey(): string {
    return this.configService.get<string>('app.marvel.pubKey');
  }
}
