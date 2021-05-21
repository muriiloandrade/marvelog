import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('api');
  if (config.get('NODE_ENV') === 'prod') {
    app.enableCors({
      origin: [],
    });
  } else {
    app.enableCors({ origin: '*' });
  }
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(compression());
  app.use(helmet());
  await app.listen(config.get('PORT'));
  Logger.log(`HTTP app running in port: ${config.get('PORT')}`);
}
bootstrap();
