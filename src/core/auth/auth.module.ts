import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import process from 'node:process';
import { configuration, configurationValidationSchema } from './config/config.schema';
import { AuthGuard } from './auth.guard';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationValidationSchema,
      envFilePath: process.env.NODE_ENV !== 'production' ? [`.env.${process.env.NODE_ENV}.local`] : [],
    }),
  ],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
