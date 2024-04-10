import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'rest_api',
  version: process.env.API_VERSION || 'v1',
  env: process.env.APP_ENV || 'local',
  debug: +process.env.APP_DEBUG || 1,
  url: process.env.APP_URL || 'localhost',
  port: +process.env.APP_PORT || 3001,
  logFileName: './logs/app.log',
}));
