import * as process from 'node:process';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { googleConfiguration, googleConfigurationValidationSchema } from './google.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [googleConfiguration],
      validationSchema: googleConfigurationValidationSchema,
      envFilePath: [`.env.${process.env.NODE_ENV}.local`],
    }),
  ],
})
export class GoogleConfigInitializer {
}
