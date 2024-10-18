import * as process from 'node:process';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { telegramConfiguration, telegramConfigurationValidationSchema } from './telegram.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [telegramConfiguration],
      validationSchema: telegramConfigurationValidationSchema,
      envFilePath: [`.env.${process.env.NODE_ENV}.local`],
    }),
  ],
})
export class TelegramConfigInitializer {}
