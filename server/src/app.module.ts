import { Module } from '@nestjs/common';
import { FeaturesModule } from '@features';
import { InitializersModule } from '@initializers/initializers.module';
import { FirebaseModule } from '@libs/firebase/firebase.module';
import { TelegramBotModule } from '@libs/telegram-bot/telegram-bot.module';

const libs = [FirebaseModule, TelegramBotModule];

@Module({
  imports: [...libs, InitializersModule, FeaturesModule],
})
export class AppModule {}
