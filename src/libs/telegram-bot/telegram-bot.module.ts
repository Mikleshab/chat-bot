import { TelegramConfigInitializer } from '@libs/telegram-bot/config';
import { TelegramBotService } from '@libs/telegram-bot/services/telegram-bot.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [TelegramConfigInitializer],
  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
