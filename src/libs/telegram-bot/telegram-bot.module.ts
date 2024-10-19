import { TelegramConfigInitializer } from '@libs/telegram-bot/config';
import { TelegramBotService } from '@libs/telegram-bot/services/telegram-bot.service';
import { Global, Module } from '@nestjs/common';
import { SecretsService } from '@libs/aws/secrets.service';

@Global()
@Module({
  imports: [TelegramConfigInitializer],
  providers: [TelegramBotService, SecretsService],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
