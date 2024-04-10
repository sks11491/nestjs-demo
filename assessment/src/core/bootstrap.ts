import { INestApplication, ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import helmet from 'helmet';

import { corsOptions } from '@app/core/cors.config';
import { ErrorHandler, RequestHandler, ResponseHandler } from '@app/core/middleware';
/**
 * Core bootstrap module should be loaded here.
 * @param app
 *
 */

export default async function bootstrap(app: INestApplication) {
  

  // middlewares, express specific\
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use(helmet());

  // CORS configuration
  app.enableCors(corsOptions);

  // Auto-validation
  // We'll start by binding ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data.
  app.useGlobalPipes(new ValidationPipe());

  // Bind Interceptors
  app.useGlobalInterceptors(new RequestHandler(), new ResponseHandler());

  // Error Handler
  app.useGlobalFilters(new ErrorHandler());
}
