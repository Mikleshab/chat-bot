import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CommonConfiguration, DEFAULT_PORT } from '@config/common.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { snapshot: true });
  app.enableCors({
    origin: ['https://d1otptx74btwrk.cloudfront.net', 'http://localhost:3000', 'http://localhost:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Token, x-apollo-operation-name, apollo-require-preflight',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService<CommonConfiguration>);
  await app.listen(configService.get('port', DEFAULT_PORT), '0.0.0.0');
}

bootstrap();
