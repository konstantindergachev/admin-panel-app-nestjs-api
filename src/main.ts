import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({ origin: ['http://localhost:8080'], credentials: true });

  const port = process.env.PORT || 5000;
  await app.listen(port);
  Logger.log(`Server starts on port: ${port}`);
}
bootstrap();
