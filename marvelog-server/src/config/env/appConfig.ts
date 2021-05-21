import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  jwtSecret: process.env.JWT_SECRET,
  jwtExp: process.env.JWT_EXPIRATION,
  rfJwtSecret: process.env.RF_JWT_SECRET,
  rfJwtExp: process.env.RF_JWT_EXPIRATION,
  angularUrl: process.env.APP_URL,
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  env: process.env.NODE_ENV,
  marvel: {
    apiUrl: process.env.MARVEL_API,
    privKey: process.env.MARVEL_PRI_KEY,
    pubKey: process.env.MARVEL_PUB_KEY,
  },
}));
