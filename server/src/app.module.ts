import { Module } from '@nestjs/common';
import { FeaturesModule } from '@features';
import { InitializersModule } from '@initializers/initializers.module';
import { FirebaseModule } from '@libs/firebase/firebase.module';
import { TelegramBotModule } from '@libs/telegram-bot/telegram-bot.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

const libs = [FirebaseModule, TelegramBotModule];

@Module({
  imports: [
    ...libs,
    InitializersModule,
    FeaturesModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  ],
})
export class AppModule {}
