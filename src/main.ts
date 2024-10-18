import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CommonConfiguration, DEFAULT_PORT } from '@config/common.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { snapshot: true });
  app.enableCors({
    origin: 'http://localhost:4200', // Замените на URL вашего фронтенда
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService<CommonConfiguration>);
  await app.listen(configService.get('port', DEFAULT_PORT));
}

bootstrap();
