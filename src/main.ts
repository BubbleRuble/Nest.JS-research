import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './common/middlewares/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/responce.interceptor';
import { AllExceptionFilter } from './common/filters/all-exceptions.filter';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './utils/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  app.use(logger);

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new AllExceptionFilter());

  setupSwagger(app);

  await app.listen(process.env.PORT ?? 5544);
}
bootstrap();
