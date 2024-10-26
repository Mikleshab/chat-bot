import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { InitializersModule } from '@initializers/initializers.module';
import { FirebaseModule } from '@libs/firebase/firebase.module';
import { FeaturesModule } from '@features/features.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './core/auth/auth.module';

const libs = [FirebaseModule];

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ...libs,
    InitializersModule,
    FeaturesModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
  ],
})
export class AppModule {}
