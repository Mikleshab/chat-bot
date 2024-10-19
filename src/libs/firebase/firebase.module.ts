import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, configurationValidationSchema } from '@libs/firebase/config/config.schema';
import process from 'node:process';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationValidationSchema,
      envFilePath: process.env.NODE_ENV !== 'production' ? [`.env.${process.env.NODE_ENV}.local`] : [],
    }),
  ],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
