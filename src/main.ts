import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({ origin: [process.env.CORS_HOST], credentials: true });

  const port = process.env.PORT;
  await app.listen(port);
  Logger.log(`Server starts on port: ${port}`);
}
bootstrap();
