import * as process from 'node:process';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { commonConfiguration, commonConfigurationValidationSchema } from '@config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [commonConfiguration],
      validationSchema: commonConfigurationValidationSchema,
      envFilePath: [`.env.${process.env.NODE_ENV}.local`],
    }),
  ],
})
export class ConfigInitializer {
}
